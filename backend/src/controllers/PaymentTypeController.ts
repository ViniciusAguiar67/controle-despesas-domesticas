import { Request, Response } from 'express';
import { PaymentTypeService } from '../services/PaymentTypeService';

const paymentTypeService = new PaymentTypeService();

class PaymentTypeController {
    async getAllPaymentTypes(req: Request, res: Response) {
        try {
            const types = await paymentTypeService.getAllPaymentTypes();
            res.status(200).json({ data: types, success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message, success: false });
        }
    }
}

export { PaymentTypeController };