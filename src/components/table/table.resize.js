import $ from '@core/dom'

export default function resizeTable(event, table) {
  const $resizer = $(event.target)
  const resizeElement = $resizer.data.resize
  if (resizeElement) {
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const colIndex = $parent.data.col
    const styles = {}
    const resizerStyles = {
      'opacity': 1,
      'z-index': 1000
    }
    document.onmousemove = e => {
      if (resizeElement === 'col') {
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        styles.width = `${value}px`
        resizerStyles.transform = `translateX(${delta}px)`
        resizerStyles.bottom = '-5000px'
      } else {
        const delta = e.pageY - coords.bottom
        const value = coords.height + delta
        styles.height = `${value}px`
        resizerStyles.transform = `translateY(${delta}px)`
        resizerStyles.right = '-5000px'
      }
      $resizer.css(resizerStyles)
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (resizeElement === 'col') {
        table
            .findAll(`[data-col="${colIndex}"]`)
            .forEach(element => {
              element.css(styles)
            })
      } else {
        $parent.css(styles)
      }
      $resizer.clearInlineStyle()
    }
  }
}
