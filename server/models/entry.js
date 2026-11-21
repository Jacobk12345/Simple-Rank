const db = require("../database");
const createModel = require("../model");

module.exports = createModel(db, {
    table: "entries",
    fields: ["name"],
});
