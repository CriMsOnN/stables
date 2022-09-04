import { Events } from '../../shared/events';
import { Delay } from '../../shared/utils';
import { mainLogger } from '../utils';
import { config, Core, horseService } from '../server';

const servicesLogger = mainLogger.child({ module: 'services' });

onNet(Events.getPlayerHorses, async () => {
  const _src = source;
  const player = Core.getUser(_src).getUsedCharacter;
  const cid = player.charIdentifier;
  const playerHorses = await horseService.getPlayerHorses(cid);
  console.log(JSON.stringify(playerHorses, null, 2));
  emitNet(Events.getPlayerHorses, _src, playerHorses);
  if (config.debug) {
    servicesLogger.info(`Player [identifier: ${player.identifier}][cid: ${cid}] has ${playerHorses.length} horses`);
  }
});

onNet(Events.useHorse, async (horseName: string, position: number) => {
  const _src = source;
  const player = Core.getUser(_src).getUsedCharacter;
  const cid = player.charIdentifier;
  const playerHorses = await horseService.getPlayerHorses(cid);
  const horse = playerHorses.find((h) => h.horseName === horseName && h.position === position);
  const activeHorse = playerHorses.find((h) => h.isActive);
  if (horse) {
    if (horse.stored) {
      if (activeHorse) {
        activeHorse.stored = true;
        activeHorse.isActive = false;
        activeHorse.position = horse.position;
        horseService.updateHorse(activeHorse);
      }
      horse.stored = false;
      horse.isActive = true;
      horse.position = 0;
      horseService.updateHorse(horse);
    } else {
      horse.stored = true;
      horse.isActive = false;
      horseService.updateHorse(horse);
    }
    emitNet(Events.useHorse, _src, { success: true });
  }
});
