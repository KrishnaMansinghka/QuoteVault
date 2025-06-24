import { createSignal, onMount } from 'solid-js';

const ThemeToggle = () => {
  const [dark, setDark] = createSignal(false);

  onMount(() => {
    const stored = localStorage.getItem('theme') === 'dark';
    setDark(stored);
    document.documentElement.classList.toggle('dark', stored);
  });

  const toggle = () => {
    const next = !dark();
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button onClick={toggle} class="p-2">
      {dark() ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
