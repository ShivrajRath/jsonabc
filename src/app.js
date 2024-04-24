/*!
  Form / application "onsubmit" handler, and analytics.
*/

var jsonabc = require('jsonabc');

window.appSort = appSort;

function appSort(ev, tid) {
  var inputStr = document.getElementById(tid).value;
  var noarray = document.getElementById('noarray').checked;
  var useTabs = document.getElementById('useTabs').checked;
  var spacer = useTabs ? '\t' : 4;
  var arbComments = document.getElementById('arbComments').checked;

  ev.preventDefault();

  try {
    var output = jsonabc.sort(inputStr, noarray, spacer, arbComments);

    document.getElementById(tid).value = output;

    console.warn('jsonabc input:', JSON.parse(inputStr), noarray);
  } catch (ex) {
    window.alert('Incorrect JSON object');
  }
}
