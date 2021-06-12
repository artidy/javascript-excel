import * as types from './types'

export default function reducer(state, action) {
  let fields = []
  switch (action.type) {
    case types.TABLE_RESIZE:
      fields = [action.payload.type, action.payload.id]
      return changeState(state, fields, action)
    case types.CHANGE_TEXT:
      fields = ['cell', action.payload.id]
      state = changeState(state, fields, action)
      return changeState(state, [], {payload: {value: {currentText: action.payload.value.text}}})
    case types.CHANGE_CELL:
      return changeState(state, fields, action)
    case types.CHANGE_STYLE_CELL:
      action.payload.ids.forEach(id => {
        fields = ['cell', id, 'styles']
        state = changeState(state, fields, action)
      })
      state = changeState(state, ['currentStyle'], action)
      return state
    case types.CHANGE_TITLE:
      return changeState(state, fields, action)
    default: return state
  }
}

function changeState(state, fields, action, count = 0) {
  if (fields.length === 0) {
    return {...state, ...action.payload.value}
  }
  const field = fields[count]
  let newState = state[field]
  count++
  if (count < fields.length) {
    newState = changeState(newState, fields, action, count)
  }
  if (field === fields[fields.length - 1]) {
    newState = {...newState, ...action.payload.value}
  }
  return {...state, [field]: newState}
}
