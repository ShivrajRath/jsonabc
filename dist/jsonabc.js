require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"jsonabc":[function(require,module,exports){
/*!
  JSON ABC | License: MIT.
*/

module.exports = {
  sort: sort,
  sortObj: sortObj,
  cleanJSON: cleanJSON
};

// Is a value an array?
function isArray (val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

// Is a value an Object?
function isPlainObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

// Sorting Logic
function sortObj (un, noarray, arbComments) {
  noarray = noarray || false;
  arbComments = arbComments || false;

  var or = {};

  if (isArray(un)) {
    // Sort or don't sort arrays
    if (noarray) {
      or = un;
    } else {
      or = un.sort();
    }

    or.forEach(function (v, i) {
      or[i] = sortObj(v, noarray, arbComments);
    });

    if (!noarray) {
      or = or.sort(function (a, b) {
        a = JSON.stringify(a);
        b = JSON.stringify(b);
        return a < b ? -1 : (a > b ? 1 : 0);
      });
    }
  } else if (isPlainObject(un)) {
    or = {};
    Object.keys(un).sort(function (a, b) {
      if (arbComments) {
        if (a.startsWith('@')) a = a.substring(1);
        if (b.startsWith('@')) b = b.substring(1);
      }
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    }).forEach(function (key) {
      or[key] = sortObj(un[key], noarray, arbComments);
    });
  } else {
    or = un;
  }

  return or;
}

// Remove trailing commas
function cleanJSON (input) {
  input = input.replace(/,[ \t\r\n]+}/g, '}');
  input = input.replace(/,[ \t\r\n]+\]/g, ']');
  return input;
}

// Sort the JSON (clean, parse, sort, stringify).
function sort (inputStr, noarray, space = 4, arbComments) {
  var output, obj, r;

  if (inputStr) {
    try {
      inputStr = cleanJSON(inputStr);
      obj = JSON.parse(inputStr);
      r = sortObj(obj, noarray, arbComments);
      output = JSON.stringify(r, null, space);
    } catch (ex) {
      console.error('jsonabc: Incorrect JSON object.', [], ex);
      throw ex;
    }
  }
  return output;
}

// End.

},{}]},{},[]);
