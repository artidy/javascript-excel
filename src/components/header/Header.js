import ExcelComponent from '@core/ExcelComponent'
import $ from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/defaultStyles'
import {debounce} from '@core/utils'

export default class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="excel__header-title" value="${title}" />
      <div>
        <div class="excel__header-button">
          <i class="material-icons">delete</i>
        </div>
        <div class="excel__header-button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle({value: {title: $target.text()}}))
  }
}
