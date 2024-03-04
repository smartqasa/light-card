import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/smartqasa.js',
    format: 'iife', // Using 'iife' for browsers
    name: 'SmartQasaCards', // Define a global variable name for your bundle
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
  ]
};
