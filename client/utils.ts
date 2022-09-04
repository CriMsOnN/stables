export const netEvent = <T = unknown>(eventName: string, ...args: unknown[]): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    emitNet(eventName, ...args);
    let eventResolved = false;
    onNet(eventName, (...args: T[]) => {
      eventResolved = true;
      resolve(args);
    });
    setTimeout(() => {
      if (!eventResolved) {
        reject(new Error(`${eventName} event timed out. Contact the developers with a screenshot of this error`));
      }
    }, 10000);
  });
};

export const Delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const registerNUIProxy = <T = unknown>(nuiEvent: string, serverEvent: string, callback: (data: T[]) => void) => {
  RegisterNuiCallbackType(nuiEvent);
  on(`__cfx_nui:${nuiEvent}`, async (data: unknown, cb: (success: boolean) => void) => {
    const results = await netEvent<T>(serverEvent, data);
    if (results) {
      cb(true);
      callback(results);
    }
  });
};

export const instancePlayer = () => {
  if (NetworkIsInTutorialSession()) {
    NetworkEndTutorialSession();
  } else {
    NetworkStartSoloTutorialSession();
  }
};
