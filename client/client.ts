import { netEvent, Delay, registerNUIProxy } from './utils';
import { Events } from '../shared/events';
import { Component, ConfigProps } from '../shared/types';
import { Natives } from '../shared/utils';
import Horses, { HorsesProps } from './classes/Horses';
import promptManager from './classes/Prompt';
import { spawnHorse } from './services/horse.service';
export const config = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'config.json')) as ConfigProps;

export const clothes = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'horseClothes.json')) as Component;

const exp = global.exports;

let activeHorsePeds: number[] = [];

let isPlayerInsideStable = false;
let activeStable: string | null = null;

// setImmediate(async () => {
//   initializeScript();
// });

onNet(Events.selectedCharacter, () => {
  initializeScript();
});

on('onResourceStart', (resourceName: string) => {
  console.log('restarted');
  if (GetCurrentResourceName() === resourceName) {
    initializeScript();
  }
});

const initializeScript = async () => {
  const [horses] = await netEvent<HorsesProps[]>(Events.getPlayerHorses);
  for (const horse of horses) {
    Horses.setHorse(horse);
  }
  for (const stable of Object.values(config.stables)) {
    emit('addBoxZone', stable.polyZone.options.name, {
      x: stable.polyZone.x,
      y: stable.polyZone.y,
      z: stable.polyZone.z,
      length: stable.polyZone.length,
      width: stable.polyZone.width,
      options: stable.polyZone.options,
    });
  }
};

const useHorsePrompt = promptManager.createPrompt('horse_use', 'Use Horse', parseInt(config.interaction.useHorse));
const useCustomizationPrompt = promptManager.createPrompt('horse_customization', 'Customize Horse', parseInt(config.interaction.customizeHorse));
useHorsePrompt.setHoldMode(true);
useCustomizationPrompt.setHoldMode(true);
useHorsePrompt.setPromptEnabled(true);
useCustomizationPrompt.setPromptEnabled(true);

on('pointInside', async (isInside: boolean, name: string) => {
  if (isInside && config.stables[name]) {
    isPlayerInsideStable = true;
    activeStable = name;
    const horses = Horses.getHorsesByStable(name);
    for (const [, horse] of horses) {
      const ped = await spawnHorse(activeStable, horse, true);
      activeHorsePeds.push(ped);
    }
  } else {
    if (activeHorsePeds.length > 0) {
      for (let i = 0; i < activeHorsePeds.length; i++) {
        DeletePed(activeHorsePeds[i]);
      }
      activeHorsePeds = [];
      isPlayerInsideStable = false;
    }
  }
});

setTick(async () => {
  let sleep = 1000;
  if (isPlayerInsideStable && activeStable !== null) {
    if (config.stables[activeStable]) {
      const [x, y, z] = GetEntityCoords(PlayerPedId(), true);
      for (let i = 0; i < config.stables[activeStable].spawnPositions.length; i++) {
        if (
          GetDistanceBetweenCoords(
            x,
            y,
            z,
            config.stables[activeStable].spawnPositions[i].x,
            config.stables[activeStable].spawnPositions[i].y,
            config.stables[activeStable].spawnPositions[i].z,
            true
          ) < 3.0
        ) {
          sleep = 0;
          const [retval, entity] = GetPlayerTargetEntity(PlayerId());
          if (retval && entity) {
            const groupId = PromptGetGroupIdForTargetEntity(entity);
            if (useHorsePrompt !== undefined && useCustomizationPrompt !== undefined) {
              useHorsePrompt.setPromptToGroup(groupId);
              useCustomizationPrompt.setPromptToGroup(groupId);
              useHorsePrompt.setPromptVisible(true);
              useCustomizationPrompt.setPromptVisible(true);
              if (useHorsePrompt.hasHoldModeCompleted()) {
                const horse = Horses.getHorseByPosition(activeStable, i + 1);
                if (horse) {
                  const [results] = await netEvent<{ success: boolean }>(Events.useHorse, horse.horseName, horse.position);
                  if (results.success) {
                    DeleteEntity(entity);
                    Horses.releaseHorseFromStable(activeStable, i + 1);
                  }
                }
              } else if (useCustomizationPrompt.hasHoldModeCompleted()) {
                SendNuiMessage(
                  JSON.stringify({
                    action: 'setVisible',
                    data: true,
                  })
                );
              }
            }
          }
        }
      }
    }
  }
  await Delay(sleep);
});

registerNUIProxy<{ success: boolean }>('saveHorseComponents', Events.saveHorseComponents, (data) => {
  const [success] = data;
  console.log(success);
});

on('onResourceStop', (resourceName: string) => {
  if (GetCurrentResourceName() === resourceName) {
    if (activeHorsePeds.length > 0) {
      for (let i = 0; i < activeHorsePeds.length; i++) {
        DeletePed(activeHorsePeds[i]);
      }
      activeHorsePeds = [];
    }
  }
});

export const requestAndLoadModel = (model: number): Promise<boolean> => {
  return new Promise((resolve) => {
    RequestModel(model);
    const interval = setInterval(() => {
      if (HasModelLoaded(model)) {
        clearInterval(interval);
        resolve(true);
      }
    }, 0);
  });
};
