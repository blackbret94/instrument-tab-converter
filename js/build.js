#!/usr/bin/env node

/**
 * Browserify build script. Run this script from NPM.
 *
 * For development:
 *   docker-compose run --rm node npm run build
 *
 * For production:
 *   docker-compose run --rm node npm run build -- --production
 */

const args = require('args');
const browserify = require('browserify');
const fs = require('fs');

const INPUT_FILE = __dirname + '/main.js';
const OUTPUT_FILE = __dirname + '/../htdocs/js/bundle.js';

const babelConfig = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "targets": {
          "ie": "9"
        },
        "shippedProposals": true
      }
    ]
  ]
};

args
  .option('production', 'Uglify and disable source maps');

const flags = args.parse(process.argv);

let bundler = browserify(INPUT_FILE, {
  'debug': !flags.production,
  'standalone': 'modules'
});

bundler
  .transform('babelify', babelConfig)
  .transform('uglifyify', { global: true })
  .bundle()
  .pipe(fs.createWriteStream(OUTPUT_FILE));