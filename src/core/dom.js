class Dom {
  constructor(selector) {
    if (!selector) {
      throw new Error('Selector is empty!')
    }
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  findAll(selector) {
    return Array.from(this.$el.querySelectorAll(selector))
        .map(item => $(item))
  }

  get data() {
    return this.$el.dataset
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  css(styles = {}) {
    Object.keys(styles).forEach(property => {
      this.$el.style[property] = styles[property]
    })
    return this
  }

  clearInlineStyle() {
    this.$el.removeAttribute('style')
    return this
  }
}

export default function $(selector) {
  return new Dom(selector)
}

$.create = (tagname, classes = '') => {
  const el = document.createElement(tagname)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
