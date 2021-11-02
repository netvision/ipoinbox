<template>
  <h2 class="text-h4">Overview</h2>
  <pre>{{ipodata}}</pre>
</template>

<script setup>
import { ref, onBeforeMount} from 'vue'
import { api } from '../boot/axios'
const props = defineProps({
  ipo: Number
})
const ipodata = ref({})
onBeforeMount(async()=>{
  const id = props.ipo
  ipodata.value = await api.get('/ipo/id/'+id).then(r => r.data.data)
})
</script>
