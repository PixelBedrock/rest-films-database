import { Request, Response } from "express";
import { open } from "sqlite";
import { Database } from "sqlite3";
import SQL from "sql-template-strings";

export default async function(req: Request, res: Response) {
    const database = await open({
        filename: "films.sqlite",
        driver: Database
    }),
        query = await database.get(SQL`SELECT * FROM films WHERE imdb_id=${req.params.id};`);

    if (!query) {
        return res.status(404).json({
            message: "Film does not exist",
        });
    }

    return res.status(200).json({
        ...query,
        genres: JSON.parse(query.genres)
    });
}
