import { Request, Response } from "express";
import { open } from "sqlite";
import { Database } from "sqlite3";
import SQL from "sql-template-strings";
import postSchema from "../schemas/postSchema";

export default async function(req: Request, res: Response) {
    try {
        const database = await open({
            filename: "films.sqlite",
            driver: Database
        });

        if (!postSchema(req.body).valid) {
            return res.status(400).json({
                message: "Missing fields in request body"
            });
        }

        await database.run(SQL`INSERT INTO films VALUES (
            ${req.body.imdb_id}, ${req.body.title}, ${req.body.tagline}, ${req.body.overview}, ${JSON.stringify(req.body.genres)}, ${req.body.release_date}, ${req.body.runtime}
        );`);

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
