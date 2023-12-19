import { Request, Response } from "express";
import { connectDB } from "../../../database/connect";

export const Expense = async (req: Request, res: Response) => {
    const {expense} = req.body;

    const query:string = `
        UPDATE expense 
        SET paid = ${expense.paid} 
        WHERE idexpense = ${expense.idexpense}
    `
    const connection = await connectDB();
    try{
        await connection.query(query);
        res.status(200).json({data: {inserted: true}});
    }catch(error){
        res.status(500).json({error: error});
    }
    connection.end();
}