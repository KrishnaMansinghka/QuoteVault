import { For } from 'solid-js';
import { useQuotes } from '../hooks/useQuotes';
import AddDialog from '../components/AddDialog';
import QuoteCard from '../components/QuoteCard';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  const { quotesQuery } = useQuotes();

  return (
    <main class="p-4">
      <header class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Quote Vault</h1>
        <ThemeToggle />
      </header>
      <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        <For each={quotesQuery.data || []}>{(q) => <QuoteCard quote={q} />}</For>
      </div>
      <AddDialog />
    </main>
  );
};
export default Home;
