(() => {
  const table = document.querySelector('table');
  const tbody = table.querySelector('tbody');

  let rows;

  function calcValues() {
    const values = rows
      .map(row => {
        const cells = [...row.querySelectorAll('td')].map(cell => cell.textContent);
        return cells;
      })
      .reduce((acc, row) => {
        const result = [];
        if (acc.length === 0) return row;
        for (index = 0; index < row.length; index += 1) {
          result.push(Number(acc[index]) + Number(row[index]));
        }
        return result;
      }, [])
      .map(item => {
        if (isNaN(item)) item = rows.length;
        else item = Math.floor(item * 100) / 100;
        return item;
      });
    return values;
  }

  function renderTotal() {
    const values = calcValues();
    const html = values.map(item => `<td>${item}</td>`).join('');
    return `
      <tr>${html}</tr>
    `;
  }

  function insertTotal() {
    const html = `
      <tfoot>
        ${renderTotal()}
      </tfoot>
    `;
    table.insertAdjacentHTML('beforeend', html);
  }

  function updateRows() {
    rows = [...tbody.querySelectorAll('tr')];
  }

  function updateTotal() {
    updateRows();
    const html = renderTotal();
    const tfoot = table.querySelector('tfoot');
    tfoot.innerHTML = html;
  }

  function start() {
    table.addEventListener('table:update', updateTotal);
    updateRows();
    insertTotal();
  }

  start();

})();
