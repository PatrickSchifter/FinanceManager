import { Request, Response } from "express";
import { connectDB } from "../../../database/connect";

export const Expense = async (req: Request, res: Response) => {
    const initialDate = req.query.inital_date;
    const finalDate = req.query.final_date;
    const connection = await connectDB();
    try{
        if(initialDate && finalDate){
            const getExpense = await connection.query(`select * from public.expense WHERE date >= '${initialDate}' AND date <= '${finalDate}' ORDER BY date;`);
            res.status(200).json({data: getExpense.rows});
        }else{
            const getExpense = await connection.query(`select * from public.expense ORDER BY date;`);
            res.status(200).json({data: getExpense.rows});
        }
    }catch(error){
        res.status(500).json({error: error})
    }
    connection.end();
}