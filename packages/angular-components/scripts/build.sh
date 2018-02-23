#!/usr/bin/env bash

npm run lib
rm -rf ./.ng_pkg_build

node ./scripts/package-sanitize.js

npm publish dist
