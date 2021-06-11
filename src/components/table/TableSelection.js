export default class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select($element) {
    this.clear()
    this.group.push($element)
    this.current = $element
    $element.addClass(TableSelection.className)
  }

  selectGroup($target, $root) {
    this.clear()
    const target = $target.id(true)
    const current = this.current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
    rows.forEach(row => {
      cols.forEach(col => {
        const $element = $root.find(`[data-id="${row}:${col}"]`)
        if ($element.isNew(this.group)) {
          this.group.push($element)
          $element.addClass(TableSelection.className)
        }
      })
    })
  }

  selectNext(row, col, $root) {
    const $element = $root.find(`[data-id="${row}:${col}"]`)
    if ($element) {
      this.select($element)
      $element.focus()
    }
  }

  clear() {
    this.group.forEach($element => $element.removeClass(TableSelection.className))
    this.group = []
  }
}

function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}
