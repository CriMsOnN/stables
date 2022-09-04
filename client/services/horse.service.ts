import { Natives } from '../../shared/utils';
import { HorsesProps } from '../classes/Horses';
import { config, requestAndLoadModel } from '../client';

export const spawnHorse = async (stable: string, horse: HorsesProps, inStable: boolean) => {
  const spawnPosition = config.stables[stable].spawnPositions[horse.position - 1];
  await requestAndLoadModel(horse.model);
  let horsePed;
  if (inStable) {
    horsePed = CreatePed(horse.model, spawnPosition.x, spawnPosition.y, spawnPosition.z, spawnPosition.h, 0, false, true);
    SetPedConfigFlag(horsePed, 412, true);
  } else {
    const [x, y, z] = GetEntityCoords(PlayerPedId(), true);
    const [retval, [closestRoadX, closestRoadY, closestRoadZ]] = GetClosestRoad(x + 10.0, y + 10.0, z, 0.0, 25, true);
    if (retval) {
      horsePed = CreatePed(horse.model, closestRoadX, closestRoadY, closestRoadZ, 90.0, 1, false, true);
    }
  }
  Natives.SetRandomOutfitVariation(horsePed, true);
  if (Object.values(horse.components).length > 0) {
    for (const [, component] of Object.entries(horse.components)) {
      Natives.ApplyShopItemToPed(horsePed, component, false, true, true);
    }
  }
  Natives.UpdatePedVariation(horsePed, false, true, true, true, false);
  return horsePed;
};
