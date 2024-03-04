import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/card.js',
    format: 'iife', // or 'es' if you're targeting ES modules
    globals: {
      lit: 'lit' // This tells Rollup how to handle global variables for external modules
    },
  },
  plugins: [
    resolve(), // Tells Rollup how to find node modules
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
  ],
  external: ['lit'], // Tells Rollup which imports/dependencies to treat as external
};
