import Page from '@core/Page'
import $ from '@core/dom'
import {createRecordsTable} from './dashboard.functions'
import {getUniqueId} from '@core/utils'

export default class DashboardPage extends Page {
  getRoot() {
    const now = getUniqueId()
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel dashboard</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${now}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>

      <div class="db__table db__view">
        ${createRecordsTable()}
      </div>
    `).$el
  }
}
