import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  return knex("process_tree")
    .del()
    .then(function () {
      return knex("process_tree").insert([
        {
          process_id: "d19c8b6c-521f-4693-99ab-9e28ff766d2f",
          root_id: "d19c8b6c-521f-4693-99ab-9e28ff766d2f",
          depth: 0,
        },
        {
          process_id: "bbbdaaac-8529-41c7-8686-1e8e720b018d",
          root_id: "d19c8b6c-521f-4693-99ab-9e28ff766d2f",
          parent_id: "d19c8b6c-521f-4693-99ab-9e28ff766d2f",
          depth: 1,
        },
        {
          process_id: "af763523-dbfa-4558-a9db-8ed8042cdf7e",
          root_id: "d19c8b6c-521f-4693-99ab-9e28ff766d2f",
          parent_id: "bbbdaaac-8529-41c7-8686-1e8e720b018d",
          depth: 2,
        },
      ]);
    });
}
