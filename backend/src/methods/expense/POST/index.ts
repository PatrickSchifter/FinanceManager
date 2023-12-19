import { Request, Response } from "express";
import { connectDB } from "../../../database/connect";

export const Expense = async (req: Request, res: Response) => {
    const {expense} = req.body;

    const query:string = `
        INSERT INTO expense (
            description, 
            amount, 
            date, 
            paid
        )
        VALUES 
        (
            '${expense.description}',
            ${expense.amount}, 
            '${expense.date}',
            ${expense.paid}
        )
    `
    
    const connection = await connectDB();
    try{
        await connection.query(query);
        res.status(200).json({data: {inserted: true}});
    }catch(error){
        res.status(500).json({error: error});
    }
}