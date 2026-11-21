const db = require("../database");
const createModel = require("../model");

module.exports = createModel(db, {
    table: "rankings",
    fields: [
        "match_number",
        "robot1",
        "robot1_rank",
        "robot2",
        "robot2_rank",
        "robot3",
        "robot3_rank",
    ],
});
