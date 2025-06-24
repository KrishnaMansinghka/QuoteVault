import { Component } from 'solid-js';

interface Props {
  tag: string;
  selected?: boolean;
  onToggle?: (tag: string) => void;
}

const TagChip: Component<Props> = (props) => {
  const classes = () =>
    `inline-block px-2 py-1 rounded-full mr-1 mb-1 text-sm cursor-pointer ${
      props.selected ? 'bg-teal text-white' : 'bg-gray-200 dark:bg-surface/50'
    }`;
  return (
    <span class={classes()} onClick={() => props.onToggle?.(props.tag)}>
      #{props.tag}
    </span>
  );
};

export default TagChip;

