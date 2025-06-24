import { createQuery, createMutation, QueryClient } from '@tanstack/solid-query';
import db, { Quote } from '../db/dexie';

const queryClient = new QueryClient();

export function useQuotes() {
  const quotesQuery = createQuery(() => ({
    queryKey: ['quotes'],
    queryFn: async () => db.quotes.toArray()
  }));

  const addQuote = createMutation(() => ({
    mutationFn: async (q: Quote) => {
      await db.quotes.add({ ...q, createdAt: Date.now() });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quotes'] })
  }));

  const deleteQuote = createMutation(() => ({
    mutationFn: async (id: number) => {
      await db.quotes.delete(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quotes'] })
  }));

  const updateQuote = createMutation(() => ({
    mutationFn: async (q: Quote) => {
      await db.quotes.put(q);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quotes'] })
  }));

  return { quotesQuery, addQuote, deleteQuote, updateQuote };
}
