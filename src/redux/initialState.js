import {defaultStyles, defaultTitle} from '@/defaultStyles'

const defaultState = {
  row: {},
  col: {},
  cell: {},
  currentCell: '',
  currentText: '',
  currentStyle: {...defaultStyles},
  title: defaultTitle
}

const normalize = state => ({
  ...state,
  currentStyle: defaultStyles,
  currentText: '',
  openData: new Date().toLocaleDateString()
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}
