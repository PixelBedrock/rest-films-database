import { Request, Response } from "express";

export default function(req: Request, _: Response, next: Function) {
    console.log(`${req.ip} - [${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} "${req.header("User-Agent")}"`);
    next();
}
