import ExcelComponent from '@core/ExcelComponent'
import $ from '@core/dom'
import {createTable} from './table.template'
import resizeTable from './table.resize'
import TableSelection from './TableSelection'
import {shouldResize, isCell} from './table.functions'
import * as actions from '@/redux/actions'
import parse from '@core/parse'
import {debounce} from '@core/utils'

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
    this.onInput = debounce(this.onInput, 300)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable(25, this.store.getState())
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$dispatch(actions.changeCell({value: {
      currentCell: this.selection.current.id(),
      currentText: this.selection.current.data.value,
      currentStyle: this.selection.current.styles
    }}))
    this.$on('formula:input', text => {
      this.selection.current
          .attr('data-value', text)
          .text(parse(text))
      this.$dispatch(actions.changeText({id: this.selection.current.id(), value: {text}}))
    })
    this.$on('toolbar:style', style => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.changeStyleCell({ids: this.selection.selectedIds, value: style}))
    })
  }

  async resizeTable(event) {
    try {
      const data = await resizeTable(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.log(error.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        this.selection.selectGroup($target, this.$root)
      } else {
        this.selection.select($target)
        this.$dispatch(actions.changeCell({value:
          {currentCell: this.selection.current.id(),
            currentText: this.selection.current.data.value,
            currentStyle: this.selection.current.styles
          }}))
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
      this.$emit('table:keydown', this.selection.current.data.value)
    }
  }

  onInput() {
    const value = this.selection.current.text()
    this.selection.current
        .attr('data-value', value)
        .text(parse(value))
    this.$dispatch(actions.changeText({id: this.selection.current.id(), value: {text: value}}))
  }
}
