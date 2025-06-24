import { Component, createSignal } from 'solid-js';
import { useQuotes } from '../hooks/useQuotes';

const AddDialog: Component = () => {
  const { addQuote } = useQuotes();
  const [open, setOpen] = createSignal(false);
  const [text, setText] = createSignal('');
  const [author, setAuthor] = createSignal('');

  const save = async () => {
    await addQuote.mutateAsync({ quote: text(), author: author(), tags: [], createdAt: Date.now() });
    setOpen(false);
    setText('');
    setAuthor('');
  };

  return (
    <>
      <button class="fixed bottom-4 right-4 bg-teal text-white rounded-full w-12 h-12" onClick={() => setOpen(true)}>
        ＋
      </button>
      {open() && (
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div class="bg-paper p-4 rounded w-80">
            <textarea class="w-full border" value={text()} onInput={e => setText(e.currentTarget.value)} />
            <input class="w-full border mt-2" placeholder="Author" value={author()} onInput={e => setAuthor(e.currentTarget.value)} />
            <div class="mt-2 flex justify-end gap-2">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button class="bg-teal text-white px-3 py-1" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDialog;
