const assert = require("node:assert/strict");
const test = require("node:test");
const Database = require("better-sqlite3");
const createModel = require("../model");

test("model supports create, read, update, and delete", () => {
    const db = new Database(":memory:");
    db.exec(`
        CREATE TABLE entries (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )
    `);
    const Entry = createModel(db, { table: "entries", fields: ["name"] });

    const created = Entry.create({ name: "Team 1" });
    assert.deepEqual(created, { id: 1, name: "Team 1" });
    assert.deepEqual(Entry.findAll(), [created]);
    assert.deepEqual(Entry.findById(created.id), created);
    assert.deepEqual(Entry.update(created.id, { name: "Team 2" }), {
        id: 1,
        name: "Team 2",
    });
    assert.equal(Entry.delete(created.id), true);
    assert.equal(Entry.findById(created.id), null);
    assert.equal(Entry.delete(created.id), false);

    db.close();
});

test("model rejects fields not declared in its definition", () => {
    const db = new Database(":memory:");
    db.exec("CREATE TABLE entries (id INTEGER PRIMARY KEY, name TEXT NOT NULL)");
    const Entry = createModel(db, { table: "entries", fields: ["name"] });

    assert.throws(() => Entry.create({ name: "Team 1", admin: true }), {
        message: "Model data contains an unknown field",
    });
    db.close();
});
