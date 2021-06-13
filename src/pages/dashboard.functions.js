import {storage} from '@core/utils'

function toHTML(key, i) {
  const model = storage(key)
  const link = key.replace(':', '/')
  const openData = model.openData ? model.openData : 'Does not open'
  return `
    <li class="db__record">
      <a href="#${link}">${model.title}</a>
      <strong>${openData}</strong>
    </li>
  `
}

// excel:id
function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  const recordsTable = keys.length === 0
  ? '<p>Пока нет сохраненных таблиц</p>'
  : `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map((key, i) => toHTML(key, i)).join('')} 
    </ul>
  `
  return recordsTable
}
