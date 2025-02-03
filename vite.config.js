import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        novels: 'novels.html',
        novel: 'novel.html'
      },
      external: ['novels/**/*.md'], // Force Vite to keep markdown files
    },
    assetsInlineLimit: 0, // Prevents Vite from inlining small files
  }
});
