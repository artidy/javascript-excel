import {storage} from '@core/utils'
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

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState
