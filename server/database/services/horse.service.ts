import { Repository } from 'typeorm';
import { AppDataSource } from '../connection';
import { Horse } from '../models/Horse';

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

  public async updateHorse(horse: Horse): Promise<Horse> {
    console.log(horse.position, horse.horseName, horse.isActive, horse.stored);
    const updatedHorse = await this.horseRepo
      .createQueryBuilder()
      .update({
        stored: horse.stored,
        position: horse.position,
        isActive: horse.isActive,
      })
      .where({
        cid: horse.cid,
        horseName: horse.horseName,
      })
      .execute();
    return updatedHorse.raw[0];
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
