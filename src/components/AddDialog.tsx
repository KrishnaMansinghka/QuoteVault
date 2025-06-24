import { Component, createSignal } from 'solid-js';
import { useQuotes } from '../hooks/useQuotes';

let worker: Worker | null = null;

const AddDialog: Component = () => {
  const { addQuote } = useQuotes();
  const [open, setOpen] = createSignal(false);
  const [text, setText] = createSignal('');
  const [author, setAuthor] = createSignal('');
  const [tags, setTags] = createSignal('');
  const [topic, setTopic] = createSignal('');

  const save = async () => {
    const tagList = tags()
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    await addQuote.mutateAsync({
      quote: text(),
      author: author(),
      tags: tagList,
      createdAt: Date.now()
    });
    setOpen(false);
    setText('');
    setAuthor('');
    setTags('');
    setTopic('');
  };

  const generate = () => {
    if (!topic()) return;
    if (!worker)
      worker = new Worker(new URL('../workers/openai.worker.ts', import.meta.url));
    worker.onmessage = (e) => {
      if (e.data === '[END]') {
        worker?.terminate();
        worker = null;
      } else {
        setText((t) => t + e.data);
      }
    };
    setText('');
    worker.postMessage(topic());
  };

  return (
    <>
      <button
        class="fab fixed bottom-4 right-4 bg-teal text-white rounded-full w-12 h-12 flex items-center justify-center"
        onClick={() => setOpen(true)}
      >
        ＋
      </button>
      {open() && (
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div class="bg-paper p-4 rounded w-80 space-y-2">
            <textarea
              class="w-full border"
              rows="3"
              value={text()}
              onInput={(e) => setText(e.currentTarget.value)}
            />
            <input
              class="w-full border"
              placeholder="Author"
              value={author()}
              onInput={(e) => setAuthor(e.currentTarget.value)}
            />
            <input
              class="w-full border"
              placeholder="Tags comma separated"
              value={tags()}
              onInput={(e) => setTags(e.currentTarget.value)}
            />
            <div class="flex gap-2">
              <input
                class="flex-1 border"
                placeholder="Topic for AI"
                value={topic()}
                onInput={(e) => setTopic(e.currentTarget.value)}
              />
              <button class="bg-gold px-2" onClick={generate}>✨</button>
            </div>
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
