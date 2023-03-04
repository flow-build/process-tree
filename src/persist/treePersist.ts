import { Knex } from "knex";
import { logger } from "../utils/logger";
import { KnexPersist } from "./knex";

export interface treePersist {
  process_id: string;
  root_id: string;
  parent_id?: string;
  depth: number;
}

export class TreeKnexPersist extends KnexPersist {
  constructor(db: Knex) {
    super(db, "process_tree");
  }

  async getRootByProcessId(pid: string) {
    logger.debug(`Persist getRootByProcessId ${pid}`);
    return await this._db(this._table).select("root_id").where("process_id", pid);
  }

  async getPathByRootId(rid: string) {
    logger.debug(`Persist getPathByRootId ${rid}`);
    return await this._db(this._table).select("*").where("root_id", rid).orderBy("depth");
  }

  async getLeaf(pid: string) {
    logger.debug(`Persist getLeaf ${pid}`);
    return await this._db(this._table).select("*").where("process_id", pid).first();
  }
  
  async saveNode(obj: treePersist) {
    logger.debug(`Persist insertNode into root ${obj.root_id}`);
    return await this._db(this._table).insert(obj).returning('*');
  }
}
