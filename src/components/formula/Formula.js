import ExcelComponent from '@core/ExcelComponent'
import $ from '@core/dom'

export default class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="excel__formula-info">fx</div>
      <div class="excel__formula-input" spellcheck="false" contenteditable="" data-type="formula-input"></div>
    `
  }

  init() {
    super.init()
    const formulaInput = this.$root.find('[data-type="formula-input"')
    this.$on('table:mousedown', text => {
      formulaInput.text(text)
    })
    this.$on('table:keydown', text => {
      formulaInput.text(text)
    })
    this.$on('table:input', text => {
      formulaInput.text(text)
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('formula:keydown')
    }
  }
}
