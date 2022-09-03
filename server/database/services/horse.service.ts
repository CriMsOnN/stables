import { Repository } from "typeorm";
import { AppDataSource } from "../connection";
import { Horse } from "../models/Horse";

export class HorseService {
  private horseRepo: Repository<Horse>;

  constructor() {
    this.horseRepo = AppDataSource.getRepository(Horse);
  }

  public async getAllHorses(): Promise<Horse[]> {
    const horses = await this.horseRepo.find({});
    return horses;
  }

  public async newHorse(horse: Horse): Promise<Horse> {
    const newHorse = await this.horseRepo.save(horse);
    return newHorse;
  }

  public async getPlayerHorses(cid: number): Promise<Horse[]> {
    const horses = await this.horseRepo.find({
      select: {
        cid: true,
        isActive: true,
        horseName: true,
        metadata: true,
        stable: true,
        position: true,
        model: true,
        stored: true,
        components: true,
      },
      where: {
        cid: cid,
      },
    });
    return horses;
  }
}
