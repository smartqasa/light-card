import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/card.js',
    format: 'iife', // Using 'iife' for browsers
    name: 'SmartQasaLightCard', // Define a global variable name for your bundle
  },
  plugins: [
    resolve(), // Ensures Rollup can find `lit` in `node_modules`
    babel({
      exclude: 'node_modules/**', // Excludes node_modules from being transpiled by Babel
      babelHelpers: 'bundled',
    }),
  ]
};
