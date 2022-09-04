import { config } from '../client';

export interface HorsesProps {
  horseName: string;
  metadata: any;
  stored: boolean;
  model: number;
  stable: string;
  position: number;
  components: number[];
  isActive: boolean;
}

interface Components {
  [key: string]: number;
}

class Horses {
  private _horses: Map<string, HorsesProps> = new Map();

  public getHorseByName(name: string): HorsesProps | undefined {
    const horses = this._horses.get(name);
    if (!horses) {
      return undefined;
    }
    return horses;
  }

  public setHorse(horse: HorsesProps) {
    this._horses.set(horse.horseName, horse);
  }

  public getAllHorses(): Map<string, HorsesProps> {
    return this._horses;
  }

  public getHorsesByStable(stable: string): Map<string, HorsesProps> {
    const horses = new Map();
    for (const [name, horse] of this._horses) {
      if (horse.stable === stable) {
        horses.set(name, horse);
      }
    }
    return horses;
  }

  public getHorseByPosition(stable: string, position: number): HorsesProps | undefined {
    const horses = this.getHorsesByStable(stable);
    for (const [, horse] of horses) {
      if (horse.position === position) {
        return horse;
      }
    }
  }

  public isPositionOccupiedInStable(stable: string, position: number): boolean {
    for (const [, horse] of this._horses) {
      if (horse.stable === stable && horse.position === position) {
        return true;
      }
    }
    return false;
  }

  public getFreePositionInStable(stable: string): number {
    const horses = this.getHorsesByStable(stable);
    for (let i = 0; i < config.stables[stable].spawnPositions.length; i++) {
      let isFree = true;
      for (const [, horse] of horses) {
        if (horse.position === i + 1) {
          isFree = false;
        }
      }
      if (isFree) {
        return i + 1;
      }
    }
  }
}

export default new Horses();
