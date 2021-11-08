<template>
  <h2 class="text-h4">Overview</h2>
  <div class="q-pa-md">
    <div class="row">
      <div class="col q-pa-md">
        <q-input v-model="overview.company_name" label="Company Name" />
      </div>
      <div class="col q-pa-md">
        <q-input v-model="overview.market_cap_at_ipo" label="Market Cap (in Crore)">
          <template v-slot:before>
            &#8377; 
          </template>
          <template v-slot:hint>
           in Crore
          </template>
        </q-input>
      </div>
    </div>
  </div>
  <pre>{{ipodata}}</pre>
</template>

<script setup>
import { ref, onBeforeMount} from 'vue'
import { api } from '../boot/axios'
const props = defineProps({
  ipo: Number
})
const overview = ref({})
const ipodata = ref({})
onBeforeMount(async()=>{
  const id = props.ipo
  const ipo = await api.get('/ipo/id/'+id).then(r => r.data.data)
  ipodata.value = ipo
  overview.value = {
    company_name: ipo.company_name,
    market_cap_at_ipo: ipo.market_cap_at_time_of_ipo
  }
})
</script>
