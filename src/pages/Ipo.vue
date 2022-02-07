<template>
  <q-page class="q-pa-md">
    <h2>{{ipo.company_name}}</h2>
    
  </q-page>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { axios } from '../boot/axios'
  
  const route = useRoute()
  const ipo_id = route.params.id
  const ipo = ref({})
  onMounted(async() => {
    ipo.value = await axios.get('https://droplet.netserve.in/ipos/'+ipo_id+'?expand=registrar,promoters').then(r => r.data)
    console.log(ipo.value)
  })
</script>
