import ExcelComponent from '@core/ExcelComponent'
import $ from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/defaultStyles'
import {debounce} from '@core/utils'
import {clearStorage} from '@core/utils'
import ActiveRoute from '@core/routes/ActiveRoute'

export default class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="excel__header-title" value="${title}" />
      <div>
        <div class="excel__header-button" data-type="button-delete">
          <i class="material-icons" data-type="button-delete">delete</i>
        </div>
        <div class="excel__header-button" data-type="button-close">
          <i class="material-icons" data-type="button-close">exit_to_app</i>
        </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle({value: {title: $target.text()}}))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button-delete') {
      const decision = confirm('Do you really want to delete this document?')
      if (decision) {
        clearStorage(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.type === 'button-close') {
      ActiveRoute.navigate('')
    }
  }
}
