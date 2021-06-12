import {convertToStyleString} from '@core/utils'
import parse from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

function toCell(row, options) {
  return function(_, index) {
    const id = `${row}:${index}`
    const styles = getStyle(options, index, 'col', id)
    const text = options.cell[id]?.text || ''
    return `
      <div class="cell" ${styles} data-col="${index}" data-id="${id}" data-type="cell" data-value="${text}" contenteditable>${parse(text)}</div>
    `
  }
}

function toColumn(options) {
  return function(item, index) {
    const styles = getStyle(options, index, 'col')
    return `
      <div class="column" ${styles} data-col="${index}" data-type="resizable">
        ${item}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `
  }
}

function getStyle(options, index, type, id) {
  let styles = convertToStyleString(options[type][index])
  if (id) {
    styles = convertToStyleString(options.cell[id]?.styles, styles)
  }
  return styles
}

function createRow(content, options, rowNumber) {
  const resizer = rowNumber ? '<div class="row-resize" data-resize="row"></div>' : ''
  const styles = getStyle(options, rowNumber, 'row')
  return `
    <div class="excel__table-row" ${styles} data-type="resizable" data-row="${rowNumber}">
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

export function createTable(rowsCount = 15, options) {
  const maxCols = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(maxCols)
      .fill('')
      .map(toChar)
      .map(toColumn(options))
      .join('')

  rows.push(createRow(cols, options))
  for (let i = 0; i < rowsCount; i++) {
    const rowNumber = i + 1;
    const cells = new Array(maxCols)
        .fill('')
        .map(toCell(i, options))
        .join('')

    rows.push(createRow(cells, options, rowNumber))
  }
  return rows.join('')
}
