import { DataSource } from 'typeorm';
import 'dotenv/config';
import { getDatabaseConfig } from './database.config';

// TypeORM CLI requires only one default export of DataSource instance
const AppDataSource = new DataSource(getDatabaseConfig());

// Only default export for TypeORM CLI
export default AppDataSource;