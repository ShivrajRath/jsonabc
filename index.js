/*! JSON ABC Javascript.
*/

// Start with a single exposed function.
window.jsonabc = { sort: sort };

// Is a value an array
function isArray (val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

// Is a value an Object
function isPlainObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

// Sorting Logic
function sortJSON (un, noarray) {
  var or = {};

  if (isArray(un)) {
    // Sort or don't sort arrays
    if (noarray) {
      or = un;
    } else {
      or = un.sort();
    }

    or.forEach(function (v, i) {
      or[i] = sortJSON(v);
    });
  } else if (isPlainObject(un)) {
    or = {};
    Object.keys(un).sort(function (a, b) {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    }).forEach(function (key) {
      or[key] = sortJSON(un[key]);
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
function sort (inputStr, noarray) {
  var output, obj, r;

  if (inputStr) {
    try {
      inputStr = cleanJSON(inputStr);
      obj = JSON.parse(inputStr);
      r = sortJSON(obj, noarray);
      output = JSON.stringify(r, null, 4);
    } catch (ex) {
      console.error('jsonabc: Incorrect JSON object.', ex);
      // Was: window.alert('Incorrect JSON object');
      throw ex;
    }
  }
  return output;
}

// End.
