(() => {
  const table = document.querySelector('table');

  function simpleTrigger(node, type, data = {}) {
    const event = new Event(type);
    event.data = data;
    node.dispatchEvent(event);
  }

  function isHead(tableCell) {
    return tableCell.tagName === 'TH';
  }

  function isFoot(tableCell) {
    const parent = tableCell.parentElement;
    const grandParent = parent.parentElement;
    return tableCell.tagName === 'TFOOT' || parent.tagName === 'TFOOT' || grandParent.tagName === 'TFOOT';
  }

  function onSubmit(event, tableCell) {
    event.preventDefault();
    unsubscribeForm(tableCell);
    const { value } = event.target.input;
    tableCell.textContent = value;
    subscribeTable();
    simpleTrigger(table, 'table:update');
    table.classList.remove('is-edited');
  }

  function unsubscribeForm(tableCell) {
    const form = tableCell.querySelector('form');
    form.removeEventListener('submit', event => onSubmit(event, tableCell));
  }

  function subscribeForm(tableCell) {
    const form = tableCell.querySelector('form');
    form.addEventListener('submit', event => onSubmit(event, tableCell));
  }

  function focusInput(tableCell) {
    const input = tableCell.querySelector('input');
    input.focus();
    input.selectionStart = input.value.length;
  }

  function renderInput(tableCell) {
    const html = `
      <form>
        <input name="input" value="${tableCell.textContent}">
        <button>OK</button>
      </form>
    `;
    tableCell.innerHTML = html;
    subscribeForm(tableCell);
    focusInput(tableCell);
    table.classList.add('is-edited');
  }

  function onClick(event) {
    const { target } = event;
    if (isHead(target) || isFoot(target)) return;
    unsubscribeTable();
    renderInput(target);
  }

  function unsubscribeTable() {
    table.removeEventListener('click', onClick);
  }

  function subscribeTable() {
    table.addEventListener('click', onClick);
  }

  subscribeTable();

})();
