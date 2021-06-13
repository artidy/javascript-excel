export default class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }

  static get param() {
    return ActiveRoute.path.split('/')[1]
  }

  static get pathWithoutParam() {
    return ActiveRoute.path.split('/')[0]
  }

  static navigate(path) {
    window.location.hash = path
  }
}
