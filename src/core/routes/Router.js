import $ from '@core/dom'
import ActiveRoute from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in router')
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    const path = ActiveRoute.pathWithoutParam ? ActiveRoute.pathWithoutParam : 'dashboard'
    let CurrentPage = this.routes.dashboard
    if (Object.keys(this.routes).includes(path)) {
      CurrentPage = this.routes[path]
    }
    this.page = new CurrentPage(ActiveRoute.param)
    this.$placeholder.clear().append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
