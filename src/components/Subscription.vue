<template>
<q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
      <q-table wrap-cells
              title="Subscriptions"
              :rows="subscriptions"
              :columns="columns"
              row-key="category"
              hide-bottom
              :visible-columns="['category', 'day1', 'day2', 'day3', 'total_applications']"
              >
              <template v-slot:body-cell-day1="props">
                <q-td :props="props">
                  <div class="my-table-details">
                    {{ subTimes(props.row.quota, props.row.day1) }}
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-day2="props">
                <q-td :props="props">
                  <div class="my-table-details">
                    {{ subTimes(props.row.quota, props.row.day2) }}
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-day3="props">
                <q-td :props="props">
                  <div class="my-table-details">
                    {{ subTimes(props.row.quota, props.row.day3) }}
                  </div>
                </q-td>
              </template>
        </q-table>
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

const subTimes = (quota, subs) => {
  if(subs > 0 && quota > 0){
    return (subs/quota).toFixed(2)+' Time'
  }
  else return 'NA'
}

onMounted(async() => {
    let cat = await axios.get('https://droplet.netserve.in/inv-categories')
    categories.value = cat.data
    subscriptions.value.map(sub => {
        sub.cat = categories.value.find(cat=>cat.id === sub.cat_id).short_name
    })
})
</script>