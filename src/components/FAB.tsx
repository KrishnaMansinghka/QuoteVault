import { Component } from 'solid-js';

interface Props {
  onClick: () => void;
}

const FAB: Component<Props> = (props) => (
  <button
    class="fixed bottom-4 right-4 bg-teal text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-transform fab"
    onClick={props.onClick}
  >
    ＋
  </button>
);

export default FAB;

