import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'biblioteca_db',
  entities: ['dist/infrastructure/database/entities/**/*.entity{.ts,.js}'],
  migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
  synchronize: false, // IMPORTANTE: false en producción, usar migraciones
  logging: process.env.NODE_ENV === 'development',
};

export const typeOrmConfig = registerAs('typeorm', () => dataSourceOptions);

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
