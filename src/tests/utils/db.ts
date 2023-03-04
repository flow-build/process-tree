import Knex from 'knex'
import { config } from '../../knexfile'

export const db = Knex(config['test'])

export async function cleanDb() {
    await db("process_tree").del();
}

export async function insertRecort(table: string, record: any) {
    return await db(table).insert(record);
}