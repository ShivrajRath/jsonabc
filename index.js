/*! jsonabc Javascript.
*/

window.sort = sort;

// Is a value an array
function isArray (val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

// Is a value an Object
function isPlainObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

// Sorting Logic
function sortJSON (un) {
  var or = {};

  if (isArray(un)) {
    // Sort or don't sort arrays
    if (document.getElementById('noarray').checked) {
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

// Sort the JSON
function sort (ev) {
  var input, j, r;

  input = document.getElementById('t').value;

  ev && ev.preventDefault();

  if (input) {
    try {
      input = cleanJSON(input);
      j = JSON.parse(input);
      r = sortJSON(j);
      document.getElementById('t').value = JSON.stringify(r, null, 4);
    } catch (ex) {
      console.error('Incorrect JSON object');
      window.alert('Incorrect JSON object');
    }
  }
}

// End.
