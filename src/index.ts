import { Knex } from "knex";
import { TreeEntity, treeEntity } from "./entities/treeEntity";
import { logger } from "./utils/logger";

export class Tree {
  _db: Knex;

  constructor(db: Knex) {
    this._db = db;
  }

  async getRoot(processId: string) {
    logger.debug(`Facade getRoot ${processId}`);
    const response = await new TreeEntity().getRoot(processId);
    return response;
  }

  async getPath(processId: string) {
    logger.debug(`Facade getPath ${processId}`);
    const response = await new TreeEntity().getPath(processId);
    return response;
  }

  async createTree(processId: string): Promise<treeEntity> {
    logger.debug(`Facade createTree ${processId}`);
    const response = await new TreeEntity().createTree(processId);
    if(!response) {
      return {
        message: "tree already exists"
      }
    }
    return response;
  }

  async appendChild(leaf: { processId: string; parentId: string }) {
    logger.debug(`Facade appendChild ${leaf.processId}, ${leaf.parentId}`);
    const response = await new TreeEntity().appendChild(leaf);
    if(!response) {
      return {
        message: "process already in another tree"
      }
    }
    return response;
  }
}
