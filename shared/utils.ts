export const Delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const Natives = {
  UpdatePedVariation: (ped: number, p1: boolean, p2: boolean, p3: boolean, p4: boolean, p5: boolean) => {
    Citizen.invokeNative('0xCC8CA3E88256E58F', ped, p1, p2, p3, p4, p5);
  },
  ApplyShopItemToPed: (ped: number, componentHash: number, immediately: boolean, isMp: boolean, p4: boolean) => {
    Citizen.invokeNative('0xD3A7B003ED343FD9', ped, componentHash, immediately, isMp, p4);
  },
  SetRandomOutfitVariation: (ped: number, p1: boolean) => {
    Citizen.invokeNative('0x283978A15512B2FE', ped, p1);
  },
};
