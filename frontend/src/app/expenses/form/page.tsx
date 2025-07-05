'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createExpense, getExpenseById, updateExpense } from '@/services/expenses';
import { getAllCategories } from '@/services/categories';
import { getAllPaymentTypes } from '@/services/paymentTypes';

type FormData = {
  description: string;
  value: string;
  date: string;
  categoryId: string;
  paymentTypeId: string;
  location: {
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    zipCode: string;
  };
};

export default function ExpenseForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState<FormData>({
    description: '',
    value: '',
    date: '',
    categoryId: '',
    paymentTypeId: '',
    location: {
      address: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
      zipCode: ''
    }
  });

  const [fieldsBlocked, setFieldsBlocked] = useState({
    address: false,
    neighborhood: false,
    city: false,
    state: false,
    complement: false,
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<{ id: number; type: string }[]>([]);

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Função para formatar CEP para 00000-000
  function formatCep(value: string): string {
    const onlyNums = value.replace(/\D/g, '');
    if (onlyNums.length <= 5) return onlyNums;
    return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`;
  }

  useEffect(() => {
    if (id) {
      getExpenseById(Number(id)).then((data) => {
        setFormData({
          ...data,
          value: Number(data.value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          location: {
            ...data.location,
            zipCode: formatCep(data.location.zipCode || ''),
          }
        });
      });
    }
  }, [id]);

  useEffect(() => {
    async function fetchLists() {
      const resCats = await getAllCategories();
      const resPayments = await getAllPaymentTypes();

      setCategories(resCats.data);
      setPaymentTypes(resPayments.data);
    }
    fetchLists();
  }, []);

  async function handleCepBlur() {
    const cep = formData.location.zipCode.replace(/\D/g, '');
    if (cep.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          address: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || '',
          complement: data.complemento || '',
          zipCode: formatCep(cep),
        },
      }));

      setFieldsBlocked({
        address: true,
        neighborhood: true,
        city: true,
        state: true,
        complement: true,
      });
    } catch (err) {
      console.error('Erro ao buscar CEP', err);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // Aplica máscara no zipCode durante digitação
    if (name === 'zipCode') {
      value = formatCep(value);
    }

    // Limpa o erro do campo ao modificar
    setErrors((prev) => ({ ...prev, [name]: false }));

    if (name in formData.location) {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, value: false }));
    setFormData((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  const handleValueBlur = () => {
    const cleanedValue = formData.value.replace(/[^\d.,]/g, '').replace(',', '.');
    const numericValue = Number(cleanedValue);
    if (!isNaN(numericValue)) {
      setFormData((prev) => ({
        ...prev,
        value: numericValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, boolean> = {};

    if (!formData.description.trim()) newErrors.description = true;
    if (!formData.value.trim()) newErrors.value = true;
    if (!formData.date.trim()) newErrors.date = true;
    if (!formData.categoryId) newErrors.categoryId = true;
    if (!formData.paymentTypeId) newErrors.paymentTypeId = true;
    if (!formData.location.zipCode.trim()) newErrors.zipCode = true;
    if (!formData.location.state.trim()) newErrors.state = true;
    if (!formData.location.city.trim()) newErrors.city = true;
    if (!formData.location.neighborhood.trim()) newErrors.neighborhood = true;
    if (!formData.location.address.trim()) newErrors.address = true;
    if (!formData.location.number.trim()) newErrors.number = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) element.focus();
      return;
    }

    const cleanedValue = formData.value.replace(/[^\d,.-]/g, '').replace(',', '.');
    const numericValue = parseFloat(cleanedValue);

    const payload = {
      ...formData,
      value: numericValue,
    };

    if (id) {
      await updateExpense(Number(id), payload);
    } else {
      await createExpense(payload);
    }
    router.push('/expenses');
  };

  const inputClass = (fieldName: string) =>
    `border rounded-md p-2 w-full ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <form 
      onSubmit={handleSubmit} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }} 
      className="p-4 space-y-6"
    >
      <h1 className="text-xl font-bold text-center" style={{ color: 'var(--primary-color)' }}>
        {id ? 'EDITAR' : 'CADASTRAR'}
      </h1>

      <h3 className="font-bold mt-4" style={{ color: 'var(--primary-color)' }}>Dados da Despesa:</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          className={inputClass('description')}
        />

        <input
          name="value"
          value={formData.value}
          onChange={handleValueChange}
          onBlur={handleValueBlur}
          placeholder="Valor"
          type="text"
          className={inputClass('value')}
        />

        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          className={inputClass('date')}
        />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={inputClass('categoryId')}
        >
          <option value="">Selecione a Categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          name="paymentTypeId"
          value={formData.paymentTypeId}
          onChange={handleChange}
          className={inputClass('paymentTypeId')}
        >
          <option value="">Selecione o Tipo de Pagamento</option>
          {paymentTypes.map((pt) => (
            <option key={pt.id} value={pt.id}>
              {pt.type}
            </option>
          ))}
        </select>
      </div>

      <br />
      <h3 className="font-bold mt-4" style={{ color: 'var(--primary-color)' }}>Dados do Endereço:</h3>

      <input
        name="zipCode"
        value={formData.location.zipCode}
        onChange={handleChange}
        onBlur={(e) => {
          if (e.relatedTarget === null) return;
          handleCepBlur();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleCepBlur();
          }
        }}
        placeholder="CEP"
        maxLength={9}
        className={inputClass('zipCode')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          name="state"
          value={formData.location.state}
          onChange={handleChange}
          placeholder="Estado"
          className={inputClass('state')}
          disabled={fieldsBlocked.state}
        />
        <input
          name="city"
          value={formData.location.city}
          onChange={handleChange}
          placeholder="Cidade"
          className={inputClass('city')}
          disabled={fieldsBlocked.city}
        />
        <input
          name="neighborhood"
          value={formData.location.neighborhood}
          onChange={handleChange}
          placeholder="Bairro"
          className={inputClass('neighborhood')}
          disabled={fieldsBlocked.neighborhood}
        />
        <input
          name="number"
          value={formData.location.number}
          onChange={handleChange}
          placeholder="Número"
          className={inputClass('number')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="address"
          value={formData.location.address}
          onChange={handleChange}
          placeholder="Endereço"
          className={inputClass('address')}
          disabled={fieldsBlocked.address}
        />
        <input
          name="complement"
          value={formData.location.complement}
          onChange={handleChange}
          placeholder="Complemento"
          className="border border-gray-300 rounded-md p-2 w-full"
          disabled={fieldsBlocked.complement}
        />
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Voltar
        </button>

        <button
          type="submit"
          style={{ backgroundColor: 'var(--primary-color)' }}
          className="text-white px-4 py-2 rounded hover:brightness-90"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
