import express from "express"
import { router } from "./routers/router.js"
import { prisma } from "@repo/db/client"

const app = express()

app.use(express.json())

app.use("/api/v1", router)

app.post("/", async (req, res) => {

    try {
        await prisma.user.create({
            data: {
                username: Math.random().toString(),
                password: Math.random().toString()
            }
        })

        res.json({
            message: "You have hit the backend and created a random user"
        })
    } catch (error) {

    }

})

app.listen(3001, () => {
    console.log("Server started at port 3001")
})