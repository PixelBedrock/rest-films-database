import { Request, Response } from "express";
import { open } from "sqlite";
import { Database } from "sqlite3";
import SQL from "sql-template-strings";

export default async function(req: Request, res: Response) {
    const database = await open({
        filename: "films.sqlite",
        driver: Database
    });

    await database.get(SQL`DELETE FROM films WHERE imdb_id=${req.params.id};`);
    await database.get(SQL`DELETE FROM genres WHERE imdb_id=${req.params.id};`);

    return res.sendStatus(204);
}
