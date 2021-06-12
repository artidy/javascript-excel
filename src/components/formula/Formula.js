import ExcelComponent from '@core/ExcelComponent'
import $ from '@core/dom'

export default class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
    this.formulaInput = null
  }

  toHTML() {
    return `
      <div class="excel__formula-info">fx</div>
      <div class="excel__formula-input" spellcheck="false" contenteditable="" data-type="formula-input"></div>
    `
  }

  init() {
    super.init()
    this.formulaInput = this.$root.find('[data-type="formula-input"')
  }

  storeChanged(changes) {
    if (changes.currentText !== this.formulaInput.text()) {
      this.formulaInput.text(changes.currentText)
    }
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
