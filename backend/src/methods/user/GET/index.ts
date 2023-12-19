import { Request, Response } from "express";
import { connectDB } from "../../../database/connect";

export const User = async (req: Request, res: Response) => {
    const connection = await connectDB();
    const getUser = await connection.query('select * from public.user;')
    res.status(200).json({data: getUser.rows})
}