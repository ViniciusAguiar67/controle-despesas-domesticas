import { Request, Response } from 'express';
import { ExpenseService } from '../services/ExpenseService';

const expenseService = new ExpenseService();

class ExpenseController {
    async getAllExpenses(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string);
            const pageSize = parseInt(req.query.pageSize as string);
            const expenses = await expenseService.getAllExpenses(page, pageSize);
            res.status(200).json({ data: expenses, success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message, success: false });
        }
    }

    async getExpenseById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const expense = await expenseService.getExpenseById(id);
            res.status(200).json({ data: expense, success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message, success: false });
        }
    }

    async createExpense(req: Request, res: Response) {
        try {
            const expense = await expenseService.createExpense(req.body);
            res.status(201).json({ data: expense, success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message, success: false });
        }
    }

    async updateExpense(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const expense = await expenseService.updateExpense(id, req.body);
            res.status(200).json({ data: expense, success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message, success: false });
        }
    }

    async deleteExpense(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const expense = await expenseService.deleteExpense(id);
            res.status(204).json({ data: expense, success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message, success: false });
        }
    }
}

export { ExpenseController };

