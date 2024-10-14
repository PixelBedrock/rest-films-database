import { Request, Response } from "express";
import { open } from "sqlite";
import { Database } from "sqlite3";
import SQL from "sql-template-strings";

export default async function(req: Request, res: Response) {
    const database = await open({
        filename: "films.sqlite",
        driver: Database
    }),
        query = await database.all(SQL`SELECT * FROM films LEFT JOIN genres ON films.imdb_id=genres.imdb_id WHERE films.imdb_id=${req.params.id};`);

    if (query.length === 0) {
        return res.status(404).json({
            message: "Film does not exist",
        });
    }

    return res.status(200).json({
        ...query[0],
        genres: query.map((o) => o.name),
        name: undefined
    });
}
