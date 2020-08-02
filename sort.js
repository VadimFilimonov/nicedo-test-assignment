(() => {
  const table = document.querySelector('table');
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');

  let rows;
  let cells;

  let isAsc = true;
  let index;

  function isEdited() {
    return table.classList.contains('is-edited');
  }

  function buildRow(row) {
    return `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
  }

  function buildHtml() {
    return cells.map(buildRow).join('');
  }

  function rerender() {
    const html = buildHtml();
    tbody.innerHTML = html;
  }

  function sort() {
    cells.sort((a, b) => {
      const next = a[index];
      const current = b[index];
      const isNumber = !(isNaN(Number(next)) && isNaN(Number(current)));
      if (!isNumber) {
        if (isAsc) return next.localeCompare(current);
        return current.localeCompare(next);
      }
      if (isAsc) return Number(next) - Number(current);
      return Number(current) - Number(next);
    });
    isAsc = !isAsc;
    rerender();
  }

  function updateIndex(target) {
    const newIndex = [...target.parentElement.children].indexOf(target);
    if (index !== newIndex) isAsc = true;
    index = newIndex;
  }

  function updateCells() {
    rows = [...tbody.querySelectorAll('tr')];
    cells = rows.map(row => [...row.children].map(cell => cell.textContent));
  }

  function onDblClick(event) {
    if (isEdited()) return;
    const { target } = event;
    updateIndex(target);
    updateCells();
    sort();
  }

  thead.addEventListener('dblclick', onDblClick);
})();
