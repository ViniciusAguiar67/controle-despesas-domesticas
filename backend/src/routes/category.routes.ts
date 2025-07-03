import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const categoryController = new CategoryController();

const router = Router();

router.get('/', categoryController.getAllPaymentTypes);

export default router;
