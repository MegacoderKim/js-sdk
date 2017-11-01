/**
 * @Author: @MurhafSousli
 */

const gulp = require('gulp');

/** To log like console.log().. */
const gutil = require('gulp-util');
var gulpCopy = require('gulp-copy');
/** del to remove dist directory */
const del = require('del');

/** load templates and styles in ng2 components */
const embedTemplates = require('gulp-inline-ng2-template');

/** TSLint checker */
const tslint = require('gulp-tslint');
/** Sass style */
const postcss = require('postcss');
const less = require('less');
var gulpLess = require('gulp-less');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const scss = require('postcss-less');
const stripInlineComments = require('postcss-strip-inline-comments');

/** External command runner */
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const process = require('process');

/**OS Access */
const os = require('os');

/** File Access */
const fs = require('fs');
const file = require('gulp-file');
const path = require('path');

/** To properly handle pipes on error */
const pump = require('pump');

/** To upload code coverage to coveralls */
const coveralls = require('gulp-coveralls');

/** To order tasks */
const runSequence = require('run-sequence');

/** To bundle the library with Rollup */
const gulpRollup = require('gulp-better-rollup');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupUglify = require('rollup-plugin-uglify');

const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');

const LIBRARY_NAME = 'ht-angular';

const config = {
  allTs: 'src/**/!(*.spec).ts',
  allSass: 'src/**/*.less',
  allLess: 'src/**/*.less',
  allHtml: 'src/**/*.html',
  demoDir: 'demo/',
  outputDir: 'dist/',
  coverageDir: 'coverage/'
};


//Helper functions
function platformPath(path) {
  return /^win/.test(os.platform()) ? `${path}.cmd` : path;
}

function startKarmaServer(isTddMode, hasCoverage, done) {
  const karmaServer = require('karma').Server;
  const travis = process.env.TRAVIS;

  let config = { configFile: `${__dirname}/karma.conf.js`, singleRun: !isTddMode, autoWatch: isTddMode };

  if (travis) {
    config['browsers'] = ['Chrome_travis_ci']; // 'Chrome_travis_ci' is defined in "customLaunchers" section of config/karma.conf.js
  }

  config['hasCoverage'] = hasCoverage;

  new karmaServer(config, done).start();
}

function execCallback(gulpDone) {
  return (error, stdout, stderr) => {
    if (stderr) {
      gutil.log(gutil.colors.red(stderr));
    }
    if (stdout) {
      gutil.log(gutil.colors.green(stdout));
    }
    // execute callback when its done
    if (gulpDone) {
      gulpDone();
    }
  }
}
// Clean Tasks
gulp.task('clean:dist', () => {
  return del(config.outputDir);
});

gulp.task('clean:coverage', () => {
  return del(config.coverageDir);
});

gulp.task('clean', ['clean:dist', 'clean:coverage']);

// TsLint the source files
gulp.task('lint', (cb) => {
  pump([
         gulp.src(config.allTs),
         tslint({ formatter: "verbose" }),
         tslint.report()
       ], cb);
});

// Compile Sass to css and Inline templates and styles in ng2 components
const styleProcessor = (path, ext, file, cb) => {
  /**
   * Remove comments, autoprefixer, Minifier
   */
  // console.log("style", stylePath, ext, styleFile, callback);
  const render = pickRenderer(path, ext, file);
  const processors = [
    stripInlineComments,
    autoprefixer,
    cssnano
  ];
  render
    .then((css) => {
      return postcss(processors)
        .process(css, { from: path, to: path.replace(ext, '.css') });
    })
    .then((result) => {
      result.warnings().forEach((msg) => {
        warn(msg.toString());
      });

      cb(undefined, result.css);
    })
    .catch((err) => {
      cb(err || new Error(`Cannot inline stylesheet ${path}`));
    });


  // if (/\.(less|less)$/.test(ext[0])) {
  //   console.log(path, "less");
  //   readFile(path).then(function (lessData) {
  //     console.log("less data", lessData);
  //     new Promise((resolve, reject) => {
  //       less.render(lessData, { filename: path }, (err, result) => {
  //         console.log(result, "results");
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result.css.toString());
  //         }
  //       })
  //     })
  //   })
  //
  //   // let sassObj = less.render(path);
  //   // if (sassObj && sassObj['css']){
  //   //   let css = sassObj.css.toString('utf8');
  //   //   postcss(processors).process(css).then(function (result) {
  //   //     result.warnings().forEach(function (warn) {
  //   //       gutil.warn(warn.toString());
  //   //     });
  //   //     styleFile = result.css;
  //   //     callback(null, styleFile);
  //   //   });
  //   // }
  // }
};
const read = require('read-file');

const readFile = (file) => {

  return new Promise((resolve, reject) => {

    read(file, { encoding: 'utf8', normalize: true }, (err, buffer) => {
      if (err) {
        reject(err);
      }

      resolve(buffer.toString());
    });
  });
};

const pickRenderer = (filePath, ext, file) => {

  return renderLess({ filename: filePath });

}

const renderLess = (lessOpts) => {
  return readFile(lessOpts.filename)
    .then((lessData) => new Promise((resolve, reject) => {
      less.render(lessData, lessOpts, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.css.toString());
        }
      })
    }));
}

gulp.task('inline-templates', (cb) => {
  const options = {
    base: '/src',
    target: 'es5',
    styleProcessor: styleProcessor,
    useRelativePaths: true
  };
pump(
  [
    gulp.src(config.allTs),
    embedTemplates(options),
    gulp.dest(`${config.outputDir}/inlined`)
  ],
  cb);
});

gulp.task('copy-style', (cb) => {
  return gulp.src('./src/styles/**/*.less')
    // .pipe(gulpCopy('./dist'))
    // .pipe(gulpLess())
    .pipe(gulp.dest('./dist/less'))

})

gulp.task('compile-style', (cb) => {
  return gulp.src('./src/styles.less')
    // .pipe(gulpCopy('.'))
    .pipe(gulpLess())
    .pipe(gulp.dest('./dist/css'))

})


gulp.task('copy-js', (cb) => {
  return gulp.src('./src/js/**/*.js')
    // .pipe(gulpCopy('./dist/js'))
    .pipe(gulp.dest('./dist/js'))

})

// Compile inlined TS files with Angular Compiler (ngc)
gulp.task('ngc', (cb) => {
  const executable = path.join(__dirname, platformPath('/node_modules/.bin/ngc'));
const ngc = exec(`${executable} -p ./tsconfig-aot.json`, (err) => {
  if (err) return cb(err); // return error
del(`${config.outputDir}/inlined`); //delete temporary *.ts files with inlined templates and styles
cb();
}).stdout.on('data', (data) => console.log(data));
});

// Test tasks
gulp.task('test', (cb) => {
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
startKarmaServer(false, true, cb);
});

gulp.task('test:ci', ['clean'], (cb) => {
  runSequence('compile', 'test');
});

gulp.task('test:watch', (cb) => {
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
startKarmaServer(true, true, cb);
});

gulp.task('test:watch-no-cc', (cb) => {//no coverage (useful for debugging failing tests in browser)
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
startKarmaServer(true, false, cb);
});

// Prepare 'dist' folder for publication to NPM
gulp.task('package', (cb) => {
  let pkgJson = JSON.parse(fs.readFileSync('./src/_package.json', 'utf8'));
let targetPkgJson = {};
let fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage', 'dependencies', 'peerDependencies'];

targetPkgJson['name'] = LIBRARY_NAME;

//only copy needed properties from project's package json
fieldsToCopy.forEach((field) => { targetPkgJson[field] = pkgJson[field]; });

targetPkgJson['main'] = `bundles/ht-angular.umd.js`;
targetPkgJson['module'] = 'ht-angular.js';
targetPkgJson['typings'] = 'ht-angular.d.ts';

// defines project's dependencies as 'peerDependencies' for final users
targetPkgJson.peerDependencies = {};
Object.keys(pkgJson.dependencies).forEach((dependency) => {
  if (dependency.startsWith('@angular/')) {
  // narrow version of @angular packages to address bug with JSONP inroduced in [2.4.6, 2.4.8[ && [4.0.0-beta.6, 4.0.0-beta.8[
  // see https://github.com/angular/angular/pull/13219 and changelog
  targetPkgJson.peerDependencies[dependency] = `>=2.0.0 <2.4.6 || >=2.4.8 <4.0.0-beta.6 || >=4.0.0-beta.8`;
}
else {
  targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;

}

});

// copy the needed additional files in the 'dist' folder
pump(
  [
    gulp.src(['README.md', 'LICENSE', 'CHANGELOG.md']),
    file('package.json', JSON.stringify(targetPkgJson, null, 2)),
    gulp.dest(config.outputDir)
  ],
  cb);
});

// Bundles the library as UMD bundle using RollupJS
gulp.task('bundle', () => {
  const globals = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/http': 'ng.http',

    // Rxjs dependencies
    'rxjs/Subject': 'Rx',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/forkJoin': 'Rx.Observable',
    'rxjs/add/observable/merge': 'Rx.Observable',
    'rxjs/add/observable/throw': 'Rx.Observable',
    'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/do': 'Rx.Observable.prototype',
    'rxjs/add/operator/of': 'Rx.Observable.prototype',
    'rxjs/add/operator/share': 'Rx.Observable.prototype',
    'rxjs/add/operator/finally': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'rxjs/add/observable/empty': 'Rx.Observable.prototype',
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx',
    'underscore': "_",
    'moment-mini': "moment"
  };

const rollupOptions = {
  context: 'this',
  external: Object.keys(globals),
  plugins: [
    // rollupNodeResolve({ module: true }),
    rollupUglify()
  ]
};

const rollupGenerateOptions = {
  // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
  moduleId: '',
  moduleName: 'htAngular', //require for 'umd' bundling, must be a valid js identifier, see rollup/rollup/issues/584
  format: 'umd',
  globals,
  dest: 'ht-angular.umd.js'
};

return gulp.src(`${config.outputDir}/ht-angular.js`)
  .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
  .pipe(gulp.dest(`${config.outputDir}/bundles`));
});

// Serve the demo application
gulp.task('demo', (done) => {
  const executable = path.join(__dirname, platformPath('demo/node_modules/.bin/ng'));
const ngServe = spawn(`${executable}`, ['serve'], { cwd: `${config.demoDir}` }); // run 'ng serve' from there
ngServe.stdout.pipe(process.stdout);
ngServe.stderr.pipe(process.stderr);

});

// Link 'dist' folder (create a local 'ngx-sharebuttons' package that symlinks to it)
// This way, we can have the demo project declare a dependency on 'ngx-sharebuttons' (as it should)
// and, thanks to 'npm link ngx-sharebuttons' on demo project, be sure to always use the latest built
// version of the library ( which is in 'dist/' folder)
gulp.task('link', (done) => {
  exec('npm link', { cwd: `${config.outputDir}` }, execCallback(done)); // run 'npm link' from 'dist' folder
});

// Upload code coverage report to coveralls.io (will be triggered by Travis CI on successful build)
gulp.task('coveralls', () => {
  return gulp.src(`${config.coverageDir}/coverage.lcov`)
    .pipe(coveralls());
});

// Lint, Sass to css, Inline templates & Styles and Compile
gulp.task('compile', (cb) => {
  runSequence('inline-templates', 'ngc', cb);
});

// Watch changes on (*.ts, *.sass, *.html) and Compile
gulp.task('watch', () => {
  gulp.watch([config.allTs, config.allHtml, config.allLess], ['compile']);
});

// Build the 'dist' folder (without publishing it to NPM)
gulp.task('build', ['clean'], (cb) => {
  runSequence('compile', 'package', 'bundle', 'copy-style', 'copy-js', 'compile-style', cb);
});

// Build and then Publish 'dist' folder to NPM
gulp.task('publish', ['build'], (done) => {
  // run npm publish terminal command to publish the 'dist' folder only
  exec(`npm publish ${config.outputDir}`, execCallback(done));
});

gulp.task('default', ['build']);
