import "dotenv/config";
import express, { Router } from "express";
import cors from "cors";
import { launchesRouter } from "./features/launches";
import { httpLoggingMiddleware } from "./common/logging";

const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(httpLoggingMiddleware);

const RouterV1 = Router();
app.use("/api/v1", RouterV1);

RouterV1.use(launchesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
