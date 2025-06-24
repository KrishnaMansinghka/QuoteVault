import { Component, onCleanup } from 'solid-js';
import { Quote } from '../db/dexie';

interface Props {
  quote: Quote | null;
  onClose: () => void;
}

const InspireModal: Component<Props> = (props) => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') props.onClose();
  };
  document.addEventListener('keydown', onKey);
  onCleanup(() => document.removeEventListener('keydown', onKey));

  if (!props.quote) return null;

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-paper p-4 rounded w-80 animate-ink">
        <blockquote class="font-quote mb-2">{props.quote.quote}</blockquote>
        <div class="text-sm mb-2">— {props.quote.author}</div>
        <button class="px-3 py-1 bg-teal text-white" onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default InspireModal;

