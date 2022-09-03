import { netEvent, Delay, registerNUIProxy } from "./utils";
import { Events } from "../shared/events";
import { Component, ConfigProps } from "../shared/types";
import Horses, { HorsesProps } from "./classes/Horses";
import promptManager from "./classes/Prompt";
export const config = JSON.parse(
  LoadResourceFile(GetCurrentResourceName(), "config.json")
) as ConfigProps;

export const clothes = JSON.parse(
  LoadResourceFile(GetCurrentResourceName(), "horseClothes.json")
) as Component;

const exp = global.exports;

let activeHorsePeds: number[] = [];

let isPlayerInsideStable = false;
let activeStable: string | null = null;

setImmediate(async () => {
  const [horses] = await netEvent<HorsesProps[]>(Events.getPlayerHorses);
  for (const horse of horses) {
    Horses.setHorse(horse);
  }
  for (const stable of Object.values(config.stables)) {
    emit("addBoxZone", stable.polyZone.options.name, {
      x: stable.polyZone.x,
      y: stable.polyZone.y,
      z: stable.polyZone.z,
      length: stable.polyZone.length,
      width: stable.polyZone.width,
      options: stable.polyZone.options,
    });
  }
});

on("pointInside", async (isInside: boolean, name: string) => {
  if (config.stables[name] && isInside) {
    isPlayerInsideStable = true;
    activeStable = name;
    const horses = Horses.getHorsesByStable(name);
    for (const [, horse] of horses) {
      for (let i = 0; i < config.stables[name].spawnPositions.length; i++) {
        const spawnPosition = config.stables[name].spawnPositions[i];
        if (horse.position === i + 1 && horse.stored) {
          await requestAndLoadModel(horse.model);
          const ped = CreatePed(
            horse.model,
            spawnPosition.x,
            spawnPosition.y,
            spawnPosition.z,
            spawnPosition.h,
            0,
            true,
            true
          );
          Citizen.invokeNative("0x283978A15512B2FE", ped, true);
          if (Object.values(horse.components).length > 0) {
            for (const [key, value] of Object.entries(horse.components)) {
              const component_hash = clothes[key].category_hash;
              Citizen.invokeNative(
                "0xD3A7B003ED343FD9",
                ped,
                value,
                false,
                true,
                true
              );
            }
            Citizen.invokeNative(
              "0xCC8CA3E88256E58F",
              ped,
              false,
              true,
              true,
              true,
              false
            );
          }

          activeHorsePeds.push(ped);
          promptManager.createPrompt(`stable_${i}`, "Use Horse", 0xc1989f95);
        }
      }
    }
  } else if (!isInside) {
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
      for (
        let i = 0;
        i < config.stables[activeStable].spawnPositions.length;
        i++
      ) {
        const promptHandle = promptManager.getPromptHandle(`stable_${i}`);
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
          if (promptHandle) {
            promptHandle.setPromptVisible(true);
          }
        } else {
          if (promptHandle && promptHandle.isPromptVisible()) {
            promptHandle.setPromptVisible(false);
            promptHandle.setPromptEnabled(false);
          }
        }
      }
    }
  }
  await Delay(sleep);
});

registerNUIProxy<{ success: boolean }>(
  "saveHorseComponents",
  Events.saveHorseComponents,
  (data) => {
    const [success] = data;
    console.log(success);
  }
);

on("onResourceStop", (resourceName: string) => {
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
