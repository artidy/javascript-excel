import Excel from '@/components/excel'
import Header from '@/components/header'
import Toolbar from '@/components/toolbar'
import Formula from '@/components/formula'
import Table from '@/components/table'
import Store from '@core/Store'
import reducer from './redux/reducer'
import {storage, debounce} from './core/utils'
import {initialState} from './redux/initialState'
import './scss/index.scss'

const store = new Store(reducer, initialState)

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})
excel.render()
