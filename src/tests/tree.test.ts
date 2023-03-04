import { v1 } from "uuid";
import { Tree } from "../index";
import { db } from "./utils/db";

const tree = new Tree(db);

describe("## get root ###", () => {
  test("should return the root id", async () => {
    const response = await tree.getRoot("bbbdaaac-8529-41c7-8686-1e8e720b018d");
    expect(response?.rootId).toEqual("d19c8b6c-521f-4693-99ab-9e28ff766d2f");
  });

  test("should return empty if the process does not exist", async () => {
    const unknownId = v1();
    const response = await tree.getRoot(unknownId);
    expect(response.rootId).toBeUndefined();
  });
});

describe("## get path ###", () => {
  test("should return for the root id", async () => {
    const response = await tree.getPath("d19c8b6c-521f-4693-99ab-9e28ff766d2f");
    expect(response[0].rootId).toEqual("d19c8b6c-521f-4693-99ab-9e28ff766d2f");
    expect(response?.length).toEqual(3);
  });

  test("should return for any process id in the tree", async () => {
    const response = await tree.getPath("bbbdaaac-8529-41c7-8686-1e8e720b018d");
    expect(response[0].rootId).toEqual("d19c8b6c-521f-4693-99ab-9e28ff766d2f");
    expect(response?.length).toEqual(3);
  });
});

describe("## create new tree ###", () => {
  test("should work", async () => {
    const rootId = v1()
    const response = await tree.createTree(rootId);
    expect(response.rootId).toEqual(rootId);
  });

  test("should return error for an existing process id", async () => {
    const response = await tree.createTree("d19c8b6c-521f-4693-99ab-9e28ff766d2f");
    expect(response.message).toBeDefined();
    expect(response.rootId).toBeUndefined();
  });
});

describe("## append process to existing tree ###", () => {
  test("should work", async () => {
    const processId = v1()
    const child = {
      parentId: '7668ab10-b9df-11ed-93d4-7bcefd8902d1',
      processId
    }
    const response = await tree.appendChild(child);
    expect(response.processId).toEqual(processId);
    expect(response.rootId).toEqual('7668ab10-b9df-11ed-93d4-7bcefd8902d1');
  });

  test("should return error for an existing process id", async () => {
    const child = {
      parentId: '7668ab10-b9df-11ed-93d4-7bcefd8902d1',
      processId: "d19c8b6c-521f-4693-99ab-9e28ff766d2f"
    }
    const response = await tree.appendChild(child);
    expect(response.message).toBeDefined();
    expect(response.rootId).toBeUndefined();
  });
});