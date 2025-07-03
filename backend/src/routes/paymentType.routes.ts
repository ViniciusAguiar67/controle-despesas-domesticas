import { Router } from 'express';
import { PaymentTypeController } from '../controllers/PaymentTypeController';

const paymentTypeController = new PaymentTypeController();

const router = Router();

router.get('/', paymentTypeController.getAllPaymentTypes);

export default router;
