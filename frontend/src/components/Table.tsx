'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteExpense } from '@/services/expenses';

export default function Table({ expenses }: { expenses: any[] }) {
  const router = useRouter();
  const [listExpenses, setExpenseList] = useState(expenses || []);

  // Sincroniza a lista de despesas
  useEffect(() => {
    if (Array.isArray(expenses)) {
      setExpenseList(expenses);
    } else {
      setExpenseList([]);
    }
  }, [expenses]);

  // Função para deletar despesa
  const handleDelete = async (id: number) => {
    const confirmar = confirm('Tem certeza que deseja deletar está despesa?');
    if (!confirmar) return;
    try {
      await deleteExpense(id);
      setExpenseList((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      alert('Erro ao deletar despesa.');
      console.error(error);
    }
  };

  return (
    <table className="w-full border" style={{ borderColor: 'var(--primary-color)' }}>
      <thead>
        <tr className="bg-orange-100">
          <th className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>Descrição</th>
          <th className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>Valor</th>
          <th className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>Data</th>
          <th className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>Categoria</th>
          <th className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>Tipo Pagamento</th>
          <th className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>Endereço</th>
          <th className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {listExpenses.map((item) => (
          <tr key={item.id} className="border-2 hover:bg-gray-300 dark:hover:bg-gray-700" style={{ borderColor: 'var(--primary-color)' }}>
            <td className="border p-2" style={{ borderColor: 'var(--primary-color)' }}>
              {item.description}
            </td>
            <td className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>
              {Number(item.value).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
            <td className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>{new Date(item.date).toLocaleDateString()}</td>
            <td className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>{item.category?.name}</td>
            <td className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>{item.paymentType?.type}</td>
            <td className="border-2 p-2" style={{ borderColor: 'var(--primary-color)' }}>
              {item.location?.address}, {item.location?.number} - {item.location?.city}/{item.location?.state}
            </td>
            <td className="p-2 flex gap-2 justify-center">
              <button
                onClick={() => router.push(`/expenses/form?id=${item.id}`)}
                aria-label="Visualizar"
                className="text-blue-600 hover:text-blue-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                aria-label="Deletar"
                className="text-red-600 hover:text-red-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}