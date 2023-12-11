'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
let build_mode = 'local'

for (let i = 2; i < process.argv.length; i++) {
  let arg = process.argv[i]
  if(arg == 'NODE_ENV=staging') {
    process.env.NODE_ENV = 'staging'
    build_mode = 'stg'
  } else if(arg == 'NODE_ENV=production') {
    process.env.NODE_ENV = 'production'
    build_mode = 'prd'
  }
  else {
    // not change default NODE_ENV
    process.env.NODE_ENV = 'production'
    build_mode = 'local'
  }
}

console.log('NODE_ENV: ' + process.env.NODE_ENV + '\n')

const fs = require('fs')
const prop_file = './src/resource/static/properties/properties.json'
const prop_tmp_file = prop_file + '.tmp'
const prop_file_build = './src/resource/static/properties/properties.' + build_mode + '.json'

if(build_mode != 'local') {
  // if build for deployment for AWS, swap property files to change WSO2 URL during built.
  try {
    fs.copyFileSync(prop_file, prop_tmp_file);
    console.log('copied "properties.json" to "properties.json.tmp"');

    fs.copyFileSync(prop_file_build, prop_file);
    console.log('replaced "'+ prop_file_build + ' to "properties.json"');
  } catch (err) {
    throw err;
    console.log(err);
  }
}

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    if(build_mode != 'local') {
      // if build for deployment for AWS, revert swapped property files.
      try {
        fs.copyFileSync(prop_tmp_file, prop_file);
        console.log('restored "properties.json"');

        fs.unlinkSync(prop_tmp_file);
        console.log('removed tmp file');
      } catch (err2) {
        throw err2;
        console.log(err2);
      }
    }
  })
})
