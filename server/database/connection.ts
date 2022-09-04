import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Horse } from './models/Horse';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'vorp',
  entities: [Horse],
  synchronize: false,
});
