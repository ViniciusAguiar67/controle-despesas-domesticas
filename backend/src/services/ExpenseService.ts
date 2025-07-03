import { ExpenseRepository } from '../repositories/ExpenseRepository';
import { LocationService } from './LocationService';
import { PaymentTypeService } from './PaymentTypeService';
import { CategoryService } from './CategoryService';

class ExpenseService {
    async getAllExpenses(page: number, pageSize: number) {
        const expenses = await new ExpenseRepository().getAllExpenses();

        const location = new LocationService();
        const payment = new PaymentTypeService();
        const category = new CategoryService();

        let list = [];

        for(const e of expenses) {
            const loc = await location.getLocationById(e.locationId);
            const pay = await payment.getPaymentTypeById(e.paymentTypeId);
            const cat = await category.getCategoryById(e.categoryId);
      
            list.push({
                id: e.id,
                description: e.description,
                value: e.value,
                date: e.date,
                location: loc,
                paymentType: pay,
                category: cat
            });
        }

        const total = list.length;
        const pageInt = page;
        const pageSizeInt = pageSize;
        const pageCount = Math.ceil(total / pageSizeInt);
        const startIndex = (pageInt - 1) * pageSizeInt;
        const paginatedData = list.slice(startIndex, startIndex + pageSizeInt);

        return {
            expenses: paginatedData,
            pagination: {
                page: pageInt,
                pageSize: pageSizeInt,
                pageCount,
                total
            }
        };
    }

    async getExpenseById(id: number) {
        const expense = await new ExpenseRepository().getExpenseById(id);
          
        if (!expense) {
            throw new Error('Despesa não encontrada');
        }

        const locationService = new LocationService();
        const categoryService = new CategoryService();
        const paymentTypeService = new PaymentTypeService();

        const updatedLocation = await locationService.getLocationById(expense.locationId);
        const updatedCategory = await categoryService.getCategoryById(expense.categoryId);
        const updatedPayment = await paymentTypeService.getPaymentTypeById(expense.paymentTypeId);

        return {
            id: expense.id,
            description: expense.description,
            value: expense.value,
            date: expense.date,
            location: updatedLocation,
            paymentType: updatedPayment,
            category: updatedCategory,
        };
    }

    async createExpense(data: any) {
        const { location, ...expenseData } = data;

        if (!expenseData.description || expenseData.value <= 0 || !expenseData.date || !expenseData.categoryId || !expenseData.paymentTypeId) {
            throw new Error('Alguns dados da despesa não foram preenchidos');
        }

        const categoryService = new CategoryService();
        const paymentTypeService = new PaymentTypeService();

        await categoryService.getCategoryById(expenseData.categoryId);
        await paymentTypeService.getPaymentTypeById(expenseData.paymentTypeId);

        const locationService = new LocationService();
        const locationId = await locationService.createLocation(location);

        const expenseToCreate = { ...expenseData, locationId };

        return await new ExpenseRepository().createExpense(expenseToCreate);
    }

    async updateExpense(id: number, data: any) {
        const existing = await new ExpenseRepository().getExpenseById(id);

        if (!existing) {
            throw new Error('Despesa não encontrada');
        }

        const {
            description,
            value,
            date,
            categoryId,
            paymentTypeId,
            location,
        } = data;

        if (!description || value <= 0 || !date || !categoryId || !paymentTypeId || !location) {
            throw new Error('Alguns dados da despesa não foram preenchidos');
        }

        const categoryService = new CategoryService();
        const paymentTypeService = new PaymentTypeService();

        await categoryService.getCategoryById(categoryId);
        await paymentTypeService.getPaymentTypeById(paymentTypeId);

        const locationService = new LocationService();
        await locationService.updateLocation(existing.locationId, location);

        const expenseToUpdate = {
            description,
            value,
            date,
            categoryId,
            paymentTypeId,
            locationId: existing.locationId, 
        };

        await new ExpenseRepository().updateExpense(id, expenseToUpdate);

        const updatedLocation = await locationService.getLocationById(existing.locationId);
        const updatedCategory = await categoryService.getCategoryById(categoryId);
        const updatedPayment = await paymentTypeService.getPaymentTypeById(paymentTypeId);

        return {
            id,
            description,
            value,
            date,
            location: updatedLocation,
            paymentType: updatedPayment,
            category: updatedCategory,
        };
    }

    async deleteExpense(id: number) {
        const existing = await new ExpenseRepository().getExpenseById(id);

        if (!existing) {
            throw new Error('Despesa não encontrada');
        }

        const locationId = existing.locationId;  
        await new ExpenseRepository().deleteExpense(id);     

        const locationService = new LocationService();
        await locationService.deleteLocation(locationId); 

        return id;
    }
}

export { ExpenseService };