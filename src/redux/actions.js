import * as types from './types'

export function tableResize(payload) {
  return {
    type: types.TABLE_RESIZE,
    payload
  }
}

export function changeText(payload) {
  return {
    type: types.CHANGE_TEXT,
    payload
  }
}

export function changeCell(payload) {
  return {
    type: types.CHANGE_CELL,
    payload
  }
}

export function changeStyleCell(payload) {
  return {
    type: types.CHANGE_STYLE_CELL,
    payload
  }
}

export function changeTitle(payload) {
  return {
    type: types.CHANGE_TITLE,
    payload
  }
}
