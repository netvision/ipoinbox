<template>
<q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
      <q-table wrap-cells
              title="Subscriptions"
              :rows="subscriptions"
              :columns="columns"
              row-key="category"
              hide-bottom
              />
      </q-card-section>
    </q-card>
</template>
<script setup>
import { ref, onMounted  } from 'vue'
import { axios } from '../boot/axios'
const categories = ref([])
const props = defineProps({
    subs: Array
  })

const columns = [
  { name: 'category', align: 'left', label: 'Category', field: 'cat'},
  { name: 'quota', label: 'Quota', field: 'quota'},
  { name: 'discount', label: 'Discount', field: 'discount'},
  { name: 'day1', label: 'Day 1', field: 'day1' },
  { name: 'day2', label: 'Day 2', field: 'day2' },
  { name: 'day3', label: 'Day 3', field: 'day3'},
  { name: 'total_applications', label: 'Total Applications', field: 'total_applications'}
]
const subscriptions = ref(props.subs)
const getCat = async(id) => {
    let cat = await axios.get('https://droplet.netserve.in/inv-categories/'+id)
    return await cat.data.short_name
}

onMounted(async() => {
    let cat = await axios.get('https://droplet.netserve.in/inv-categories')
    categories.value = cat.data
    subscriptions.value.map(sub => {
        sub.cat = categories.value.find(cat=>cat.id === sub.cat_id).short_name
    })
})
</script>