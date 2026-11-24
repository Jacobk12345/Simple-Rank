const express = require("express");
const path = require("path");
const Entry = require("./models/entry");

const app = express();
const PORT = process.env.PORT || 3001;
const Match = require("./models/match");

app.get("/api/matches", (req, res) => {
    res.json(Match.findAll());
})

app.use(express.json());

function positiveInteger(value) {
    if (typeof value !== "string" && typeof value !== "number") {
        return null;
    }

    if (typeof value === "string" && value.trim() === "") {
        return null;
    }

    const parsed = Number(value);
    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

app.post("/api/matches", (req, res) => {
    const matchNumber = typeof req.body?.match_number === "string"
        ? req.body.match_number.trim()
        : "";
    const teamFields = ["red_1", "red_2", "red_3", "blue_1", "blue_2", "blue_3"];
    const teams = Object.fromEntries(
        teamFields.map((field) => [field, positiveInteger(req.body?.[field])])
    );

    if (!matchNumber || teamFields.some((field) => teams[field] === null)) {
        return res.status(400).json({
            error: "Match number and all six positive team numbers are required",
        });
    }

    const rawVideoId = req.body?.video_id;
    const hasVideoId = rawVideoId !== null
        && rawVideoId !== undefined
        && !(typeof rawVideoId === "string" && rawVideoId.trim() === "");

    if (hasVideoId && typeof rawVideoId !== "string") {
        return res.status(400).json({ error: "Video ID must be a string" });
    }
    const videoId = hasVideoId ? rawVideoId.trim() : null;

    const match = Match.create({
        match_number: matchNumber,
        video_id: videoId,
        ...teams,
    });
    return res.status(201).json(match);
});

app.delete("/api/matches", (req, res) => {
    res.json({ deletedCount: Match.deleteAll() });
});

app.delete("/api/matches/:id", (req, res) => {
    const matchId = positiveInteger(req.params.id);
    if (matchId === null) {
        return res.status(400).json({ error: "Match ID must be a positive integer" });
    }
    if (!Match.delete(matchId)) {
        return res.status(404).json({ error: "Match not found" });
    }

    return res.status(204).end();
});

app.get("/api/entries", (req, res) => {
    res.json(Entry.findAll());
});

app.post("/api/entries", (req, res) => {
    const name = req.body?.name?.trim();
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const entry = Entry.create({ name });
    res.status(201).json(entry);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("/{*path}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});