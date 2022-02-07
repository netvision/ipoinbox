<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col col-8 q-pa-md">
        <div class="q-pa-md q-gutter-sm">
          <h4 class="text-h5">Latest IPOs</h4>
          <q-btn outline v-for="ip in latestIpos" :key="ip.ipo_id" :label="ip.company_name" @click="goTo(ip)" />
        </div>
        <div class="q-pa-md">
        <q-select 
          filled 
          v-model="ipo" 
          :options="ipos" 
          option-value="ipo_id" 
          option-label="company_name" 
          label="Search IPOs Archives"
          use-input
          @update:model-value="goTo()"
          @filter="filterFn">
        </q-select>
        </div>
        <NiftyEod />
      </div>
      <div class="col col-4">
        <Nifty50 />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { axios } from '../boot/axios'
import { useRouter } from 'vue-router'
import NiftyEod from 'components/NiftyEod'
import Nifty50 from 'components/Nifty50'

const ipos = ref([])
const ipo = ref('')
const router = useRouter()
const latestIpos = ref([])

const getLatestIpos = () => {
  ipos.value.sort(function(a,b){
    return new Date(b.open_date) - new Date(a.open_date)
  })
  latestIpos.value = ipos.value.slice(0, 8)
}
const filterFn = (val, update, abort) => {
  update(() => {
          const needle = val.toLowerCase()
          ipos.value = ipos.value.filter(v => v.company_name.toLowerCase().indexOf(needle) > -1)
        })
}

const goTo = (ip) => {
  if(ip){
    router.push('/ipo/'+ip.ipo_id)
  }
  else{ 
    router.push('/ipo/'+ipo.value.ipo_id)
  }
  
}
onMounted(async() => {
  ipos.value = await axios.get('https://droplet.netserve.in/ipos').then(r => r.data)
  getLatestIpos()
  console.log(latestIpos.value[1])
})
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

const qrsource = ref('')
onMounted(async() => {
  let data = {
    vpa: "9314034484@icici",
    name: "Rakesh Kumar",
    note: "Auro-13",
    amount: "5.10"
  }
  let qrcode = await axios.post('https://upiqr.in/api/qr?format=svg', data)
  qrsource.value = qrcode.data
  console.log(qrsource.value)
})
*/
</script>
