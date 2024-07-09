import express, { Application, urlencoded, json } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from "cors"
import { StatusCodes } from 'http-status-codes';


export const app: Application = express();


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());


app.get("/healthcheck", (req, res) => res.json({}));


app.get("/", ( _req: Request, res: Response ) => {
  return res.status(StatusCodes.OK).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});

app.get("/cookie", ( req: Request, res: Response ) => {
  const cookie = req.headers.cookie || "";
  if (cookie) {
    try {
      let jwt = "";
      cookie.split(";").forEach((item) => {
        const cookie = item.trim().split("=");
        if (cookie[0] === "jwt") {
          jwt = cookie[1];
        }
      });
      res.json({ jwt });
    } catch (e) {
      res.json({ jwt: "" });
    }
  } else {
    res.json({ jwt: "" });
  }
});

