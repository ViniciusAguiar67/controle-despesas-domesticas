export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
        Bem-vindo ao Controle de Despesas
      </h1>
      <p className="mb-6 max-w-xs" style={{ color: 'var(--foreground)' }}>
        Organize seus gastos facilmente e mantenha seu orçamento sob controle.
      </p>
      <a
        href="/expenses"
        aria-label="Ir para página de despesas"
        className="font-semibold px-5 py-2 rounded"
        style={{
          backgroundColor: 'var(--primary-color)',
          color: 'var(--foreground)',
        }}
      >
        Acessar Despesas
      </a>
    </main>
  );
}
