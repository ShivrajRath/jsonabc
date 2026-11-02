/*!
  Form / application handler for JSON ABC.
*/

var jsonabc = window.jsonabc;

window.appSort = appSort;
window.copyOutput = copyOutput;
window.clearAll = clearAll;

function opts () {
  return {
    noarray: document.getElementById('noarray').checked,
    useTabs: document.getElementById('useTabs').checked,
    arbComments: document.getElementById('arbComments').checked
  };
}

function appSort (ev) {
  if (ev) ev.preventDefault();

  var inputStr = document.getElementById('input').value;
  var options = opts();
  var spacer = options.useTabs ? '\t' : 4;
  var outputEl = document.getElementById('output');
  var statusEl = document.getElementById('status');

  try {
    var output = jsonabc.sort(inputStr, options.noarray, spacer, options.arbComments);
    outputEl.value = (output === undefined) ? '' : output;
    statusEl.textContent = 'Sorted';
    statusEl.className = 'status ok';
  } catch (ex) {
    statusEl.textContent = 'Invalid JSON';
    statusEl.className = 'status err';
    console.error('jsonabc: Incorrect JSON object.', ex);
  }
}

function copyOutput () {
  var outputEl = document.getElementById('output');
  if (!outputEl.value) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(outputEl.value).then(function () {
      var statusEl = document.getElementById('status');
      statusEl.textContent = 'Copied';
      statusEl.className = 'status ok';
    });
  }
}

function clearAll () {
  document.getElementById('input').value = '';
  document.getElementById('output').value = '';
  var statusEl = document.getElementById('status');
  statusEl.textContent = '';
  statusEl.className = 'status';
}

function init () {
  var sortBtn = document.getElementById('sortBtn');
  var clearBtn = document.getElementById('clearBtn');
  var copyBtn = document.getElementById('copyBtn');
  if (sortBtn) sortBtn.addEventListener('click', appSort);
  if (clearBtn) clearBtn.addEventListener('click', clearAll);
  if (copyBtn) copyBtn.addEventListener('click', copyOutput);

  var inputEl = document.getElementById('input');
  if (inputEl) {
    inputEl.addEventListener('keydown', function (ev) {
      if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') {
        ev.preventDefault();
        appSort();
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
