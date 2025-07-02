import { PaymentTypeRepository } from '../repositories/PaymentTypeRepository';

export class PaymentTypeService {
  async getAllPaymentTypes() {
    return await new PaymentTypeRepository().getAllPaymentTypes();
  }

  async getPaymentTypeById(id: number) {
    const paymentType = await new PaymentTypeRepository().getPaymentTypeById(id);
    if (!paymentType) {
      throw new Error('Tipo de pagamento não encontrado');
    }
    return paymentType;
  }
}
