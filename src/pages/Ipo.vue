<template>
  <q-page class="q-pa-md">
     <div class="q-mb-md" :style="'background-image: url(\''+ipo.header_img+'\'); height:300px; background-size:cover'">
          <img :src="ipo.company_logo" style="width: 150px; height: 150px; position: absolute; top: 50px; left: 50px">
      </div>
    
    <div class="text-h3 text-orange text-centlefter q-ma-md">{{ipo.company_name}}</div>    
    <div class="q-pa-sm q-ml-sm flex q-gutter-sm bg-grey-3 rounded-borders">
      <span><a :href="ipo.company_url" target="_blank">{{ipo.company_url}}</a></span> <q-separator color="orange" vertical /> <a :href="nse.url">NSE</a> <q-separator color="orange" vertical /> <a :href="bse.url">BSE</a><q-separator color="orange" vertical /><span> Registrar: <a :href="registrar.url">{{registrar.name}}</a></span>
    </div>
    <div class="q-pa-md">
    <q-card flat>
    <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Overview</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          <pre>{{ eod }}</pre>
        </q-card-section>

        <q-separator vertical />

        <q-card-section>
          <pre>{{ curInfo }}</pre>
        </q-card-section>
        <q-separator vertical />

        <q-card-section>
         <pre>{{nse }}</pre>
        </q-card-section>
      </q-card-section>
    </q-card>
    </div>
    <q-space />
    
    <pre>{{ipo}}</pre>
    <pre>{{curInfo}}</pre>
    <pre>{{eod}}</pre>

  </q-page>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { axios } from '../boot/axios'
  
  const route = useRoute()
  const ipo_id = route.params.ipo_id
  const ipo = ref({})
  const bse = ref({})
  const nse = ref({})
  const registrar = ref({})
  const eod = ref({})
  const curInfo = ref({})
  onMounted(async() => {
    ipo.value = await axios.get('https://droplet.netserve.in/ipos/'+ipo_id+'?expand=registrar,promoters,listings,subscriptions,sector').then(r => r.data)
    let listings = ipo.value.listings
    nse.value = listings.filter(r => r.exchange == 'NSE')[0]
    bse.value = listings.filter(r => r.exchange == 'BSE')[0]
    let scrips = await axios.get('https://cmotswebapi.cmots.com/SunnyModi/CompanyMaster').then(r => r.data.data)
    let niftyEod = await axios.get('https://cmotswebapi.cmots.com/SunnyModi/NseEODPrices-Unadjusted').then(r => r.data.data)
    curInfo.value = scrips.filter(s => s.NSESymbol === nse.value.scrip_code)[0]
    eod.value = niftyEod.filter(e => e.co_code === curInfo.value.co_code)[0]
    registrar.value = ipo.value.registrar
  })
</script>
