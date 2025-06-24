import { createSignal, onMount } from 'solid-js';

const ThemeToggle = () => {
  const [dark, setDark] = createSignal(false);

  onMount(() => {
    document.documentElement.classList.toggle('dark', dark());
  });

  const toggle = () => {
    setDark(!dark());
    document.documentElement.classList.toggle('dark', !dark());
  };

  return (
    <button onClick={toggle} class="p-2">
      {dark() ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
