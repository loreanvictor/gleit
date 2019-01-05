import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'gleit.js',
  plugins: [
    commonjs(),
    uglify(),
  ],
  output: {
    file: 'dist/gleit.min.js',
    format: 'iife',
    name: 'gleit'
  }
}
