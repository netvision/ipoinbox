<template>
  <q-page class="q-pa-md">
     <div class="q-mb-md" :style="'background-image: url(\''+ipo.header_img+'\'); height:300px; background-size:cover'">
          <img :src="ipo.company_logo" style="width: 150px; height: 150px; position: absolute; top: 50px; left: 50px">
          <div class="text-h3 text-grey text-center">{{ipo.company_name}}</div>
    </div>
    <q-space />
    <div class="q-pa-sm q-ml-sm flex q-gutter-sm bg-grey-3 rounded-borders">
      <a :href="ipo.company_url" target="_blank">{{ipo.company_url}}</a> <q-separator color="orange" vertical /> <a :href="nse.url">NSE</a> <q-separator color="orange" vertical /> <a :href="bse.url">BSE</a><q-separator color="orange" vertical /><span> Registrar: <a :href="registrar.url">{{registrar.name}}</a></span>
    </div>
    <pre>{{ipo}}</pre>
  </q-page>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { axios } from '../boot/axios'
  
  const route = useRoute()
  const ipo_id = route.params.id
  const ipo = ref({})
  const bse = ref({})
  const nse = ref({})
  const registrar = ref({})
  onMounted(async() => {
    ipo.value = await axios.get('https://droplet.netserve.in/ipos/'+ipo_id+'?expand=registrar,promoters,listings,subscriptions,sector').then(r => r.data)
    let listings = ipo.value.listings
    nse.value = listings.filter(r => r.exchange == 'NSE')[0]
    bse.value = listings.filter(r => r.exchange == 'BSE')[0]
    registrar.value = ipo.value.registrar
  })
</script>
