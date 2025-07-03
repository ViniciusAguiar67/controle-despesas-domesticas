import { Request, Response } from 'express';
import { CategoryService } from "../services/CategoryService";

const categoryService = new CategoryService();

class CategoryController {
    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json({ data: categories, success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message, success: false });
        }
    }
}

export { CategoryController };