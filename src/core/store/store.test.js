import Store from './Store'

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return state
}

describe('Store:', () => {
  let store,
    handler

  beforeEach(() => {
    store = new Store(reducer, initialState)
    handler = jest.fn()
  })

  test('should create store class', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })  

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState) 
  })

  test('should change state if action is exist', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('should NOT change state if action is NOT exist', () => {
    store.dispatch({type: 'CHANGE'})
    expect(store.getState().count).toBe(0)
  })

  test('should call subscriber function', () => {
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('should NOT call sub if unsubscribe', () => {
    const unsubscribe = store.subscribe(handler)
    unsubscribe(handler)
    store.dispatch({type: 'ADD'})
    expect(handler).not.toHaveBeenCalled()
  })

  test('should dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)
      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})
