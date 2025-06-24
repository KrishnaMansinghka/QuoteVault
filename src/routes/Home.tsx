import { For } from 'solid-js';
import { useQuotes } from '../hooks/useQuotes';
import AddDialog from '../components/AddDialog';
import QuoteCard from '../components/QuoteCard';
import ThemeToggle from '../components/ThemeToggle';
import { useSearch } from '../hooks/useSearch';

const Home = () => {
  const { quotesQuery } = useQuotes();
  const { query, setQuery, results } = useSearch(() => quotesQuery.data || []);

  return (
    <main class="p-4">
      <header class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Quote Vault</h1>
        <div class="flex items-center gap-2">
          <input
            type="search"
            class="border px-2 py-1"
            placeholder="Search"
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
          <ThemeToggle />
        </div>
      </header>
      <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        <For each={results()}>{(q) => <QuoteCard quote={q} />}</For>
      </div>
      <AddDialog />
    </main>
  );
};
export default Home;
