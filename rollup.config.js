import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'index.js',
  plugins: [uglify()],
  output: {
    file: 'dist/gleiten.js',
    format: 'iife',
    name: 'gleiten'
  }
}
