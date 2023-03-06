import Knex from 'knex'
//import { config } from '../../knexfile'
import * as config from '../../knexfile'

interface IKnexConfig {
    [key: string]: any
}

const c: IKnexConfig = config

export const db = Knex(c['test'])

export async function cleanDb() {
    await db("process_tree").del();
}

export async function insertRecord(table: string, record: any) {
    return await db(table).insert(record);
}