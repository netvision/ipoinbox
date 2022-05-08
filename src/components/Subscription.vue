<template>
<q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
      <h4 class="text-h5 q-mb-md">Subscriptions</h4>
      <table class="tw-table-fixed tw-w-full tw-border">
      <thead class="tw-bg-gray-200">
      <tr class="tw-border tw-border-gray-400">
      <th class="tw-border tw-border-gray-400">Day</th><th class="tw-border tw-border-gray-400" v-for="log in subscriptions[0].logs" :key="log.id">{{log.cat.short_name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sub in subscriptions" :key="sub.day" class="tw-border tw-border-gray-400">
        <td class="tw-px-4 tw-py-2 tw-text-gray-900 tw-whitespace-nowrap tw-border tw-border-gray-400">
          {{date.formatDate(sub.day, 'DD MMM, YYYY')}}
        </td>
        <td v-for="l in sub.logs" :key="l.id" class="tw-px-4 tw-py-2 tw-text-gray-900 tw-whitespace-nowrap tw-border tw-border-gray-400">
          <div v-if="l.cat_id === 1">{{subTimes(netQib, l.subscription)}}<span v-if="l.applications">( <q-icon name="content_copy" />{{l.applications}} )</span></div>
          <div v-else>{{subTimes(l.quota.quota, l.subscription)}} <span v-if="l.applications">( <q-icon name="content_copy" />{{l.applications}} )</span></div>
        </td>
      </tr>
      </tbody>
      </table>
      
      </q-card-section>
    </q-card>
</template>
<script setup>
import { ref, onMounted  } from 'vue'
import { axios } from '../boot/axios'
import { date } from 'quasar'
const props = defineProps({
    subs: Array,
    open: Date,
    close: Date
  })
let start = new Date(props.open)
let end = new Date(props.close)
const subscriptions = ref([])
const netQib = ref(0)
for(let i = 0; i <= date.getDateDiff(end, start, 'days'); i++){
  let day = date.addToDate(start, {days: i})
  let dlogs = []
  let logs = props.subs.filter(sub => sub.day == date.formatDate(day, 'YYYY-MM-DD'))
  let qib = logs.filter(log => log.cat_id == 1)
  let bigHni = logs.filter(log => log.cat_id == 2)
  let smallHni = logs.filter(log => log.cat_id == 8)
  let retail = logs.filter(log => log.cat_id == 3)
  let employee = logs.filter(log => log.cat_id == 5)
  let shareholder = logs.filter(log => log.cat_id == 4)
  if(qib && qib.length > 0) dlogs.push(qib[0])
  if(bigHni && bigHni.length > 0) dlogs.push(bigHni[0])
  if(smallHni && smallHni.length > 0) dlogs.push(smallHni[0])
  if(retail && retail.length > 0) dlogs.push(retail[0])
  if(employee && employee.length > 0) dlogs.push(employee[0])
  if(shareholder && shareholder.length > 0) dlogs.push(shareholder[0])
  
  if(dlogs.length > 0) subscriptions.value.push({day: day, logs: dlogs})
  
}

const subTimes = (quota, subs) => {
  if(subs > 0 && quota > 0){
    return (subs/quota).toFixed(2)+'x'
  }
  else return 'NA'
}


axios.get('https://droplet.netserve.in/ipo-cat-quota?ipo_id='+props.subs[0].ipo_id).then(r => {
  let qib = r.data.filter(q => q.cat_id === 1)
  let anchor = r.data.filter(q => q.cat_id === 6)
  qib = (qib && qib.length > 0) ? qib[0].quota : 0
  anchor = (anchor && anchor.length > 0) ? anchor[0].quota : 0
  netQib.value = qib - anchor

})

</script>