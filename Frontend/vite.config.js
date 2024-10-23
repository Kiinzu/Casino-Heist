import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      // Expose environment variables to your React app
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL)
    },
    plugins: [
      react(),
      {
        name: 'markdown-loader',
        transform(code, id) {
          if (id.endsWith('.md')) {
            // Convert Markdown content to a JavaScript export
            return `export default ${JSON.stringify(code)};`;
          }
        },
      },
    ],
  };
});
