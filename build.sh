#!/usr/bin/env bash

# build step
# lerna run lib --scope=ht-angular

# transform package of ng-components
# node tools/ng-component.js

lerna run copy:styles --scope=ht-angular
# rm -rf packages/angular-components/.ng_pkg_build

# check diff and bump package versions
# lerna publish --skip-git --skip-npm

# npm publish ./packages/angular-components/dist

# npm publish ./packages/api
# npm publish ./packages/client
# npm publish ./packages/data
# npm publish ./packages/map
# npm publish ./packages/models


