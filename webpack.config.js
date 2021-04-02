// const fs = require('fs')
const path = require('path')
const { EnvironmentPlugin, LoaderOptionsPlugin } = require('webpack')
// const dotenv = require('dotenv')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const getEnv = env => {
//   const basePath = path.resolve(__dirname, '.env')
//   const envPath = `${basePath}.${env.NODE_ENV}`
//   const finalPath = fs.existsSync(envPath) ? envPath : basePath
//   const finalEnv = dotenv.config({ path: finalPath }).parsed

//   return Object.entries(finalEnv).reduce((acc, [key, value]) => {
//     acc[`process.env.${key}`] = JSON.stringify(value)
//     return acc
//   })
// }
module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      '~': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new EnvironmentPlugin({
      API_URL: 'https://fordevs.herokuapp.com/api'
    }),
    new LoaderOptionsPlugin({
      options: {
        open: true
      }
    })
  ]
}
