<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col col-8 q-pa-md">
        <NiftyEod />
      </div>
      <div class="col col-4">
        <Nifty50 />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import NiftyEod from 'components/NiftyEod'
import Nifty50 from 'components/Nifty50'
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


</script>
