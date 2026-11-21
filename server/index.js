const express = require("express");
const path = require("path");
const Entry = require("./models/entry");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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