export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function convertToStyleString(styles, result = '') {
  if (styles) {
    Object.keys(styles).forEach(styleName => {
      const prev = result ? result + ' ' : 'style="'
      const styleValue = styles[styleName];
      if (styleValue) {
        result = `${prev}${camelCaseToDushCase(styleName)}: ${styleValue};`
      }
    })
  }
  return result.trim()
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelCaseToDushCase(value) {
  return value.replace(/([A-Z])/g, (str) => `-${str[0].toLowerCase()}`)
}

export function debounce(callback, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line
      callback.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
