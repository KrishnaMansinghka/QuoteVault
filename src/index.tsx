import { render } from 'solid-js/web';
import App from './routes/Home';
import 'uno.css';
import './styles/tokens.css';
import './styles/themes.css';
import './styles/animations.css';

render(() => <App />, document.getElementById('root') as HTMLElement);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
