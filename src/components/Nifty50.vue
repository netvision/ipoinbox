<template>

        <q-table
          class="my-sticky-header-table"
          color="primary"
          card-class="bg-amber-5 text-brown"
          table-class="text-grey-8"
          table-header-class="text-brown"
          style="height: 700px"
          title="NIFTY 50"
          :rows="rows"
          :columns="columns"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          @row-click = 'showDetail'
        >
          <template v-slot:top>
            <h4 class="text-5">NIFTY 50 <q-badge align="bottom">{{nifty50data.lastPrice}} ({{numFormat(nifty50data.change)}})</q-badge></h4>
          </template>
        </q-table>
        <q-dialog v-model="card">
          <q-card class="my-card">
              <q-img :src="scrip.chartTodayPath" />

              <q-card-section>
                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                    {{scrip.meta.companyName}}
                  </div>
                  <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                    <q-icon name="place" />
                    {{scrip.lastUpdateTime}}
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-list bordered separator v-if="scrip">
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label overline>Open</q-item-label>
                        <q-item-label>{{scrip.open}} <q-badge align="bottom">{{scrip.change}}</q-badge></q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>High</q-item-label>
                        <q-item-label>{{scrip.dayHigh}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>Low</q-item-label>
                        <q-item-label>{{scrip.dayLow}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>CMP</q-item-label>
                        <q-item-label>{{scrip.lastPrice}}</q-item-label>
                    </q-item-section>
                </q-item>
           </q-list>
              </q-card-section>
            </q-card>
        </q-dialog>
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
const card = ref(false)
const scrip = ref({})

const numFormat = (value) => {
  return new Intl.NumberFormat('en-US', {maximumFractionDigits : 2}).format(value)
}

const showDetail = (e, r, i) => {
  console.log(r)
  scrip.value = r
  card.value = true
}

onMounted(async() => {
    let nifty = await axios.request(nify50OPt).then(r=> r.data.body)
    console.log(nifty)
    nifty50data.value = nifty.data.shift()
    rows.value = nifty.data
    //nseindices.value = await axios.get('http://localhost:3000/nse/get_indices').then(r => r.data)
})
</script>