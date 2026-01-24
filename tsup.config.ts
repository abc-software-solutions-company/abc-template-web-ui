import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
  },
  {
    entry: ['src/globals.css'],
    format: ['esm'],
    dts: false,
    sourcemap: false,
  }
]);