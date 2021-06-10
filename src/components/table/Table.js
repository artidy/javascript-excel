import ExcelComponent from '@core/ExcelComponent'
import {createTable} from './table.template'
import resizeTable from './table.resize'

export default class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }
  toHTML() {
    return createTable(25)
  }
  onMousedown(event) {
    resizeTable(event, this.$root)
  }
}
