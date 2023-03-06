import { TreeKnexPersist, treePersist } from "../persist/treePersist";
import { logger } from "../utils/logger";
import { db } from "../db";
import _ from "lodash";
import { Knex } from "knex";

export type treeEntity = {
  processId?: string;
  rootId?: string;
  parentId?: string;
  depth?: number;
  message?: string
};

export class TreeEntity {
  persist: any;

  constructor(_db: Knex) {
    this.persist = new TreeKnexPersist(_db);
  }

  _deserialize(data: treePersist): treeEntity {
    return {
      processId: data.process_id,
      rootId: data.root_id,
      parentId: data.parent_id,
      depth: data.depth,
    };
  }

  deserialized(dbData: treePersist[]) {
    logger.debug(`deserialized`);
    return dbData.map((data: treePersist) => this._deserialize(data));
  }

  async getRoot(processId: string) {
    logger.debug(`Entity getRoot ${processId}`);
    const dbData = await this.persist.getRootByProcessId(processId);
    if(dbData.length === 0) {
      return {};
    }
    return { rootId: dbData[0].root_id };
  }

  async getPath(processId: string) {
    logger.debug(`Entity getPath ${processId}`);
    const root = await this.persist.getLeaf(processId);
    const dbData = await this.persist.getPathByRootId(root.root_id);
    return this.deserialized(dbData);
  }

  async createTree(processId: string) {
    logger.debug(`Entity createTree ${processId}`);
    const item = {
      process_id: processId,
      root_id: processId,
      depth: 0,
    };
    
    const verification = await this.persist.getRootByProcessId(processId)
    if(verification.length !== 0) {
      return undefined
    }

    const dbData = await this.persist.saveNode(item);
    return this._deserialize(dbData[0]);
  }

  async appendChild(child: { parentId: string; processId: string }) {
    logger.debug(`Entity appendChild ${child.processId}`);
    
    const verification = await this.persist.getRootByProcessId(child.processId)
    if(verification.length !== 0) {
      return undefined
    }

    const root = await this.persist.getLeaf(child.parentId);
    logger.debug(`Entity appendChild @ depth ${root.depth}`);
    const item = {
      process_id: child.processId,
      root_id: root.root_id,
      parent_id: child.parentId,
      depth: root.depth + 1,
    };
    const dbData = await this.persist.saveNode(item);
    return this._deserialize(dbData[0]);
  }
}
