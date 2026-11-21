const db = require("../database");
const createModel = require("../model");

module.exports = createModel(db, {
    table: "matches",
    fields: [
        "match_number",
        "video_id",
        "red_1",
        "red_2",
        "red_3",
        "blue_1",
        "blue_2",
        "blue_3",
    ],
});
