import express from "express"
import { todoRouter } from "./todoRouter.js";

export const router: express.Router = express.Router();

router.use("/todos", todoRouter)