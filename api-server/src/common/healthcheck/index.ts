import { Response, Request } from "express";

export const getHealth = (_req: Request, res: Response): void => {
  const data = {
    uptime: process.uptime(),
    message: "OK",
    date: new Date(),
  };

  res.status(200).send(data);
};
