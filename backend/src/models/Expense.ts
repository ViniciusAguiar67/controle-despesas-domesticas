export interface Expense {
    id?: number;
    description: string;
    value: number;
    date: Date;
    categoryId: number;
    locationId: number;
    paymentTypeId: number;
}