import assert from "assert";
import {FileAttachments} from "../src/index.mjs";

it("FileAttachments is exported by stdlib", () => {
  assert.strictEqual(typeof FileAttachments, "function");
  assert.strictEqual(FileAttachments.name, "FileAttachments");
});

it("FileAttachment ensures that URLs are strings", async () => {
  const FileAttachment = FileAttachments((name) =>
    new URL(`https://example.com/${name}.js`)
  );
  const file = FileAttachment("filename");
  assert.strictEqual(file.constructor.name, "FileAttachment");
  assert.strictEqual(await file.url(), "https://example.com/filename.js");
});

it("FileAttachment returns instances of FileAttachment", async () => {
  const FileAttachment = FileAttachments((name) =>
    new URL(`https://example.com/${name}.js`)
  );
  const file = FileAttachment("filename");
  assert.ok(file instanceof FileAttachment);
});

it("FileAttachment cannot be used as a constructor", async () => {
  const FileAttachment = FileAttachments((name) =>
    new URL(`https://example.com/${name}.js`)
  );
  assert.throws(() => new FileAttachment("filename"), /FileAttachment is not a constructor/);
});

it("FileAttachment works with Promises that resolve to URLs", async () => {
  const FileAttachment = FileAttachments(async (name) =>
    new URL(`https://example.com/${name}.js`)
  );
  const file = FileAttachment("otherfile");
  assert.strictEqual(file.constructor.name, "FileAttachment");
  assert.strictEqual(await file.url(), "https://example.com/otherfile.js");
});
