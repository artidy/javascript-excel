function createButton(button) {
  const dataJSON = JSON.stringify(button.value)
  const meta = `
    data-type="button"
    data-value='${dataJSON}'
  `
  return `
    <div class="excel__toolbar-button ${button.active ? 'active' : ''}" ${meta}">
      <i class="material-icons" ${meta}>${button.icon}</i>
    </div>
  `
}

export function createToolbar(buttons, state) {
  return buttons.map(button => createButton(button)).join('')
}
