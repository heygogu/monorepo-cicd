import { prisma } from "@repo/db/client";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
    //do some auth here

    ws.on("message", async (raw) => {
        console.log("this is the raw message", raw)
        let data: string = "";

        if (typeof raw != "string") {
            data = JSON.stringify(raw);
        }

        await prisma.user.create({
            data: {
                username: Math.random().toString(),
                password: Math.random().toString()
            }
        })

        ws.send(JSON.stringify({
            message: data
        }))
    })
})

console.log("WS server running on ws://localhost:8080");