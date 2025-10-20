import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

export interface RequestWithUserId extends Request {
    userId: string
}
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers.authorization;

    const token = headers?.split(" ")[1];
    if (!token) {
        return res.status(400).json({
            message: "invalid request"
        })
    }

    try {
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

        (req as RequestWithUserId).userId = decoded.userId

        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid request"
        })
    }
}