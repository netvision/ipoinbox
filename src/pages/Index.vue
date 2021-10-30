<template>
  <q-page class="">
    <q-table
      title="IPOs"
      :rows="ipos"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :rowsPerPage=20
      @row-click = 'editIpo'
      >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-open="props">
        <q-td :props="props">
          <div>
            {{formatDate(props.value)}}
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { api } from '../boot/axios'
import { onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
const ipos = ref([])
let filter = ref('')
const router = useRouter()
const columns = [
  { name: 'id', label: 'IPO ID', field: 'ipo_id', sortable: true },
  { name: 'name', label: 'Company Name', field: 'company_name', sortable: true },
  { name: 'open', label: 'Open Date', field: 'open_date' },
]
onMounted(async() =>{
  const ipo = await api.get('/ipo').then(r => r.data)
  ipos.value = ipo.data
})
const formatDate = (v) =>{
  if(!v) return 'null'
  else return v.split('T')[0].split("-").reverse().join("-")
}
const editIpo = (e, r, i) =>{
  router.push('/ipo/'+r.ipo_id)
}
</script>
