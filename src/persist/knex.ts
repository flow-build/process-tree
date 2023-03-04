import { Knex } from "knex";

export class KnexPersist {
    _db: Knex;
    _table: string;
    constructor(db: Knex, table: string) {
        this._db = db;
        this._table = table
    }
}