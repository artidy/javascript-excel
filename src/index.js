import Excel from '@/components/excel'
import Header from '@/components/header'
import Toolbar from '@/components/toolbar'
import Formula from '@/components/formula'
import Table from '@/components/table'
import './scss/index.scss'

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
})
excel.render()
