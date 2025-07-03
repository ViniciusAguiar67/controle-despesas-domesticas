interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex gap-2 mt-4 justify-center">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
        style={{ borderColor: 'var(--primary-color)' }}
      >
        Anterior
      </button>
      <span className="px-3 py-1">{page} / {totalPages}</span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
        style={{ borderColor: 'var(--primary-color)' }}
      >
        Próxima
      </button>
    </div>
  );
}
