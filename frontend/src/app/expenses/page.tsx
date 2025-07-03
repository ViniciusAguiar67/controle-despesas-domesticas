'use client';

import { useEffect, useState } from 'react';
import { getAllExpenses } from '@/services/expenses';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  async function fetchData() {
    const response = await getAllExpenses(page);
    setExpenses(response.data.expenses);       
    setTotalPages(response.data.pagination.pageCount);  
  }
  fetchData();
}, [page]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold" style={{ color: 'var(--primary-color)' }}>DESPESAS</h1>
        <Link
            href="/expenses/form"
            className="text-white px-4 py-2 rounded"
            style={{ backgroundColor: 'var(--primary-color)' }}
        >
            Nova Despesa
        </Link>
      </div>
      <Table expenses={expenses} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}