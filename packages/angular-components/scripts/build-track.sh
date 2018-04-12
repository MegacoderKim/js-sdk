#!/usr/bin/env bash
# rimraf ../api/node_modules
# rimraf ../client/node_modules
# rimraf ../maps/node_modules
# rimraf ../data/node_modules
# rimraf ../utils/node_modules
# rimraf ../leaflet-wrapper/node_modules
ng build --prod --env=release --preserve-symlink -d https://d3sy1lkmbczi2q.cloudfront.net --app 2 --stats-json
# ng build --prod --env=release --preserve-symlink --app 2 --stats-json
# webpack-bundle-analyzer dist/stats.json
cp dist/index2.html dist/index.html
NODE_ENV='production' node s3-upload-tracking.js
