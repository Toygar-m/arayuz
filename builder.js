////////////////////////////////////////////////////////////
/// JEEKSOFT PRO > BUILDER
/////////////////////////////////////////////////////

const jeek = require("./jeek.json");

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const terserplugin = require('terser-webpack-plugin');
const cleancss = require('clean-css');

process.env.NODE_ENV = jeek.build.mode;

setTimeout(() => {

  function minifycss(inputfile, outputfile) {
    try {
        const csscontent = fs.readFileSync(inputfile, 'utf8');
        const minifiedCSS = new cleancss().minify(csscontent).styles;
        const lines = minifiedCSS.split('\n').sort(() => Math.random() - 0.5);
        const shuffledCSS = lines.join('\n');
        fs.writeFileSync(outputfile, shuffledCSS, 'utf8');
        console.log(`CSS MINIFY COMPLETED`);
    } catch (error) {
        console.error('CSS MINIFY ERROR:', error);
    }
  }

  const jscompiler = webpack({
    mode: jeek.build.mode,
    entry: jeek.build.jsfilein,
    output: {
      filename: jeek.build.jsfileout,
      path: path.resolve(__dirname, jeek.build.path),
    },
    cache: { type: "filesystem" },
    performance: { hints: false },
    parallelism: 100,
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-transform-class-properties", { loose: true }],
                ["@babel/plugin-transform-private-methods", { loose: true }],
                ["@babel/plugin-transform-private-property-in-object", { loose: true }]
              ]
            },
          },
        }
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new terserplugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: null,
            format: {},
          },
          extractComments: false,
        }),
      ],
    },
  });

  if (jeek) {
    fs.watch(jeek.build.cssfilein, (eventtype, filename) => {
      if (eventtype === 'change') {
        try {
          minifycss(jeek.build.cssfilein, jeek.build.cssfileout);
        } catch (error) {
          console.error('Error watching CSS file:', error);
        }
      }
    });

    try {
      minifycss(jeek.build.cssfilein, jeek.build.cssfileout);
    } catch (error) {
      console.error('Initial CSS minify error:', error);
    }
    
    try {
      jscompiler.watch({}, (err, stats) => {
        if (err) {
          console.error('JS Compile Error:', err);
        } else if (stats.hasErrors()) {
          console.error('JS Compile Stats Error:', stats.toString('errors-only'));
        } else {
          console.log(stats.toString('minimal'));
        }
      });
    } catch (error) {
      console.error('Initial JS minify error:', error);
    }

  }
}, 100);