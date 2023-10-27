import { Router } from "express";
import { getAllLaunches } from "./controllers";

const router = Router();

router.get("/launches", getAllLaunches);

export { router as launchesRouter };
