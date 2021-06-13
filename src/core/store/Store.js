export default class Store {
  constructor(reducer, initialState = {}) {
    this.state = reducer({...initialState}, {type: '__INIT__'})
    this.listeners = []
    this.reducer = reducer
  }

  subscribe(callback) {
    this.listeners.push(callback)
    return {
      unsubscribe: (callback) => {
        this.listeners = this.listeners.filter(listener => listener != callback)
      }
    }
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}
