import prismjs from 'vite-plugin-prismjs';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    prismjs({
      languages: ['csharp', 'javascript'],
      plugins: ['line-numbers', 'copy-to-clipboard','line-numbers', 'line-highlight'],
      theme: 'github-dark',
      css: true,
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        novels: 'novels.html',
        novel: 'novel.html',
        codeSnippet: 'code-snippet.html',
      },
      external: ['novels/**/*.md'], // Force Vite to keep markdown files
    },
    assetsInlineLimit: 0, // Prevents Vite from inlining small files
  }
});
