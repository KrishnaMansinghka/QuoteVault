import { Component } from 'solid-js';
import { Quote } from '../db/dexie';

interface Props {
  quote: Quote;
}

const QuoteCard: Component<Props> = (props) => {
  return (
    <article class="p-4 rounded shadow-md bg-surface text-textDark card-enter">
      <blockquote class="font-quote mb-2">{props.quote.quote}</blockquote>
      <div class="text-sm">— {props.quote.author}</div>
    </article>
  );
};

export default QuoteCard;
