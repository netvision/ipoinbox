<template>
<q-card flat class="q-mt-md rounded-border bg-orange-1">
    <div class="text-h5">NSE Live</div>
    <q-tabs
        v-model="tab"
        dense
        no-caps
        inline-label
        class="shadow-2"
      >
        <q-tab name="indices" label="Indices" />
        <q-tab name="gainers" label="Gainers" />
        <q-tab name="loosers" label="Loosers" />
      </q-tabs>
       <q-separator />
       <q-tab-panels v-model="tab" animated class="bg-orange-1">
          <q-tab-panel name="indices">
            <q-table v-if="indices.length > 0"
                :title="'Indices at '+indices[0].timeVal"
                :rows="indices"
                :columns="indColumns"
                row-key="indexName"
                dense
                wrap-cells
                virtual-scroll
                />
          </q-tab-panel>

          <q-tab-panel name="gainers">
            <q-table v-if="indices.length > 0"
                :title="'Gainers '+indices[0].timeVal"
                :rows="gainers"
                :columns="columns"
                row-key="symbol"
                dense
                wrap-cells
                />
          </q-tab-panel>

          <q-tab-panel name="loosers">
            <q-table v-if="indices.length > 0"
                :title="'Loosers '+indices[0].timeVal"
                :rows="loosers"
                :columns="columns"
                row-key="symbol"
                dense
                wrap-cells
                />
          </q-tab-panel>
        </q-tab-panels>
</q-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { axios } from '../boot/axios'
const tab = ref('indices')
const indices = ref([])
const gainers = ref([])
const loosers = ref([])
const indColumns = [
  { name: 'index', align: 'left', label: 'Name', field: 'indexName', sortable: true },
  { name: 'open', label: 'Open', field: 'open', sortable: true },
  { name: 'high', label: 'High', field: 'high' },
  { name: 'low', label: 'Low', field: 'low' },
  { name: 'last', label: 'Last', field: 'last'},
  { name: 'change', label: 'Change (%)', field: 'percChange', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const columns = [
  { name: 'name', align: 'left', label: 'Name', field: 'symbol', sortable: true },
  { name: 'open', label: 'Open', field: 'openPrice', sortable: true },
  { name: 'high', label: 'High', field: 'highPrice' },
  { name: 'low', label: 'Low', field: 'lowPrice' },
  { name: 'last', label: 'Current', field: 'ltp'},
  { name: 'change', label: 'Change (%)', field: 'netPrice', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]
onMounted(async() => {
    let ind = await axios.get('https://stockapi.ipoinbox.com/indices').then(r => r.data)
    let gain = await axios.get('https://stockapi.ipoinbox.com/gainers').then(r => r.data)
    let loos = await axios.get('https://stockapi.ipoinbox.com/loosers').then(r => r.data)
    indices.value = ind.data
    gainers.value = gain.data
    loosers.value = loos.data
    console.log(loosers.value)
})
</script>