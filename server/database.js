const path = require("node:path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "data.sqlite"));

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");
db.exec(`

    CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY,
        match_number TEXT NOT NULL,
        video_id INTEGER,
        red_1 INTEGER,
        red_2 INTEGER,
        red_3 INTEGER,
        blue_1 INTEGER,
        blue_2 INTEGER,
        blue_3 INTEGER
    );

    CREATE TABLE IF NOT EXISTS rankings (
        id INTEGER PRIMARY KEY,
        match_number TEXT NOT NULL,
        robot1 INTEGER,
        robot1_rank INTEGER,
        robot2 INTEGER,
        robot2_rank INTEGER,
        robot3 INTEGER,
        robot3_rank INTEGER
    );
`);

module.exports = db;
