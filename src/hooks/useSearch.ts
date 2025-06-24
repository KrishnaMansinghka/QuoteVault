import Fuse from 'fuse.js';
import { createSignal, createMemo } from 'solid-js';
import { Quote } from '../db/dexie';

export function useSearch(quotes: () => Quote[]) {
  const [query, setQuery] = createSignal('');

  const fuse = createMemo(() => new Fuse(quotes(), { keys: ['quote', 'author', 'tags'] }));

  const results = createMemo(() => (query() ? fuse().search(query()).map(r => r.item) : quotes()));

  return { query, setQuery, results };
}
