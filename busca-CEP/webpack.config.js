// importando módulo path
const path = require('path');

// export = return 

module.exports = {
  mode: 'production', // modo de produção - development = modo de desenvolvimento.
  entry: './src/index.js', // arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'), // resolve retorna caminho absoluto. demais argumentos são as pastas em sequencia até o caminho final.
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: [/\.js$/, /\.jsx$/],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
          ]
        }
      }
    }
    ],
  },
  devtool: 'source-map',
  resolve: {
    fallback: {
        "fs": false
    },
  },
  target: 'node'
}