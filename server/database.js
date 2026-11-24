const path = require("node:path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "data.sqlite"));

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

function createMatchesTable(tableName) {
    return `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER PRIMARY KEY,
            match_number TEXT NOT NULL,
            video_id TEXT,
            red_1 INTEGER,
            red_2 INTEGER,
            red_3 INTEGER,
            blue_1 INTEGER,
            blue_2 INTEGER,
            blue_3 INTEGER
        );
    `;
}

db.exec(`
    ${createMatchesTable("matches")}
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

const videoIdColumn = db.pragma("table_info(matches)")
    .find((column) => column.name === "video_id");

if (videoIdColumn.type.toUpperCase() !== "TEXT") {
    const migrateVideoIdToText = db.transaction(() => {
        db.exec("ALTER TABLE matches RENAME TO matches_legacy");
        db.exec(createMatchesTable("matches"));
        db.exec(`
            INSERT INTO matches (
                id, match_number, video_id,
                red_1, red_2, red_3, blue_1, blue_2, blue_3
            )
            SELECT
                id, match_number, CAST(video_id AS TEXT),
                red_1, red_2, red_3, blue_1, blue_2, blue_3
            FROM matches_legacy
        `);
        db.exec("DROP TABLE matches_legacy");
    });
    migrateVideoIdToText();
}

module.exports = db;
