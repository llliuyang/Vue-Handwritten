import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default {
  input: './src/index.js',
  output: {
    format: 'umd', 
    file: 'dist/umd/vue.js',
    name: 'Vue',
    sourcemap: true
  },
  plugins:[
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      open: false,
      port: 4000,
      contentBase: '',
      openPage: '/index.html'
    })
  ]
}