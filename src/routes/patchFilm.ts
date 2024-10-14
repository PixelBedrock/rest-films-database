import { Request, Response } from "express";
import { open } from "sqlite";
import { Database } from "sqlite3";
import SQL from "sql-template-strings";
import patchSchema from "../schemas/patchSchema";

export default async function(req: Request, res: Response) {
    try {
        const database = await open({
            filename: "films.sqlite",
            driver: Database
        });

        if (!patchSchema(req.body).valid) {
            return res.status(400).json({
                message: "Missing fields in request body"
            });
        }

        await database.run(SQL`UPDATE films SET title=${req.body.title}, tagline=${req.body.tagline}, overview=${req.body.overview}, release_date=${req.body.release_date}, runtime=${req.body.runtime} WHERE imdb_id=${req.params.id};`);
        await database.get(SQL`DELETE FROM genres WHERE imdb_id=${req.params.id};`);
        req.body.genres.forEach(async function(genre) {
            await database.run(SQL`INSERT INTO genres VALUES (${req.params.id}, ${genre})`);
        });

        return res.status(200).json(req.body);
    } catch (e) {
        if (e.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({
                message: "A film with that ID already exists"
            });
        }

        return res.status(500).json({
            message: e.message
        });
    }
}
