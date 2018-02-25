#!/usr/bin/env bash

# npm run lib
rm -rf ./.ng_pkg_build

npm run copy:styles

node ./scripts/package-sanitize.js

npm publish ../ht-angular
