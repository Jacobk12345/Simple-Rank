# Server data models

The server uses SQLite through `better-sqlite3`. The database is stored in
`server/data.sqlite`; its tables are initialized when `database.js` is loaded.

To add a model:

1. Add its table definition to the schema in `database.js`.
2. Create `models/<name>.js` using `createModel` from `model.js`, passing the
   table name and the model's writable fields.
3. Import the model wherever it is needed.

Models provide `findAll()`, `findById(id)`, `create(data)`, `update(id, data)`,
and `delete(id)`. SQL values are parameterized, and create/update only accept
fields declared by the model.

Run the model tests with `npm test` from the `server` directory.
