<template>

        <q-table
          class="my-sticky-header-table"
          style="height: 400px"
          title="NIFTY 50"
          :rows="rows"
          :columns="columns"
          row-key="name"
          flat
          bordered
           virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        >
        <template v-slot:top>
          <h4 class="text-5">NIFTY 50</h4>
          <p>{{nifty50data.lastPrice}} ({{nifty50data.change}})</p>
        </template>
        </q-table>
</template>
<script setup>
import { api, axios } from '../boot/axios'
import { onMounted, ref} from 'vue'
import nifty50 from 'assets/nifty50.json'
const columns = [
  { name: 'symbol', align: 'left', label: 'Name', field: 'symbol' },
  { name: 'lastPrice', label: 'CMP', field: 'lastPrice', sortable: true },
  { name: 'change', label: 'Change', field: 'change' },
  { name: 'pChange', label: '%', field: 'pChange'}
]
const pagination = ref({rowPerPage: 0})
const nseindices = ref([])
let nify50OPt = {
  method: 'GET',
  url: 'https://nse-data1.p.rapidapi.com/nifty_fifty_indices_data',
  headers: {
    'x-rapidapi-host': 'nse-data1.p.rapidapi.com',
    'x-rapidapi-key': '05786c58f6msh0470f5aa4321575p1bf83fjsn2a2c79e27994'
  }
}

let OPt = {
  method: 'GET',
  url: 'http://droplet.netserve.in:3000/',
  headers: {
    'Target-Endpoint': 'https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/liveIndexWatchData.json'
  }
} 
const niftydata = ref(nifty50)
const nifty50data = ref({})
const rows = ref([])

onMounted(async() => {
    let nifty = await axios.request(nify50OPt).then(r=> r.data.body)
    console.log(nifty)
    nifty50data.value = nifty.data.shift()
    rows.value = nifty.data
    //nseindices.value = await axios.get('http://localhost:3000/nse/get_indices').then(r => r.data)
})
</script>