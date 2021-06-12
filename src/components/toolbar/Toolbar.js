import ExcelStateComponent from '@core/ExcelStateComponent'
import {createToolbar} from './toolbar.template'
import $ from '@core/dom'
import {initialState} from '@/redux/initialState'
import {defaultStyles} from '@/defaultStyles'

export default class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyle'],
      ...options
    })
    this.buttons = []
  }

  changeButtons() {
    this.buttons = [
      {
        icon: 'format_align_left',
        active: this.state['textAlign'] === 'left',
        value: {textAlign: 'left'}
      },
      {
        icon: 'format_align_center',
        active: this.state['textAlign'] === 'center',
        value: {textAlign: 'center'}
      },
      {
        icon: 'format_align_right',
        active: this.state['textAlign'] === 'right',
        value: {textAlign: 'right'}
      },
      {
        icon: 'format_bold',
        active: this.state['fontWeight'] === 'bold',
        value: {fontWeight: 'bold'}
      },
      {
        icon: 'format_italic',
        active: this.state['fontStyle'] === 'italic',
        value: {fontStyle: 'italic'}
      },
      {
        icon: 'format_underlined',
        active: this.state['textDecoration'] === 'underline',
        value: {textDecoration: 'underline'}
      }
    ]
  }

  prepare() {
    this.initState(initialState.currentStyle)
  }

  get template() {
    this.changeButtons()
    return createToolbar(this.buttons, this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyle)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const styleName = Object.keys(value)[0]
      if (value[styleName] === this.state[styleName]) {
        value[styleName] = defaultStyles[styleName]
      }
      this.$emit('toolbar:style', value)
      this.setState(value)
    }
  }
}
