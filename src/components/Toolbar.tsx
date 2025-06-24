import { Component } from 'solid-js';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
}

const Toolbar: Component<Props> = (props) => (
  <div class="absolute -top-3 right-2 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition">
    <button aria-label="edit" class="i-heroicons-pencil-square-20-solid" onClick={props.onEdit} />
    <button aria-label="delete" class="i-heroicons-trash-20-solid" onClick={props.onDelete} />
    <button aria-label="copy" class="i-heroicons-clipboard-20-solid" onClick={props.onCopy} />
  </div>
);

export default Toolbar;

