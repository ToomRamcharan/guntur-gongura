import express from "express";
import { router as apiRouter } from "../src/api-routes.ts";

const app = express();

app.use(express.json());

// Mount the shared API router at the /api namespace
app.use("/api", apiRouter);

export default app;
