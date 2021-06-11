const CODES = {
  A: 65,
  Z: 90
}

function toCell(row) {
  return function(_, index) {
    return `
      <div class="cell" data-col="${index}" data-id="${row}:${index}" data-type="cell" contenteditable></div>
    `
  }
}

function toColumn(item, index) {
  return `
    <div class="column" data-col="${index}" data-type="resizable">
      ${item}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, rowNumber) {
  const resizer = rowNumber ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="excel__table-row" data-type="resizable">
      <div class="row-info">
        ${rowNumber ? rowNumber : ''}
        ${resizer}
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
        .map(toCell(i))
        .join('')

    rows.push(createRow(cells, rowNumber))
  }
  return rows.join('')
}
