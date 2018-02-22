#!/usr/bin/env bash

# check diff and bump package versions
lerna publish --skip-git --skip-npm


lerna run lib --scope=ht-angular

lerna run copy:styles --scope=ht-angular
rm -rf packages/angular-components/.ng_pkg_build

# npm publish ./packages/angular-components/dist
# npm publish ./packages/api
# npm publish ./packages/client
# npm publish ./packages/data
# npm publish ./packages/map
# npm publish ./packages/models

