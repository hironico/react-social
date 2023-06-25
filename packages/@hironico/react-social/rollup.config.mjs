
// rollup.config.js

import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const config = [{
  external: ['react', 'react-dom'],
  input: './out-tsc/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    commonjs()
  ]
},
{
  input: "./out-tsc/index.d.ts",
  output: [{ file: "dist/index.d.ts", format: "es" }],
  plugins: [
    dts()
  ]
}
];

export default config;