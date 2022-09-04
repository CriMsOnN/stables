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
