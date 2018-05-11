/*!
  Form / application "onsubmit" handler, and analytics.
*/

window.appSort = appSort;

function appSort (ev) {
  var inputStr = document.getElementById('t').value;
  var noarray = document.getElementById('noarray').checked;

  ev && ev.preventDefault();

  try {
    var output = window.jsonabc.sort(inputStr, noarray);

    document.getElementById('t').value = output;

    console.warn('jsonabc input:', JSON.parse(inputStr));
  } catch (ex) {
    window.alert('Incorrect JSON object');
  }
}

/* eslint-disable */
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-58536835-1', 'auto');
ga('send', 'pageview');
/* eslint-enable */
