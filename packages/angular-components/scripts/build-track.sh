#!/usr/bin/env bash

ng build --prod --env=release --app 1
cp dist/index2.html dist/index.html
NODE_ENV='production' node s3-upload-tracking.js
