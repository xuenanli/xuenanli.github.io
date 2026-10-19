(function () {
  'use strict';

  function setupNews() {
    var upcoming = document.querySelector('[data-news-period="upcoming"]');
    var past = document.querySelector('[data-news-period="past"]');
    if (!upcoming || !past) return;

    // Keep every row so a page built earlier can still move events both ways.
    var entries = Array.prototype.map.call(
      document.querySelectorAll('[data-news-start]'),
      function (row, index) {
        return {
          row: row,
          start: row.dataset.newsStart,
          end: row.dataset.newsEnd || row.dataset.newsStart,
          index: index
        };
      }
    );
    var lastDay;
    var midnightTimer;

    function display(section, items, descending) {
      var body = section.querySelector('tbody');
      var fragment = document.createDocumentFragment();
      var previousYear;
      body.querySelectorAll('.news-year').forEach(function (row) { row.remove(); });
      items.sort(function (a, b) {
        var order = a.start.localeCompare(b.start);
        return (descending ? -order : order) || a.index - b.index;
      });
      items.forEach(function (item) {
        if (descending) {
          var year = item.start.slice(0, 4);
          if (year !== previousYear) {
            var yearRow = document.createElement('tr');
            yearRow.className = 'news-year';
            yearRow.dataset.newsYear = year;
            var cell = document.createElement('th');
            cell.colSpan = 2;
            var heading = document.createElement('h3');
            heading.className = 'news-year-heading';
            heading.textContent = year;
            cell.appendChild(heading);
            yearRow.appendChild(cell);
            fragment.appendChild(yearRow);
            previousYear = year;
          }
        }
        fragment.appendChild(item.row);
      });
      body.appendChild(fragment);
      section.querySelector('.table-responsive').hidden = items.length === 0;
      section.querySelector('.news-empty').hidden = items.length !== 0;
    }

    function refresh() {
      var now = new Date();
      // Use local calendar dates; parsing YYYY-MM-DD as UTC shifts dates west of UTC.
      var today = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0');
      if (today === lastDay) return;
      lastDay = today;

      display(upcoming, entries.filter(function (item) { return item.end >= today; }), false);
      display(past, entries.filter(function (item) { return item.end < today; }), true);

      window.clearTimeout(midnightTimer);
      var nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      midnightTimer = window.setTimeout(refresh, nextMidnight.getTime() - now.getTime() + 100);
    }

    refresh();
    window.addEventListener('pageshow', refresh);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNews);
  } else {
    setupNews();
  }
})();
