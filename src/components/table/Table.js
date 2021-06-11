import ExcelComponent from '@core/ExcelComponent'
import $ from '@core/dom'
import {createTable} from './table.template'
import resizeTable from './table.resize'
import TableSelection from './TableSelection'
import {shouldResize, isCell} from './table.functions'

export default class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'keydown', 'input'],
      ...options
    })
    this.hotKeys = {
      'Enter': {row: 1, col: 0},
      'Tab': {row: 0, col: 1},
      'ArrowDown': {row: 1, col: 0},
      'ArrowLeft': {row: 0, col: -1},
      'ArrowRight': {row: 0, col: 1},
      'ArrowUp': {row: -1, col: 0}
    }
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable(25)
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:keydown', () => {
      this.selection.current.focus()
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTable(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        this.selection.selectGroup($target, this.$root)
      } else {
        this.selection.select($target)
        this.$emit('table:mousedown', this.selection.current.text())
      }
    }
  }

  onMousemove(event) {
    if (event.buttons === 1 &&
      !event.shiftKey &&
      isCell(event)) {
      this.selection.selectGroup($(event.target), this.$root)
    }
  }

  onKeydown(event) {
    if (Object.keys(this.hotKeys).includes(event.key) &&
        !event.shiftKey) {
      event.preventDefault()
      const current = this.selection.current.id(true);
      const next = this.hotKeys[event.key]
      const row = current.row + next.row
      const col = current.col + next.col
      this.selection.selectNext(row, col, this.$root)
      this.$emit('table:keydown', this.selection.current.text())
    }
  }

  onInput() {
    this.$emit('table:input', this.selection.current.text())
  }
}
