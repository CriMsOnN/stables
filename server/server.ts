import { ConfigProps, VorpCore } from '../shared/types';
import { AppDataSource } from './database/connection';
import { HorseService } from './database/services/horse.service';

import './services/stable.service';

export const config: ConfigProps = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'config.json'));

(async () => {
  await AppDataSource.initialize();
})();

export let Core: VorpCore | null = null;

emit('getCore', (obj: VorpCore) => {
  Core = obj;
});

export const horseService = new HorseService();
