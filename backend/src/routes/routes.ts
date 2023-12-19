import app from "../index";
import express, { Request, Response, Router } from "express";

import { User as UserGet } from "../methods/user/GET";
import { Expense as ExpenseGet } from "../methods/expense/GET";
import { Expense as ExpensePost } from "../methods/expense/POST";
import { Expense as ExpenseDelete } from "../methods/expense/DELETE";
import { Expense as ExpensePatch } from "../methods/expense/PATCH";
import { Total as ExpenseTotalUnpaid } from "../methods/expense/GET/total-unpaid";
import { Total as ExpenseTotalPaid } from "../methods/expense/GET/total-paid";

export const router:Router = express.Router(); 

router.get('/', (req: Request, res: Response) => {
    res.send('Bem-vindo à minha API TypeScript com Express!');
});

router.get('/user', UserGet);

router.get('/expense', ExpenseGet);
router.post('/expense', ExpensePost);
router.get('/expense/total-unpaid', ExpenseTotalUnpaid);
router.get('/expense/total-paid', ExpenseTotalPaid);
router.delete('/expense', ExpenseDelete);
router.patch('/expense', ExpensePatch);