import {defaultStyles} from '@/defaultStyles'

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

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    return this.$el.tagName.toLowerCase() === 'input'
      ? this.$el.value.trim()
      : this.$el.textContent.trim()
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

  isNew(elementsArray) {
    return !elementsArray.find($element => $element.$el === elementsArray.$el)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  find(selector) {
    const element = this.$el.querySelector(selector)
    return element ? $(element) : null
  }

  findAll(selector) {
    return Array.from(this.$el.querySelectorAll(selector))
        .map(item => $(item))
  }

  focus() {
    this.$el.focus()
    return this
  }

  get data() {
    return this.$el.dataset
  }

  get styles() {
    const styles = {}
    Object.keys(defaultStyles).forEach(styleName => {
      styles[styleName] = this.$el.style[styleName] || defaultStyles[styleName]
    })
    return styles
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
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

  addClass(classes) {
    this.$el.classList.add(classes)
    return this
  }

  removeClass(classes) {
    this.$el.classList.remove(classes)
    return this
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
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
