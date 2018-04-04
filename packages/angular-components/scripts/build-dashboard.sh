#!/usr/bin/env bash


cp dist/index2.html dist/index.html
NODE_ENV='production' node s3-upload-tracking.js
