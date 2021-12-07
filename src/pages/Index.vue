<template>
  <q-page class="q-pa-md">
    <div class="row">
    <div class="col col-8">
       <input type="text" name="name" list="names" @change="selScrip($event, scrips, eods)">
       <datalist id="names">
           <option v-for="scrip in scrips" :key="scrip.co_code" :value="scrip.CompanyName"></option>
       </datalist>
       <q-tabs v-if="scripData"
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="info" label="Info" />
          <q-tab name="eod" label="EOD" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="info">
            <div class="text-h6">Basic Info</div>
            <pre>{{scripData.detail}}</pre>
          </q-tab-panel>

          <q-tab-panel name="eod">
            <div class="text-h6">End of Day Data</div>
            <pre>{{scripData.eod}}</pre>
          </q-tab-panel>

        </q-tab-panels>
    </div>
    <div class="col-4">
      <Nifty50 />
    </div>
    </div>
  </q-page>
</template>

<script setup>
import { api, axios } from '../boot/axios'
import { onMounted, ref} from 'vue'
import Nifty50 from 'components/Nifty50'
const scrips = ref([])
const eods = ref([])
const scripData = ref({})
/*
let looser = {
  method: 'GET',
  url: 'https://nse-data1.p.rapidapi.com/top_loosers',
  headers: {
    'x-rapidapi-host': 'nse-data1.p.rapidapi.com',
    'x-rapidapi-key': '05786c58f6msh0470f5aa4321575p1bf83fjsn2a2c79e27994'
  }
}

let gainer = {
  method: 'GET',
  url: 'https://nse-data1.p.rapidapi.com/top_gainers',
  headers: {
    'x-rapidapi-host': 'nse-data1.p.rapidapi.com',
    'x-rapidapi-key': '05786c58f6msh0470f5aa4321575p1bf83fjsn2a2c79e27994'
  }
}
const nseLoosers = ref({})
const nseGainers = ref({})
*/
const tab = ref('eod')
const selScrip = (e, s, d) => {
    const scripDetail = s.filter(detail => detail.CompanyName === e.target.value)
    const scripEod = d.filter(dt => dt.co_code === scripDetail[0].co_code)
    scripData.value = {detail: scripDetail[0], eod: scripEod[0]}
}
onMounted(async() =>{
  scrips.value = await axios.get('https://cmotswebapi.cmots.com/SunnyModi/CompanyMaster').then(r => r.data.data)
  eods.value = await axios.get('https://cmotswebapi.cmots.com/SunnyModi/NseEODPrices-Unadjusted').then(r => r.data.data)
})

</script>
