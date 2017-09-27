(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ht"] = factory();
	else
		root["ht"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(8);
var config_1 = __webpack_require__(19);
var moment = __webpack_require__(4);
var defaults_1 = __webpack_require__(3);
exports.GetBaseUrl = function (env) {
    if (env === void 0) { env = 'production'; }
    return config_1.config[env] ? config_1.config[env].baseUrl : "";
};
function GetReqOpt(pk) {
    return {
        headers: {
            "authorization": "token " + pk,
            "content-type": "application/json",
            "X-Hypertrack-Client": "hypertrack/javascript-SDK"
        }
    };
}
exports.GetReqOpt = GetReqOpt;
function GetLatLng(place, key) {
    if (key === void 0) { key = 'location'; }
    if (!place || !place[key])
        return null;
    return new google.maps.LatLng(place[key].coordinates[1], place[key].coordinates[0]);
}
exports.GetLatLng = GetLatLng;
function FetchAction(actionId, pk) {
    return $.ajax(__assign({ url: exports.GetBaseUrl() + "actions/" + actionId + "/detailed/" }, GetReqOpt(pk)));
}
exports.FetchAction = FetchAction;
function SetMap(item, map) {
    if (!item.getMap())
        item.setMap(map);
}
exports.SetMap = SetMap;
function RenderGoogleMap(mapId, mapOptions, origin) {
    var googleMapOptions = __assign({}, defaults_1.DefaultGoogleMapOptions);
    if (mapOptions.gMapsStyle) {
        googleMapOptions.styles = mapOptions.gMapsStyle;
    }
    if (origin) {
        googleMapOptions.center = origin;
    }
    return new google.maps.Map(document.getElementById(mapId), googleMapOptions);
}
exports.RenderGoogleMap = RenderGoogleMap;
function GetActionsBounds(actions) {
    var bounds = new google.maps.LatLngBounds();
    actions.forEach(function (action) {
        if (action.encoded_polyline) {
            var polylineArray = google.maps.geometry.encoding.decodePath(action.encoded_polyline);
            polylineArray.forEach(function (latLngPoint) {
                bounds.extend(latLngPoint);
            });
        }
    });
    return bounds;
}
exports.GetActionsBounds = GetActionsBounds;
function addISOTime(time, timeToAdd) {
    return moment(time).add(timeToAdd, 'milliseconds').toISOString();
}
exports.addISOTime = addISOTime;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var style_1 = __webpack_require__(21);
exports.Assets = {
    destination: __webpack_require__(26),
    destinationNoEta: __webpack_require__(27),
    startPosition: __webpack_require__(29),
    endPosition: __webpack_require__(28),
    motorcycle: __webpack_require__(31),
    vehicleCar: __webpack_require__(30),
    defaultHeroMarker: __webpack_require__(25),
};
exports.MarkerAssets = {
    startPosition: function () {
        var img = exports.Assets.startPosition;
        return "\n          <div style=\"" + style_1.Style.startMarker + style_1.Style.noSelect + "\">\n              <img height=\"20px\" src=\"" + img + "\" alt=\"\">\n          </div>\n        ";
    },
    endPosition: function () {
        var img = exports.Assets.endPosition;
        return "\n            <div style=\"" + style_1.Style.endMarker + style_1.Style.noSelect + "\">\n                <img height=\"20px\" src=\"" + img + "\" alt=\"\">\n            </div>\n        ";
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(2);
exports.DefaultGMapsStyle = [
    {
        "stylers": [
            {
                "saturation": -100
            }
        ]
    }
];
var gestureHandling = 'greedy';
exports.DefaultGoogleMapOptions = {
    zoom: 14,
    disableDefaultUI: true,
    scrollwheel: true,
    scaleControl: false,
    clickableIcons: false,
    gestureHandling: gestureHandling,
    center: new google.maps.LatLng(37.370641488030245, -122.07498079040533),
    styles: exports.DefaultGMapsStyle
};
exports.DefaultPolylineOptions = {
    strokeColor: "rgb(223, 92, 193)",
    strokeOpacity: 1,
    strokeWeight: 3,
    icons: []
};
exports.DefaultVehicleIcon = {
    src: assets_1.Assets.defaultHeroMarker,
    height: '30px'
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

var some$1 = some;

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var keys$1 = keys;

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

var indexOf$1 = indexOf;

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            !(function webpackMissingModule() { var e = new Error("Cannot find module \"./locale\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) { }
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys$1(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) { // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];

            if (match[1].substr(0,3) !== momentDay) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2: // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') +
        'P' +
        (Y ? Y + 'Y' : '') +
        (M ? M + 'M' : '') +
        (D ? D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? h + 'H' : '') +
        (m ? m + 'M' : '') +
        (s ? s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.18.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var richmarker_1 = __webpack_require__(22);
var CustomRichMarker = (function () {
    function CustomRichMarker(content) {
        this.marker = richmarker_1.Richmarker({
            flat: true
        }, 'MIDDLE');
        this.setMarkerDiv(content);
    }
    CustomRichMarker.prototype.render = function (position, map, content) {
        if (map && position) {
            this.setPosition(position);
            this.setMarkerDiv(content);
            this.marker.setMap(map);
        }
    };
    CustomRichMarker.prototype.setMap = function (map) {
        if (map) {
            this.marker.setMap(map);
        }
    };
    CustomRichMarker.prototype.setPosition = function (position) {
        this.marker.setPosition(position);
    };
    CustomRichMarker.prototype.setMarkerDiv = function (content) {
        if (content) {
            this.marker.setContent(content);
        }
    };
    CustomRichMarker.prototype.getMap = function () {
        return this.marker.getMap();
    };
    CustomRichMarker.prototype.clear = function () {
        this.marker.setMap(null);
    };
    CustomRichMarker.prototype.getPosition = function () {
        return this.marker.getPosition();
    };
    return CustomRichMarker;
}());
exports.CustomRichMarker = CustomRichMarker;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Polyline = __webpack_require__(15);
var _ = __webpack_require__(1);
var TimeAwarePolyline = (function () {
    function TimeAwarePolyline(encodedPolyline) {
        if (encodedPolyline === void 0) { encodedPolyline = ''; }
        this.updateTimeAwarePolyline(encodedPolyline);
    }
    TimeAwarePolyline.prototype.updateTimeAwarePolyline = function (encodedPolyline) {
        if (encodedPolyline && this.isNewPolyline(encodedPolyline)) {
            this.encodedPolyline = encodedPolyline;
            this.timeAwarePolyline = Polyline.decodeTimeAwarePolyline(this.encodedPolyline);
        }
    };
    TimeAwarePolyline.prototype.getPolylineToTime = function (timestamp) {
        return Polyline.getLocationsElapsedByTimestamp(this.timeAwarePolyline, timestamp);
    };
    TimeAwarePolyline.prototype.getLatestTime = function () {
        if (this.timeAwarePolyline && this.timeAwarePolyline.length > 0) {
            return _.last(this.timeAwarePolyline)[2];
        }
        else {
            return null;
        }
    };
    TimeAwarePolyline.prototype.isNewPolyline = function (encodedPolyline) {
        return encodedPolyline != this.encodedPolyline;
    };
    TimeAwarePolyline.prototype.getPolylinePathDataArray = function () {
        if (this.timeAwarePolyline && this.timeAwarePolyline.length > 0) {
            var last = this.getLatestTime();
            return this.getPolylineToTime(last).path;
        }
        return [];
    };
    return TimeAwarePolyline;
}());
exports.TimeAwarePolyline = TimeAwarePolyline;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(8);
var helpers_1 = __webpack_require__(0);
var actions_helper_1 = __webpack_require__(17);
var track_data_1 = __webpack_require__(9);
var HTTrackActions = (function () {
    function HTTrackActions(identifier, identifierType, pk, options) {
        var _this = this;
        this.identifier = identifier;
        this.identifierType = identifierType;
        this.pk = pk;
        this.options = options;
        this.trackActions = {};
        this.trackMultipleData = {};
        this.fetchActionsFromIdentifier(identifier, identifierType, function (data) {
            _this.initTracking(data, identifier, identifierType);
        });
    }
    HTTrackActions.prototype.initTracking = function (data, identifier, identifierType) {
        var _this = this;
        var actions = this.extractActionsFromResult(data);
        this.renderMap(actions);
        this.trackActionsOnMap(actions);
        if (this.options.onReady) {
            this.options.onReady(this.trackMultipleData, actions, this.map);
        }
        this.fetchSubaccountFromIdentifier(identifier, identifierType, function (subAccount) {
            if (_this.options.onAccountReady) {
                _this.options.onAccountReady(subAccount, actions);
            }
        });
        this.pollActionsFromIdentifier(identifier, identifierType);
    };
    HTTrackActions.prototype.extractActionsFromResult = function (data) {
        var actions = [];
        data.results.forEach(function (result) {
            var actionsWithAccount = result.actions.map(function (action) {
                return __assign({}, action, { account: result.account });
            });
            actions.push.apply(actions, actionsWithAccount);
        });
        return actions;
    };
    HTTrackActions.prototype.renderMap = function (actions) {
        var initialBounds = helpers_1.GetActionsBounds(actions);
        var initialCenter = (initialBounds && !initialBounds.isEmpty()) ? initialBounds.getCenter() : null;
        this.map = helpers_1.RenderGoogleMap(this.options.mapId, this.options.mapOptions, initialCenter);
    };
    HTTrackActions.prototype.fetchActionsFromIdentifier = function (identifier, identifierType, cb) {
        var _this = this;
        var url = this.getTrackActionsURL(identifier, identifierType);
        $.ajax(__assign({ url: url }, helpers_1.GetReqOpt(this.pk))).then(function (data) {
            cb(data);
        }, function (err) {
            _this.options.onError && _this.options.onError(err);
        });
    };
    HTTrackActions.prototype.fetchSubaccountFromIdentifier = function (identifier, identifierType, cb) {
        var _this = this;
        var url = this.getSubaccountFromIdentifierURL(identifier, identifierType);
        $.ajax(__assign({ url: url }, helpers_1.GetReqOpt(this.pk))).then(function (data) {
            cb(data);
        }, function (err) {
            _this.options.onError && _this.options.onError(err);
        });
    };
    HTTrackActions.prototype.pollActionsFromIdentifier = function (identifier, identifierType) {
        var _this = this;
        this.pollActionsTimeoutId = setTimeout(function () {
            _this.fetchActionsFromIdentifier(identifier, identifierType, function (data) {
                var actions = _this.extractActionsFromResult(data);
                _this.trackActionsOnMap(actions);
                _this.options.onUpdate(_this.trackMultipleData, actions);
                _this.pollActionsFromIdentifier(identifier, identifierType);
            });
        }, 2000);
    };
    HTTrackActions.prototype.trackActionsOnMap = function (actions) {
        var _this = this;
        actions.forEach(function (action) {
            // if (this.trackActions[action.id]) {
            //   this.trackActions[action.id].update(action);
            // } else {
            //   this.trackActions[action.id] = new TrackedAction(action, this.map, this.options.mapOptions);
            // }
            var trackingData = actions_helper_1.actionToTrackingData(action);
            if (_this.trackMultipleData[trackingData.id]) {
                _this.trackMultipleData[trackingData.id].track(trackingData);
            }
            else {
                _this.trackMultipleData[trackingData.id] = new track_data_1.TrackData(trackingData, _this.map, _this.options.mapOptions);
            }
        });
    };
    HTTrackActions.prototype.getTrackActionsURL = function (identifier, identifierType) {
        switch (identifierType) {
            case 'shortCode':
                return helpers_1.GetBaseUrl() + "actions/track/?short_code=" + identifier;
            case 'lookupId':
                return helpers_1.GetBaseUrl() + "actions/track/?lookup_id=" + identifier;
            case 'actionId':
                return helpers_1.GetBaseUrl() + "actions/track/?id=" + identifier;
            default:
                return helpers_1.GetBaseUrl() + "actions/track/?short_code=" + identifier;
        }
    };
    HTTrackActions.prototype.getSubaccountFromIdentifierURL = function (identifier, identifierType) {
        switch (identifierType) {
            case 'shortCode':
                return helpers_1.GetBaseUrl() + "actions/deeplink/?short_code=" + identifier;
            case 'lookupId':
                return helpers_1.GetBaseUrl() + "actions/deeplink/?lookup_id=" + identifier;
            case 'actionId':
                return helpers_1.GetBaseUrl() + "actions/deeplink/?action_id=" + identifier;
            default:
                return helpers_1.GetBaseUrl() + "actions/track/?short_code=" + identifier;
        }
    };
    return HTTrackActions;
}());
exports.HTTrackActions = HTTrackActions;
function trackActions(identifier, identifierType, pk, options) {
    return new HTTrackActions(identifier, identifierType, pk, options);
}
exports.trackActions = trackActions;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(1);
var custom_marker_1 = __webpack_require__(5);
var assets_1 = __webpack_require__(2);
var helpers_1 = __webpack_require__(0);
var defaults_1 = __webpack_require__(3);
var time_aware_animation_data_1 = __webpack_require__(23);
var time_aware_polyline_1 = __webpack_require__(6);
var TrackData = (function () {
    function TrackData(trackData, map, mapOptions) {
        this.trackData = trackData;
        this.map = map;
        this.mapOptions = mapOptions;
        this.startMarker = new custom_marker_1.CustomRichMarker(assets_1.MarkerAssets.startPosition());
        this.endMarker = new custom_marker_1.CustomRichMarker(assets_1.MarkerAssets.endPosition());
        this.destinationMarker = new custom_marker_1.CustomRichMarker(assets_1.MarkerAssets.endPosition());
        this.userMarker = new custom_marker_1.CustomRichMarker();
        this.mapPolyline = new google.maps.Polyline(defaults_1.DefaultPolylineOptions);
        if (!trackData || !map)
            return;
        var vehicleIcon = this.getVehicleAssetDetails(trackData, mapOptions);
        this.timeAwareAnimation = new time_aware_animation_data_1.default(this.map, this.mapPolyline, this.userMarker, vehicleIcon);
        this.track(trackData);
    }
    TrackData.prototype.getVehicleAssetDetails = function (data, mapOptions) {
        if (data === void 0) { data = this.trackData; }
        if (mapOptions === void 0) { mapOptions = this.mapOptions; }
        if (mapOptions.vehicleIcon) {
            return {
                src: mapOptions.vehicleIcon.src,
                height: mapOptions.vehicleIcon.height
            };
        }
        var img = assets_1.Assets.defaultHeroMarker;
        var height = '30px';
        var actionVehicleType = data.vehicleType;
        switch (actionVehicleType) {
            case 'car':
                img = assets_1.Assets.vehicleCar;
                height = '50px';
                break;
            case 'motorcycle':
                img = assets_1.Assets.motorcycle;
                height = '50px';
                break;
            default:
                img = assets_1.Assets.defaultHeroMarker;
                break;
        }
        return {
            src: img,
            height: height
        };
    };
    TrackData.prototype.renderSummaryData = function (encodedTimeAwarePolyline) {
        this.renderEncodedPolyline(encodedTimeAwarePolyline);
        this.renderStartMarker(encodedTimeAwarePolyline);
        this.renderEndMarker(encodedTimeAwarePolyline);
    };
    TrackData.prototype.renderLiveData = function (encodedTimeAwarePolyline, destination) {
        this.timeAwareAnimation.animate(encodedTimeAwarePolyline);
        this.renderDestinationMarker(destination);
        this.renderStartMarker(encodedTimeAwarePolyline);
    };
    TrackData.prototype.renderEncodedPolyline = function (encodedTimeAwarePolyline) {
        if (encodedTimeAwarePolyline) {
            var polylineArray = this.getTimeAwarePolylinePathArray(encodedTimeAwarePolyline);
            var polylineLatLngArray = polylineArray.map(function (value) {
                return (new google.maps.LatLng(value[0], value[1]));
            });
            this.mapPolyline.setPath(polylineLatLngArray);
            if (!this.mapPolyline.getMap()) {
                this.mapPolyline.setMap(this.map);
            }
        }
    };
    TrackData.prototype.renderStartMarker = function (encodedTimeAwarePolyline) {
        if (encodedTimeAwarePolyline) {
            var polylineArray = this.getTimeAwarePolylinePathArray(encodedTimeAwarePolyline);
            var startPoint = _.first(polylineArray);
            var startPosition = new google.maps.LatLng(startPoint[0], startPoint[1]);
            this.startMarker.setPosition(startPosition);
            if (!this.startMarker.getMap()) {
                this.startMarker.setMap(this.map);
            }
        }
    };
    TrackData.prototype.getTimeAwarePolylinePathArray = function (encodedTimeAwarePolyline) {
        if (encodedTimeAwarePolyline) {
            var decodedTimeAwarePolyline = new time_aware_polyline_1.TimeAwarePolyline(encodedTimeAwarePolyline);
            return decodedTimeAwarePolyline.getPolylinePathDataArray();
        }
        return [];
    };
    TrackData.prototype.renderEndMarker = function (encodedTimeAwarePolyline) {
        if (encodedTimeAwarePolyline) {
            var polylineArray = this.getTimeAwarePolylinePathArray(encodedTimeAwarePolyline);
            var endPoint = _.last(polylineArray);
            var endPosition = new google.maps.LatLng(endPoint[0], endPoint[1]);
            this.endMarker.setPosition(endPosition);
            if (!this.endMarker.getMap()) {
                this.endMarker.setMap(this.map);
            }
        }
    };
    TrackData.prototype.renderDestinationMarker = function (destination) {
        if (destination) {
            var destinationPosition = helpers_1.GetLatLng(destination);
            if (destinationPosition) {
                this.destinationMarker.setPosition(destinationPosition);
            }
            if (destinationPosition && !this.destinationMarker.getMap()) {
                this.destinationMarker.setMap(this.map);
            }
        }
        else {
            this.destinationMarker.clear();
        }
    };
    TrackData.prototype.clearLiveView = function () {
        this.timeAwareAnimation.clearAnimationPoll();
        this.destinationMarker.clear();
        this.userMarker.clear();
    };
    TrackData.prototype.clearSummaryView = function () {
        this.startMarker.setMap(null);
        this.endMarker.setMap(null);
        this.destinationMarker.setMap(null);
    };
    TrackData.prototype.fitToBounds = function (latLngPoints, bottomPadding) {
        var bounds = new google.maps.LatLngBounds();
        latLngPoints.forEach(function (latLngPoint) {
            bounds.extend(latLngPoint);
        });
        this.map.fitBounds(bounds);
        this.fitToBoundsWithBottomPadding(latLngPoints, bottomPadding);
    };
    TrackData.prototype.fitToBoundsWithBottomPadding = function (latLngs, bottomPadding) {
        var _this = this;
        var bounds = new google.maps.LatLngBounds();
        latLngs.forEach(function (latLng) {
            bounds.extend(latLng);
            if (bottomPadding) {
                bounds.extend(_this.latLngYOffset(latLng, bottomPadding));
            }
        });
        this.map.fitBounds(bounds);
    };
    TrackData.prototype.latLngYOffset = function (latLng, yOffset) {
        var projection = this.map.getProjection();
        if (projection) {
            var markerPoint = new google.maps.Point(projection.fromLatLngToPoint(latLng).x, projection.fromLatLngToPoint(latLng).y - yOffset / (Math.pow(2, this.map.getZoom())));
            return projection.fromPointToLatLng(markerPoint);
        }
        return latLng;
    };
    TrackData.prototype.extendBoundsWithBottomOffset = function (bounds, bottomOffset) {
        var southWest = bounds.getSouthWest();
        var extendedPosition = this.latLngYOffset(southWest, bottomOffset);
        bounds.extend(extendedPosition);
        return bounds;
    };
    TrackData.prototype.extendBoundsWithTopOffset = function (bounds, topOffset) {
        var northEast = bounds.getNorthEast();
        var extendedPosition = this.latLngYOffset(northEast, topOffset);
        bounds.extend(extendedPosition);
        return bounds;
    };
    TrackData.prototype.resetBounds = function (bottomPadding, topPadding) {
        if (bottomPadding === void 0) { bottomPadding = this.mapOptions.bottomPadding || 0; }
        if (topPadding === void 0) { topPadding = this.mapOptions.topPadding || 0; }
        var isLive = this.trackData.isLive;
        if (!isLive) {
            if (this.mapPolyline && this.mapPolyline.getPath()) {
                var polylineArray = this.mapPolyline.getPath().getArray();
                this.fitToBounds(polylineArray, bottomPadding);
            }
        }
        else {
            var bounds = new google.maps.LatLngBounds();
            if (this.destinationMarker.getMap() && this.destinationMarker.getPosition()) {
                bounds.extend(this.destinationMarker.getPosition());
            }
            if (this.userMarker.getPosition() && this.userMarker.getMap()) {
                bounds.extend(this.userMarker.getPosition());
            }
            this.map.fitBounds(bounds);
            bounds = this.extendBoundsWithBottomOffset(bounds, bottomPadding);
            bounds = this.extendBoundsWithTopOffset(bounds, topPadding);
            this.map.fitBounds(bounds);
        }
    };
    TrackData.prototype.clearMap = function () {
        this.clearLiveView();
        this.clearSummaryView();
        this.mapPolyline.setMap(null);
    };
    TrackData.prototype.track = function (trackData, mapOptions) {
        if (trackData === void 0) { trackData = this.trackData; }
        if (mapOptions === void 0) { mapOptions = this.mapOptions; }
        this.mapOptions = mapOptions;
        this.trackData = trackData;
        if (trackData.isLive) {
            this.renderLiveData(trackData.encodedTimeAwarePolyline, trackData.destination);
        }
        else {
            this.clearLiveView();
            this.renderSummaryData(trackData.encodedTimeAwarePolyline);
        }
    };
    return TrackData;
}());
exports.TrackData = TrackData;
function trackDataOnMap(data, map, options) {
    return new TrackData(data, map, options);
}
exports.trackDataOnMap = trackDataOnMap;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var track_actions_1 = __webpack_require__(7);
var TrackActionId = (function () {
    function TrackActionId(actionId, pk, options) {
        this.actionId = actionId;
        this.pk = pk;
        this.options = options;
    }
    TrackActionId.prototype.init = function () {
        this.trackActions = new track_actions_1.HTTrackActions(this.actionId, 'actionId', this.pk, this.options);
        return this.trackActions;
    };
    return TrackActionId;
}());
exports.TrackActionId = TrackActionId;
function trackActionId(actionId, pk, options) {
    var trackActionId = new TrackActionId(actionId, pk, options);
    return trackActionId.init();
}
exports.trackActionId = trackActionId;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(1);
var custom_marker_1 = __webpack_require__(5);
var assets_1 = __webpack_require__(2);
var time_aware_animation_1 = __webpack_require__(24);
var helpers_1 = __webpack_require__(0);
var defaults_1 = __webpack_require__(3);
var TrackedAction = (function () {
    function TrackedAction(action, map, mapOptions) {
        this.action = action;
        this.map = map;
        this.mapOptions = mapOptions;
        this.startMarker = new custom_marker_1.CustomRichMarker(assets_1.MarkerAssets.startPosition());
        this.endMarker = new custom_marker_1.CustomRichMarker(assets_1.MarkerAssets.endPosition());
        this.destinationMarker = new custom_marker_1.CustomRichMarker(assets_1.MarkerAssets.endPosition());
        this.mapPolyline = new google.maps.Polyline(defaults_1.DefaultPolylineOptions);
        this.userMarker = new custom_marker_1.CustomRichMarker();
        if (!action || !map)
            return;
        this.timeAwareAnimation = new time_aware_animation_1.TimeAwareAnimation(this.map, action, this.userMarker, this.mapPolyline, mapOptions);
        this.showOnMap(action);
    }
    TrackedAction.prototype.showOnMap = function (action) {
        if (action === void 0) { action = this.action; }
        if (action.display.show_summary) {
            this.renderSummary(action);
        }
        else {
            this.renderLive(action);
        }
    };
    TrackedAction.prototype.renderSummary = function (action) {
        if (action === void 0) { action = this.action; }
        this.renderEncodedPolyline(action);
        this.renderStartMarker(action);
        this.renderEndMarker(action);
    };
    TrackedAction.prototype.renderLive = function (action) {
        if (action === void 0) { action = this.action; }
        this.timeAwareAnimation.start(action);
        this.renderDestinationMarker(action);
        this.renderStartMarker(action);
    };
    TrackedAction.prototype.renderEncodedPolyline = function (action) {
        if (action.encoded_polyline) {
            var polylineArray = google.maps.geometry.encoding.decodePath(action.encoded_polyline);
            this.mapPolyline.setPath(polylineArray);
            if (!this.mapPolyline.getMap()) {
                this.mapPolyline.setMap(this.map);
            }
        }
    };
    TrackedAction.prototype.renderStartMarker = function (action) {
        if (action === void 0) { action = this.action; }
        if (action.encoded_polyline) {
            var polylineArray = google.maps.geometry.encoding.decodePath(action.encoded_polyline);
            var startPoint = _.first(polylineArray);
            var startPosition = new google.maps.LatLng(startPoint.lat(), startPoint.lng());
            this.startMarker.setPosition(startPosition);
            if (!this.startMarker.getMap()) {
                this.startMarker.setMap(this.map);
            }
        }
    };
    TrackedAction.prototype.renderEndMarker = function (action) {
        if (action === void 0) { action = this.action; }
        if (this.action.encoded_polyline) {
            var polylineArray = google.maps.geometry.encoding.decodePath(action.encoded_polyline);
            var endPoint = _.last(polylineArray);
            var endPosition = new google.maps.LatLng(endPoint.lat(), endPoint.lng());
            this.endMarker.setPosition(endPosition);
            if (!this.endMarker.getMap()) {
                this.endMarker.setMap(this.map);
            }
        }
    };
    TrackedAction.prototype.renderDestinationMarker = function (action) {
        if (action === void 0) { action = this.action; }
        var finalPlace = action.completed_place || action.expected_place;
        if (finalPlace) {
            var destinationPosition = helpers_1.GetLatLng(finalPlace);
            if (destinationPosition) {
                this.destinationMarker.setPosition(destinationPosition);
            }
            if (destinationPosition && !this.destinationMarker.getMap()) {
                this.destinationMarker.setMap(this.map);
            }
            // this.destinationMarker.render(destinationPosition, this.map);
        }
        else {
            this.destinationMarker.clear();
        }
    };
    TrackedAction.prototype.clearLiveView = function () {
        this.timeAwareAnimation.clearAnimationPoll();
        this.destinationMarker.clear();
        this.userMarker.clear();
    };
    TrackedAction.prototype.fitToBounds = function (latLngPoints, bottomPadding) {
        var bounds = new google.maps.LatLngBounds();
        latLngPoints.forEach(function (latLngPoint) {
            bounds.extend(latLngPoint);
        });
        this.map.fitBounds(bounds);
        this.fitToBoundsWithBottomPadding(latLngPoints, bottomPadding);
    };
    TrackedAction.prototype.fitToBoundsWithBottomPadding = function (latLngs, bottomPadding) {
        var _this = this;
        var bounds = new google.maps.LatLngBounds();
        latLngs.forEach(function (latLng) {
            bounds.extend(latLng);
            if (bottomPadding) {
                bounds.extend(_this.latLngYOffset(latLng, bottomPadding));
            }
        });
        this.map.fitBounds(bounds);
    };
    TrackedAction.prototype.latLngYOffset = function (latLng, yOffset) {
        var projection = this.map.getProjection();
        if (projection) {
            var markerPoint = new google.maps.Point(projection.fromLatLngToPoint(latLng).x, projection.fromLatLngToPoint(latLng).y - yOffset / (Math.pow(2, this.map.getZoom())));
            return projection.fromPointToLatLng(markerPoint);
        }
        return latLng;
    };
    TrackedAction.prototype.extendBoundsWithBottomOffset = function (bounds, bottomOffset) {
        var southWest = bounds.getSouthWest();
        var extendedPosition = this.latLngYOffset(southWest, bottomOffset);
        bounds.extend(extendedPosition);
        return bounds;
    };
    TrackedAction.prototype.extendBoundsWithTopOffset = function (bounds, topOffset) {
        var northEast = bounds.getNorthEast();
        var extendedPosition = this.latLngYOffset(northEast, topOffset);
        bounds.extend(extendedPosition);
        return bounds;
    };
    TrackedAction.prototype.resetBounds = function (bottomPadding, topPadding) {
        if (bottomPadding === void 0) { bottomPadding = this.mapOptions.bottomPadding || 0; }
        if (topPadding === void 0) { topPadding = this.mapOptions.topPadding || 0; }
        if (this.action.display.show_summary) {
            if (this.action.encoded_polyline) {
                var polylineArray = google.maps.geometry.encoding.decodePath(this.action.encoded_polyline);
                this.fitToBounds(polylineArray, bottomPadding);
            }
        }
        else {
            var bounds = new google.maps.LatLngBounds();
            if (this.destinationMarker.getMap() && this.destinationMarker.getPosition()) {
                bounds.extend(this.destinationMarker.getPosition());
            }
            var userMarker = this.timeAwareAnimation.getUserMarker();
            if (userMarker.getPosition() && userMarker.getMap()) {
                bounds.extend(userMarker.getPosition());
            }
            this.map.fitBounds(bounds);
            bounds = this.extendBoundsWithBottomOffset(bounds, bottomPadding);
            bounds = this.extendBoundsWithTopOffset(bounds, topPadding);
            this.map.fitBounds(bounds);
        }
    };
    TrackedAction.prototype.update = function (action) {
        this.action = action;
        if (action.display.show_summary) {
            this.clearLiveView();
            this.renderSummary(action);
        }
        else {
            this.renderDestinationMarker(action);
            this.renderStartMarker(action);
            this.timeAwareAnimation.update(action);
        }
    };
    TrackedAction.prototype.updateMapOptions = function (mapOptions) {
        this.mapOptions = __assign({}, this.mapOptions, mapOptions);
    };
    TrackedAction.prototype.hideOnMap = function () {
        this.clearLiveView();
        this.startMarker.setMap(null);
        this.endMarker.setMap(null);
        this.destinationMarker.setMap(null);
        this.mapPolyline.setMap(null);
        this.userMarker.setMap(null);
    };
    TrackedAction.prototype.updateUserMarkerIcon = function (icon) {
        this.mapOptions = __assign({}, this.mapOptions, { vehicleIcon: __assign({}, this.mapOptions.vehicleIcon, { src: icon }) });
    };
    return TrackedAction;
}());
exports.TrackedAction = TrackedAction;
function trackActionOnMap(action, map, options) {
    return new TrackedAction(action, map, options);
}
exports.trackActionOnMap = trackActionOnMap;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(0);
var track_data_1 = __webpack_require__(9);
var TrackByData = (function () {
    function TrackByData(dataArray, options) {
        this.dataArray = dataArray;
        this.options = options;
        this.trackedData = {};
        this.renderMap();
        this.track(dataArray);
        if (this.options.onReady) {
            this.options.onReady(this.trackedData, dataArray, this.map);
        }
    }
    TrackByData.prototype.renderMap = function () {
        this.map = helpers_1.RenderGoogleMap(this.options.mapId, this.options.mapOptions);
    };
    TrackByData.prototype.track = function (dataArray, mapOptions) {
        var _this = this;
        if (mapOptions === void 0) { mapOptions = this.options.mapOptions; }
        dataArray.forEach(function (data) {
            var trackingData = data;
            if (_this.trackedData[trackingData.id]) {
                _this.trackedData[trackingData.id].track(trackingData);
            }
            else {
                _this.trackedData[trackingData.id] = new track_data_1.TrackData(trackingData, _this.map, mapOptions);
            }
        });
    };
    return TrackByData;
}());
exports.TrackByData = TrackByData;
function trackByData(dataArray, options) {
    return new TrackByData(dataArray, options);
}
exports.trackByData = trackByData;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var track_actions_1 = __webpack_require__(7);
var TrackLookupId = (function () {
    function TrackLookupId(lookupId, pk, options) {
        this.lookupId = lookupId;
        this.pk = pk;
        this.options = options;
    }
    TrackLookupId.prototype.init = function () {
        this.trackActions = new track_actions_1.HTTrackActions(this.lookupId, 'lookupId', this.pk, this.options);
        return this.trackActions;
    };
    return TrackLookupId;
}());
exports.TrackLookupId = TrackLookupId;
function trackLookupId(lookupId, pk, options) {
    var trackLookupId = new TrackLookupId(lookupId, pk, options);
    return trackLookupId.init();
}
exports.trackLookupId = trackLookupId;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var track_actions_1 = __webpack_require__(7);
var TrackShortCode = (function () {
    function TrackShortCode(shortCode, pk, options) {
        this.shortCode = shortCode;
        this.pk = pk;
        this.options = options;
    }
    TrackShortCode.prototype.init = function () {
        this.trackActions = new track_actions_1.HTTrackActions(this.shortCode, 'shortCode', this.pk, this.options);
        return this.trackActions;
    };
    return TrackShortCode;
}());
exports.TrackShortCode = TrackShortCode;
function trackShortCode(shortCode, pk, options) {
    var trackShortCode = new TrackShortCode(shortCode, pk, options);
    return trackShortCode.init();
}
exports.trackShortCode = trackShortCode;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
* Methods for encoding and decoding time aware polylines
*
* @module polyline
*/

var polyline = {};


var EARTH_RADIUS = 6371;


/**
* Encodes a time aware polyline
*/
polyline.encodeTimeAwarePolyline = function(points) {
    return extendTimeAwarePolyline("", points, null);
}

/**
* Decodes a time aware polyline
*/
polyline.decodeTimeAwarePolyline = function(polyline) {
    // Method to decode a time aware polyline and return gpx logs
    var gpxLogs = [];
    var index = 0;
    var lat = 0;
    var lng = 0;
    var timeStamp = 0;
    var polylineLine = polyline.length;

    while (index < polylineLine) {
        // Decoding dimensions one by one
        var latResult = getDecodedDimensionFromPolyline(polyline, index);
        index = latResult[0];
        var lngResult = getDecodedDimensionFromPolyline(polyline, index);
        index = lngResult[0];
        var timeResult = getDecodedDimensionFromPolyline(polyline, index);
        index = timeResult[0];

        // Resultant variables
        lat += latResult[1];
        lng += lngResult[1];
        timeStamp += timeResult[1];
        gpxLogs.push(getGpxLog(lat, lng, timeStamp));
    }

    return gpxLogs;
}

/**
* Get locations for a list of timestamps from a decoded polyline
*/
polyline.getLocationsAtTimestamps = function(decodedTimeAwarePolyline, timeStamps) {
    var index = 0, locations = [];

    for (index = 0; index < timeStamps.length; index++) {
        var locationsAndBearing = getLocationsTillTimeStamp(decodedTimeAwarePolyline, timeStamps[index]);
        var locationsFound = locationsAndBearing.locations;

        if (locationsFound.length > 0) {
            locations.push(locationsFound[locationsFound.length - 1]);
        } else {
            locations.push([]);
        }
    }

    return locations;
}

/**
* Decodes a time aware polyline to get locations traveled till a timestamp
* to build a live polyline
*/
polyline.getLocationsElapsedByTimestamp = function(decodedTimeAwarePolyline, timeStamp) {
    var locationsAndBearing = getLocationsTillTimeStamp(decodedTimeAwarePolyline, timeStamp);
    return {'path': locationsAndBearing.locations, 'bearing': locationsAndBearing.bearing};
}

/**
* Cut a decoded time aware polyline into segments
*/
polyline.getPolylineSegments = function(decodedTimeAwarePolyline) {
    var lastTimeStamp = decodedTimeAwarePolyline[decodedTimeAwarePolyline.length - 1][2]
    var polylineSegments = getPolylineSegments(decodedTimeAwarePolyline, lastTimeStamp);
    var result = [];

    for (var i=0; i < polylineSegments.length; i++) {
        result.push({'path': removeTimeStamps(polylineSegments[i].segment), 'style': polylineSegments[i].style});
    }

    return result;
}

/**
* Decode a polyline into segments of contiguous location data, which are solid,
* and gaps, which are dotted.
*/
polyline.getPolylineSegmentsForLocationsElapsed = function(decodedTimeAwarePolyline, timeStamp) {
    var polylineSegments = getPolylineSegments(decodedTimeAwarePolyline, timeStamp);
    var result = [];

    for (var i=0; i < polylineSegments.length; i++) {
        var elapsed = polyline.getLocationsElapsedByTimestamp(polylineSegments[i].segment, timeStamp);

        if (elapsed.path.length > 0) {
            result.push({
                'path': elapsed.path, 'bearing': elapsed.bearing, 'style': polylineSegments[i].style
            });
        }
    }

    return result;
}


// Helper methods

function extendTimeAwarePolyline(polyline, points, lastPoint) {
    var lastLat = 0, lastLng = 0, lastTimeStamp = 0;

    if (polyline == null) {
        polyline = '';
    }

    if (lastPoint != null) {
        lastLat = getLat(lastPoint);
        lastLng = getLng(lastPoint);
        lastTimeStamp = getTimeStamp(lastPoint);
    }

    if (points.length < 1) {
        return polyline
    }

    for (var i = 0; i < points.length; i++) {
        var currentGpxLog = points[i];
        var lat = getLat(currentGpxLog);
        var lng = getLng(currentGpxLog);
        var timeStamp = getTimeStamp(currentGpxLog);

        var diffArray = [lat - lastLat, lng - lastLng, timeStamp - lastTimeStamp];

        for (var j = 0; j < diffArray.length; j++) {
            var currentDiff = diffArray[j];
            currentDiff = (currentDiff < 0) ? notOperator(lshiftOperator(currentDiff, 1)) : lshiftOperator(currentDiff, 1);

            while (currentDiff >= 0x20) {
                polyline += String.fromCharCode((0x20 | (currentDiff & 0x1f)) + 63);
                currentDiff = rshiftOperator(currentDiff, 5);
            }

            polyline += String.fromCharCode(currentDiff + 63);
        }

        lastLat = lat, lastLng = lng, lastTimeStamp = timeStamp;
    }

    return polyline;
}

function getDecodedDimensionFromPolyline(polyline, index) {
    // Method to decode one dimension of the polyline
    var result = 1;
    var shift = 0;

    while (true) {
        var polylineChar = polyline[index];
        var b = polylineChar.charCodeAt(0) - 63 - 1;
        index ++;
        result += lshiftOperator(b, shift);
        shift += 5;

        if (b < 0x1f) {
            break;
        }
    }

    if ((result % 2) !== 0) {
        return [index, rshiftOperator(notOperator(result), 1)];
    } else {
        return [index, rshiftOperator(result, 1)];
    }
}

function getLocationsTillTimeStamp(decodedPolyline, timeStamp) {
    var decoded = decodedPolyline;
    // decoded and timeStamps are both in order of times

    var index = 0;
    var currentPair = [];
    var locationsElapsed = [];
    var bearing = 0;

    if (decoded.length == 0) {
        return {'locations': [], 'bearing': bearing};
    }

    // remove times before first time
    var timeStampToFind = timeStamp, startTime = decoded[0][2];

    while (timeStampToFind <= startTime) {
        return {'locations': [[decoded[0][0], decoded[0][1]]], 'bearing': bearing};
    }

    for (index = 0; index < decoded.length; index++) {
        currentPair.push(decoded[index]);

        if (currentPair.length == 2) {
            var timeStampToFind = timeStamp;
            bearing = updateBearing(bearing, currentPair)

            var startTime = currentPair[0][2], endTime = currentPair[1][2];

            if (timeStampToFind > startTime && timeStampToFind <= endTime) {
                // location is in the current pair
                var midLocation = getLocationInPair(currentPair, timeStampToFind);
                locationsElapsed.push(midLocation);
                return {'locations': locationsElapsed, 'bearing': bearing};

                // it is possible that the next timestamp is also in the
                // same pair, hence redo-ing same iteration
                currentPair.pop();
                index --;
            } else {
                currentPair.shift();
            }
        }

        locationsElapsed.push([currentPair[0][0], currentPair[0][1]]);
    }

    return {'locations': locationsElapsed, 'bearing': bearing};
}

polyline.getLocationsTillTimeStamp = getLocationsTillTimeStamp;

function isDifferentSegment(end, start) {
    // function to determine whether a polyline
    // segment split should happen
    var distance = getDistance(start, end);
    return distance > 500;
}

function getPolylineSegments(decoded, timeLimit) {
    // this method breaks polyline till timeStamp when
    // consecutive time difference is greater than 10 minutes
    var segments = [], currentSegment = [];
    var index = 0;

    if (decoded.length == 0) {
        return [];
    }

    var start = decoded[0];

    for (index = 0; index < decoded.length; index++) {
        if (decoded[index][2] <= timeLimit) {

            if (isDifferentSegment(decoded[index], start) && currentSegment.length > 0) {
                // time difference is more than 10 mins, so flush
                segments.push({
                    'segment': currentSegment, 'style': 'solid'
                });

                var lastElement = currentSegment[currentSegment.length-1];
                currentSegment = [lastElement, decoded[index]];

                segments.push({
                    'segment': currentSegment, 'style': 'dotted'
                });

                currentSegment = [decoded[index]];
            } else {
                currentSegment.push(decoded[index]);
            }

            start = decoded[index];
        } else {
            // add one more location so that the locations elapsed
            // method can find an interpolated midpoint
            if (!isDifferentSegment(decoded[index], start)) {
                currentSegment.push(decoded[index]);
            }
            break;
        }
    }

    segments.push({
        'segment': currentSegment, 'style': 'solid'
    });
    return segments;
}

function updateBearing(oldBearing, gpxPair) {
    var start = [gpxPair[0][0], gpxPair[0][1]];
    var end = [gpxPair[1][0], gpxPair[1][1]];
    var newBearing = computeHeading(start, end);

    if (newBearing != 0) {
        return Math.round(newBearing * 100) / 100.0;
    } else {
        return oldBearing;
    }
}

function getLocationInPair(gpxPair, timeStamp) {
    // timeStamp lies between the timeStamps in the gpx logs
    var startLat = gpxPair[0][0],
    startLng = gpxPair[0][1],
    endLat = gpxPair[1][0],
    endLng = gpxPair[1][1],
    startTime = new Date(gpxPair[0][2]),
    endTime = new Date(gpxPair[1][2]),
    currentTime = new Date(timeStamp);
    var gap = (startTime - endTime);
    var ratio = (startTime - currentTime) / gap;
    return gap == 0 ? [endLat, endLat] : [startLat * (1 - ratio) + endLat * ratio, startLng * (1 - ratio) + endLng * ratio];
}

function getNextLatLng(decoded, timeStamp) {
    var polylineLength = decoded.length;

    if (polylineLength > 0) {
        for (var index = 0; index < polylineLength - 1; index++) {
            var currentTimeStamp = decoded[index][2];

            if (timeStamp < currentTimeStamp) {
                return [decoded[index][0], decoded[index][1]];
            }
        }

        return [decoded[polylineLength - 1][0], decoded[polylineLength - 1][1]];
    }
}

function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
    return degree*Math.PI/180;
}

function computeHeading(start, end) {
    var lat1 = toRadian(start[0]);
    var lat2 = toRadian(end[0]);
    var lng1 = toRadian(start[1]);
    var lng2 = toRadian(end[1]);
    return Math.atan2( Math.sin(lng2-lng1) * Math.cos(lat2), Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1))*180/Math.PI;
}

function areEqualLatlngs(latlngA, latlngB) {
    return (latlngA[0] == latlngB[0]) && (latlngA[1] == latlngB[1]);
}

function removeTimeStamps(segment) {
    var result = [];
    for (var i = 0; i < segment.length; i++) {
        result.push([segment[i][0], segment[i][1]]);
    }
    return result;
}

// Methods to convert types

function getCoordinate(intRepresentation) {
    var coordinate = intRepresentation * 0.00001;
    return +coordinate.toFixed(5);
}

function getIsoTime(timeStamp) {
    // timeStamp is in seconds
    return new Date(timeStamp * 1000).toISOString();
}

function getGpxLog(lat, lng, timeStamp) {
    return [
        getCoordinate(lat), getCoordinate(lng), getIsoTime(timeStamp)
    ];
}

function getLat(gpxLog) {
    return Math.round(gpxLog[0] * 100000);
}

function getLng(gpxLog) {
    return Math.round(gpxLog[1] * 100000);
}

function getTimeStamp(gpxLog) {
    return +new Date(gpxLog[2]) / 1000;

}

// Override bit wise operators to circumvent 64 bit int issue

function lshiftOperator(num, bits) {
    // Custom left shift for 64 bit integers
    return num * Math.pow(2, bits);
}

function rshiftOperator(num, bits) {
    // Custom right shift for 64 bit integers
    return Math.floor(num / Math.pow(2, bits));
}

function notOperator(num) {
    // Custom not operator for 64 bit integers
    return ~num;
}


module.exports = polyline


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.actionToTrackingData = function (action) {
    return {
        id: action.id,
        encodedTimeAwarePolyline: action.time_aware_polyline,
        destination: action.expected_place,
        isLive: !action.display.show_summary,
        vehicleType: action.vehicle_type
    };
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = {
    green: '#85C487',
    red: '#E6413E',
    grey4: '#798E9B',
    black: '#000000',
    blue: '#008cee',
    car: "#5b5b5d",
    darkGreen: "rgb(67, 167, 71)",
    htPink: "#FF82DF"
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    local: {
        baseUrl: "http://localhost:8000/api/v1/",
    },
    staging: {
        baseUrl: "http://core-api-staging-10939710.us-east-1.elb.amazonaws.com/api/v1/",
    },
    production: {
        baseUrl: "https://api.hypertrack.com/api/v1/",
    },
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var track_short_code_1 = __webpack_require__(14);
exports.TrackShortCode = track_short_code_1.TrackShortCode;
exports.trackShortCode = track_short_code_1.trackShortCode;
var track_action_id_1 = __webpack_require__(10);
exports.TrackActionId = track_action_id_1.TrackActionId;
exports.trackActionId = track_action_id_1.trackActionId;
var track_action_1 = __webpack_require__(11);
exports.TrackedAction = track_action_1.TrackedAction;
exports.trackActionOnMap = track_action_1.trackActionOnMap;
var track_lookup_id_1 = __webpack_require__(13);
exports.TrackLookupId = track_lookup_id_1.TrackLookupId;
exports.trackLookupId = track_lookup_id_1.trackLookupId;
var track_by_data_1 = __webpack_require__(12);
exports.TrackByData = track_by_data_1.TrackByData;
exports.trackByData = track_by_data_1.trackByData;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = {
    noSelect: "-webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none; \n    -ms-user-select: none;\n    user-select: none; ",
    flexColumn: "display: flex; flex-direction: column",
    flexRow: "display: flex; flex-direction: row",
    destinationMarker: "display: flex; flex-direction: column; align-item: center; position: relative;",
    startMarker: "display: flex; flex-direction: column; align-item: center; position: relative;",
    endMarker: "display: flex; flex-direction: column; align-item: center; position: relative;",
    eta: "position: absolute;\n    top: 5px;\n    left: 4px;\n    height: 39px;\n    width: 39px;\n    border-radius: 50%;\n    display: flex;\n    font-size: 10px;\n    font-weight: 700;\n    color: #fff;"
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function Richmarker(options, position) {
    __webpack_require__(33);
    options = position ? __assign({}, options, { anchor: RichMarkerPosition[position] }) : options;
    return new RichMarker(options);
}
exports.Richmarker = Richmarker;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var time_aware_polyline_1 = __webpack_require__(6);
var custom_marker_1 = __webpack_require__(5);
var _ = __webpack_require__(1);
var moment = __webpack_require__(4);
var defaults_1 = __webpack_require__(3);
var helpers_1 = __webpack_require__(0);
var UserMarkerAnimation = (function () {
    function UserMarkerAnimation(map, mapPolyline, userMarker, vehicleIcon) {
        if (mapPolyline === void 0) { mapPolyline = new google.maps.Polyline(defaults_1.DefaultPolylineOptions); }
        if (userMarker === void 0) { userMarker = new custom_marker_1.CustomRichMarker(); }
        if (vehicleIcon === void 0) { vehicleIcon = defaults_1.DefaultVehicleIcon; }
        this.map = map;
        this.mapPolyline = mapPolyline;
        this.userMarker = userMarker;
        this.vehicleIcon = vehicleIcon;
        this.timeAwarePolyline = new time_aware_polyline_1.TimeAwarePolyline();
        this.animationSpeed = 20;
        this.animationProps = { speedScale: 1, interval: 20 };
    }
    UserMarkerAnimation.prototype.handleAnimation = function () {
        var _this = this;
        if (this.animationPoll)
            this.clearAnimationPoll();
        this.animationPoll = setInterval(function () {
            _this.updateCurrentTime();
            _this.renderCurrentTimeMarkerPolyline();
        }, this.animationSpeed);
    };
    UserMarkerAnimation.prototype.updateCurrentTime = function () {
        var _this = this;
        if (this.currentTime) {
            var timeToAdd = this.getTimeToAdd();
            this.currentTime = helpers_1.addISOTime(this.currentTime, timeToAdd);
        }
        else {
            var last = this.timeAwarePolyline.getLatestTime();
            this.currentTime = helpers_1.addISOTime(last, -20000);
        }
        this.capTime(function () {
            _this.clearAnimationPoll();
        });
    };
    UserMarkerAnimation.prototype.renderCurrentTimeMarkerPolyline = function () {
        var polylineData = this.currentTimePolylineData();
        this.renderPolyline(polylineData.path, this.map);
        this.renderUserMarker(polylineData.bearing, _.last(polylineData.path));
    };
    UserMarkerAnimation.prototype.setUserMarkerContent = function (bearing) {
        var angle = bearing || 0;
        var vehicleAssetDetails = this.vehicleIcon;
        var content = "<img id ='bike-marker' class='ht-rotate-marker' style='transform: rotate(" + angle + "deg)' height=\"" + vehicleAssetDetails.height + "\" src=\"" + vehicleAssetDetails.src + "\" />";
        this.userMarker.setMarkerDiv(content);
    };
    UserMarkerAnimation.prototype.renderUserMarker = function (bearing, position) {
        if (bearing === void 0) { bearing = 0; }
        this.setUserMarkerContent(bearing);
        this.userMarker.setPosition(position);
        if (!this.userMarker.getMap()) {
            this.userMarker.setMap(this.map);
        }
    };
    UserMarkerAnimation.prototype.renderPolyline = function (path, map) {
        if (path && map) {
            this.mapPolyline.setOptions({
                path: path
            });
            if (!this.mapPolyline.getMap()) {
                this.mapPolyline.setMap(this.map);
            }
        }
    };
    UserMarkerAnimation.prototype.getTimeToAdd = function () {
        var totalDuration = moment(this.timeAwarePolyline.getLatestTime()).diff(this.currentTime, 'seconds');
        var factor = 1;
        if (typeof totalDuration == 'number') {
            var mid = 5;
            var power = 2;
            if (totalDuration > mid) {
                factor = Math.pow(totalDuration, power) / Math.pow(mid, power);
            }
        }
        return factor * this.animationProps.interval;
    };
    UserMarkerAnimation.prototype.capTime = function (callback) {
        if (new Date(this.currentTime) > new Date(this.timeAwarePolyline.getLatestTime())) {
            this.currentTime = this.timeAwarePolyline.getLatestTime();
            if (callback && typeof callback == 'function')
                callback();
            return true;
        }
        else {
            return false;
        }
    };
    UserMarkerAnimation.prototype.currentTimePolylineData = function () {
        var polylineData = this.timeAwarePolyline.getPolylineToTime(this.currentTime);
        var path = _.map(polylineData.path, function (array) {
            return new google.maps.LatLng(array[0], array[1]);
        });
        return { path: path, bearing: polylineData.bearing };
    };
    UserMarkerAnimation.prototype.clearAnimationPoll = function () {
        clearInterval(this.animationPoll);
        this.animationPoll = null;
    };
    UserMarkerAnimation.prototype.animate = function (encodedTimeAwarePolyline) {
        if (!encodedTimeAwarePolyline)
            return;
        this.timeAwarePolyline.updateTimeAwarePolyline(encodedTimeAwarePolyline);
        if (!this.animationPoll)
            this.handleAnimation();
    };
    return UserMarkerAnimation;
}());
exports.default = UserMarkerAnimation;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __webpack_require__(18);
var time_aware_polyline_1 = __webpack_require__(6);
var _ = __webpack_require__(1);
var moment = __webpack_require__(4);
var assets_1 = __webpack_require__(2);
var TimeAwareAnimation = (function () {
    function TimeAwareAnimation(map, action, userMarker, polyline, options) {
        this.map = map;
        this.action = action;
        this.userMarker = userMarker;
        this.polyline = polyline;
        this.options = options;
        this.timeAwarePolyline = new time_aware_polyline_1.TimeAwarePolyline();
        // polyline: google.maps.Polyline = new google.maps.Polyline();
        this.isAnimationStarted = false;
        this.animationSpeed = 20;
        this.animationProps = { speedScale: 1, interval: 20 };
        this.polyline.setOptions({
            strokeColor: color_1.Color.htPink,
            strokeOpacity: 1
        });
    }
    TimeAwareAnimation.prototype.start = function (action) {
        if (!action.time_aware_polyline)
            return;
        this.action = action;
        this.timeAwarePolyline.updateTimeAwarePolyline(action.time_aware_polyline);
        this.handleAnimation(action);
    };
    TimeAwareAnimation.prototype.handleAnimation = function (action) {
        var _this = this;
        if (!action.time_aware_polyline)
            return;
        if (this.animationPoll)
            this.clearAnimationPoll();
        this.animationPoll = setInterval(function () {
            _this.updateCurrentTime();
            _this.renderCurrentTimeMarkerPolyline(action);
        }, this.animationSpeed);
    };
    TimeAwareAnimation.prototype.updateCurrentTime = function () {
        var _this = this;
        if (this.currentTime) {
            var timeToAdd = this.getTimeToAdd();
            this.currentTime = addISOTime(this.currentTime, timeToAdd);
        }
        else {
            var last = this.timeAwarePolyline.getLatestTime();
            this.currentTime = addISOTime(last, -20000);
        }
        this.capTime(function () {
            _this.clearAnimationPoll();
        });
    };
    TimeAwareAnimation.prototype.renderCurrentTimeMarkerPolyline = function (action) {
        var polylineData = this.currentTimePolylineData();
        this.renderPolyline(polylineData.path, this.map);
        this.renderUserMarker(action, polylineData.bearing, _.last(polylineData.path));
    };
    TimeAwareAnimation.prototype.setUserMarkerContent = function (bearing, action) {
        var angle = bearing || 0;
        var vehicleAssetDetails = this.getVehicleAssetDetails(action);
        var content = "<img id ='bike-marker' class='ht-rotate-marker' style='transform: rotate(" + angle + "deg)' height=\"" + vehicleAssetDetails.height + "\" src=\"" + vehicleAssetDetails.img + "\" />";
        this.userMarker.setMarkerDiv(content);
    };
    TimeAwareAnimation.prototype.renderUserMarker = function (action, bearing, position) {
        if (bearing === void 0) { bearing = 0; }
        this.setUserMarkerContent(bearing, action);
        this.userMarker.setPosition(position);
        if (!this.userMarker.getMap()) {
            this.userMarker.setMap(this.map);
        }
    };
    TimeAwareAnimation.prototype.renderPolyline = function (path, map) {
        if (path && map) {
            this.polyline.setOptions({
                path: path
            });
            if (!this.polyline.getMap()) {
                this.polyline.setMap(this.map);
            }
        }
    };
    TimeAwareAnimation.prototype.getVehicleAssetDetails = function (action) {
        if (this.options.vehicleIcon) {
            return {
                img: this.options.vehicleIcon.src,
                height: this.options.vehicleIcon.height
            };
        }
        var img = assets_1.Assets.defaultHeroMarker;
        var height = '30px';
        var actionVehicleType = action.vehicle_type;
        switch (actionVehicleType) {
            case 'car':
                img = assets_1.Assets.vehicleCar;
                height = '50px';
                break;
            case 'motorcycle':
                img = assets_1.Assets.motorcycle;
                height = '50px';
                break;
            default:
                img = assets_1.Assets.defaultHeroMarker;
                break;
        }
        return {
            img: img,
            height: height
        };
    };
    TimeAwareAnimation.prototype.capTime = function (callback) {
        if (new Date(this.currentTime) > new Date(this.timeAwarePolyline.getLatestTime())) {
            this.currentTime = this.timeAwarePolyline.getLatestTime();
            if (callback && typeof callback == 'function')
                callback();
            return true;
        }
        else {
            return false;
        }
    };
    TimeAwareAnimation.prototype.clearAnimationPoll = function () {
        clearInterval(this.animationPoll);
        this.animationPoll = null;
    };
    TimeAwareAnimation.prototype.getTimeToAdd = function () {
        var totalDuration = moment(this.timeAwarePolyline.getLatestTime()).diff(this.currentTime, 'seconds');
        var factor = 1;
        if (typeof totalDuration == 'number') {
            var mid = 5;
            var power = 2;
            if (totalDuration > mid) {
                factor = Math.pow(totalDuration, power) / Math.pow(mid, power);
            }
        }
        return factor * this.animationProps.interval;
    };
    TimeAwareAnimation.prototype.currentTimePolylineData = function () {
        var polylineData = this.timeAwarePolyline.getPolylineToTime(this.currentTime);
        var path = _.map(polylineData.path, function (array) {
            return new google.maps.LatLng(array[0], array[1]);
        });
        return { path: path, bearing: polylineData.bearing };
    };
    TimeAwareAnimation.prototype.update = function (action) {
        this.action = action;
        if (!action.time_aware_polyline)
            return;
        this.timeAwarePolyline.updateTimeAwarePolyline(action.time_aware_polyline);
        if (!this.animationPoll)
            this.handleAnimation(action);
    };
    TimeAwareAnimation.prototype.extendBoundsWithUserMarker = function (bounds) {
        if (bounds === void 0) { bounds = new google.maps.LatLngBounds(); }
        bounds.extend(this.userMarker.getPosition());
        return bounds;
    };
    TimeAwareAnimation.prototype.getUserMarker = function () {
        return this.userMarker;
    };
    TimeAwareAnimation.prototype.clear = function () {
        this.clearAnimationPoll();
        this.userMarker.clear();
        this.polyline.setMap(null);
    };
    return TimeAwareAnimation;
}());
exports.TimeAwareAnimation = TimeAwareAnimation;
//helper functions
var addISOTime = function (time, timeToAdd) {
    return moment(time).add(timeToAdd, 'milliseconds').toISOString();
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA+CAYAAABHuGlYAAAAAXNSR0IArs4c6QAAA/JJREFUaAXNmDtoFFEUho2PpIloJNEQFSWCFr4rG4tobMQngqCCraDYio0giqUoKD4qUQx2gohiI0hADRYWPrExbhASFCWKRvDt/212ltnJPTvZuXc2/vDvzD33nP/8mcfdvWmY5IdOlc8XO0pEbVAcEt+Kr8W6YIq6dImnxTfi3xQWNH9G7BapzQVbpPpCTDNjzb9S7Y6QzpZKrNfDUNJon7RW+RrcKoEvAU1FJkekuTOrucMq/J2DqcjcH2kfs8w1GBMHFT9rzMXDXzW4K/aLvI2AN5S3dYPYLKbhkBJOpiUxv178KUZ/mevIc7JZbBItMEcOuS6NKMZd2ShWxTzNfhSjouSRuSzPBjXVdD9rfqFo4pJmkmai8UvNLTIr0yeoRSPSSx57LIllmrAe9oLmZluFNcTRKIhJU4x5GZzLyA2jYETxFWIorJQQmi5zt5JNZirww0g+nkwOMEbTZYyXblZcf4+R+F7x6fHEQOdoou0yt5cek/kQto0exnxeU4SVPzTQRNuFCi8FZbjcd7kqA8XQdvUciPRZ/b87knhLpkVJORzRpkfSHF6K30itjkmS34l5gx5JY4xbecbaje48nHnD6tGOMZYJF1pcwcAxq0fRU5uauS4na0r01gb2U5RD2/qxgKcihvXpMuf8iijV+B5WGz3xUr4iz40u2414iLCl/Qzx6Fb1Gp34Rshjd4PmbqNnhZe1SnLdSmL7DAGfMJpWP7yUwYJWEF3JQ4rPEUMBLTRdvQqKFxdXHctg8+FKJvZAbCxnZj9BAy2rDx7GYIYi/MS1im5qrnlM1fgD1KJh6dMbD06cUNQqJP5EXOysrB5coumnYjVtepvAcbVNA8IsiufEuWIayCHXWkgjo/SsuFpjHjQl7BfPi2lA9JF4W+wXB0XQIXaKm8Q1oquHwhU4oNGFiohjgNBDMfpr8j7Sazzmi1b5RwpfpHmboge9asJRZedtjB41g6+N+2Je5tDO/HW3QMWfcjA3LE20vbBL1aGvGppB0COVUOauBnFUEmHxK4i+5tCoWEg19ka3FHyNoZELrkg1qzlqcwNbPbb3tZqjxtomBjN7JIMxanIHv6s+iOO9auRSUxOizUgtRfyn+lQNBeRSUxe0qMuImHbVyCG3rriobmnGyKk7lqtjmjFyJgSP1dUyx1xmZHn4480uxweJ82pzidTwwzZJ/hKTV40YcxOKe+qeNEbMC763kubXHQ5cMUdaviH2jskrNp49Z76uSurxXTbn3ghxKzFxJ+Ykfh4LT8zpOrWNbifn/w0a5eRbiZx7Y6q3wqgAO+q+khbn3ghlDCO93m5iApl3wjGN+OmABvC/QpPcwCD4B/evwT5yizC/AAAAAElFTkSuQmCC"

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZsAAAORCAYAAAAknA+3AAAAAXNSR0IArs4c6QAAQABJREFUeAHs3Qd8HOWZ+PGZrdKqN0uy5IqwsY0LuGMbYyA5WiAkkJ5QUv5HQhJCGvWSEEJIuUASAuFyaXeQSkhIg4RcQrcpxsbGxtjGNrZcZNmS1bXaMv/nFZaRbW2RNLs75Tefz3pXO+19v+94nn3feecdXWNCIIXAGWecUSqLVMqr3tCN6bqhF8t7SP0tn8fKe56hGV55n6rrerG8B+XFZDMBQyYpv3Z526hrep+UaVzTtQ4p4y2SlUPyfVvcE9/oNbxdsVis/cknn9xosyyS3BwK6DncN7u2iIAEE19HR0cgPz8/GI/Hi30+X0hOLH6v1xuQv0OG1yjSY3qJ5tGq5GQ0QZJdIK88eakAVKkZWkDeVbCpl5NTgZyo1N9MNhOQMjckyV1Sxq/Lx4h8fuNvTd8tnzvVS35k7NTiWo/M75Lj4nVP3NMty0fU5Pf7u9Qy8jEsn3see+yxqPzNhEC/gA8HBHp6ekJFRUWqhlIvr0XyOklelfLLdqzu0U/yaB5/fyiRL4ec+MkyJIvdvpSgoUqyUF4z3vh4fA7kh4QmPzrk3zcK3fAYGyUkNfsCvv1xI/6qHCurJdA0yo8XVRtql5cKWEwIHD5igHCFwIwZMwLFxcVVcjKY6vF4xkumVXCZKEHlBHkvkKMhKKeGYnkPybtfTjgB+QUbOnwScoURmRyegBw73RJ4IqomJMdJf81GvgvL8dMlx9E+aYLbo2pD8r4xGo1ulFpzi9R4VC2JyWUC/CZ1doF7Zs2alS8BJiAngjxpZw95g956aXOfGdfiJ8iv0ElyIjhRTgwnyny/synIXTYFJPio6z975G2XBKPX5HhbI81va+RHzv5wONwaDAbDh5vbIhJ8+iRt8Wymj31lX4Bgk33zrO1x8eLF5b483zL5VTlP/sMvlR3XyatGXj45EXjkROCRX59emScNI0wImCtwOODEpaYTkx80Mdm6uoZzSF775Lhba8SMpyT4bJMmt/WrV69uM3fvbM1qAgQbq5XICNOjLvKray/STFEozWTl8h+9TL10rz5Hgs10+c89R/7TV0lgKR/hLlgNgVELyDHZKcdiiwSfV/sDjmHsluNzs3RE2S0/gFplfq90TGmlc8GoqS23AToIWK5IRpQgXQUa6U02XZrFTpX/yG+V/8hvlV+N+f1bO/yTQgLNiDbOSgiYJSABRXVAKJRDUV0zfIv8LYerEZUA8zf5+zEJOjvl/e/yUp0LaFoTBKdMnH1sXJKnn376TEn+JAkqp8n7PPlPq2othfIfuFw+l9E8ZuPCdVHSpTZjSPBplSyrJrZeqemoz6vkh9NmudbzqlxjfJqajv0PCGo2NipD1VTW2NjoraqqKpBfgoVyn8MUucg/VQLLfPl5eJoEGXXvS/9ELWZAgnerC8hxq370qh9KbzTxyl9yTKtrPCEJNOp64u7TTjutPRAI9DU3N3dv2LBBdShgspkAwcZGBSa9eKrr6+vHyQ/BS+WX4IUSUKrks7qBUnVTpixtVJYkNYWA/HiSY3yRvFS36hZ/0L9SItD60tLS38uar8iLJrYUhFabTTOa1UrkmPRIbaZS7k+okwv/p0izwnSZXSH/6WZKcJkuv/7yaSo7Bow/HSUggUbdFBqWoKOu5aj7dtarbtRSo39VuvK3MGSOfYqbX8PWL6tKuSYzW5J5uQQWdXd/UP7j9U80lb3hwL/OFTjcxKaah6f0v3RtiQSclfL5L9KUvFXeGZ9NEOwwUbOxYCmp+2Ok+/JSCTIXSu1lsvyHGyvJrJEfecWH//NZMNUkCYGsCbSppjXZW6f84Noonx+XXmyr29raNqxbt06NYsBkQQE1eCKTNQS8c+fOLZ44cWKlN887rr+Hma6dJ7WYk+Q/lLoZM49AY42CIhU5F1D/F8rkpcbvK5Ox2jqlabk7Ly+va9y4cTEZ5y8uHQlU8xvjsuW8qN5MADWbNy1y+ckrvW0qpDbzfgku75KETJBXqXwOSqDh7v5clgz7trSA1GrUsDjqcQiqRrNP/vyNjEzwW2li28kYbNYqOoJNjstD7pU5RZJQK7/OFstFz8XSCUDdO1MqQYZh+nNcNuzePgISZKISdLrkfb0Enhfk/9LrkvoX5LVWgk63vNN7LcfFSTNajgtgwoQJ56kmM/mP8v+kJjNNgox6HgzlkuNyYff2EpD/P6oFQDWvqZEJTpb3EyTwtPX29m448cQTe3fs2EGwyXGRUrPJQQFId+YG2e0ceV0iv8JmyX8M9XRLNUAmQUYQmBAYpUBM/l+FZRv75KrNNnn9UQLPa0888cRfR7ldVh+FAMFmFHjDXNUjvcxkZPVgSUyPzZYnHKqb1q6UQFMr2yHIDBOTxRFIR0CCjhpj7QHpLq1uBP2VjDDdIh0I+hj+Jh09c5ch2JjrmXBr0tOspLCwcIEEmE9KgJkuv7RUD7OgfKYMEqoxA4HRC0jA6ZPajRriZntcj99sRIw1Tz31lLpJlCmLApzoMowtTWZ5cg/AAukAcKJctFwhB74aNLNKYowa/ZYJAQSyICD/7+IScNrlx97fVS1H/k+q+3P+Jb3WeJxBFvzVLmi+yRy0fjjQVEmgeZdc9D9HAszb5aXuD6CnWebc2TICxwnI/z815cn7DOnxOdmje6ri3viGeDTeefi+HDXwJ1MGBQg2GcJdtmxZlWz6At2jf1EO7DPlF9VkOdDfeL5MhvbJZhFAILWA/D/Mk4BTJSNKz5EfgiWFBYUh6a2mhr5hyqAAwcZkXKnN+OQu5grZ7Dipop8p72+TX1S1coAXmLwrNocAAiMT8EmTWkh+AJZL03anBJ6+8ePG75BHGERaWlroIj0y05RrEWxSEg1rAa88AqDO6/feLrWZ90s78cUSaEpkC4wCMCxGFkYgswKqTU1+AAYl0EyRwDNfHp++qKCk4JXS4tLWpqamSGb37s6tE2xMKnep0dSPHz9+rtRm3iO/mFbIZuvkcC41afNsBgEEMiAgAccr/1/9EnDyvZq3VMZX80yaNKlYmtUaM7A7V2+SYDP64telW3NIquCzpP7yVgkwV8mBWy/vRaPfNFtAAIFMC6iAI/9fSyTonCqviPwdqqure2nXrl10GjARn67Po8P0Lly4sDI/P/8zspmlcqCeLN0peQzA6ExZG4GcCcj/304JPGqMtRdj0dj1kUhk+7PPPqtuDGUapQA1mxECzpgxIzB16tQiqdFMkiBzrhygU2VTtfJOAB+hKashkGsB+e8bkECjHlAYk+uuz8vfXVLL6W1sbIzmOm123z/BZoQlOG3atOkygOZb5aC8Ww7IudIZoEKq3wSaEXqyGgJWEZD/z+q8qHqUrpBbFyq8Hm+7XMfZxWCeoyshTo7D9FNdm2UV9XjmCyTAqEE0Vffm4DA3w+IIIJCGgNQyDj125s+SdrR57zOfb98XPqAGszV7UoN5bpJrsC/IiAN/lCa1p1auXKmeEMo0AgF14mRKT0AFZk93d3dJXijvLAky75WajBrO3NTpcJvx4AuT6vnrBDNTldmYbQR0rb0v1rdJmrSO/J/webzzNOm2PJCHU8qnHdrXe+C4Vpp4PKatb9tSoMapGeGk9jFbflROllYMTXqavi6dgXpXr17dI9+PeKMjTIvtV6Nmk2YRLlmypEgOtgY56D4tB995EmzKZdXjDvA0N5dwsfmlM67+5imfu2vwAiv+dcXgP/mMgJsE1OMCdssPu/6Tu/wYa//nih+XenTvuFQIcSPWeeETnzS64j2j6hkq+1T77pQm8/UyrtrKnp6eW+g0kEr/+PnUbI43OfYbNcZZgRxv6oFMU+XAn5KBQNM2t2TatoA36Hln/dlHBuhU/1l2du3tlASpZ90wIeBGAe8xLQidP9n2uy+XBUsjtcExxadVzflqIhQJSPnfn3tDWzQePTSwzHXr7wi19LUPa2xC+f+ufpSrgDVB/v+3S+/TBXJOeEEeU9Ah3x2pcQ3sg/ehBajZDO1y5FupNvsLCgpOkp74t8qXE6XyPF2OPVODtASyp+TX2oRjf6290vZa18dfvFXt60iTwZGE8QEB9wq0qazXBCv2/vK0b7053qAhdQ9dVzWehOe1z6y5vWlvz4HquDwlujncOixBCTSqRU5dx9kh7x9ubW1dJ1PXsDbi4oUTFoqLTY5kXX69lMZisfHSfHalDGvxNplRKkezaj4b9SQB5tA3Z1+7qT6/usbv8YWr8sonqnbocLSv7a6tv/h9VIsFtnXuvHBzx84jNZ1R75QNIOAgAY+mt00tnPTTgSyNCZb1fXnmJ/5dAk7CzgLd0Z5DKtAcCnd0f+DZ68rlh6O6Jpr2JP9vB5rU7pMmtT/K+WHnk08+uTHtDbh4QVN/oTvJUd1HIz1QaiXQqLuKL5dfMqO9WTNWFSzr9vX3qpSeBrp334LyWeo32MQBNzmO23Z179P/vPfxywe+4x0BBIYWkGpGySud264ZmLujJ7irJxp+we/1Bb26t0gCifwHO3oK+fL7e7aFvPmReeUnt0ng6W8GS7czgWxT/UBXTWrvk3W75PzwUkNDw2tbt25VNR6mJALUbBLgnH766edJ09klEmQukEUqDx9kCZZO/bUEklWPnvGjUq/uUU/o7J8k4ITkw5FOBg/u+kfzT3Y8WNwV7aHZ7LARbwgMQ+BIZ4Izqua/9qWTP65uS0hrGm5nAlXDkXNCu7w1G3Hj69Jx6DdyDUddX2VKIHDkRJdgvuu+VjUaeakHnp0rgWahHFDTRhFoYuPyq1+cUXxi8/SSE3Ysr5ovnQs8FfKSx0F7VEDxqIO8PdL1ilTvD/xj3zNjN3ZsI9C47qgjwyYJeKSZW42yXnowfKgz4PXf9kr7a49MLqhv9Xl8M5PtQ/4/ehdXzu4+v/b08LSSyYeePrA2afP14XOCaoLzS+tEk5wr9kyaNKlPbvzsTrYfN8+jZnNM6ct1GtXz6xw5gL4t7+ou4tFMbX9eetc9Bf6C6xJtZGPb1t5PvPi1YbUbJ9oW3yOAwPECd57yhbtml56krrnKpNfLP0l/ZPfFI2s+tOr6U9TSndFurSumbqtJPkkN5wEJdPdL7eYPyZd071yCzaCyl0CzVP48WV7nSM8TNYLzmz1dBi2X6uOCshn3f3rKB5fIrx2jNlQlI8p6hrz58y+7H3/kj3v/uZROAKlEmY/AyAXK/UW/qA5W7VdbuGvuDe/yeLxjk2/NCEuQ6Y8wDzY+euCn2x9qSL68usPT2CgdBh6V67x/feKJJ/6eank3zqeDwOFSV48JkB5nZ8pRs0yCzNnyK2V4x4Nh9FbnV0akh4z20RPetXJsqPr9Q2/ACMeN+H55ef+674lzJNAMvRjfIoCAKQItkY73yat/Wx3RrkcKfKHt8gMwINdP5w+9Az1Y6Cvob86eVzbztbWHNvd3b3750Ja8iBEdslYk54vpEnBicp3XI+eSp2SUgV7ZNk/9HAQ8zDPqoDUd9FFqNKoZ6yY5WN4l7+pZNMOu0ZT7i+/5zWn/eZGsWySPmpVjTx+yzXdrx872a9d+o02q3d7uWO/YUQyl4aASICsIZEdA/t81yv/R2Li8mub/Wfx1GfYm/emDK69b09jb1N+8NtRasm31hM+Dqjmtr6/vnmeeeea1oZZz63dDRmk3Yagajd/vP0kqJJfIS3UGSNhHfwiXtismvn33sspT299ed1bf2PwxM+QXU4EEmiHvUN7avvOhh3b/38SX27eO6TOiRf3jbwyxUb5CAIHMCBz+/10qHXK8MsbarZs7d/zJr/lergiWLkm1x0UVs3TDiLds6tiuOiEcN8m21flUvbp1n75tfP348M6dO/tvQD1uYRd+4fpgI8+kOUF6nl0vZX+xHCxD1kYSHheG9uwdp36hfFrJCRNr8iunSLBK2iz58dVfPWlN2yY6AyQEZQYC2RGQFoXCF1s3nv1cy8vn7uluCr219rQ+2bMKDNKqMfQIIUX+gsKavKpHnzm4dnp3gk4Dcg7xy6tBrt+Uy6MJ1OOln8pOjqy/F1c3oy1fvvwqOTBmyLWaS+VaTZV8TukhVeXOL8+46r9PKZu+Qm7QjBb486VDwZsj0B5b5CsPrG380+7HD8a0aMGa1k0N0uZ77CL8jQACORTw6762mmDlJpWEH87/Uijky0vYTVpqNu3S/N3yrmc+WyXvBYmSLU3yLdKctl3uwbl/9+7dd3PTp5b8l3giSAd8r0vzWb7UaKZJ8JgqB8UYqZUkneSAbK8Mymg1ht6xoGxWMBTIn514hTc6AcgB53np0KbKlS1rVXdLJgQQsKCA/AAs2dW7b6FK2p6epj9OLhwnV109QwYcaSYvltEHvHPLpne/2PpKnnSLHrJ1SM4p5fL/Pyrnlen19fVFEmzU9RxXdxhIcYq14JFhQpKWLl1a5vP5bpSDQfUYK5EKTcoOAVef8N6PXzzurG+o3cuBKNdkEtdmjnQCkIV6o+E6GefMlc4mFBWbQCCrAvLjc99pFXMO3Db7GnULRNLp+nV3bFx1cN30RAvJ+UUFl0OyzV9E+6J3ur3DwJBRORGeE75Xg2tK4U+Wx72+R/IzNY1AE7607i2vXTL+3/KC3sCp8stGukQO3aarfPb2ND/ywM6/1fd3AohHiqVtmEDjhAOHPLhCQM4HhYf6Ooyg13+jGn1gXH5Nl/y/HzKgzCqZqk0urOtINNqA1G6kJUTzy3undBjYWj+2Pr5r167hDTXtIHXXBZuJEycukuazd0nt5ANyYPmTlaWKEkW+0N7vnPLFPTL0xXmJlzXUIHxdcu9M5Kb135vx1ME1dAJIjMUcBCwt0GdEClXHAfWqy6/aNaVogjpPSOcBvUjePQOJL/DlF0woGLvl7/uerk3SYcAj55nJqsOAz+ubIB0GXHvDp6t+dS9bsWy51/BeKtVbdT9MyusoY/Mqfv2Duf9RXxooUp0AhuzuqA685w6u3/6Hxn+2G3rcv/7QlunpDG8xcMDyjgAC1hUo8uXvKvWV7FEp/MnCr06UMdaqj06tEe6JhXdf+vS1BfL//ph5by4p55wWqeXsl1qOaop/wI2Ddibtqvsmle0/qQ4BPgk06sFKE9MJNAWe/I45ZdNbS/1F50qgGerem5gMorlHDiLP2kOvlEongEm2VyIDCCBwlEBHtGeceqkv9/cefFK6PodlhOdBw0/pwXxPcMz88pMPvNK2LdzUd3DIgXQlyJRLZwGvtH5Mles3IdmcGg6n//EGattumFzRjKY6BASDwSVS2LdJoZ6SqvlMFfx3537xpxeOXfF+1ftkqAPhUF9777tXfq7nVzsf0V5u21IZM+JHqtdDLc93CCBgb4HfNT4arAqWt04pnjjmqJzITdxnjJlfWuIvfOHJAy8mbDGRa8VBab6fJc/A2T1u3LguueGz+ajtOPwPxwebxYsX50twGSu9z9SzLc6Rz6rdNdnUPyrA8qoFhXJTVsNRCxpa79bOnb850Nu6+u9NT499vnVDvYwQW0ygOUqJPxBwpICcOwp3du05UBwo/JY8tmDxsSOF1OZX5c0qObHnH/tXqZrLcZOsry5b5Ml9fbsk6Byorq7eJ/fguOaha45vRpMaTZ0UsBwY2nXSZjpkLWXgqOjvEOAtePlDEy8cJwfSaQPfH36PRYxI2zVrbn8f12SOkeFPBFwisLt3//Q7N//vTWeOWbBTxkA8QZrYjzSbyc2glfMqZuxORSFNalfJMqH8/PwD8r4q1fJOme/oph/p5lwovyI+JtdVPiYFVnj4l0XCsptaNPHLv136nckSaFSAOmra2bX30OXP3ngwUa+ToxbmDwQQcKyAjKtW8KFVN3R1R8ObR5pJOSeplpbr5BzVoFpfRrodO63n5GDjiUajY6UwZshLNYclbDKUtlRjauGEfR+ccFEs4AnUHrtsXyyycc2hjcE9vc0yjDgTAgi4WUDOAV6p4cx/vXt3YyQe3TDYQtc8gbllM5pkxJGkzWPyw3eMBBx1bpoYi8VUs5uTz8X9RAlPwIMB7fh51qxZoVBh6AfSdHaaFGx50sLUtY6fzr91Q0PRuHdKreZItXgg37dsuMf4457HiqNGzPEHxECeeUcAgeQCf97zeNFrHTu7z6pZdKTDgJxrCt5ac1rh3/c+s7492qV+uCaa1CWMfGlSmyAdBtaXlJQcbGpqUkPaOHZy5MlTVUuLi4sbpCClTVVTg+UlDKoBj6/t6ob37in0hyZKoDnqmo5UeNrXt25+6NWOHWOkL33CbTj26CBjCCCQUEACS408KqRqqAW+Mfva2ovHnrlzqHmDvvNL7WaCdKWeIsFmwqDvHfnRkcFGdQrw+r3/TwpSPZ8mYXuoeqrmmEDFK5eMe2utdHEe1HdelbURbom09V6//s6LmsIHHVn4ZAoBBEYnEJFuQ5phqKByVAv72NCYmnPGLvlnsq3LucknrwbZwIeldvO+ZMs6YZ7jgo08NmB+/+OdNe0iKf6kw9G8o/6sm3+84JaJQ920+c99z71+9epb++gQ4ITDnDwgkBmBVzq2lV29+mv75dEDnSPdgwScmRJwzpQRTi6Sm8+TnrNGug8rrOeoYCM9O9QvBdV0pprQxsrnRMPxxKYWTdj7zrp/8wa8gRpZ/qjl5N6ZNdIhoGpf78H6o36uWKHESAMCCFhGQB5PENzW3ThPBu9cLyOK7BqcsBJ/SdWs4hObVAekwd8P8VmNPD/WE/dMl/sBVUvMUeejIZa35VdOypRXRgpQzWe/VxfdpDQqEpWI/IrY+Y/l/71LxjlaMtQy71v5+Y49Pc0pu0oPtS7fIYCA+wTknNL+1ZOvfn5Z1byzBuc+ZkR3n/3YRwvlu4RjK6rlZX0ZIF47KA9be/uhQ4deWrduXdfg7Tjhs2NqNtIpICC/CmZJgZXJD4kh7+BVBVbkDe383JTLO+T548cNKyHjFnU83bzmkfZIV1GSWpETyp08IICAiQLyA7f4Z9v/0PpM89qbB29WvlfPtEk5yXLqEnKB7tVPLioqKlGtNClXstkCjgk20qOjTArrVvGvl0CRsFPA2PwxD15Qd4b0b++v/RwuLkOGDzfa5Fk0npte/t45jBBgs6OY5CJgAYFtXbsv+f7W+/6fnEtel+S8McimoXlr8yo9ct9N6hQamjpv3ej3+6f39PQk/MGcekPWXMIRwUZ+BczxBXzqYWgN8kqjVN8sDKnNdF39wte2fGjlDZs+s/Ybaf0KeXNtPiGAAAJvCuzvbamSc8m+aDyqhqLRPB5v9c8Wfq1rRskJW95cauhPqjVFajjV0qT27ry8vMuGXsq+39o+2MyYMSMQ02NqeBl1N25Bf3klKI/aYOXe5VXz1Q2e/ZNc0Oto6jm4WV3gU88gbw63phqkc2BV3hFAAIHjBOTCS1CdS/b07t8mP2RVhwGvjEpSs7B8dueUwglNx61w/BdBCTgnSo/a6dIzTdVuHHNd3Xt8Xu31jQSbEyXAvFcK6ApJedJazd1zb75vyZhTPjKQw03t26NXPH9TuYwMEBj4jncEEEBgtAK/b/y/svJASetJxZP6OyqdXHpi7VnVCzf9Yudf1BBaSSep2dTLqNB1vqDv5braul2NjY3RpCvYZKbtazbifI48cnWWvB83zMygMnj9nlNv3lAfqj5/4Lu/7H78kTs2/09cApXqKcKEAAIImCagziu/3vlw6P4df/7lwEalB0BaD0uTddWP5lL1VGF5L3dKZwHbBxv5FfBWqWieNFCgx76rLh7F3oJG+YWhepipUQKkd2Gs429NT5+zpXMnzWbHgvE3AgiYIrA3fKD+oT3/vOCN+28MecKnN1AdTHhHxlH77O9Rq2tvl9FQymRG0habo1a08B+2DTYS7WvkdbnYniwFc+Q6zLHW/1Zz2p2DHxvQE+09dNmqG7dKE9qxi/I3AgggYKrAwfChkJxv9qnHEcg4jNN/vug2dZPnvlQ7kR/G6lqNanW5PB6PL0i1vB3m2zLYHB7SoTSuxWdLxUXdfXvcEA9SoP2PDTi/9gxNPTZARgVY1xvtfXZb567mxt6mU+TOXzuUD2lEAAEbC0iHAa+cbw4/jiC2NegJVMv5KunjBwZl1ysdBabJ3/UNDQ3JLhMMWsW6H21ZPZMn3I0T0kVyEe0qeR+yEKRA27936g07ZDiaaxT/5c/e0LC394Dq2pyn/mZCAAEEsiVw1QtfXbawYub+b8z+7PB2aWhv0T36nrq6ui1bt259fngrW2tpW9Zs5AbORRLxFwvlkIFGvn/9/gW3twS8/mltkc6dX3n57kcOhA+p6zNqyIhE68gsJgQQQMB8AfnxWxgzjILhblm12khP25nyaLVzh7uu1Za3XbBR99VIsDlNhqVRwWbISVrQdo0tqJ4kXdRLmnqaSx5rfv4cms2GpOJLBBDIsoB0ahrevTOqA5ShnSPXqFWrjO3O2QO8w8v0wFo5ej/cBfAMKaxbJAkz1a+FBElpk8JZ2z9P1+bIe9JB8BJsg68RQAABMwXCcl5aJdeZF8lGh9PCEpNzXpPc4nGjrPfIY489lrKDgZmJNmtbtrpmEw6H/f6gf6pcq1GPYU0UaJRNiRTocrOQ2A4CCCBggkBwhOcldfN9oVw6mBWLxJ6Rz83ySuueHRPSbNom7FQl88oAdZVSm/mURHnVQYAJAQQQcIuA+nH9fnmi54yFCxdW2jHTtgk28giBEsNrLJCLZequKFvVyOx4YJBmBBCwkIAhdSJDK5YUzZPeuKdYKGVpJ8UuwcYjNZoyj+ZZIjkrlIBjl3SnXRAsiAACCCQSkPOfmvIk5KgbPOfJy3bjWtripL1s2bIKb9DbIJH9HGlCO+4GzkQFxPcIIICAowR07VQ5By6RpxKrpxHb4vw94G+XxFbJoHS1EtXrqNUMFB3vCCDgNgE5/5VLDadWbv+ol965djl/9xeTLRIrsO+XnhgXC7Rqs2RCAAEEXCugOkjJOfFTLS0tw+k+nXMvqwcbj0TvUonkc6UJbXrOtUgAAgggkGsBQwtJK89JRUVFE+X8aJvhtywdbGTATXURrEZqNeoGzoZclzH7RwABBHIt0N9RQNMmegKek+TeQ/U0T1tMlg42gUBAjWf271Kr4bkztjicSCQCCGRDQIbkCsp17CvkeTcpn/yZjfSksw8rBxuPz+cLSvtknVQZbdfNLx18lkEAAQRGIiC1G13OjWOierTALo8fsGywkSY09WRNGUxTu0g6BtimqjiSA4d1EEAAgWEKeOX8eKrP8M2Xxw/MGua6OVncssFGLn5Nkl7kiwWU+2pycmiwUwQQsLiAerjaTEmjusnT8pNVg40e02MnyIgByywvSAIRQACBXAkYmnrWzXzZvVXP5UdkLJnAJUuWFHrinlkStd9yJKV8QAABBBA4SkA1pUkHqmXSBVp1FLD0tW1LBhtBGytxuoprNUcdV/yBAAIIHCsQlICjeus2SMCx9CUHSwYbX8B3ljwoaMqxqvyNAAIIIHC0gHSDVo+bfk93d/ewHzt99JYy+5clg41keaF0d56Y2ayzdQQQQMARAuqhbIvy8vKKpXZj2cevWC3Y6DNmzAhIG6R6XkO9Iw4DMoEAAghkUOBwj93ZcW+83MrjpVkqCsqjBCrlSXTLpWNAtZSNrQaZy+CxxKYRQACBlAIew3N2SUmJIQu+mHLhHCxgqZqNtD3mi4F6bk0gBxbsEgEEELCtgNRwTpCXZR8ZbalgI8PTlEtJnyNgKugwIYAAAgikK2Bo58qjByw7Or5lgo1c2CoU08rDHQMs1byXblmzHAIIIJAzAV1Tz/uqkXOpJa93WybYRKPRcmlGqxUs9bhTS9+clLODiR0jgAACCQTUwyXVwMXxeHxygkVy+rVlgo1U/86WGznPzqkGO0cAAQTsLTBV9+qWPI9aJthIoKmVjgGqZsOEAAIIIDAygVJZrf7w/Tb6yDaRmbUsE2xk0E01eql6MSGAAAIIjEBAOleNl+a0BbJqoQQcS12OsEKw8Z5++ukzpa1xvHQOUL3RmBBAAAEERiAg170D8lLn0aUyfE3JCDaRsVVyHmwk+qqqXpUEmgKJyNxfk7GiZsMIIOB0AanZqEkFnFp5ZLSlzqc5DzbhcNgv12vOlYPAsjcjOf0AJX8IIOAogTw5p66QoKOu31hmynmw6erq8gjKeBHJs4wKCUEAAQTsK+CTzlbjZKy0kGTBMtdtch5s/H6/uoFzkTShWap90b7HGSlHAAGXC6hn3CyVc6q6wdMyo7HkNNgsXrw4v6CgYLJEYXXnq2UisMsPVLKPAAIOEPAa3ply7cYyPXxzOiyM3Mip9l8mr5ymwwHHFVlAAAEEjhKQ0fPL43rcMj18c1qzkccJVKrOAVLls/TjTI8qQf5AAAEE7CEwVe5fnGqVpOY02EjNRrUtjpWqXk7TYZXCIB0IIICAaQKGViXn1irTtjfKDeW6+apQrtfMlHtsuF4zyoJkdQQQQOAYgZlSs2k55ruc/ZmzGoU8lbMqpsfqpGYzWXpN5CwdOZNnxwgggEAGBeTcmi8js5QvXbp0suwm5+fYnCUgFosVe+Ie1QutIIPebBoBBBBwq4BqMcrT/DJCiybtRzmechZs5P4a9US5hhznn90jgAACzhXQtRKP4VnU0NCQ60smuataqQtXqmuec0uZnCGAAAK5FZBLFEFJQU1VVVXOKhYDAjlLgHpWtkBQsxkoCd4RQAAB8wUK1eNbZFDOnHfCylnVSi5c0Yxm/oHFFhFAAIHBAoXSgjSzs70z58EmJzWbw0+RUyMHMB7a4MOCzwgggIC5Al5pQSrx+XxqoOOcnO8HspOLnXuj0ehYSUCdvHiswEBJ8I4AAghkQECuj3vz8/NPmTt3blEGNp/2JrMebCTDHomyxepGTukHnvPueGlLsSACCCBgQwF1no1r8RIZHixnl00UW9aDjexTjYPWICMHMB6aKgEmBBBAIIMCqmYjnQQmhUKhnD5uIOvBRmo1KrqqXmg5jbIZLFs2jQACCFhJwKs6CUiCCnOZqKwHG7mZU/WKqGQ8tFwWO/tGAAEXCejSklQVj8dz2pqU9WATiUQCUsjzJPPqnQkBBBBAIJMCev/lkhMPPyY6k3tKuu2sB5v+B6bpWr2kima0pEXDTAQQQMAEAUNTfQTKpAt0Ts+5WQ820iNCNaPVyCvnNxmZUIxsAgEEELC0gIo0kkB1T6N7go3czFko/QPGSKYLDwNYupBIHAIIIOAUAd3QG+TRLmrklpxMWa3ZhMPhgDzDRj1SgFpNToqbnSKAgFsF5Ae+utcmZ4MfZzXYSGaL9Jhe7dbCJt8IIIBADgUq5cd+zs6/WW3DCwQCargE1YzGhAACCCCQRQG5ubNIj+s5G48yq8FGZVY64Y2RXhFZJGZXCCCAAAKqGU336DlrRst2sPHLU+NCxBoOfAQQQCDLAoY2SUYS6M3yXo/sLqvXbOQem4BkNnRk73xAAAEEEMiWQKH0SCvO1s6O3U9Wg40MlzBWMjvr2ETwNwIIIICAswWy2owmNRuPPKFTPczH2arkDgEEELCegLqZvitXycpqsJGajUcuUHGPTa5Km/0igIBrBaSDgAo24VwBZDXYSMVmrFRqaEbLVWmzXwQQQCBHAlm9ZiN5VMEtmKO8slsEEEDA9QIzZszIyYj72Q42ri9oABBAAIFcCcg1c39FRcXUuXPnZv3ZNlkLNgsXLlRd7vJyhcx+EUAAAdcLGJrqp1XQ1taWtXP/gHnWdihP6CyVEQRy+gzsgUzzjgACCLhRQDoJqK7AefX19VnvEpy1YCOjjVbLUDVqbDQmBBBAAAGXCWQt2EhA9coNnVnbn8vKkewigAACaQnILSh0EEhLioUQQAABBEYkoDoIyA//qZFIxLkdBEYkw0oIIIAAAuYJSAcBCTYFvb29WW9lytoO1egBMghn1i9KmVdKbAkBBBCwt4AEmv4OAkVFRVk/F2ct2EgeqzWDDgL2PlRJPQIIIDAygawFG/VoARmAMycXpkZGw1oIIIAAAmYJZC3YSIIr5eJUgVkJZzsIIIAAAvYRyNpAnB65LiUsWW8ntE9RkFIEEEDAuQLZrNk4V5GcIYAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQIEGzMU2QYCCCCAQFIBgk1SHmYigAACCJghQLAxQ5FtIIAAAggkFSDYJOVhJgIIIICAGQI+MzbCNhCwuoAhk6Zru3RNN6yYVkmeV9f1eiumjTQhYIYAwcYMRbZheYHvn3pDbGbplPFWTehdm35xzu/2PvqIVdNHuhAYrQDBZrSCrJ9xAY9USWaXTt2X58lrGunOygIlk2Td4pGun+n1Lhy3YuKecPNLI9nPy22b+zpi3afKut6RrM86CGRDgGCTDWX2MSqBfG+e9o3Z15b6Pf6aUW3IwiuPL6j94W2zPz2iFD5/YP27v7D+O/8lK5eMaAOshEAWBAg2WUBmF0cLnFu9JPzhye98zefxRY6eM/RfHl33SKCZPvRcvp1XcfINDy35/nZDM/RUGj/a9ptf/nnPkzfJ9aHCVMsyHwEzBQg2Zmq6fFvqTDcmWNHu0T0dyShmlEwJVuSVETySIQ1jngSO2cWB9GLHJePOvXftoS2NcSNelGgXhhY39vYcKJTtliZahu8RGK4AwWa4YiyfUCDkzdd+NP8rWqEvP+GJTK2sa55Awo0wI6MCE0O13/zfhbfFk+1EakiNK/515X3Sc++6ZMsxD4HhCBBshqPFsv0Cs4qn7CvwhY67WF/gy/Pme4MnSqtXECqLCkjzmQSRpImTzuHl7x9/gbaja0/CDgurWzeE+4zIgqQbYiYCgwQINoMw+JiewK2zPplf5C+cnd7SLGU7AV2r+VjDpUlrNfdt/uOSH+/+/dO2yxsJzpkAwSZn9NbccXmgWLv71Ju35nmDXYlSWOgLTUs0j+/dIfDehgvueNvEFQlrPv+7/aEfP7D7H7fREcEdx0M6uSTYpKPksGWSXcivya/wVudXNjgsy2THZAGvx7OgJJD40tx7J1zQsar15SE7IuzraTbimlEngSh5e57JaWZzuRUg2OTWPyd7T3EhnxNATkrFWTutCJZ8P1FHhLs2/+LSB/f8328kx9wX5KxiT5obgk1SHvvPnFN6UuSC2uXPenVvdCA3fo/PJ01hC+SHJb3CBlB4N1cgSUeEj55w6dvnlE17PmbEjzr/RIy+2A+3/mZzS6T9KnMTw9asIHBUYVshQaTBXIFTy6bHzqpZtNTcrbI1BEYukOcLXrVszNwhNmC0NbUf/A/peECwGULH7l8RbOxegofTL12Ote/M+UJjbV7VwcFZkgv91fK3Y4d5GZxXPttdQC9M1PEgakR7PvbCl3/f0tf+Dbvn0q3pJ9jYsORDnjyjxF+0V26XODJcvjSL6Q2F4ytlCBiGqbdhmZLkfgFvwo4HhtF+Yc2Ku/62/5ndg606o13xjmj3WPmOQUgHw1jwM8HGgoWSKknvHHd2+PJJby869tkscjNlXqp1mY+ALQV0vfiyEy76wYcmX3hUB5auWPcdFzx59RXyf8Gyj4+wpXcGEk2wyQCq2Zs8tWxa19tqVzw/sN2pxRPHe3Tv5IG/eUfAHQJ6ybG9pQt9hcu/dvKnN0bi0W0DBqqjwX9u+vmesBH54MB3vOdegGCT+zI4kgL1ky3fk9cl/6FiR76UD0sqTg2fUT3/jMHf8RkBBPoFzlhSdcoxFEbbcwde/vDKlpcuGjyjLy5hKB4plv9fR9WOBi/D58wJEGwyZzvsLVcGy7R7532pPeTL9wxe2a97Cwb/zWcEEEgmoBdfP/0jd0a0WM/gpTa1v/bbT7/4jUvkOzrMDIbJ0meCTZagh9qNegJldbBCLvTr/aPwqrv35cJ/sQzRT3AZCozvEEhPQPd4vPXBY/oMzC6eFh2fX9sY1WL9LQed0U7pXNAzRjbJwLHpuY5qKYLNqPhGt7Kqydy3+HZ1oX9gyHep4BNoRqfK2ggkENC1f//5oq/1Dczt71zwxNVnyX867kMbQMngO8Emg7jHbromr6LvykkXvyhPnQyreSFPflAu9C86djn+RgCBDAjoWp48S+lIj81Cb8EZ357z2YOd0Z7HB/YWiUeid2z++Ss9scjVA9/xbo4AwcYcxyG34td9WsDjbx+YeWLhhPBbapYQXAZAeEcglwK6vnxe+cxjUmC07e9uuemXjQ9/aGBGd6xbbmjTiwf+5n1kAgSbkbmltdY76s/q/cjkd3ZKNb3/5kueUJkWGwshkEMBvfj9ky749XsmnXvk0ea3vHz3Jx8/8OLPpLmbgDOKkiHYjAJvqFVVbWZm6ZRmdR1mWvEJAZ/Hr+5uZkIAAXsIyH9dfbxXe/PUeMXkS2p645EDMcPo7932asf2SEeki0ckDLM83xQd5oosPrRAmTx87Fuzr81XwYaazNBGfIuAnQQmhmpvv33WZ44k+bnmdZ+4bsN3fyxf8IiEIyqpPxBsUhslXaI6WB7+8OR3rJFh+3vVgiFPKI+L/knJmImAvQRkqBz58XgkzadWnnzRLSd/4oWeWNi4c/PPN9GZ4AhN0g8Em6Q8iWfKYJj9d/pPKZrIRf/ETMxBwHEC8sPyg8uq5km+jLbm7pab6UyQXhETbNJzOmqpkDdP+/Vp3z4ow/p7aSo7ioY/EHCRwNCdCZ44sOZBFyGknVWCTRpU6qL/3PLpG3XDE1GLF/jyvAXe0GTpZRZKY3UWQQABZwoc15ngw5MvHROJGy/1xcLxFw5tlFOEPseZWR9+rgg2aZiVB0q0r8/6zPQ0FmURBBBwscD4gtof3jb701rciO0647ErrvJq3j+7mOOorBNsjuJ484+Ax6e9f8L5W8eHahvVRX+Zw82Yb/LwCQEEkgjI+IbFv1v0nbP/Y8Nd97zSvuMKqeEcGbkgyWqOnnXU6MKOzmmamZPrMLECb357WaCk4531b608Y8zCMxZUziTQpOnHYgggoAT0kqr8ymtumvbvj4V8ec3yxVGPDXGjETWbY0r9S9OvOjSvYkavGp/C6/FVHzObPxFAAIG0BepCNd/97eL/fP78Jz+xW2o3rv7RSs1GDhupycQWVcxev7h8zkuTCsfFvbqvTgINzzVP+78UCyKAwJACulZT4CsY9281SxoNw1g15DIu+ZKajRT0lOKJvV+fdc2xI/K55BAgmwggkFEBXZtz/fSPzvnzzscmBoKBHRndl4U37tpgUy7Dytw557pGr+6JBr1B9fAkHlhm4QOVpCGAgL0FXBds5IbMXukc31fmL/aMK6itt3fxkXoEEEDAHgKuCzb3zv1SS22o0pA7/9X1qkJ7FBOpRAABBOwt4JpgI50AZOj/EzdWBcvrpAMAo7Xa+7gl9QggYDMB1wSbhqLxjAJgs4OT5CKAgHMEXBFsrp3yofbFlXO6pdhqnFN05AQBBGwhYGhr/+u13z7iC/iusUV6M5RIxwebmmBl18ySKfHKYBmBJkMHEZtFAIFkAkbbL3f+dbEMYbM82VJOn+f4YPOThV/tyfNIP2cmBBBAAIGcCTh+BIH2vs5Dhmb05UyYHSOAAAIIaI4PNu9Z9fmG1zp2RSlrBBBAAIHcCTg+2OSOlj0jgAACCAwIEGwGJHhHAAEEEMiYAMEmY7RsGAEEEEBgQIBgMyDBOwIIIIBAxgQINhmjZcMIIIAAAgMCBJsBCd4RQAABBDImQLDJGC0bRgAB1wsY2r6uaHe73Ounnpnl6olg4+riJ/MIIJBJgX09+z/17lWfm6zr+imZ3I8dtu2KYPPw3ifb9/Y0P2KHAiGNCCDgHIFwLNLVFe1VD2mkZuOcYk2ck9/v+ef4b2z68TmJl2AOAggggEAmBVxRs8kkINtGAAEEEEgtQLBJbcQSCCCAAAKjFCDYjBKQ1RFAAAEEUgsQbFIbsQQCCCCAwCgFCDajBGR1BBBAAIHUAgSb1EYsgQACCCAwSgHXBJtIPKL1xfv2iVdslGasjgACCKQSiBlGfOfGjq1lMnqAnmphN8x3TbDZ1L5de8eT1xTI0BEdbihY8ogAAjkUMIzdH3/u1o99+9Wf/0DX9OIcpsQyu3ZNsIlrhtYV7ymSXxmWwSchCCDgUAFdMzZ0b+2V806JQ3M47Gy5JtgMW4YVEEAAAQRMEyDYmEbJhhBAAAEEEgkQbBLJ8D0CCCCAgGkCBBvTKNkQAggggEAiAdcFmwcbHz2wr+fA1kQgfI8AAgggYL6A64LNT7c/1PCv/c9WmU/JFhFAAAElYITln3YsjhbwHf0nfyGAAAIIjEogrt/z4edvLvIYnjs1buc8Qum6ms2RnPMBAQQQyISAHm/b1tXYII+CnpOJzdt1mwQbu5Yc6UYAAQRsJECwsVFhkVQEEEDArgKuDDZ98Yghg+QxRppdj1rSjQACthNwZbB5oPHv+detu+M125UWCUYAAQRsKuDKYNMZ7Qm+3rWXi3c2PWhJNgII2E/AlcHGfsVEihFAAAF7CxBs7F1+pB4BBBCwhYBrg416rk3ciHVKKfGAG1scqiQSARsIGEZ7Z6xbTiqG1wapzWoSXRtsDoRbtQ+svK6jPdLZk1VxdoYAAo4VeO7gusvft/ILV8oNnfMdm8kRZsy1w9WoJ3fuDR+ojRqx3hHasRoCCCBwlMDmltebOqI94476kj/6BVxbs6H8EUAAAQSyJ+C4YPOvFT/Vzqia/0j2CNkTAggggEAqAccFG5Xhk0sbHk6VceYjgAACFhKISVraLJQe05PiyGBjuhIbRAABBDIosKhi1qvSKlMivdgc+xwc1webTe3benuivVsyeByxaQQQQCCpgG54ImoBXdMdeyuGI4NNZbCsoipYlrRwB2beuP57RTe/fFfxwN+8I4AAAgiYL+DIrs+nV8777IzihuZLnv5MkfR3z0vB5o1r8cIUyzAbAQQQSCxgaPt+1/jo7ffv+ct7Ei809Jw7T/ni9okF9en9Oh56E7b41pHBRgJMQXmguEXeA1IKqYKNLQqKRCKAgIUFdCP8vS33lXp0zyeHm8qTiieHgp5A9XDXs9vyjmxGs1shkF4EEEDA6QIEG6eXMPlDAAEELCDg3GBjaN7avEqPR/p3MCGAAAII5FbAscHG4/HW/nzhbf7qYEVjKuLN7Tt8d225/7fxeLw71bLMRwABBMwQKPMXtd+/8PYdAd3n+M4BysuxwUbypvs9/jyf7tud6sDoivUEH9n79KWGHndsH/dUBsxHAIHsCuR58zrGhqon6rpHdWRy/OTkYOP4wiODCCCAgF0EHNn12S74pBMBBBwh8LNX2l87JHf/Txxpbgwj3t7a177TMAyp6TjzOrPjg01tqDLYGm3TOqM8I22k/xFYDwEEkgr87OOrv/ZzCRITki6VZGZ7pGv7O5/5zGynBhqVdcc3o31t5qenfmTyO1cnKWdmIYAAAlkVuKT+LZvuPOW6aFZ3muOdOT7Y+Dy+/GnFk9ancpbRVrXeWF+zphnhVMsyHwEEEBiNwIyShqYxeeUjrgmNZt+5WtfxwSZd2G55OvR7nvl8/vbO3R3prsNyCCCAAALpCWT8ms2MGTMCVVVV5TLYZbVcQCuQV3opy8FSnbHu6mg8eigHu2aXCCDgAgG/7tMun3TRThko2PFjoR1bnBkPNirQyE7PkQtfZ0qgmXRsArLxd1DPKxwTLNeawy3SWMaEAAIImCVgtGlxQz1lM60p4PFr7xl/bplH945PawUHLWR6sFE1mYqKimrpenCeBJglci2kToJMnZzl6+RzXi56W0worH3bfYtub3rHU9doqvbioPIjKwggkCsBw2h/umnNxV/ddO9tkoSaXCVjOPuVc7B0rNYLo9Fo1puYzLxm4znjjDPyCgoKijwejzqhnySvhRJkFsj7VAkyhfIyPbilB60H/R6fBDqtL9XyLZG2qPR1b0q1HPMRQMDlArpm/GPvyuaw0bdMJIK20DDkUaC6EZKhuYpnzZpVoM7Zkm5vNtJu1snfK4mulQRfkl+Qf6pEz7NU9JRAE8pWRszC+sqGe4rml53c9pWZV5u1SbaDAAIIWEVAnZc/4A/455VVlL0in9cvW7bsr93d3TtWr16d0bEhRxVsJMCo9UtjsdgY6QAwUwLMbPl7qryP7ZfNekVt9OXZEwsH26KdY0a/JbaAAAIIvCkggwL3fWDC2/bpWn/Lz5szsvhJWpfUWblIjVQg74bUcnTdq7eGikNVp59+eks4HN4vTWwtEnjUPUCmXuIeVbDp6ekJ5efnL/X4PG+TAHOlJM66k1Qfa/KqvL1du7WI4ap7qaxbJqQMARcJ1IdqWi+oW26JjgESc6qEXr0WyOcPSvDZqnv0V4P5wV8GYoG/S0Wi9bHHHjP1RDmiYCPVriqv17tcmsveLa8TJP7VWrhH8xuHs64X/3DezZ6vvHzPw08cWH2ui45xsooAAgikEqiTWk65VHQmS03nMvn8j2Urlm3wGt7HJeh0ycqjruUMK9ioZjNp2yuRHY+TSDhTAsyiwxHSFhfHpLthYbG/kIv/qQ475iOAgKsE5DyeLxnOl3N6uVQg6iTotEhrlWpye33BggV7Q6FQlwSd3tGgDCfY6NKeVy3NZh+Xbs3zJM7NlwQWy86z0pNhNJlkXQQQQACBNAUMuaajGefL+X2FrPFBCTS/kvd/yGtVmlsYcrG0gs3hUQDURfN5Ur06WQLNZEmIY58ut6/ngLa+dfNDMn7RCunGrQIqEwIIIPCmgKHt2N6164/Pt7885yfL1C4AAEAASURBVM0vE3+6eOyZOxdVzkn75s/EW8r8HDm3qxpNobzypQUrJLWdWVLTObR0xdKIz/C9Jt93juR6Tlr32ahRAGSnb5Nod49UrVTEa8h8ljOzh6pgeWF5IHn8aAof1K5ff+dF3fGeeGZSwVYRQMDeAsbrVz73pdld8d7/TScfl016e+uCipmT0lnWQst45VxfKOf8SyXg3OrTfPdK2lRwVYFo2FPKYCPd4d4nW71OdvYZea+Ql62bzT4w4YLz7jrlpjXDlmIFBBBAwL0ChVLhmCpx4E65zeXry1cs/5hcwx9W0EnUjKbPnTvXl5eXVyXXZ2aK7xyJcCc6wVmaxUJlgaKUIwk4Ia/kAQEEEDBJoL+WI9uaLTUddf405P7KpyTg7JQmNXUzaMpWoCFrNrKBoHQEmOTz+37t0T0fleazJSYlmM0ggAACCNhYQCoep0ryL/P6vA9KbefcxYsXl6aTneOCjereLHeQjtX9uqrR1KgLRLLxRDWgdPZhy2V65Pk2X9/4o6ebeg/+xZYZINEIIJBzgQJvfuwTDe/dWeDLVzdQOmXySu0mKLGhQjqMzQoEAlMl4NSlytxxwUaNCuDz+S70aJ5bJMg0yEv1v3bUJPfbFM0unaqpZ0skmuLS5e6Zgy+d/8+mVUsTLcP3CCDgQgHD6JRcq1fKqdhf0H3JuLeOlycGvzGEV8o1bLOAalarlJavm+Q6zrXBYPDiVCkfHGzUYJqFcp3mS9JspjoFTEy1sl3nB7z+qf8553Nd5YESeQw0EwIIIJC+wKG+jqvft/LzQTnJptXtOf0t23bJ5WJxucSPW1UNR90qM1ROjgQb6RCgRgGol2g1V94nSjVJjdjs1Mnr1X0FEpXpKODUEiZfCGRIoK2vo3lv+OB82bwaTcX1k8SMKmlSmyxNavP9fv+E8vJy5XIktgwAHflCnkMzVb78b6nVLJD3yoEFeEcAAQQQQCCFQKlceThTBvP8rvT4vWThwoXHdYvuDzYysOYCiUOnS6A5QaJUQF7qDlImEfjT7sf0n2//wwNgIIAAAsMRmF82o+naKZevG846dl1WxQyZ1EXwCfJ+lowefak0q6kHsx2p0PR/kBGcF0iz2VJZSD3a1NY3bQ6nsGaVTgnW5Kn7VBNPe8MHih/e+9QliZdgDgIIIHC8wKKK2b3zKma46rYRiSFVcv1mqXQwu1RE8iTgvBls5I85UqM5X2YsP57L2d9cN+0jlVef+L5HnJ1LcocAAghkT0Cu36iRo9W9OHfKq2Fgzx55FrV6mI/qGJDJfuAxSUCPvCIDO7bKe1WwdJ9V0kI6EEAAAbsLSCzxSx5KVYeBmB6rk+s3/YNRyi0n+vtlRnUGMxiWKLdbmun+KfvYmsH9jGjTHs0XCHlV0yITAggggIAZAocDzknSnHZlXijvPWqbHulBMEva2ArM2MEx22iTbT8ur1/J8NR3yDwVaNK6EeqY7WT0z8mFdW/70byvNModvuFEO2rpa9Nu2/hfD4Sj8oEJAQTcKWBo+9a3vnrlZ1/61tnSSpPwgZEBj0/7+Anvfm5Z1amjethYJpDlh7+63WO1vHZLHjJ6PpYKhrpeo+5FWiSXayZ6JAKdZNY9NZJ49ehQ9cyGLnk1yktdD7lPBmpTbXc7ZD9qwDZLTWo0gZr8CikDLWGwiRhR7dGmlZd0xXsSHmCWyhSJQQAB8wV0I/y9Lfc3HYy0fUbOmwmbQ/zSinRh/ZkTqvIq1O0k1prkPBc34s/LCe9VqWTsl8QlPO+ZkXA550+Xc+s82dZJicdrGcmedK1V4s1OycSfZAzQR6VAdsnTPdtHsinWQQABBBAwV0DOyWp05lYjZnxF2rXUSP5qOK5L5Hs1LFlGeiLLtsdIwHmPT9VG5I8R31cjq0ckuERkY13yvksi2ZaYFlvd3dm9avXq1ZbrECCgTAgggIBrBeSyRp/cfLlOOod1yHuRnLfnS02nSs7hatSYgtHEg6FQZdsqkE31yYZVzUPd7TmyqKZr22XdtUbceEjeV0rim1v2t/Rt2LDBPoHG0PRCf0hXIz2rATiZEEAAAacLPPHEE+tkmLJX5XEyD8q9lhdJTWe+VBYulHybOgyPbLNYBTTVQeBnqulLok8644SFZdktss6z8npIAsx3JEreI1WyX8sQBS92dXU1yfWZTgk06WzLMmXp8Xhrfzz/ltjJxScm7Qb9lZd/0Prwnif/bJmEkxAEELCUQG1eRcf10z76lF/32mFsyZi0PvXIKP/7pZbztJzH/yDn9f+W1//Jeb45zZiQrr/XJzv5sQSKBtl4nkSfYnk/qoYjNR91j4z89u//0d8m72vkAtM2+Wu9fP2vvXv3tmzdujWjF5nSzc0olvMW+EKl8npJtlGTaDvr2rbUej2+FeeOXZZoEb5HAAFHChhtsXh8b9joS9pzd2x+TfeSqlPs9FgSQyoIqtfciw0NDRvq6+vXyf0xF0olQj0GeoIEnFI55wckAKnWtRFfblGHhE8CjWoGu0mqOjUSRKbK9ibI3wrULzvrkp3ulh2pbswH5O8m+b5V1umRKldnY2NjqwQa+zSXSeKZEEAAgWELxPV73vXMtSUH+9puGOU5d9i7ztYK6lxeUlKyR5rVHpBz/Auy33o5zy+W2HCefB4jr+MG1xxO2nyq2UtWWKvu8pSdHJKmsZb+jXo0v9ReOuNafIf83RqJRPavXLlyj3zmooYgMCGAgIsE9Hi4pa99ugQaJz/DJi7Naur2lJ2zZs06WFhYuFua2PLkOvyJUttRtZ8KqXCoJzcH5F09PC2t3sxSO4pLwOo5svCzzz7bITfevLB79+41gw8hqVbFJCCpADPwGjzbUZ8LfHnefG9Q64nZvVXQUcVCZhBAIMsC69atU0FnuzStNVZXV/9WOhDUxL3xyfIMsIsk0MyUprWxMn9ymsk6IAHnH0eCjayk2u6i8q5eRyapWh357PQPn5t6xbgLOpdvv2bNNyY5Pa/kDwEEzBW4tO4tr55Vu1iNMpLJ4b/MTXTirfVXLtT1ePWSiogRjUTDuvRfllWek6qHGvtMBZx6+Vwp73lSewnId1XyLhf5jbBcgmmWv3fKvEb5/NzgYCPfuXsK+gIlE0N1O5IpROIRIxaP7pGOArWy3KgumCXbD/MQQMBeAhfVn5lXF6qx3qgBJjAevtyiLrmo4KEm74IFC0qDBcF5Xs17olxuKZEAUyhBReVfNZupZTfJ36ui0ejOp556ahvBRrENY9pwaGvBB1Zd337/4tu7ZKibUV0wG8ZuWRQBBBCwkkDsueeea5X7dJ6U6zor5Xq/R0aLUU8RUCM+a9LsZgQCgT75LtzX19ffWkawGWbxGRKyO6JdYyWKq/HfmBBAwOECcgL97tqWDRvl//y/yX9/h+d2WNkb6FCQ1kqOCzYxI7rbq3ulDVEf0aCZ0uXPPyZYrh0ItyYdTSAuI6Z6dU0NxnfUfUlpqbMQAgjYRuDX2x7+9b27fvsr6X1VZ5tEWzChaghoR01XPf/Vvx0MtzWONFOF3vyGu+fd3FQZKE04gKga1ubWDfe+2Bbp3D3S/bAeAgjYQyAWj8lVcV0N4TLkD8vyQLH2X/O+vL0mv1JdKGdKIOC4YLOla+eVLeFDFQnym/JrXfcEKgIledIBoCPRwmr8tCcOrD53f8+B/ifQJVqO7xFAwPkC6pECJxTWV3p1X9LRBZwvkTyHjgs2ybPLXAQQQACBXAg47ppNLhDZJwIIOFHAaGvuOfjTR1ufPunwHfNOzGTW8kSwGYpaBp2Tp3d62yOdWlesZ6gl+r/rjfXFNPVoVV2nC3RCJWYgYFuBQ+9a+fkmuTHxDukcwP/xURYjzWhDAep68Tdnfbb0AxMu2DbU7IHvbnnlnp77X//Lnwb+5h0BBJwlIDcrBqVzQMJrs+dVL+u+85TrGuWeOzs8UiCnhUOwScDv8/jyavKqdiaY3f/1gfCh+tWHNqqHDTEhgIALBeoKqvukF1q9ZH3InmouJEmYZYJNQhpmIIAAAgiYJUCwMUuS7SCAgKsE5pRO3dJQOL7VVZkeRWbpIJAEL+TNy6sKlmnNMppAoikej2lxI9ZxeJw0xrJIBMX3CNhJoL/jj5bwxm6VldtnX1sc9AScMMJzVkqGmk0S5vkVJ5/6g7k3HUiyiLaxfZvvi2u/85CMBp10uWTbYB4CCFhNQP/IJ1649UHpHHCG1VJm1/RQs0lScuqJdDIURdInqUWMaPCVju0fCMf7Dvk9/QOeJtkis+wj0P/M+fUy+OKIa6s+j3feSMfos4+TQ1Oqa/s2dmz7hpwDJjg0h1nPFsEm6+Ts0BYChrb27Mc+sk8G+V000vQ+cNodWkWwdKSrsx4CjhIg2JhQnH3xiPbwnic3nzv2dF+hL3SqCZtkE8MU6O7ruaexpyl/mKslXPxgpHWf1GrOkWaUEf+yfaDxbx0rKhf+MuFOUswoChTU1OZXnZNiMWZnWaDAmx+bWTplo1fzqCdVMqUpQLBJAaVrHk91sEJr6WvTpMlsyKXV93e/9usFUSPW9t4J5w+5DF+mI2CoR+qOaPrW5p889ljzC78e0coJVpImlARz0vv6VzsfKZLX5ektffxSM0tO1O445Qtd8siMoQ+841cZ+EYefTGyR2wMbMDd73IcSq+fRAZTiif2fn3WNTMTzef7oQUINkO7HPnWo3tq1FM5P7fm2+G1ba+WH5nBB3MFDKP96xt+9G25/nXBSDbc2LPvBqc912pT+3btslU3vu7RPAlHIB/K6kOTLhpzds2iSUPN47sUAnIcPt205uKvbrr3NlmyJsXSzB6GAMEmNZauhg6XRw6oZ2ozJRQY9QX1zlWtL5W1R7sXJtxFshmjq4Qk23LO5qka8+7e/dOHm4A1rRt6Tq86dZX8UEr463zwNtVjNby6Z/7g71z7WdeMf+xd2Rw2+pa51iBDGSfYZAjWbZuNxePr5YK6XOLQ1NAdI5pkZN2Fo226GtGOHbbSX/Y+mfeXfU+OlcIw0slabV6V7xeLv5nOoiyDwIgFCDYjpjt+xT/teaxvbGjMLcur5v/H8XNt8o2h7ft70zM3dUQ7h/UgqL1d+w25oH6DnOBG3PRAoDHnGBFHVc8bn+7W1CPQv/Ly3Y+cXNrwcLrrXDT2zP+Q8QNH/JDCdPeT1eWkB+Jf9zzxvafbXkx4PWZK0fjOU0umqTETh13jzGpeLLgzgk2ahVIZLPWqx7+29CW+qXhv74Gqe7b8+j8k2KS51QwvJu3PUtNI69ftkZToWvPXN/7og7Le8iPfpfmBYJEmlMUWU811jzU/f456pZu0eWUnRyYU1KbZoaN/1GQbNHQabd969WeXJTv2PzfliuiJxRMJNOkeKIOWI9gMwkj28QsnXVnQ2N208bLnbrDNgfbXvY9/+lev/+3fk+Xr2HkypLo8zUebc+z3/I3AYIHPv/RtI08Pbhr8XaLPd827cWaxvzCUaD7fu0OAYJNmOcvF1vwSf2Ek1eIRI6J1R3teCPnypCpufvdTua7xbMyIpdUV9u/7no7u6t03sgvuqTLKfFcLyHiBAQFI69ha1/pq96LK2U+nC+bR9fEy1uC4dJdnOXsIEGxMLifVzHbeE1fV/GHp96KlgeKgyZvXvrXhJ7c/3PzUnelsVwLTt2jaSkeKZTIpcPOGu9T/g7Q7jnxs8iXF3K+WyRLJzbYJNhlwlxN8/Vc23L3li9M+srUmr/LcVLto7mm58omDLxSlWk7Nf+zg8yfIW1p3tRNo0hFlmSwIqAeLpXXMqrT8cc+/tO547y2l/qKD6aStMlhWMdpOOZFo9Nr7Xv/DIenk8inVpfLYySPfnVo2bUtJoJjxh47FSfNvgk2aUGoxj8fjHxMsl0cOtKS86r720KsnPrpv5bgPTnxbyj388LXfdP2z+dmfpFyQBRBwgcC+3oPafTv+nHaPTjXCx2g75ezpaXr1f3b+5RfyA61kKOJ8b548UuAzY9U9d0PN57vUAgSb1EZHlijyFUz9+YLbmt/59DUh+eWV8qD7yfYH/T/e9run5JdS0pvr5NfU9dRCjjDzAYFhCTSFD2or/nXF6/ILcMewVhy08OH/g4WDvuKjyQIEm+GBeoNef1ACQ9LgMWiTXll26aC/h/w4VLV9yAX5EgEEEglMkJautJvqjt0I/wePFTH/bx6eZr4pW0QAAQQQOEaAms0xIPyJAAIIDBaYU3pSZEXVgibd8IwZou/A4EX5nESAmk0SnASz9Jq8Co880yLBbL5GAAEnCcwvP7nrwvoV9dJBSN1bxDRCAYLNMOFkhNyie+d/SX/PhHP2DnNVFkcAAQRcK0CwGUHRq+6PIU9+eASrsgoCCCDgSgGCzQiLPeAJeELS954JAQQQQCC1AMEmtdGQS7ylenH1HXO+2DXkTL5EAAFHCLx3/Lmtiypm9zkiMznOBL3RRlgAQV8gOKFw7CFZPeXNnSPcBashgECOBd47/jxPkb9wTI6T4YjdU7NxRDGSCQQQQMDaAgQba5cPqUMAAYcLxI343rZoR7fDs6nRjDaKElYjwar7bbpjPSkH5hzFblgVAQQcLPDp1V/fsrVr51wHZ7E/a9RsRlHCfo+/8peLv9kmQ5x3jGIzrIoAAhYTUD8ibzjpo6tC3nz1eISMTm2RzmBvvM/x134JNqM7jLxy8bDEp/vaR7cZ1kYAASsJFPpC2ltqT1vk9XgZCdqkgiHYmATJZhBAAAEEEgsQbBLbMAcBBBBAwCQBgo0JkFLl1vO96jHrTAgggAACQwkQbIZSGeZ3d57yxdCXp3+8eZirsTgCCFhQ4LyapT3XTrlslQWTZusk0fXZhOIL+fJL60JjXjdhU2wCAQRyLHD+2OX69JKGRTlOhuN2T83GcUVKhhBAAAHrCRBsrFcmpAgBBBBwnADBxqQi9ehenad3moTJZhBAwHECBBuTirQ6r7z2F4u/yc2dJnmyGQRyIfD5ky5fOz5U25OLfTt9n3QQMKmEpWbjL/YX+k3aHJtBAIEcCJxXu3xODnbril1Ss3FFMZNJBBBAILcCBJvc+rN3BBBAwBUCBBtXFDOZRAABBHIrQLDJrT97RwABBFwhQLBxRTGTSQQQQCC3AgSb3PqzdwQQQMAVAgQbVxQzmUQAAQRyK0Cwya0/e0cAAQRcIUCwcUUxk0kEEEAgtwIEm9z6s3cEEEDAFQIEG1cUM5lEAAEEcitAsMmtP3tHAAEEXCFAsHFFMZNJBBBAILcCBJvc+rN3BBBAwBUCBBtXFDOZRAABBHIrQLDJrT97RwABBFwh4Mhgc8fm/2l6av+LX3ZFCZJJBBBAwAYCjgw2r3Rsn3r3a7/8rA38SSICCCDgCgFHBhtXlByZRAABBGwkQLCxUWGRVAQQQMCuAgQbu5Yc6UYAAQRsJECwsVFhkVQEEEDArgIEG7uWHOlGAAEEbCRAsLFRYZFUBBBAwK4CBBu7lhzpRgABBGwkQLCxUWGRVAQQQMCuAgQbu5Yc6UYAAQRsJECwsVFhkVQEEEDArgIEG7uWHOlGAAEEbCRAsLFRYZFUBBBAwK4CBBu7lhzpRgABBGwkQLCxUWGRVAQQQMCuAgQbu5Yc6UYAAQRsJECwsVFhkVQEEEDArgIEG7uWHOlGAAEEbCRAsLFRYZFUBBBAwK4CBBu7lhzpRgABBGwkQLCxUWGRVAQQQMCuAgQbu5Yc6UYAAQRsJECwsVFhkVQEEEDArgIEG7uWHOlGAAEEbCRAsLFRYZFUBBBAwK4CBBu7lhzpRgABBGwkQLCxUWGRVAQQQMCuAgQbu5Yc6UYAAQRsJECwsVFhkVQEEEDArgIEG7uWHOlGAAEEbCRAsLFRYZFUBBBAwK4CBBu7lhzpRgABBGwkQLCxUWGRVAQQQMCuAgQbu5Yc6UYAAQRsJECwsVFhkVQEEEDArgI+uyacdCOAAAI2FzAMI94R1+Ku+NFPsLH50UryEUDAngISaZpvXPf9vfvDLVPsmYPhpZpgMzwvlkYAAQRMEYhrscjKlrWzTdmYDTbiiuqbDcqBJCKAAAKOFiDYOLp4yRwCCCBgDQGCjTXKgVQggAACjhYg2Di6eMkcAgggYA0Bgo01yoFUIIAAAo4WINg4unjJHAIIIGANAYKNNcqBVCCAAAKOFiDYOLp4yRwCCCBgDQGCjTXKgVQggAACjhYg2Di6eMkcAgggYA0Bgo01yoFUIIAAAo4WINg4unjJHAIIIGANAYKNNcqBVCCAAAKOFiDYOLp4yRwCCCBgDQGCjTXKgVQggAACjhYg2Di6eMkcAgggYA0Bgo01yoFUIIAAAo4WINg4unjJHAIIIGANAYKNNcqBVCCAAAKOFiDYOLp4yRwCCCBgDQGCjTXKgVQggAACjhYg2Di6eMkcAgggYA0Bgo01yoFUIIAAAo4WINg4unjJHAIIIGANAYKNNcqBVCCAAAKOFiDYOLp4yRwCCCBgDQGCjTXKgVQggAACjhZwbLDpiHYZzT0H7tQ0o83RJUjmEEAAARsIODfYRLqLLl31uXf0xSM9NigHkogAAgg4WsCxwUZXk6aPNzRNd3QJkjkEEEDABgKODTY2sCeJCCCAgGsECDauKWoyigACCOROgGCTO3v2jAACCLhGgGDjmqImowgggEDuBAg2ubNnzwgggIBrBAg2rilqMooAAgjkToBgkzt79owAAgi4RoBg45qiJqMIIIBA7gQINrmzZ88IIICAawQINq4pajKKAAII5E6AYJM7e/aMAAIIuEaAYOOaoiajCCCAQO4ECDa5s2fPCCCAgGsECDauKWoyigACCOROgGCTO3v2jAACCLhGgGDjmqImowgggEDuBAg2ubNnzwgggIBrBAg2rilqMooAAgjkToBgkzt79owAAgi4RoBg45qiJqMIIIBA7gQINrmzZ88IIICAawQINq4pajKKAAII5E6AYJM7e/aMAAIIuEaAYOOaoiajCCCAQO4ECDa5s2fPCCCAgGsECDauKWoyigACCOROgGCTO3v2jAACCLhGgGDjmqImowgggEDuBAg2ubNnzwgggIBrBAg2rilqMooAAgjkToBgkzt79owAAgi4RoBg45qiJqMIIIBA7gQINrmzZ88IIICAawQINq4pajKKAAII5E7Al7tds2cEEEDAnQJtfZ1r/7V/VZvkvs4tAtRs3FLS5BMBBCwjsKb1lUPf3XL/csskKAsJIdhkAZldIIAAAm4XINi4/Qgg/wgggEAWBAg2WUBmFwgggIDbBQg2bj8CyD8CCCCQBQGCTRaQ2QUCCCDgdgGCjduPAPKPAAIIZEGAYJMFZHaBAAIIuF2AYOP2I4D8I4AAAlkQINhkAZldIIAAAm4XINi4/Qgg/wgggEAWBAg2WUBmFwgggIDbBQg2bj8CyD8CCCCQBQGCTRaQ2QUCCCDgdgGCjduPAPKPAAIIZEGAYJMFZHaBAAIIuF2AYOP2I4D8I4AAAlkQINhkAZldIIAAAm4XINi4/Qgg/wgggEAWBAg2WUBmFwgggIDbBQg2bj8CyD8CCCCQBQGCTRaQ2QUCCCDgdgGCjduPAPKPAAIIZEGAYJMFZHaBAAIIuF2AYOP2I4D8I4AAAlkQINhkAZldIIAAAm4XcHywiRvxLs3Qet1e0OQfAQQQyKWA44PN9zff98eDkUN/zyUy+0YAAQTcLuD4YPPwvqevebzp+VluL2jyjwACCORSwPHBJpe47BsBBBBA4A0Bgg1HAgIIIIBAxgUINhknZgcIIIAAAgQbjgEEEEAAgYwLEGwyTswOEEAAAQQINhwDCCCAAAIZFyDYZJyYHSCAAAIIEGw4BhBAAAEEMi5AsMk4MTtAAAEEECDYcAwggAACCGRcgGCTcWJ2gAACCCBAsOEYQAABBBDIuADBJuPE7AABBBBAgGDDMYAAAgggkHEBgk3GidkBAggggADBhmMAAQQQQCDjAgSbjBOzAwQQQAABgg3HAAIIIIBAxgUINhknZgcIIIAAAgQbjgEEEEAAgYwLEGwyTswOEEAAAQQINhwDCCCAAAIZFyDYZJyYHSCAAAIIEGw4BhBAAAEEMi5AsMk4MTtAAAEEECDYcAwggAACCGRcgGCTcWJ2gAACCCBAsOEYQAABBBDIuADBJuPE7AABBBBAgGDDMYAAAgggkHEBgk3GidkBAggggADBhmMAAQQQQCDjAgSbjBOzAwQQQAABgg3HAAIIIIBAxgUINhknZgcIIIDA0QIxI+Y7+hvn/+W6DDu/SMkhAghYVsAwOr+28b92vty2dZZl05ihhBFsMgTLZhFAAIHjBHQt9mzLuqKOaHfxcfMc/gXNaA4vYLKHAAIIWEGAYGOFUiANCCCAgMMFCDYOL2CyhwACCFhBgGBjhVIgDQgggIDDBQg2Di9gsocAAghYQYBgY4VSIA0IIICAwwUINg4vYLKHAAIIWEGAYGOFUiANCCCAgMMFCDYOL2CyhwACCFhBgGBjhVIgDQgggIDDBQg2Di9gsocAAghYQYBgY4VSIA0IIICAwwUINg4vYLKHAAIIWEGAYGOFUiANCCCAgMMFCDYOL2CyhwACCFhBgGBjhVIgDQgggIDDBQg2Di9gsocAAghYQYBgY4VSIA0IIICAwwUINg4vYLKHAAIIWEGAYGOFUiANCCCAgMMFCDYOL2CyhwACCFhBgGBjhVIgDQgggIDDBQg2Di9gsocAAghYQYBgY4VSIA0IIICAwwUINg4vYLKHAAIIWEGAYGOFUiANCCCAgMMFCDYOL2CyhwACCFhBwBXB5oWWl7sP9LTeo2lG2AropAEBBBBwm4Args3KlnVTL3/+xvfHjXif2wqY/CKAAAJWEHBFsBFor7yKrQBOGhBAAAE3Crgl2LixbMkzAgggYBkBgo1lioKEIIAAAs4VINg4t2zJGQIIIGAZAYKNZYqChCCAAALOFSDYOLdsyRkCCCBgGQGCjWWKgoQggAACzhUg2Di3bMkZAgggYBkBgo1lioKEIIAAAs4VINg4t2zJGQIIIGAZAYKNZYqChCCAAALOFSDYOLdsyRkCCCBgGQGCjWWKgoQggAACzhUg2JhUtoZh7NzS8fpPTNocm0EAAQQcJUCwMak493bvj330hS9dYtLm2AwCCCDgKAGCjUnFaeiGR9d0HmNgkiebQSAXAjs6G/dF4pHeXOzb6fsk2Di9hMkfAgikLXDF8zfXSHN42suzYPoCBJv0rVgSAQQQQGCEAgSbEcINXm1H156Pf2/zfU8N/o7PCCCAAAJvCvje/MinkQrctP57n9rd0zRppOuzHgIIIOB0AWo2JpRw3IgXyWaCJmyKTSCAQI4FNnfu0Pf1HGjMcTIct3uCjeOKlAwhgMBoBL67+f7gNWturx/NNlj3eAGCzfEmfIMAAgggYLIAwWYUoDJqQNMvXv/Ldc29LVz7GoUjqyJgNYG4Ftd6Yr0HJF0xq6XNrukh2Iyi5CJGxPjRtgeujxjRMaPYDKsigIDFBA6EW7VLn7o22BXt7rBY0mybHILNKIrO0DRdVi/RZRrFZlgVAQQsJiD/t7WueE+RdP7h/7ZJZUOwMQmSzSCAAAIIJBYg2CS2YQ4CCCCAgEkCBJsRQh7sO/TH7776P78c4eqshgACNhBoCbeHY/FYpw2SavkkEmxGWESPNz0/6+F9T18zwtVZDQEEbCDw8Re/Oub3u/+PHmkmlBXBxgRENoEAAs4U6I71an3xiOovwDRKAYLN8AFj0Xh01Z6e/ZHhr8oaCCCAgDsFuBlxmOVuGPGudzz16eKOWPf4Ya7K4ggggIBrBajZjKDo45qhxk1i4M0R2LEKAnYT6Ih2enuj4WZJN81poyg8gs0o8FgVAQScL/C7Xf8ouuy5G6piRrTb+bnNXA5pRsucLVtGAAEHCMhwVFpXtGfUOYkbscbf7HwkEo73jR31xmy4AWo2wyo0o6032veCGqSPCQEEEBiOQF8ssvvebQ9M6otHXdkET81mGEdLe1/ntguf/mSDtNwWMRzaMOBYFAEEXC9AzWYYh4BcHfTomj6egTeHgcaiCDhAwJBfmO2RrnbpjdrngOzkJAsEm5yws1MEELCTgLq584Orrq99rXPX6C/e2CnjJqaVYGMiJptCAAHnCnTFejR5YCLdn0dYxASbNOFkyIr717Ru/Feai7MYAggggMAgAToIDMJI9vHL638w+5mDayvpGJBMiXkIIIDA0ALUbIZ2Oe7bPiNaJYGm5rgZfIEAAq4RaO5r1SKxSItrMmxiRgk2JmKyKQQQcLbArRvvLf3yxrtdeZ/MaEuWYDNaQdZHAAHXCPTEwpp6MQ1fgGCT0sxoa+45cOeeniZ6oaS0YgEEnC8Qj8c0GXpGPb2Tc8IwiptgkwIrbsQ73rXq8xfv7T1QlWJRZiOAgAsEtnTsDH3hpTu65LlWXLsZRnkTbFJgyZ3DuiwyQV7eFIsyGwEEXCDQHe/VV7duqJb6TdQF2TUtiwQb0yjZEAIIIIBAIgHus0kkk+Xv5cbkzkeW39ud5w2OGbzrHZ2N+654/ma6XA9G4TMCgwQ+MPGCWz4w/oLrLnv2xkBT+OCgOXy0kgDBJklpROOxpza1b3tRFvlUksVMmSX38MQCHt9x3VyK/UWxuWUzmtLdScyIedYderVKniaa7iosh4AlBHRD23dK+TRNV+PdDmM6v3p53Kt7jVmlU1teat1Utr+vZVjrD2NXRy0aiUfCAd0flv+7dIU+SmboPwg2Q7v0f7vywNremzd8/3IZ6TnJUpmdVR4sqfv2nM+lvRPVS+bCJz+pqXGcmBCwk8D4UO2nvz37cz/SdU/xMNP9ZbX8DdM/GvzfHX/q/cn2B/OGuf6IFr/y2ZsqLpt4ccf5dacTbNIQJNgkQYoZcZ8EmuEe+Em2mPlZHt2bf+cpX2xLZ8BAFZBuWP/dUu4byHy5uGUPlYGSDbfNvKZuJPmtC1VfJ4GmYCTr5mKd/9/emQDHcZ13frp7BjODiwQJAiAIkRBJUTx0UJIlWjeVeFMV03EOKdnYsrdkr+1YviKnrMNx5bArzsrJrmTJrliJY0eWLSVeO4elKOvY8po3CYkQSYAACRIkQRAAcV9zX935PxigSXAanBnM9Pnvqq6e6eMdv/e6v/e9973vjSQnK6bSoZQZcdsxTgqb7KUGIzStP5KJXNGtlf12S51V1letWZJLijBfILwysCLvJW/FSqUjiYlcouA9NiUgdPkV/mXQ6fPT6n+n6Ve/cV1189cLzPYtBT538bFKb1Ba4a9h/bxIxDo/KGyyloU2/djbXznWGTq9Oetlh5yUZaXihXf86VC+4zuD0VHpkbe+cJkhg0OQMBuzBKp9lS+/uO3Ld8p5aho+j/LHZkJ8b+MDqS3V69N/0PpF22hIZvIyMm4KGx3aGGS8MaWlC+oO0AnSiqcln+yrzzdh9YHloXyMFi4NP6OmfW1TJ5flK+AuDYO/FyYgulAbA3UXGsvrCp4btrl6bTQowzJSkioXjs1aVxVZqawN1MSNSlVSTUqihwANN1txMorPpfFQ2FxKg79zIhDw+qtgtFCV083zbspo6chv7vkMDRjmcSnmX1hHTT9/6x9/vzaw9LOLCPeji3jWNY/+oPcn1YcnT0SevfkJCpyrlDqFzVUAGXG51r+077mbn0qhy6LRiPjMjEORvIFv3v7FXljNFWyb/cq51+v+Y3Bv0Mx8lDLuSiW497lbPl/vV3xlhcQjaZK63L/kdwp5ls/kR0B4ExiKjVViaCuU35Puu5vC5ooy14RRQK/mUWuuuFSiE0Ep0N9YUb+tRMFbLVhlZXDF6sUkamP1uunWieNFFTYjiXGYPRQm/5aVVXt8km8xWbrs2bXlTe1rK5tuQheWrSwhL8sE/5DAPAIUNvOARNPxzvftfzwaykQ2zLvEvxYhsKPx3uC7G++JFCs5WFVeevjgk+XDEDj5bsLzwwu3/dnxZf7qohmTwALsAxA0BXVT5pt+3k8CRhGgsJlHOqWm5elM5O55p/nXQgQwl0ioEcVTJWDde0vNptHRxGQm32wqkhRZ7l8ayNdqK994eH/uBDCr33Nrzabx9slTy2Dkk/uDBd6JeRIezMmLol6WI4iCjTIKjN42j1HY2KaomNBSEnhq00dqSxk+wzaOQKWvPPB/tj4R+P39n/MY4SttFHPOPnjw8xUwyuivCyxbVBexcZSMj4len41nzhhJgAQcRECM9UGoVabUZGGDfg5isVBWXCNsxKz3SCp2GIvrTekBQf97GwaKz+ld53kSIAESIIHCCLhG2Aj/XxgEDqJfflgP1fMnv9fzh4efbta7zvMkQAIkQAKFEXCNsBF4Qpno7clMUndgeSg+viaaid9UGMrCntpQuWZoW+1NamFP8ykSIAGrEIhmEip6R4pmJWmVfBUrHTQQKBbJAsN59pYnz5d7g3cW+DgfIwESsAiBp9qeWbVt+c2DT2z8MP2yZSkTV2k2WfJv+inZI+Vtbmt6opkAErABgWe2Pjnw6fXvN+z9Gk9Olw3Hx7m2jU7doGYzA0ZLYFXOw6F0iBVFp6LwNAnYjUBj+YrG65JrSj/Rxm5gTEovNRuARz/r0EN7Pzt1bPr0WpPKgdGSAAk4gEBfdLDm3/t3wfefSl9p88qTwgZAMANYSnsyYtwkp0XH5jHkXxIgARKYIYD5NmUvnP7+anguiBLJ5QQobC7nwX8kQAIkQAIlIEBhUwKoDJIESIAESOByAhQ2Hu1cLB0/IjwMGLphoEiseIkV/gpas8TQtDIyEiCBvAjg9YZ7V26XEnC9sDkTPv/Gjr2fvBlLCxjq0r3SW37h5W1Ph8pkn6GTSC8tfP4mARIoPoFYJu55/MhfK2+OtZ8tfuj2DdH1wiatpRWsH7IaS+ka2hJBdBmsly4mf9EluX3fH6bc4gQag3Xqw6t3pH2ScbM8hGNOWLYuh2Wa67+vl1YPd8PQtOm0qiYvBcLfJEACziGAtYbKPtD8Hg96EJyTKZvmxDhxb0FAz5586cW9I61cx8SCZcMkkQAJOIuAq4XNW+MdD46nQqucVaTMDQmQgBUIiPl7VkiHVdLg7m40q5QC00ECJOA4Aj/s+0nDX534dq/jMlZghihsCgTHx0iABEhgIQKD8bGyIxPHaxa6x03X3NqNBk+wWhhqrpvKmnklARIgAdMIuFKzER6eP/HWX/zDcHys0gzyN1SvO/T3t38p5fFIpsRvRp4ZJwmQgLsJuFTYpDLHw2cegz28KY43V1c0HqsLLF+Lqsc5Nu5+/5h7IwigA6MhsDxs5FwbI7JltzhcKWzsVkhMLwmQQOEEAt6A9+9u/3PPxuprCw+kwCdH4hOVnzvyv4fgEutUgUE45jG3jtk4pgCZERIggasTkCWlUpaMb1tj6RKpdaKjfjoVDnklxVCXWFenYuwdFDbG8mZsJEACLiTw+wcfX+/CbF+WZdcJm/cffLIHVmhH0MrZdhkJ/iEBEiABEigZAdcJGzjA3A7Hm9tLRpQBkwAJkAAJXEHA+E7MK5LAEyRAAiRAAk4n4DrNxuQCzTy46l09v954n+v7b00uB0ZPAiRgMAEKG2OBhz+y9sFRmGLeY2y0jI0ESCCo+D1ij2UShGECAXajmQCdUZIACRhP4E82f7z7D9b+btT4mBmjIEBhw3pAAiTgCgLl3uD666rW8JtnUmkTvEngGS0JkAAJuIkAhY2bSpt5JQESIAGTCFDYmASe0ZIACZCAmwhQ2LiptJlXEiABEjCJAE2fDQIve6TEymDdBUX2+gyKktGQAAmQgGUIUNgYVBQNgdrOl7Z9eT28z5YbFCWjIQESIAHLEGA3mkFFoXiUJASNcDHOBdMMYs5oSGA+gZWBusxHr31oskIJzr/E/yUmQGFTYsAMngRIwDoEavzVFe9v3rG00ssOBqNLhcLGaOKMjwRIgARcSIDCxoWFziyTAAmQgNEEKGyMJs74SIAESMCFBChsXFjozDIJkAAJGE2AwsYA4j7J66n2VdAKzQDWjIIESMCaBDjPxoByeXzTI//6wIptdxkQFaMgARIgAUsSoGZjQLGsCaya8sreegOiYhQkQAI5EFgZrB0ulwNaDrfyliIRoLApEkgGQwIkYB8Cz2x9ovzBa97FJTsNLDIKGwNhMyoSIAFrEJAkudInl1kjMS5JBYWNSwqa2SQBEiABMwlQ2JhJn3GTAAmQgEsIUNi4pKCZTRIgARIwkwCFjZn0GTcJkAAJuIQA59mUtqATf7Thg3tXVzZuLG00DJ0ESIAErE2Awqa05RPf0Xj/Bqxjc01po2HoJEAC+RIok71SuRLwRDPxfB/l/QUQYDdaAdD4CAmQgP0JPNT0a6lntz4ZsX9O7JEDCht7lBNTSQIkUGQCiqxU1gZq6LOwyFz1gqOw0SPD8yRAAiRAAkUjQGFTNJQMiARIgARIQI8AhY0eGZ4nARIgARIoGgEKm6KhZEAkQAIkQAJ6BAwzfdY0LSFJUlovIU47X6EEE1uWrBuTPHKF0/LG/JAACZBAvgQM02wgaNo1SRvIN4F2vX9L9fqup2/6bC3yXWfXPDDdJEACJFAsAoYJGyQ4LWmSWqyEWz0cRVI0uDGvRjolq6eV6SMBtxKo8pZrj2985EhDYLlbERiWbyOFjWGZYkQkQAIkkAsBn+wLvnvl/VvrA7W53G77ezCcIVYnTYdCIcNXKaWwsX31YQZIgARIIEcCkieJOw+VlZWJo6EbhY2huBkZCZAACZhHQPJIQqOJ+/1+ajbmFQNjJgESIAESKBUBIzWbPmRislQZYbgkQAIkQALWJWCYsNm5c6drhE1Q9oeqfeWG94lat5oxZSRAAlYgIAwEsGX6+voM70YzbFKnFUAblYaXtv3lm8v9NTcaFR/jIQESIIEcCaSwdXV3d6dyvL9otxmm2YgUY1KnmGeTKVrqLRpQpbe8kpM5LVo4TBYJZCGwuWrdxLqKJsNb+1mSUtpTkkfLZGZWizM8r4YKG4/qCYHkYGlpMnQSIAESyI/AR9c9VPaxdb/n+IawsEZraWkR32FnCxu09mOaR5vKrxrwbhIgARIoLQF8myqCir+0kZgcOsZqwtinkQzDBY3IuqGajepRY8gmhY3JlY7RkwAJuJKA0GhM+/4aKmxmu9GGXFnMzDQJkAAJmEtgFN1opn1/DbVGk2VZmANHzOXN2EmABEjAlQTCMNIS3WimbIZqNugvjGAfMyWnjJQESIAE3E1gEL1L581CYKhmg0G4ECSraWpcqSFDkE7++Q2PHilTfOtKHRfDJwESIIG8CEgeYaAVzeuZIt5sqLDBZKKQz+cbduoKLxCmU9vrtm0vYvkwKBIgARIoCgGsJyYMtEwTNoZ2o4FYCK1/x2o2RakRDIQESIAESkAA394uVVbbShB0TkEaKmxUVY0js6YNUOVEhDeRAAm4kkBN2ZLoLTWbnGzAFJYykmnfX0OFzYEDB8YziUyPK2syM00CJGBpAk3l9dXPbH2iwtKJXETiMF4+DovgkUUEsahHDRU2IqVYIS4DdU64rHG8a4hFlQwfJgESIIEiEcA3N44xm+lYLOYOzUZwgxO4DAwEBmAVQWFTpIrEYEiABEhAjwAEjXBPExNDGPCL5h5hoyiKcG3dhZmshru41isMnicBEiABpxKAlayKBv4pjNeYZokm2BrejZZIJFSoc+MQtmK5AW4kQAIkQAIlJCA0G3xzRzBeY2oD33BhA4u0NLh2YxdHbiRAAiRAAiUkAM0mAyfI7YgiXMJorhq0oZM6RWpmpWs31DpTpexVyRR2Q8O/nP9pj3h0bdU10a1LN24uLBg+RQIkQALFISDGxyFwzsaisVhxQiwsFMOFzcjIiNrU1DSJmayiH9Fpm/9r3a80i0zdUXNj2803b8g6GIfxKtkjSZVOyzzzQwIkYD0CYsE0VVOn0Jtmam+S4cIGa18nIWwOQdAID9CO3Q5PHr/+4YNPjWbL4G+s3P6z9zW/+39ku8ZzJEACJFBMAkKzUdPq4UgkItazMW0zXNggp9rOnTvj92+/fwoQwlDvHNnCT2lp/4X4yKpsJds6cWzpuxvvPZrtWpW3ogZdjauzXeM5EiCB4hKAnVJyOhU5PhfqhdiIcKLrmG+SMA5Awz6OGSeRjo4OU6ebmCFsZsoVql3n7FybrXMF7ZZj6+Tx9/7Wvs9kze7f3vpnL25Y0vxI1os8SQIkUFQCE6mQ+uC+x24uaqAWCgyN+STkzRAMs4RW405hA1u8TozbKADgOmGzUF38Uuc37lhd3phV6xHPratsGvif6x789YXC4DUSIIFfEOiLDk3/zal/OqvHI5QJO305kDA0m3Z4DjBV0Aj+pmk2MA8YwSyfcb1K4Nbz/fHhzdh1s38u2q9+aO1vZe17lWDrh5aMY3076ULhBdcSQKs9AlsjvTl70kBsuPzA+BHHai5XK3j0HiXwrR2sqKjQY3S1IIp23TRhA9cJnbIqVxo/rbRo7EwJaDA+uvkDBz9PwwNT6DNSqxH4yolvxdomTyaypgujFXE17u7Gl+aZApuDyWTSVEs0UT6mCRtM6RzRFG0cYzdCvRPdadxyIKB6NBoe5MCJtziCQCaUjnRhvCHrnLy0mvadDvduhiGOIzJbikyIMRuEe6Gqqkr4RzN1M3Wmy/bt2+9Bf+K/g8ASUym4IHIaHrigkB2WxZSain/w4OcDQ4kxh+XMwOxonn2hUGhHa2urmPNnqsAxT7P5Be8w+lzbIX3vxF9qNyWsgwsZHnxhy8dOVHiD/72E0TNoEtAl8GzXS50j8YkrtBd0gdWPJ6cadB/khasR6IchVi+0GrEgnKmCRiTUVGED9TghydIgBI4KgUNhc7Wqs4jrCxke9Mb6D1xfeW1WowMRJQ0PFgGej3pULaNbt1RNUw6OHd08nKCtULGrCr6r4zAQGNu1c5fp4zUib6YKG8CYhJDZA5m7A2nxFRs2w8uNwBOHn3m4yqc/jrpj5f2vPtz8nvflFhrvIoFfEkBXWOLRQ1+Sopl41pY1phxqo4mJXz7AX0UjgPHw/fi27i9agIsMyFRhg+UGkgElMCRLsulmeYvkaOvHw5lYFXbdPBye6Kx4T+P9Wef+QEjB3lq+UfdhXnA0AWgt4VAqelovkxi8Xz4QH2mKZbIbjOk9x/OLJwBPzxN4Ny0jyU0VNuXl5VPpdPqA5MOyPuis4WZNAgt5PPjUde/7wwebfu05a6acqSo1gRPTZ72ffPvLrp3HUmq+iwy/G8+L3RKb2V94CRZpS6BJ/+OskQCt0ixRLXJPRJVS3n7Dkg1ZNVMaHuTO0ap3fu/sa52d02euGLyfS+9IcmxTd/h82dx/Hi1BIIMhihG4en44lUodwKbfbWFgck3VbJBPDWZ5SVhL9IuZrtRuDCz5IkUVykRvxAztrKEtZHggS0o5HqJRSFZyxp1U1YxwZ5J1PAWpkA5NHFtzdOqk/oCecUllTDkSEAZXuHUCDfiQVQSNSLrZwsYTj8fTFVUVeyBo7kV66kSiuDmDgK7hgSaFXnznl7vLZN8tzsipfXPx2aN/5RmJZ7cEw+C9Zyw5SUFjv+KNo/nwc2GAZaWkmy5sVqxYIaTwEMAkOWxjpaqx+LToGR6grCXM/D7aGKjLanQgYqbhweL5z3efPz/EeCZR0RcdXD+ezLrG3/zb+d8+BNLQas7iPYtbKclmj9kIFtJtt91Wja601yFs7rYSHKbFPAI0PFg8+1AqPPXevZ/mOOjiUdothH5oNvcg0YNi7TCrJN50zQYgtNkZrkcgiashkWlGa5XaYWI6vnPmRx9pHTueVfOh4cEvCmYgNjL59ZOvnNMrpkg6Wo9rFDZ6gBx4HmPfok/0NIYlhKCx1GrIVhA2HkBJ37f9vgsCEEBR2DjwJcg3SwsZHpwNn9+1acnafr0wJU2SZFlp1Ltug/NiHd8LCwzcz2ThTKi3xs3u821QjsYnUfNE8B0dsZJGMwfBEsJGJAYfiP3QaoQXgf82lzgeSSAbgaeOfvVD1WX649a31Gx6+fGNH/54tmftcA6z7pOYdV+tN+t+Lg8YcwnO/eaRBGYJdOH4hhVpWEbYYI3s016vdxUgianGfivCYpqsQSCixqoicf2pA+pYx00D0aEevdSWKWWpWn/NWlw3xfQawiQGC7AhvfSNJaaqMOt+OWfd6xHieT0C0GqExp99LoLeQwadt4KBwMWszi05MDt2Y6m0XUwkf9ieQLVSse9H933tBujTpoxnnJrumfxY6xeX2h4kM2A9AprnK1gC+i9bWlosZ2JoGc1GlBq0m3FFUX6MvurfwF8x6Y8bCRSdQDgTvQFdcWdlj5y1QaPIcuxLN3yqHN26N+Ua+XB8fOSrXd8dyOX+sdT4ulzu4z0kkBcBzbMLnvQ7g8FgNK/nDLrZUsIGgiaK9RdOQhXUdY9hEBdG42ACWO10Sct421a9LMKiZzqWiZ8s9+Y+JDKRmPRzsF6PKM8bQQDfTmGZOCoMroyIL984LCVs4AV6SJbll31lvg8jI6Z0ceQLkPc7jwAaO9U79nziOuRsKo/cVeZxL28lgeITUD1vwLGxMBCw5GYpYeP3+4VGI7wJnEIXRgC/l1uSGhPlBgJs7LihlB2QR2jiqjB3Rla6y8rKxqyaJdlKCRPqH/ZJgOtAusScG24kQAIkQAILE0hD4JzDeE2P+H4ufKt5Vy0lbOYwQLP5GfaTc/95JAESIAES0CGgeaKYp/haFJvOHZY4bVVh0wPtZhiEuLyfJaoJE0ECJGBRAhmkS/g/O4Hd0oZVlhQ2MBJoB7hD0G7acORGAiRAAiSQncAopoqcGRkZebW1tZWaTXZG+mfF2A2u9gGiEDrcSIAESIAEshBAg/wwutAOdHR0WMrpZpakeiyp2YiEYrBLuF04Cph6qwhmyw/PkQAJkIBrCGC4oRWZ3WuHDFtW2IyNjXWlk+n/BEQhdES/JDcSIAESIIFZAmLyMX4egnuaA3aAYllhM6sWhjDfZgzKjVjNkxsJkAAJkAAIzPT4aJ7pjJQJwYGxpcdq5grMssJmNoEhrDj3AsZuQnMJ5pEESIAE3E4AjfAkvos/0FLa2X379oXtwMPSwmZyclKYPh8Us2MhyW0B1A6FzjSSAAnYl4DwGIDUh1WPug/Oi8UkTluMa2f1emu1YsDSA29Aiq9HutZYLW1MDwmQAAkYSQDCRlie9WgZ7V27d+8WnsZtMaZtac1mrgBhmfYMAH977j+PJEACJOBWAujpOY+enudTqdQoGNhC0IiysoWwAdge2JL3Ir35eOEV+eNGAiRAAo4hMKvVTGItpq5Zx8W2yZulvD7rUcM6NyfTUjqoaEonBsbuwH2mLOerlz6eJwESIAEjCECrmYDAOTM6MrobFruWXLdGj4MtNBvhUcCreccAeRcyYivAeuB5ngRIgATyJYBvYAueOWgHjwHz82YLYSMSHQqFJqA67kKXWhS7Lawv5sPmfxIgARJYBIGMcE3jUT22mMQ5P5+2ETZwMhfCSp5vwirtNWRCDIxxIwESIAG3EEigjf0W9l0YSjhsx0zbRtgArgrPphFI9WOALdw02MYKw44Vg2kmARKwDgEImRTGa45iXs0YhhXEkgK22+wkbDzd3d1JCJrvAvwZ7DHb0WaCSYAESKAQAhJc02Qyz8MPWl8hj1vhGVsJGwATYzWT6Eo7hOMRKwBkGkiABEiglATQsO5B+PtglTtQVVVl+aUE9FjYzoS4p6cnvfra1ZXQcHzI1DaolrbwgqBXADxPAiRAAnoEIGhEA7sVDewf79q5aw++f7Z1Smw3zWamTKbGpt6AVcar+HMCZWHppVD1KhHPkwAJkEAOBAbRn7M/GU/+KId7LX2LLYVNW1tbBP2XwxA47ZD4FDaWrmJMHAmQQKEE0HNzEg3qc5FIRDjctPVmS2EjiKP/sheHpyH16cLG1lWQiScBEtCZGr10AAAQX0lEQVQjAM/O35Bl+f+LBrbePXY5b1thAzNoMVA2iH0fJH+PXYAznSRAAiSQAwExr+YgJrKfxr2212pEfm1nIDBXSBA2GQyWhZvXNNeiK60eezONBebo8EgCJGBXAhAyGgygIvie/XM6nX4Nywg4QtjYwhHnQpUmHo+/7A/6yzF+swYC57qF7uU1EiABErABgVHIm3MQNi9gyWfHrFJs2260uQrT0tIyDVXzHP6fwE6vAnNgeCQBErAnAclzFg3n40j8KLwFOOabZnvNZrY27UUrQCwbfR9aBNVQQTn3xp6vGVNNAq4ngG/YK2hAt0DQiG+aYzbbazaiJDB+M47VPDtgmfYi/jqqgET+uJEACTifgFgYDfsrqqTuhVuaTqfl2BHCRqztgHk3k2gRdEH9FD7THKN6Oq3CMT8kQALZCaB3JoWx51OYOTgihgey32Xfs7a1RpuP/Pz586mGhoYuDKhtxLUUetJWzb+H/0mABEjAigSg0UxD0LyJZVT+pKysbNDObmn0+DpCs5nNnCZaAyi0Y/jfhd32k6D0Co3nSYAEHEUgIyanYwKnWKdmXKxM7KjczWbGMZrNXOE01De0+3y+QQidd6JLbQVUUxoLzMHhkQRIwHIE0P0fxXfq7XAo/Jk333zTsY1kJ2k2M5UoGAxGMX7TpanaV3FCrOjJ8RvLvV5MEAmQwBwBCJpvwcDp77B8gBA0jl3y3nHCRqig0Wh0CmM27Si2YbQa6KhzrlbzSAIkYBkC6H1R8X2awN6B/YRTu8/mgDuuG01k7MKFC+mmpqZpSZFSsiRvwallcxnmkQRIgASsQAAazTQaxM+jJ+a1iYmJM8IFlxXSVao0OE6zmQWlYdwmholRXWgxiCWkhcNObiRAAiRgFQIRaDb9ogcG+4SYvmGVhJUqHY4fPN++ffsjKNT7UaCPlAoiwyUBEiCBPAkchVbzBrrOPpfnc7a93SnuahYqgB+jUPshcBpwkxA6wYVu5jUSIAESKCUB9LT0wFL21VQy9Z1SxmO1sJ3ajXaRM1oOg6lU6gz6RzsgaKJiUO7iRf4gARIgAQMJQNCk8C06hwmcJ/fv33/awKhNj8qRBgLzqcK7wNTy5cv3lPnL7sO1ahR2xfx7+J8ESIAESklACBqEfyIjZT6RiCUO9Pf3J0oZn9XCdrxmMwtcbW1tjaI1Icyhz0G7iVqtIJgeEiABRxPICL+NaOi+rSbU0XA4HHd0brNkzhWazVy+6+vrD8JKzYtCX4dCXzF3nkcSIAESKCUBaDVRdOP3Io7f27NnD6ycRxzpkmYhhm4wELiYf+FdAMusvir5pPOyJj+NC82oAK5icBEGf5AACRhCAIImjMbtc+hVOYIIxRIorhw3dpVmIzypwqNqdGn1UqHO3otCF56hvRA4jjcBRz65kQAJGE9ATNQ8D18B/wihc2TXrl3ChZYrN1cJG1HC4+PjanNzcxS+iE5IsvQATgUga8pcWfrMNAmQQCkJCEEziIbto8lkcs++ffvE5HLH+j67Gki3GAhcykEUdlqW5eEZgwGPpxv/RaXgRgIkQALFIpCBIdIUtJk2uKMZQKCuX9TR1d1H995772ZFUe6AwYDwEL2kWLWM4ZAACbibwOw4TSt6UD69e/duscSz6xu0rutGu/QVWLp0adTv94s+1HPY70B3WgBHN2p7l2LhbxIggQIJQMiInpOIMAjAfJrvK5JyBGPFrppPo4fO1R/Wtra2CLYhwDkE7eY86kkUu+tMEvUqB8+TAAnkTSCNRms/NJo2RVM64MFEWJ9xAwFXazaiBmA5glRlZeVoebD8CHSaBgidIFolNawdJEACJJAngQS+Hz0YC/4IDAJa9u7dO4znXWsQMJ+d64WNAIIJVmpDQ0NSkZU4LNRCEDZrMbhXjqOrx7TmVxb+JwES0CWQgFg5hP01aDY/wfo0U26cuKlLBxcobGbpwE9R5Nprrz0LARNC6+QeVJpaVBryWaj28BoJkMAMAeECC9+O/0D32UswCDgLQeN6g4D5VYMf00uIYCAvU1dXNw2XNodRcbZo0ox2wyUJLmHEnyRAAr8kMDvGewaTNj8HQfP61NTUuaGhIS5F/0tEF39R2FxEMfNDg4aThA+1MW+Zdxu0myXQciogeHyX38Z/JEACbicAbSaJ3g+h0YjVNr85MDDQc/z4cTGfhlsWAhQ2V0KZETirr1l9EBVoeEbQSJ6NV97GMyRAAq4moHnE/JlWfCMexbHv7bffpiXrAhWCwkYHDnyopZYsWRJXPeoUKtNKdKnV4UheOrx4mgTcQgAajYpej2P4HvxfHHeiUXoEJs6i64yWZwtUAlpbLQBHXNq+fftSCJwnZUn+EP4uxe4X57mRAAm4j8CMoIHnZpg3/wBjNF+BMcAp91EoLMd0r391bmHZI39L1dQwWjDXo+3y2zhWXv0x3kECJOA0AtBmLuAb8E9YquS7sVis32n5K2V+2C10FbpiWQLs42tWr6lCRdNgMLABj1RD4JDdVdjxMgk4hQCszsS7PwFBcwbfgdfGxsZ2HT161HWrbS6mPPnBzJEevAycq6ioOK5K6hFUNuFHrRqPUjPMkR9vIwG7EhCCBu/7NJY8+1/4+S1YrL7R1dWVtGt+zEo3hU2O5MUkLQibdKAsEJcVOY4+2woYDcgQPPQWnSND3kYCNiQwBUFzGmM138O7/lP8Pgursykb5sP0JNNAoIAiuO2225ZUVFU8hop3F9Tq+xCEH7/JsgCWfIQELEwgAU3mDNLXkk6lv4DFz4TTXnoGKLDAqNkUAE4477ym6ZqjaOkcgpWaMBy4EcGI5Qm4kQAJOIQAtJmX8I5/U82ofw+nmmIpEgqaRZStq5cYWAQ3FZVvAqt9XkBXWi9aP2IlPrEqH91ULAIqHyUBCxDIzL7HQzj2Ij19e/bsGcGRgmaRhUPNZhEAYaUWqV1e24EJoPvQChILJtVDy6ldRJB8lARIwFwCQrCchiHQY4pH+QF+4zXvUc1NkjNip7BZZDmiSy29evVqsTzBNEwjhQ2+mPTZAKFDS7VFsuXjJGAgAaHRtKLR+CqMf3Zhbt1exD0KzwB0QVOkQuCgdpFAimCE4UBVVdWjEDqfQsVdhqMf2g67KovImEGRQDEJ4D0VZs0qhIywMPuOltH+IZFInGtpaZkuZjwMy4PPIbdiEpDh3qYabixuxXjOZlTgT4LwBgqcYiJmWCRQPAKQNSN4PzszUuZrmURmD5YImOzo6BDaDLvOiod5JiR2oxUXqIb+3TgWYdMgcNJY9XMFutUqIXACswKHWk5xeTM0EiiUQAaNwT68m8fwjh6FaPkZjH56Z1fXpEPNQqku8ByFzQJwCr0EgROCx4G+gD+w2yPPzMFZhQpdAXW9rNAw+RwJkEBRCYQQ2isZT+bryVjydRj59OK9pcVZURFfHhiFzeU8ivVPEx4H1q5dm4RGk0LraRwBX8CxEkKHftWKRZnhkECeBNBt1odH9uNdfA2GAD9JJ9NdoVBo8q233uK0hTxZ5ns7x2zyJVbA/du2basPBoObMCfnExA226HhzPlVo7AvgCcfIYF8CAgjAAgX0TUm3EwdwN9/TiaTrx44cEDMj2OXWT4wF3EvP3aLgJfro3DcF29ubr4Alxe74LqzFdVbzEYOQuiszDUM3kcCJFAwAfG+9eC9+yIEzXOwNmsJBAKT6DajEUDBSPN/kMImf2aFPCEMB9Lnz5+PrrlmjYQ5OV60tIQTT7EuThADlfjLJQsKActnSCAbgRltBpoMrvXg3WrDC3Ycx5+h4dfV3t4epaDJRq2059iNVlq+uqHDRFoImofwEjyGF0N4HmjQvZkXSIAE8iWQwANCm/kqjv+GyZmD+QbA+4tLgJpNcXnmHBqWK/BgF9Yvg9BsTuAYxr4MexkED02kAYIbCeRDYFabSaAB1wYhcwiazI/w/H7sA9BkuP5MPjBLcC81mxJAzTfIu+66q87r9b4H83I+jhdlHV6SCrw4QuiwfPKFyftdR2BWyKTxuiTxewLv0L9i3sxb4XD41dbWVq49Y5EawY+ZNQpCufvuu8sxEbTa5/P9Kubm3IKlC34XSRNda9Q+rVFGTIVFCUDAXEDS9kHI/BzuZg7AAGAA1p8RdJ1FcZ5GABYpN37IrFEQGowHkn19fSE49fTDgED4agoiacJthpinAxVHEg4+uZEACYAABEwM70UM70UP/h7GUXSbHYZ2cwKLnAlLMzFmQ7NmQLDKRs3GKiUxLx1w6unDmM4D8LH2KxA89+Mleue8W/iXBFxLAMKmG5m/AAHzbRx/CC1GjHlyszABajYWLRwsXeBZtWqVpijKBNpnPRA4p2eSKnmi+C9c33AJA4uWHZNVGgIQMGJV3Ha8C69j/08xQRP/j8Bbx6Dw2FGaWBlqsQhQsykWydKGo9xzzz2rZK/8KF6utRA2d6ELYRmOPvwXlmtsNJSWP0M3gQCEyy/c/2uasCQTXcrCcvN1rDXz8vj4+PG2traICclilAUSYOu4QHAGP5aBtdoABj7/Gt1qAWg79ZIi3Ys0vAsvn7Be22xwehgdCRhBYBT1+ywaVf8GubMvk8kMpVKpUQiacHd3N02ZjSiBIsZBzaaIMA0KSsGE0CrE9Q74WrsLx2bsW/BC1kDLqcbLWQXhU45z3EjAVgRQd2c0GNTfEQgXsTyzcF7bA3uyn8KX2dv4Pw5/ZjFbZYqJvUiAwuYiCnv+gOAJwGT6Gmg6D6AP+y4IoNup6dizLN2eagiYQTSYxtBw+iFYiL0PA/+TbufilPxT2Ni/JOU777zTj+61GszREd6kl6oedQ2O74DQqcXxerzAd+DIcR1A4GYpAv3QZvohZMQs/0NoKPXJqhxFfR1BV9nIsmXLEhA2YqyGmwMIUNg4oBDnZWHOmOABDKSuxAt8K4TOr+CeAF5qGd0SQuh40XrEO00PBfPY8W+JCECoiMmVadQ7FXVw7vcZ/D4Djfz/oZvs58PDw30YixHzY7g5kAANBJxXqDPGBBhI/RfZJyvxaNyP2dQroO1sQVabIHhuwgt/o/iNfYXzss8cWY0AGjliYvIpCJXD+H1aU2fM+NvT6fQ4Bv3jSG8MdTQKQUPzZasVXhHTQ82miDCtGtSsh+n1SF8DhI7oVrseL34jWpt1+F2OD4BYPVQYFQSwC2/U7HIDBG55E8igLsVQlxI4hiBgomjcxMRvHE9Dy+5EveuFgOmNRqNd8FsmJmJSwOSN2Z4PUNjYs9wWnWphWICui2qsvS7MpoV3go0QPuvwgdiMD8MS/KfAWTRl9wQAgSLmxEwjx93QnPvwt1WV1U5FU07HYrEzLS0t4ho3FxOgsHFv4ctbtmzxrlixohzdGdWYx3OpZiO0m0q0RFfj2ISPRw2OS7E3QxiJ+2ohkMRyCNxcQgDCQ5gc90GgRNEoGcPvUdQL4c2iE/VkHOODU7CKHFYVNeLVvAk0ZEKYDxbFLp6Lc6DfJRVlgWxyzGYBOA6/pHZ0dIh5DWK/zLx0tttNWLVN4CMSh2Cpwwclhi6QGtGCxf3VEDrcXEQAQkZF0UcgaKZRD0ZQHwZQL6ZRD9pxFAuTje7evXsARzH4z40EriDwX4C3O7fRE+EvAAAAAElFTkSuQmCC"

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

(function(){var b=true,f=false;function g(a){var c=a||{};this.d=this.c=f;if(a.visible==undefined)a.visible=b;if(a.shadow==undefined)a.shadow="7px -3px 5px rgba(88,88,88,0.7)";if(a.anchor==undefined)a.anchor=i.BOTTOM;this.setValues(c)}g.prototype=new google.maps.OverlayView;window.RichMarker=g;g.prototype.getVisible=function(){return this.get("visible")};g.prototype.getVisible=g.prototype.getVisible;g.prototype.setVisible=function(a){this.set("visible",a)};g.prototype.setVisible=g.prototype.setVisible;
  g.prototype.s=function(){if(this.c){this.a.style.display=this.getVisible()?"":"none";this.draw()}};g.prototype.visible_changed=g.prototype.s;g.prototype.setFlat=function(a){this.set("flat",!!a)};g.prototype.setFlat=g.prototype.setFlat;g.prototype.getFlat=function(){return this.get("flat")};g.prototype.getFlat=g.prototype.getFlat;g.prototype.p=function(){return this.get("width")};g.prototype.getWidth=g.prototype.p;g.prototype.o=function(){return this.get("height")};g.prototype.getHeight=g.prototype.o;
  g.prototype.setShadow=function(a){this.set("shadow",a);this.g()};g.prototype.setShadow=g.prototype.setShadow;g.prototype.getShadow=function(){return this.get("shadow")};g.prototype.getShadow=g.prototype.getShadow;g.prototype.g=function(){if(this.c)this.a.style.boxShadow=this.a.style.webkitBoxShadow=this.a.style.MozBoxShadow=this.getFlat()?"":this.getShadow()};g.prototype.flat_changed=g.prototype.g;g.prototype.setZIndex=function(a){this.set("zIndex",a)};g.prototype.setZIndex=g.prototype.setZIndex;
  g.prototype.getZIndex=function(){return this.get("zIndex")};g.prototype.getZIndex=g.prototype.getZIndex;g.prototype.t=function(){if(this.getZIndex()&&this.c)this.a.style.zIndex=this.getZIndex()};g.prototype.zIndex_changed=g.prototype.t;g.prototype.getDraggable=function(){return this.get("draggable")};g.prototype.getDraggable=g.prototype.getDraggable;g.prototype.setDraggable=function(a){this.set("draggable",!!a)};g.prototype.setDraggable=g.prototype.setDraggable;
  g.prototype.k=function(){if(this.c)this.getDraggable()?j(this,this.a):k(this)};g.prototype.draggable_changed=g.prototype.k;g.prototype.getPosition=function(){return this.get("position")};g.prototype.getPosition=g.prototype.getPosition;g.prototype.setPosition=function(a){this.set("position",a)};g.prototype.setPosition=g.prototype.setPosition;g.prototype.q=function(){this.draw()};g.prototype.position_changed=g.prototype.q;g.prototype.l=function(){return this.get("anchor")};g.prototype.getAnchor=g.prototype.l;
  g.prototype.r=function(a){this.set("anchor",a)};g.prototype.setAnchor=g.prototype.r;g.prototype.n=function(){this.draw()};g.prototype.anchor_changed=g.prototype.n;function l(a,c){var d=document.createElement("DIV");d.innerHTML=c;if(d.childNodes.length==1)return d.removeChild(d.firstChild);else{for(var e=document.createDocumentFragment();d.firstChild;)e.appendChild(d.firstChild);return e}}function m(a,c){if(c)for(var d;d=c.firstChild;)c.removeChild(d)}
  g.prototype.setContent=function(a){this.set("content",a)};g.prototype.setContent=g.prototype.setContent;g.prototype.getContent=function(){return this.get("content")};g.prototype.getContent=g.prototype.getContent;
  g.prototype.j=function(){if(this.b){m(this,this.b);var a=this.getContent();if(a){if(typeof a=="string"){a=a.replace(/^\s*([\S\s]*)\b\s*$/,"$1");a=l(this,a)}this.b.appendChild(a);var c=this;a=this.b.getElementsByTagName("IMG");for(var d=0,e;e=a[d];d++){google.maps.event.addDomListener(e,"mousedown",function(h){if(c.getDraggable()){h.preventDefault&&h.preventDefault();h.returnValue=f}});google.maps.event.addDomListener(e,"load",function(){c.draw()})}google.maps.event.trigger(this,"domready")}this.c&&
  this.draw()}};g.prototype.content_changed=g.prototype.j;function n(a,c){if(a.c){var d="";if(navigator.userAgent.indexOf("Gecko/")!==-1){if(c=="dragging")d="-moz-grabbing";if(c=="dragready")d="-moz-grab"}else if(c=="dragging"||c=="dragready")d="move";if(c=="draggable")d="pointer";if(a.a.style.cursor!=d)a.a.style.cursor=d}}
  function o(a,c){if(a.getDraggable())if(!a.d){a.d=b;var d=a.getMap();a.m=d.get("draggable");d.set("draggable",f);a.h=c.clientX;a.i=c.clientY;n(a,"dragready");a.a.style.MozUserSelect="none";a.a.style.KhtmlUserSelect="none";a.a.style.WebkitUserSelect="none";a.a.unselectable="on";a.a.onselectstart=function(){return f};p(a);google.maps.event.trigger(a,"dragstart")}}
  function q(a){if(a.getDraggable())if(a.d){a.d=f;a.getMap().set("draggable",a.m);a.h=a.i=a.m=null;a.a.style.MozUserSelect="";a.a.style.KhtmlUserSelect="";a.a.style.WebkitUserSelect="";a.a.unselectable="off";a.a.onselectstart=function(){};r(a);n(a,"draggable");google.maps.event.trigger(a,"dragend");a.draw()}}
  function s(a,c){if(!a.getDraggable()||!a.d)q(a);else{var d=a.h-c.clientX,e=a.i-c.clientY;a.h=c.clientX;a.i=c.clientY;d=parseInt(a.a.style.left,10)-d;e=parseInt(a.a.style.top,10)-e;a.a.style.left=d+"px";a.a.style.top=e+"px";var h=t(a);a.setPosition(a.getProjection().fromDivPixelToLatLng(new google.maps.Point(d-h.width,e-h.height)));n(a,"dragging");google.maps.event.trigger(a,"drag")}}function k(a){if(a.f){google.maps.event.removeListener(a.f);delete a.f}n(a,"")}
  function j(a,c){if(c){a.f=google.maps.event.addDomListener(c,"mousedown",function(d){o(a,d)});n(a,"draggable")}}function p(a){if(a.a.setCapture){a.a.setCapture(b);a.e=[google.maps.event.addDomListener(a.a,"mousemove",function(c){s(a,c)},b),google.maps.event.addDomListener(a.a,"mouseup",function(){q(a);a.a.releaseCapture()},b)]}else a.e=[google.maps.event.addDomListener(window,"mousemove",function(c){s(a,c)},b),google.maps.event.addDomListener(window,"mouseup",function(){q(a)},b)]}
  function r(a){if(a.e){for(var c=0,d;d=a.e[c];c++)google.maps.event.removeListener(d);a.e.length=0}}
  function t(a){var c=a.l();if(typeof c=="object")return c;var d=new google.maps.Size(0,0);if(!a.b)return d;var e=a.b.offsetWidth;a=a.b.offsetHeight;switch(c){case i.TOP:d.width=-e/2;break;case i.TOP_RIGHT:d.width=-e;break;case i.LEFT:d.height=-a/2;break;case i.MIDDLE:d.width=-e/2;d.height=-a/2;break;case i.RIGHT:d.width=-e;d.height=-a/2;break;case i.BOTTOM_LEFT:d.height=-a;break;case i.BOTTOM:d.width=-e/2;d.height=-a;break;case i.BOTTOM_RIGHT:d.width=-e;d.height=-a}return d}
  g.prototype.onAdd=function(){if(!this.a){this.a=document.createElement("DIV");this.a.style.position="absolute"}if(this.getZIndex())this.a.style.zIndex=this.getZIndex();this.a.style.display=this.getVisible()?"":"none";if(!this.b){this.b=document.createElement("DIV");this.a.appendChild(this.b);var a=this;google.maps.event.addDomListener(this.b,"click",function(){google.maps.event.trigger(a,"click")});google.maps.event.addDomListener(this.b,"mouseover",function(){google.maps.event.trigger(a,"mouseover")});
    google.maps.event.addDomListener(this.b,"mouseout",function(){google.maps.event.trigger(a,"mouseout")})}this.c=b;this.j();this.g();this.k();var c=this.getPanes();c&&c.overlayImage.appendChild(this.a);google.maps.event.trigger(this,"ready")};g.prototype.onAdd=g.prototype.onAdd;
  g.prototype.draw=function(){if(!(!this.c||this.d)){var a=this.getProjection();if(a){var c=this.get("position");a=a.fromLatLngToDivPixel(c);c=t(this);this.a.style.top=a.y+c.height+"px";this.a.style.left=a.x+c.width+"px";a=this.b.offsetHeight;c=this.b.offsetWidth;c!=this.get("width")&&this.set("width",c);a!=this.get("height")&&this.set("height",a)}}};g.prototype.draw=g.prototype.draw;g.prototype.onRemove=function(){this.a&&this.a.parentNode&&this.a.parentNode.removeChild(this.a);k(this)};
  g.prototype.onRemove=g.prototype.onRemove;var i={TOP_LEFT:1,TOP:2,TOP_RIGHT:3,LEFT:4,MIDDLE:5,RIGHT:6,BOTTOM_LEFT:7,BOTTOM:8,BOTTOM_RIGHT:9};window.RichMarkerPosition=i;
})();


/***/ })
/******/ ]);
});