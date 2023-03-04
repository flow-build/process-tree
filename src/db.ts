require('dotenv').config();
import knex from 'knex';
import { config } from './knexfile';
const env = process.env.KNEX_ENV || 'test';

export const db = knex(config[env]);