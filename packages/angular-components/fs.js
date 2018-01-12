import * as fs from 'fs';
import * as path from 'path';
const read = require('read-file');

export const readFile = (file) => {

  return new Promise((resolve, reject) => {

    read(file, { encoding: 'utf8', normalize: true }, (err, buffer) => {
      if (err) {
        reject(err);
      }

      resolve(buffer.toString());
    });
  });
};

export const writeFile = (file, content) => {

  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};


export const findFromDirectory = (dir, file, cb) => {

  let fileName = path.resolve(dir, file);
  fs.access(fileName, fs.constants.R_OK, (err) => {
    if (err) {
      findFromDirectory(path.resolve(dir, '..'), file, cb);
    } else {
      cb(fileName);
    }
  });
};


