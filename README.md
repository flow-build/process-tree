# Flowbuild Process Tree

A flowbuild extension to allow saving hierarchical relationship between processes.

## Gist

**Install**

``` $ npm install @flowbuild/process-tree ```

Add environment variables to configure db connection

KNEX_ENV: test | prod
PTREE_LOG_LEVEL: silly | debug | verbose | info | warn | error

POSTGRES_HOST
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_PORT
POSTGRES_DATABASE

**Create a new tree**

```
    import { Tree } from '@flowbuild/process-tree'

    const tree = new Tree(db)

    await tree.createTree(processId)

```

**Append a new node to existing tree**

```
   
    await tree.appendChild({ parentId: uuid, processId: uuid })

```

**Retrieve the path**

Any process from the thee will return all process from that tree.

```
   
    await tree.getPath(processId)

```