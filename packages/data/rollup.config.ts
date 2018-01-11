import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'

const pkg = require('./package.json')

const libraryName = 'ht-data';

const globals = {
  'rxjs/AnonymousSubject': 'Rx',
  'rxjs/AsyncSubject': 'Rx',
  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/Notifiction': 'Rx',
  'rxjs/ObservableInput': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/ReplaySubject': 'Rx',
  'rxjs/Scheduler': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/SubjectSubscriber': 'Rx',
  'rxjs/SubscribableOrPromise': 'Rx',
  'rxjs/Subscriber': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/TeardownLogic': 'Rx',
  'rxjs/add/observable/bindCallback': 'Rx.Observable',
  'rxjs/add/observable/bindNodeCallback': 'Rx.Observable',
  'rxjs/add/observable/combineLatest': 'Rx.Observable',
  'rxjs/add/observable/concat': 'Rx.Observable',
  'rxjs/add/observable/create': 'Rx.Observable',
  'rxjs/add/observable/defer': 'Rx.Observable',
  'rxjs/add/observable/empty': 'Rx.Observable',
  'rxjs/add/observable/forkJoin': 'Rx.Observable',
  'rxjs/add/observable/from': 'Rx.Observable',
  'rxjs/add/observable/fromEvent': 'Rx.Observable',
  'rxjs/add/observable/fromEventPattern': 'Rx.Observable',
  'rxjs/add/observable/fromPromise': 'Rx.Observable',
  'rxjs/add/observable/interval': 'Rx.Observable',
  'rxjs/add/observable/merge': 'Rx.Observable',
  'rxjs/add/observable/never': 'Rx.Observable',
  'rxjs/add/observable/of': 'Rx.Observable',
  'rxjs/add/observable/range': 'Rx.Observable',
  'rxjs/add/observable/throw': 'Rx.Observable',
  'rxjs/add/observable/timer': 'Rx.Observable',
  'rxjs/add/observable/webSocket': 'Rx.Observable',
  'rxjs/add/observable/zip': 'Rx.Observable',
  'rxjs/add/operator/audit': 'Rx.Observable.prototype',
  'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/buffer': 'Rx.Observable.prototype',
  'rxjs/add/operator/bufferCount': 'Rx.Observable.prototype',
  'rxjs/add/operator/bufferTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/bufferToggle': 'Rx.Observable.prototype',
  'rxjs/add/operator/bufferWhen': 'Rx.Observable.prototype',
  'rxjs/add/operator/catch': 'Rx.Observable.prototype',
  'rxjs/add/operator/combineAll': 'Rx.Observable.prototype',
  'rxjs/add/operator/combineLatest': 'Rx.Observable.prototype',
  'rxjs/add/operator/concat': 'Rx.Observable.prototype',
  'rxjs/add/operator/concatAll': 'Rx.Observable.prototype',
  'rxjs/add/operator/concatMap': 'Rx.Observable.prototype',
  'rxjs/add/operator/concatMapTo': 'Rx.Observable.prototype',
  'rxjs/add/operator/count': 'Rx.Observable.prototype',
  'rxjs/add/operator/debounce': 'Rx.Observable.prototype',
  'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/defaultIfEmpty': 'Rx.Observable.prototype',
  'rxjs/add/operator/delay': 'Rx.Observable.prototype',
  'rxjs/add/operator/delayWhen': 'Rx.Observable.prototype',
  'rxjs/add/operator/dematerialize': 'Rx.Observable.prototype',
  'rxjs/add/operator/distinct': 'Rx.Observable.prototype',
  'rxjs/add/operator/distinctUntilChanged': 'Rx.Observable.prototype',
  'rxjs/add/operator/distinctUntilKeyChanged': 'Rx.Observable.prototype',
  'rxjs/add/operator/do': 'Rx.Observable.prototype',
  'rxjs/add/operator/elementAt': 'Rx.Observable.prototype',
  'rxjs/add/operator/every': 'Rx.Observable.prototype',
  'rxjs/add/operator/exhaust': 'Rx.Observable.prototype',
  'rxjs/add/operator/exhaustMap': 'Rx.Observable.prototype',
  'rxjs/add/operator/expand': 'Rx.Observable.prototype',
  'rxjs/add/operator/filter': 'Rx.Observable.prototype',
  'rxjs/add/operator/finally': 'Rx.Observable.prototype',
  'rxjs/add/operator/find': 'Rx.Observable.prototype',
  'rxjs/add/operator/findIndex': 'Rx.Observable.prototype',
  'rxjs/add/operator/first': 'Rx.Observable.prototype',
  'rxjs/add/operator/forEach': 'Rx.Observable.prototype',
  'rxjs/add/operator/groupBy': 'Rx.Observable.prototype',
  'rxjs/add/operator/ignoreElements': 'Rx.Observable.prototype',
  'rxjs/add/operator/isEmpty': 'Rx.Observable.prototype',
  'rxjs/add/operator/last': 'Rx.Observable.prototype',
  'rxjs/add/operator/let': 'Rx.Observable.prototype',
  'rxjs/add/operator/letProto': 'Rx.Observable.prototype',
  'rxjs/add/operator/lift': 'Rx.Observable.prototype',
  'rxjs/add/operator/map': 'Rx.Observable.prototype',
  'rxjs/add/operator/materialize': 'Rx.Observable.prototype',
  'rxjs/add/operator/max': 'Rx.Observable.prototype',
  'rxjs/add/operator/merge': 'Rx.Observable.prototype',
  'rxjs/add/operator/mergeAll': 'Rx.Observable.prototype',
  'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
  'rxjs/add/operator/mergeMapTo': 'Rx.Observable.prototype',
  'rxjs/add/operator/mergeScan': 'Rx.Observable.prototype',
  'rxjs/add/operator/min': 'Rx.Observable.prototype',
  'rxjs/add/operator/multicast': 'Rx.Observable.prototype',
  'rxjs/add/operator/observeOn': 'Rx.Observable.prototype',
  'rxjs/add/operator/pairwise': 'Rx.Observable.prototype',
  'rxjs/add/operator/partition': 'Rx.Observable.prototype',
  'rxjs/add/operator/pluck': 'Rx.Observable.prototype',
  'rxjs/add/operator/publish': 'Rx.Observable.prototype',
  'rxjs/add/operator/publishBehavior': 'Rx.Observable.prototype',
  'rxjs/add/operator/publishLast': 'Rx.Observable.prototype',
  'rxjs/add/operator/publishReplay': 'Rx.Observable.prototype',
  'rxjs/add/operator/race': 'Rx.Observable.prototype',
  'rxjs/add/operator/reduce': 'Rx.Observable.prototype',
  'rxjs/add/operator/repeat': 'Rx.Observable.prototype',
  'rxjs/add/operator/repeatWhen': 'Rx.Observable.prototype',
  'rxjs/add/operator/retry': 'Rx.Observable.prototype',
  'rxjs/add/operator/retryWhen': 'Rx.Observable.prototype',
  'rxjs/add/operator/sample': 'Rx.Observable.prototype',
  'rxjs/add/operator/sampleTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/scan': 'Rx.Observable.prototype',
  'rxjs/add/operator/sequenceEqual': 'Rx.Observable.prototype',
  'rxjs/add/operator/share': 'Rx.Observable.prototype',
  'rxjs/add/operator/single': 'Rx.Observable.prototype',
  'rxjs/add/operator/skip': 'Rx.Observable.prototype',
  'rxjs/add/operator/skipUntil': 'Rx.Observable.prototype',
  'rxjs/add/operator/skipWhile': 'Rx.Observable.prototype',
  'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/add/operator/subscribeOn': 'Rx.Observable.prototype',
  'rxjs/add/operator/switch': 'Rx.Observable.prototype',
  'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/add/operator/switchMapTo': 'Rx.Observable.prototype',
  'rxjs/add/operator/take': 'Rx.Observable.prototype',
  'rxjs/add/operator/takeLast': 'Rx.Observable.prototype',
  'rxjs/add/operator/takeUntil': 'Rx.Observable.prototype',
  'rxjs/add/operator/takeWhile': 'Rx.Observable.prototype',
  'rxjs/add/operator/throttle': 'Rx.Observable.prototype',
  'rxjs/add/operator/throttleTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/timeInterval': 'Rx.Observable.prototype',
  'rxjs/add/operator/timeout': 'Rx.Observable.prototype',
  'rxjs/add/operator/timeoutWith': 'Rx.Observable.prototype',
  'rxjs/add/operator/timestamp': 'Rx.Observable.prototype',
  'rxjs/add/operator/toArray': 'Rx.Observable.prototype',
  'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
  'rxjs/add/operator/window': 'Rx.Observable.prototype',
  'rxjs/add/operator/windowCount': 'Rx.Observable.prototype',
  'rxjs/add/operator/windowToggle': 'Rx.Observable.prototype',
  'rxjs/add/operator/windowWhen': 'Rx.Observable.prototype',
  'rxjs/add/operator/withLatestFrom': 'Rx.Observable.prototype',
  'rxjs/add/operator/zipAll': 'Rx.Observable.prototype',
  'rxjs/add/operator/zipProto': 'Rx.Observable.prototype',
  'rxjs/observable/bindCallback': 'Rx.Observable',
  'rxjs/observable/bindNodeCallback': 'Rx.Observable',
  'rxjs/observable/combineLatest': 'Rx.Observable',
  'rxjs/observable/concat': 'Rx.Observable',
  'rxjs/observable/defer': 'Rx.Observable',
  'rxjs/observable/empty': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/observable/from': 'Rx.Observable',
  'rxjs/observable/fromEvent': 'Rx.Observable',
  'rxjs/observable/fromEventPattern': 'Rx.Observable',
  'rxjs/observable/fromPromise': 'Rx.Observable',
  'rxjs/observable/if': 'Rx.Observable',
  'rxjs/observable/interval': 'Rx.Observable',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/never': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',
  'rxjs/observable/pairs': 'Rx.Observable',
  'rxjs/observable/range': 'Rx.Observable',
  'rxjs/observable/throw': 'Rx.Observable',
  'rxjs/observable/timer': 'Rx.Observable',
  'rxjs/observable/using': 'Rx.Observable',
  'rxjs/observable/zip': 'Rx.Observable',
  'rxjs/operator/audit': 'Rx.Observable.prototype',
  'rxjs/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/operator/buffer': 'Rx.Observable.prototype',
  'rxjs/operator/bufferCount': 'Rx.Observable.prototype',
  'rxjs/operator/bufferTime': 'Rx.Observable.prototype',
  'rxjs/operator/bufferToggle': 'Rx.Observable.prototype',
  'rxjs/operator/bufferWhen': 'Rx.Observable.prototype',
  'rxjs/operator/catch': 'Rx.Observable.prototype',
  'rxjs/operator/combineAll': 'Rx.Observable.prototype',
  'rxjs/operator/combineLatest': 'Rx.Observable.prototype',
  'rxjs/operator/concat': 'Rx.Observable.prototype',
  'rxjs/operator/concatAll': 'Rx.Observable.prototype',
  'rxjs/operator/concatMap': 'Rx.Observable.prototype',
  'rxjs/operator/concatMapTo': 'Rx.Observable.prototype',
  'rxjs/operator/count': 'Rx.Observable.prototype',
  'rxjs/operator/debounce': 'Rx.Observable.prototype',
  'rxjs/operator/debounceTime': 'Rx.Observable.prototype',
  'rxjs/operator/defaultIfEmpty': 'Rx.Observable.prototype',
  'rxjs/operator/delay': 'Rx.Observable.prototype',
  'rxjs/operator/delayWhen': 'Rx.Observable.prototype',
  'rxjs/operator/dematerialize': 'Rx.Observable.prototype',
  'rxjs/operator/distinct': 'Rx.Observable.prototype',
  'rxjs/operator/distinctUntilChanged': 'Rx.Observable.prototype',
  'rxjs/operator/distinctUntilKeyChanged': 'Rx.Observable.prototype',
  'rxjs/operator/do': 'Rx.Observable.prototype',
  'rxjs/operator/elementAt': 'Rx.Observable.prototype',
  'rxjs/operator/every': 'Rx.Observable.prototype',
  'rxjs/operator/exhaust': 'Rx.Observable.prototype',
  'rxjs/operator/exhaustMap': 'Rx.Observable.prototype',
  'rxjs/operator/expand': 'Rx.Observable.prototype',
  'rxjs/operator/filter': 'Rx.Observable.prototype',
  'rxjs/operator/finally': 'Rx.Observable.prototype',
  'rxjs/operator/find': 'Rx.Observable.prototype',
  'rxjs/operator/findIndex': 'Rx.Observable.prototype',
  'rxjs/operator/first': 'Rx.Observable.prototype',
  'rxjs/operator/forEach': 'Rx.Observable.prototype',
  'rxjs/operator/groupBy': 'Rx.Observable.prototype',
  'rxjs/operator/ignoreElements': 'Rx.Observable.prototype',
  'rxjs/operator/isEmpty': 'Rx.Observable.prototype',
  'rxjs/operator/last': 'Rx.Observable.prototype',
  'rxjs/operator/let': 'Rx.Observable.prototype',
  'rxjs/operator/letProto': 'Rx.Observable.prototype',
  'rxjs/operator/lift': 'Rx.Observable.prototype',
  'rxjs/operator/map': 'Rx.Observable.prototype',
  'rxjs/operator/materialize': 'Rx.Observable.prototype',
  'rxjs/operator/max': 'Rx.Observable.prototype',
  'rxjs/operator/merge': 'Rx.Observable.prototype',
  'rxjs/operator/mergeAll': 'Rx.Observable.prototype',
  'rxjs/operator/mergeMap': 'Rx.Observable.prototype',
  'rxjs/operator/mergeMapTo': 'Rx.Observable.prototype',
  'rxjs/operator/mergeScan': 'Rx.Observable.prototype',
  'rxjs/operator/min': 'Rx.Observable.prototype',
  'rxjs/operator/multicast': 'Rx.Observable.prototype',
  'rxjs/operator/observeOn': 'Rx.Observable.prototype',
  'rxjs/operator/pairwise': 'Rx.Observable.prototype',
  'rxjs/operator/partition': 'Rx.Observable.prototype',
  'rxjs/operator/pluck': 'Rx.Observable.prototype',
  'rxjs/operator/publish': 'Rx.Observable.prototype',
  'rxjs/operator/publishBehavior': 'Rx.Observable.prototype',
  'rxjs/operator/publishLast': 'Rx.Observable.prototype',
  'rxjs/operator/publishReplay': 'Rx.Observable.prototype',
  'rxjs/operator/race': 'Rx.Observable.prototype',
  'rxjs/operator/reduce': 'Rx.Observable.prototype',
  'rxjs/operator/repeat': 'Rx.Observable.prototype',
  'rxjs/operator/repeatWhen': 'Rx.Observable.prototype',
  'rxjs/operator/retry': 'Rx.Observable.prototype',
  'rxjs/operator/retryWhen': 'Rx.Observable.prototype',
  'rxjs/operator/sample': 'Rx.Observable.prototype',
  'rxjs/operator/sampleTime': 'Rx.Observable.prototype',
  'rxjs/operator/scan': 'Rx.Observable.prototype',
  'rxjs/operator/sequenceEqual': 'Rx.Observable.prototype',
  'rxjs/operator/share': 'Rx.Observable.prototype',
  'rxjs/operator/single': 'Rx.Observable.prototype',
  'rxjs/operator/skip': 'Rx.Observable.prototype',
  'rxjs/operator/skipUntil': 'Rx.Observable.prototype',
  'rxjs/operator/skipWhile': 'Rx.Observable.prototype',
  'rxjs/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/operator/subscribeOn': 'Rx.Observable.prototype',
  'rxjs/operator/switch': 'Rx.Observable.prototype',
  'rxjs/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/operator/switchMapTo': 'Rx.Observable.prototype',
  'rxjs/operator/take': 'Rx.Observable.prototype',
  'rxjs/operator/takeLast': 'Rx.Observable.prototype',
  'rxjs/operator/takeUntil': 'Rx.Observable.prototype',
  'rxjs/operator/takeWhile': 'Rx.Observable.prototype',
  'rxjs/operator/throttle': 'Rx.Observable.prototype',
  'rxjs/operator/throttleTime': 'Rx.Observable.prototype',
  'rxjs/operator/timeInterval': 'Rx.Observable.prototype',
  'rxjs/operator/timeout': 'Rx.Observable.prototype',
  'rxjs/operator/timeoutWith': 'Rx.Observable.prototype',
  'rxjs/operator/timestamp': 'Rx.Observable.prototype',
  'rxjs/operator/toArray': 'Rx.Observable.prototype',
  'rxjs/operator/toPromise': 'Rx.Observable.prototype',
  'rxjs/operator/window': 'Rx.Observable.prototype',
  'rxjs/operator/windowCount': 'Rx.Observable.prototype',
  'rxjs/operator/windowToggle': 'Rx.Observable.prototype',
  'rxjs/operator/windowWhen': 'Rx.Observable.prototype',
  'rxjs/operator/withLatestFrom': 'Rx.Observable.prototype',
  'rxjs/operator/zipAll': 'Rx.Observable.prototype',
  'rxjs/operator/zipProto': 'Rx.Observable.prototype',
  'rxjs/operators': 'Rx.operators',
  'rxjs/symbol/iterator': 'Rx.Symbol',
  'rxjs/symbol/observable': 'Rx.Symbol',
  'rxjs/symbol/rxSubscriber': 'Rx.Symbol',
  'underscore': '-',
  'ht-utility': 'htUtility',
  'moment-mini': 'moment',
  'ht-models': 'htModels'
}

export default {
  input: `dist/es/${libraryName}.js`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd'},
    { file: pkg.module, format: 'es'},
  ],
  // sourcemap: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: Object.keys(globals),
  globals,
  watch: {
    include: 'dist/es/**',
  },
  plugins: [
    {
      name: 'replace moment imports',
      transform: code =>
        ({
          code: code.replace(/import\s*\*\s*as\s*moment/g, 'import moment'),
          map: { mappings: '' }
        })
    },
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    // sourceMaps(),
  ],
};


