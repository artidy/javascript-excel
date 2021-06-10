const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, index) {
  // ${index === 0 ? 'selected': ''}
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(item) {
  return `
    <div class="column">
      ${item}
      <div class="col-resize"></div>
    </div>
  `
}

function createRow(content, rowNumber = 0) {
  return `
    <div class="excel__table-row" >
      <div class="row-info">
        ${rowNumber ? rowNumber : ''}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div> 
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const maxCols = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(maxCols)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols))
  for (let i = 0; i < rowsCount; i++) {
    const rowNumber = i + 1;
    const cells = new Array(maxCols)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(cells, rowNumber))
  }
  return rows.join('')
}
