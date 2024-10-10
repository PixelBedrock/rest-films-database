// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from "express";
import getFilm from "./routes/getFilm";
import postFilm from "./routes/postFilm";
import deleteFilm from "./routes/deleteFilm";
import patchFilm from "./routes/patchFilm";

const router = Router();

router.delete("/films/:id", deleteFilm);
router.get("/films/:id", getFilm);
router.patch("/films/:id", patchFilm);
router.post("/films", postFilm);

export default router;
