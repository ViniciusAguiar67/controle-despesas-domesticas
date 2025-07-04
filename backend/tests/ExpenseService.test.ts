import { ExpenseService } from '../src/services/ExpenseService';

const mockExpenses = [
    { id: 1, description: 'Conta de Luz', value: 125, date: '2025-07-01', locationId: 1, paymentTypeId: 1, categoryId: 2 },
    { id: 2, description: 'Compras no Supermercado', value: 400, date: '2025-07-02', locationId: 2, paymentTypeId: 2, categoryId: 1 },
    { id: 3, description: 'Manutenção', value: 250, date: '2025-07-03', locationId: 3, paymentTypeId: 4, categoryId: 2 },
];

const mockLocation = [
    { id: 1, address: 'Rua Benedito Dias', number: '10', neighborhood: 'Jardim Santa Teresa', city: 'Mogi das Cruzes', state: 'SP', complement: null, zipCode: '08743380' },
    { id: 2, address: 'Rua Sapucaia', number: '20', neighborhood: 'Jardim Layr', city: 'Mogi das Cruzes', state: 'SP', complement: null, zipCode: '08760410' },
    { id: 3, address: 'Rua Prefeito Aldo Raso', number: '30', neighborhood: 'Alto Ipiranga', city: 'Mogi das Cruzes', state: 'SP', complement: null, zipCode: '08730370' },
];

const mockPaymentType = [
    { id: 1, type: 'Dinheiro' },
    { id: 2, type: 'Débito' },
    { id: 3, type: 'Crédito' },
    { id: 4, type: 'Pix' },
];

const mockCategory = [
    { id: 1, name: 'Alimentação' },
    { id: 2, name: 'Moradia' },
    { id: 3, name: 'Educação' },
]

jest.mock('../src/repositories/ExpenseRepository', () => ({
  ExpenseRepository: jest.fn().mockImplementation(() => ({
    getAllExpenses: jest.fn().mockResolvedValue(mockExpenses),
    getExpenseById: jest.fn((id: number) => Promise.resolve(mockExpenses.find(e => e.id === id))),
    createExpense: jest.fn((data: any) => Promise.resolve({ id: 99, ...data })),
    updateExpense: jest.fn(() => Promise.resolve()),
    deleteExpense: jest.fn(() => Promise.resolve()),
  })),
}));

jest.mock('../src/services/LocationService', () => ({
  LocationService: jest.fn().mockImplementation(() => ({
    getLocationById: jest.fn().mockResolvedValue(mockLocation),
    createLocation: jest.fn().mockResolvedValue(1),
    updateLocation: jest.fn().mockResolvedValue(undefined),
    deleteLocation: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock('../src/services/PaymentTypeService', () => ({
  PaymentTypeService: jest.fn().mockImplementation(() => ({
    getPaymentTypeById: jest.fn().mockResolvedValue(mockPaymentType),
  })),
}));

jest.mock('../src/services/CategoryService', () => ({
  CategoryService: jest.fn().mockImplementation(() => ({
    getCategoryById: jest.fn().mockResolvedValue(mockCategory),
  })),
}));

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(() => {
    service = new ExpenseService();
  });

  test('deve retornar despesas paginadas', async () => {
    const page = 1;
    const pageSize = 2;

    const result = await service.getAllExpenses(page, pageSize);

    expect(result).toHaveProperty('expenses');
    expect(result).toHaveProperty('pagination');
    expect(result.expenses.length).toBe(pageSize);
    expect(result.pagination).toMatchObject({
      page,
      pageSize,
      total: mockExpenses.length,
      pageCount: Math.ceil(mockExpenses.length / pageSize),
    });
  });

  test('deve retornar despesa correta', async () => {
    const expense = await service.getExpenseById(1);

    expect(expense).toHaveProperty('id', 1);
    expect(expense).toHaveProperty('location', mockLocation);
    expect(expense).toHaveProperty('paymentType', mockPaymentType);
    expect(expense).toHaveProperty('category', mockCategory);
  });

  test('lança erro para despesa inexistente', async () => {
    await expect(service.getExpenseById(999)).rejects.toThrow('Despesa não encontrada');
  });

  test('deve criar uma despesa', async () => {
    const data = {
      description: 'Nova despesa',
      value: 100,
      date: '2025-07-10',
      categoryId: 3,
      paymentTypeId: 4,
      location: { address: 'Avenida Kennedy', number: '10', neighborhood: 'Jardim Bela Vista', city: 'Mogi das Cruzes', state: 'SP', complement: null, zipCode: '08820180' }
    };

    const created = await service.createExpense(data);

    expect(created).toHaveProperty('id');
    expect(created.description).toBe(data.description);
  });

  test('lança erro para dados incompletos', async () => {
    await expect(service.createExpense({})).rejects.toThrow('Alguns dados da despesa não foram preenchidos');
  });

  test('deve atualizar despesa', async () => {
    const updateData = {
      description: 'Mensalidade Escolar',
      value: 900,
      date: '2025-07-11',
      categoryId: 1,
      paymentTypeId: 1,
      location: { address: 'Rua Atualizada', number: '20', neighborhood: 'Bairro', city: 'Cidade', state: 'Estado', complement: '', zipCode: '11111' }
    };

    const updated = await service.updateExpense(1, updateData);

    expect(updated).toHaveProperty('id', 1);
    expect(updated.description).toBe(updateData.description);
    expect(updated.location).toEqual(mockLocation);
    expect(updated.paymentType).toEqual(mockPaymentType);
    expect(updated.category).toEqual(mockCategory);
  });

  test('lança erro para despesa inexistente', async () => {
    await expect(service.updateExpense(999, {})).rejects.toThrow('Despesa não encontrada');
  });

  test('lança erro para dados incompletos', async () => {
    await expect(service.updateExpense(1, {})).rejects.toThrow('Alguns dados da despesa não foram preenchidos');
  });

  test('deve deletar despesa e localização', async () => {
    const deletedId = await service.deleteExpense(1);
    expect(deletedId).toBe(1);
  });

  test('lança erro para despesa inexistente', async () => {
    await expect(service.deleteExpense(999)).rejects.toThrow('Despesa não encontrada');
  });
});
