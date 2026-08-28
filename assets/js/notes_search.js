(function () {
  'use strict';

  var NOTES_PER_PAGE = 8;
  var MAX_VISIBLE_PAGES = 5;

  function setupNotesSearch() {
    var form = document.querySelector('.notes-search');
    var input = document.getElementById('notes-search-input');
    var clearButton = document.getElementById('notes-search-clear');
    var status = document.getElementById('notes-search-status');
    var emptyState = document.getElementById('notes-search-empty');
    var list = document.getElementById('notes-list');
    var pagination = document.getElementById('notes-pagination');
    var pageNumbers = document.getElementById('notes-page-numbers');
    var previousButton = document.getElementById('notes-page-previous');
    var nextButton = document.getElementById('notes-page-next');
    var notes = Array.prototype.slice.call(document.querySelectorAll('.note-item'));
    var currentPage = 1;
    var matchingNotes = notes.slice();

    if (
      !form || !input || !clearButton || !status || !emptyState || !list ||
      !pagination || !pageNumbers || !previousButton || !nextButton || notes.length === 0
    ) return;

    function normalize(value) {
      return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
    }

    function getPageWindow(totalPages) {
      var visiblePages = Math.min(MAX_VISIBLE_PAGES, totalPages);
      var firstPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      var lastPage = firstPage + visiblePages - 1;

      if (lastPage > totalPages) {
        lastPage = totalPages;
        firstPage = Math.max(1, lastPage - visiblePages + 1);
      }

      return { first: firstPage, last: lastPage };
    }

    function createPageButton(pageNumber) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = pageNumber;
      button.setAttribute('aria-label', 'Page ' + pageNumber);

      if (pageNumber === currentPage) {
        button.className = 'active';
        button.setAttribute('aria-current', 'page');
      }

      button.addEventListener('click', function () {
        goToPage(pageNumber);
      });

      return button;
    }

    function updateStatus(query, totalPages, firstVisibleIndex, lastVisibleIndex) {
      if (matchingNotes.length === 0) {
        status.textContent = '0 notes found.';
      } else if (query) {
        var resultLabel = matchingNotes.length === 1 ? '1 note found.' : matchingNotes.length + ' notes found.';
        status.textContent = totalPages > 1 ? resultLabel + ' Page ' + currentPage + ' of ' + totalPages + '.' : resultLabel;
      } else if (notes.length > NOTES_PER_PAGE) {
        status.textContent = 'Showing ' + firstVisibleIndex + '–' + lastVisibleIndex + ' of ' + notes.length + ' notes.';
      } else {
        status.textContent = '';
      }
    }

    function renderPage(query) {
      var totalPages = Math.max(1, Math.ceil(matchingNotes.length / NOTES_PER_PAGE));
      currentPage = Math.min(currentPage, totalPages);
      var startIndex = (currentPage - 1) * NOTES_PER_PAGE;
      var endIndex = startIndex + NOTES_PER_PAGE;
      var visibleNotes = matchingNotes.slice(startIndex, endIndex);

      notes.forEach(function (note) {
        note.hidden = visibleNotes.indexOf(note) === -1;
      });

      emptyState.hidden = matchingNotes.length > 0;
      pagination.hidden = matchingNotes.length === 0;
      previousButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;

      pageNumbers.textContent = '';
      var pageWindow = getPageWindow(totalPages);
      for (var page = pageWindow.first; page <= pageWindow.last; page += 1) {
        pageNumbers.appendChild(createPageButton(page));
      }

      var firstVisibleIndex = matchingNotes.length === 0 ? 0 : startIndex + 1;
      var lastVisibleIndex = Math.min(endIndex, matchingNotes.length);
      updateStatus(query, totalPages, firstVisibleIndex, lastVisibleIndex);
    }

    function filterNotes() {
      var query = normalize(input.value);
      var terms = query ? query.split(/\s+/) : [];

      matchingNotes = notes.filter(function (note) {
        var searchableText = normalize(note.getAttribute('data-note-search') || '');
        return terms.every(function (term) {
          return searchableText.indexOf(term) !== -1;
        });
      });

      currentPage = 1;
      clearButton.hidden = query.length === 0;
      renderPage(query);
    }

    function goToPage(pageNumber) {
      var totalPages = Math.max(1, Math.ceil(matchingNotes.length / NOTES_PER_PAGE));
      var nextPage = Math.max(1, Math.min(pageNumber, totalPages));
      if (nextPage === currentPage) return;

      currentPage = nextPage;
      renderPage(normalize(input.value));
      list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    input.addEventListener('input', filterNotes);
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && input.value) {
        input.value = '';
        filterNotes();
      }
    });

    clearButton.addEventListener('click', function () {
      input.value = '';
      filterNotes();
      input.focus();
    });

    previousButton.addEventListener('click', function () {
      goToPage(currentPage - 1);
    });

    nextButton.addEventListener('click', function () {
      goToPage(currentPage + 1);
    });

    renderPage('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNotesSearch);
  } else {
    setupNotesSearch();
  }
})();
