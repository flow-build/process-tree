import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("process_tree", (table) => {
    table.uuid("process_id").notNullable();
    table.uuid("root_id").notNullable();
    table.uuid("parent_id");
    table.integer("depth");
    table.index(["process_id"], "idx_process_id");
    table.index(["root_id"], "idx_root_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("process_tree");
}
