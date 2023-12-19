import { Request, Response } from "express";
import { connectDB } from "../../../../database/connect";

export const Total = async (req: Request, res: Response) => {

    const month = req.query.month;

    const connection = await connectDB();
    const getExpense = await connection.query(`SELECT SUM(amount) as total FROM expense WHERE paid = true AND date >= '${month + '-01'}' AND date < ('${month + '-01'}'::date + INTERVAL '1 month');`)
    res.status(200).json({data: getExpense.rows});
    connection.end();
}