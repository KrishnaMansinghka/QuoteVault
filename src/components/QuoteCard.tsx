import { Component } from 'solid-js';
import { Quote } from '../db/dexie';
import Toolbar from './Toolbar';
import TagChip from './TagChip';

interface Props {
  quote: Quote;
}

const QuoteCard: Component<Props> = (props) => {
  const copy = () => navigator.clipboard.writeText(`${props.quote.quote} — ${props.quote.author}`);

  return (
    <article class="relative p-4 rounded shadow-md bg-surface text-textDark card-enter group">
      <Toolbar onEdit={() => {}} onDelete={() => {}} onCopy={copy} />
      <blockquote class="font-quote mb-2">{props.quote.quote}</blockquote>
      <div class="text-sm mb-2">— {props.quote.author}</div>
      <div>
        {props.quote.tags.map((t) => (
          <TagChip tag={t} />
        ))}
      </div>
    </article>
  );
};

export default QuoteCard;
