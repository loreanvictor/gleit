import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'index.js',
  plugins: [
    commonjs(),
    uglify(),
  ],
  output: {
    file: 'dist/gleiten.min.js',
    format: 'iife',
    name: 'gleiten'
  }
}
