import express from "express";
import { open } from "sqlite";
import { Database } from "sqlite3";
import router from "./router";
import logging from "./logging";

const app = express(),
    port = process.env.PORT || 3000;

app.use(express.json({
    strict: true,
    type: "application/json"
}));

app.use(logging);
app.use("/api/v1", router);

app.listen(port, async function() {
    const database = await open({
        filename: "films.sqlite",
        driver: Database
    });

    await database.exec(`CREATE TABLE IF NOT EXISTS films (
        imdb_id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        tagline TEXT NOT NULL,
        overview TEXT NOT NULL,
        release_date TEXT NOT NULL,
        runtime INTEGER NOT NULL
    );`);

    await database.exec(`CREATE TABLE IF NOT EXISTS genres (
        imdb_id TEXT NOT NULL,
        name TEXT NOT NULL,
        PRIMARY KEY (imdb_id,name),
        FOREIGN KEY (imdb_id) REFERENCES films(imdb_id)
    );`);

    console.log("Server running on port", port);
});
