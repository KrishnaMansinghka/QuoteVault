import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    colors: {
      paper: '#FDFDFC',
      ink: '#272F3B',
      teal: '#05AAB3',
      gold: '#FBBF24',
      rose: '#EC4899',
      canvas: '#111317',
      surface: '#1B1E24',
      brightTeal: '#17C1C8',
      honey: '#FFC857',
      textDark: '#E4E8EE'
    }
  }
});
