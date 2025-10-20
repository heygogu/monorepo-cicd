import express from "express"
import { prisma } from "@repo/db/client";
import { authMiddleware, RequestWithUserId } from "../middlewares/auth.js";

export const todoRouter: express.Router = express.Router();

todoRouter.get("/", (req, res) => {
    res.json({
        message: "You are hitting the todo route"
    })
})

todoRouter.post("/create", authMiddleware, async (req, res) => {
    const { task } = req.body;
    const userId = (req as RequestWithUserId).userId;
    try {
        await prisma.todo.create({
            data: {
                task,
                userId
            }
        })
    } catch (error) {
        res.json({
            message: "Something went wrong while adding the todo"
        })
    }
})

todoRouter.get("/get:id", authMiddleware, async (req, res) => {
    const userId = (req as RequestWithUserId).userId;
    const id = req.params.id;
    try {
        const todo = await prisma.todo.findOne({
            data: {
                id
            }
        })

        res.json({
            todo
        })
    } catch (error) {
        res.json({
            message: "Todo does not exist"
        })
    }
})

