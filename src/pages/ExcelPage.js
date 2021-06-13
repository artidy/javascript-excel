import Page from '@core/Page'
import Store from '@core/store/Store'
import reducer from '@/redux/reducer'
import {debounce, storage} from '@core/utils'
import Excel from '@/components/excel'
import Header from '@/components/header'
import Toolbar from '@/components/toolbar'
import Formula from '@/components/formula'
import Table from '@/components/table'
import {normalizeInitialState} from '@/redux/initialState'
import {getUniqueId} from '@core/utils'

function storageName(param) {
  return 'excel:' + param
}

export default class ExcelPage extends Page {
  getRoot() {
    this.params = this.params ? this.params : getUniqueId()
    const state = storage(storageName(this.params))
    const store = new Store(reducer, normalizeInitialState(state))
    const stateListener = debounce(state => {
      if (process.env.NODE_ENV === 'development') {
        console.log('App State: ', state)
      }
      storage(storageName(this.params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })
    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
