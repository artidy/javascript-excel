import Page from '@core/Page'
import Store from '@core/store/Store'
import reducer from '@/redux/reducer'
import Excel from '@/components/excel'
import Header from '@/components/header'
import Toolbar from '@/components/toolbar'
import Formula from '@/components/formula'
import Table from '@/components/table'
import {normalizeInitialState} from '@/redux/initialState'
import {getUniqueId} from '@core/utils'
import StateProcessor from '../core/storage/StateProcessor'
import LocalStorageClient from '../core/storage/LocalStorageClient'

export default class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }
  async getRoot() {
    this.params = this.params ? this.params : getUniqueId()
    const state = await this.processor.get()
    const store = new Store(reducer, normalizeInitialState(state))

    this.storeSub = store.subscribe(this.processor.listen)

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
    this.storeSub.unsubscribe()
  }
}
