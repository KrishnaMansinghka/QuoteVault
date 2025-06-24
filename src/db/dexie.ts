import Dexie, { Table } from 'dexie';
import { Encryption } from 'dexie-encrypted';

export interface Quote {
  id?: number;
  quote: string;
  author: string;
  source?: string;
  tags: string[];
  createdAt: number;
  coverUrl?: string;
}

class QuoteDB extends Dexie {
  quotes!: Table<Quote, number>;

  constructor() {
    super('QuoteVault');
    this.version(1).stores({
      quotes: '++id, quote, author, source, createdAt, *tags'
    });
  }
}

let passphrase = localStorage.getItem('passphrase');
if (!passphrase) {
  passphrase = prompt('Set a pass-phrase to encrypt your quotes:') || '';
  localStorage.setItem('passphrase', passphrase);
}

const db = new QuoteDB();
Encryption.enable(db, passphrase);

export default db;
