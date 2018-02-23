fs = require('fs');
var path = require('path');

var jsonPath = path.join(__dirname, '..', 'dist', 'package.json');

var m = JSON.parse(fs.readFileSync(jsonPath).toString());
delete m.devDependencies;
delete m.scripts;
m.private = false;
fs.writeFile(jsonPath, JSON.stringify(m, null, 2));
