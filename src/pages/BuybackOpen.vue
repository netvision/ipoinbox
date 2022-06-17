<template>
<q-ajax-bar ref="bar" position="top" color="accent" size="10px" />
<q-page class="q-pa-md">
  <div class="row">
    <div class="col-9"><h3 class="text-h3 q-mb-md">Recent Open Market Buybacks</h3></div>
    <q-space />
    <div class="col text-right"><q-btn @click="newBuybackModal = true">Add New</q-btn></div>
  </div>
    
    <q-list v-if="ombbs">
        <q-expansion-item v-for="bb in ombbs" :key="bb.id" @show="getRecords(bb)">
        <template v-slot:header>
          <q-item-section class="text-h5">
            {{bb.company_name}}
          </q-item-section>

          <q-item-section>
            <q-item-label>Buyback Size: &#8377;{{curFormat(bb.buyback_size)}}</q-item-label>
            <q-item-label>Maximum Price: &#8377;{{bb.buyback_price_maximum}}</q-item-label>
          </q-item-section>

          <q-item-section side>
              <q-item-label>Start Date: {{dateFormat(bb.start_date)}}</q-item-label>
              <q-btn flat color="primary" label="Edit" @click="editBuyback(bb)"/>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <div class="q-pa-md">
              <p class="col">Buyback Size: <strong>&#8377;{{cur_buyback?.buyback_size}}</strong></p>
              <p class="col">Maximum Price: <strong>&#8377;{{cur_buyback?.buyback_price_maximum}}</strong></p>
              <p class="col">Total Share of the company: <strong>{{cur_buyback?.total_shares}}</strong></p>
           
              <p class="col">No. of Shares at MM Price: <strong>{{cur_buyback?.shares_at_mmprice}}</strong></p>
              <p class="col">Percent of Total Shares: <strong>{{cur_buyback?.pc_of_total_shares}}%</strong></p>
           
              <p class="col">Shares in Public: <strong>{{cur_buyback?.free_float}}</strong></p>
              <p class="col">Percent of Shares in Public: <strong>{{cur_buyback?.pc_of_freefloat}}%</strong></p>
            </div>
            <div class="records q-pa-md">
              <q-table
                :rows="records"
                :columns="columns"
                row-key="name"
                hide-bottom
                virtual-scroll
                :rows-per-page-options="[0]"
                wrap-cells
                @row-dblclick="editRecord"
              >
              <template v-slot:top>
                <div class="col-4 q-table__title">Records</div>
                <q-space />
                <q-btn
                  flat round dense
                  icon="add_circle_outline"
                  @click="addRecord(cur_buyback.id)"
                  class="q-ml-md"
                />
              </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <q-dialog v-model="newBuybackModal">
      <q-card class="my-card">
        <q-card-section>
          <h6 class="text-h6 q-mb-md">{{(buyback.id) ? 'Edit' : 'Add new '}} Buyback</h6>
          <div class="row q-gutter-md">
            <div class="col">
              <q-input outlined v-model="buyback.company_name" label="Company Name" />
            </div>
          </div>
          <div class="row q-gutter-md q-mt-md">
            <div class="col"><q-input outlined v-model="buyback.bse_code" label="BSE Code" /></div>
            <div class="col"><q-input outlined v-model="buyback.nse_code" label="NSE Code" /></div>
          </div>
          <div class="row q-gutter-md q-mt-md">
            <div class="col"><q-input outlined v-model="buyback.buyback_size" label="Buyback Size" /></div>
            <div class="col"><q-input outlined v-model="buyback.buyback_price_maximum" label="Buyback Maximum Price" /></div>
          </div>
          <div class="row q-gutter-md q-mt-md">
            <div class="col"><q-input outlined v-model="buyback.total_shares" label="Total Shares of the Company" /></div>
            <div class="col"><q-input outlined v-model="buyback.free_float" label="Shares in Public (Freefloat)" /></div>
          </div>
          <div class="row q-gutter-md q-mt-md">
            <div class="col">
              <q-input filled v-model="buyback.start_date" label="Start Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="buyback.start_date" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col">
              <q-input filled v-model="buyback.close_date" label="Close Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="buyback.close_date" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
            
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat color="primary" :label="(buyback.id) ? 'Edit' : 'Add'" @click="addBuyback"/>
          <q-btn v-close-popup flat color="primary" round icon="close" @click="closeBuybackModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="newRecordModal">
      <q-card class="my-card">
        <q-card-section>
          <h6 class="text-h6 q-mb-md">{{(record.id) ? 'Edit' : 'Add new '}} Record</h6>
          <div class="row q-gutter-md q-mt-md">
            <q-input filled v-model="record.record_date" label="Record Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="record.record_date" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
          </div>
          <div class="row q-gutter-md q-mt-md">
            <div class="col"><q-input outlined v-model="record.nse" label="NSE" /></div>
            <div class="col"><q-input outlined v-model="record.bse" label="BSE" /></div>
          </div>
          <div class="row q-gutter-md q-mt-md">
            <div class="col"><q-input outlined v-model="record.amount" label="Total Amount" /></div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat color="primary" :label="(record.id) ? 'Edit' : 'Add'" @click="addRecord(cur_buyback)"/>
          <q-btn v-close-popup flat color="primary" round icon="close" @click="closeRecordModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { axios } from '../boot/axios'
const ombbs = ref([])
const records = ref([])
const buyback = ref({})
const cur_buyback = ref()
const record = ref({})
const newBuybackModal = ref(false)
const newRecordModal = ref(false)

const columns = [
  { name: 'date', align: 'left', label: 'Date', field: 'record_date'},
  { name: 'bse', align: 'left', label: 'BSE', field: 'bse'},
  { name: 'nse', align: 'left', label: 'NSE', field: 'nse'},
  { name: 'total', align: 'left', label: 'Total', field: 'total'},
  { name: 'amount', align: 'left', label: 'Amount', field: 'amount'},
  { name: 'avg', align: 'left', label: 'Average Price', field: 'avg'},
  { name: 'cum_amount', align: 'left', label: 'Cumulative Amount', field: 'cum_amount'},
  { name: 'cum_qty', align: 'left', label: 'Cum Qty', field: 'cum_qty'},
  { name: 'pc_utilised', align: 'left', label: 'Fund Utilised (%)', field: 'pc_utilised'},
]

const dateFormat = (dateString) => {
    if(dateString != null){
	    const date = new Date(dateString)
	    return new Intl.DateTimeFormat('default', {dateStyle: 'medium'}).format(date)
    }
    else return ''
}

const curFormat = (val) => {
    if(val >= 10000000) val = (val/10000000).toFixed(2) + ' Cr';
    else if(val >= 100000) val = (val/100000).toFixed(2) + ' L';
    else if(val >= 1000) val = (val/1000).toFixed(2) + ' K';
    return val;
}

const getRecords = async(bb) => {
  cur_buyback.value = bb
  cur_buyback.value.shares_at_mmprice = (bb.buyback_size / bb.buyback_price_maximum).toFixed(0)
  cur_buyback.value.pc_of_total_shares = (cur_buyback.value.shares_at_mmprice * 100 / bb.total_shares).toFixed(2)
  cur_buyback.value.promoters_share = bb.total_shares - bb.free_float
  cur_buyback.value.pc_of_freefloat = (cur_buyback.value.shares_at_mmprice * 100 / bb.free_float).toFixed(2)
  records.value = await axios.get('https://droplet.netserve.in/ip-buyback-open-records?buyback_id='+bb.id).then(r => r.data)
  let c = 0
  console.log(records.value.reduce((c, ele) => c + +(ele.amount), 0))
  records.value.forEach((rec, i) => {
    rec.total = +(rec.bse) + +(rec.nse)
    rec.avg = (rec.amount / rec.total).toFixed(2)
    
    rec.cum_amount = records.value.slice(0, i+1).reduce((a, b) => a + +(b.amount), 0)
    rec.cum_qty = records.value.slice(0, i+1).reduce((a, b) => (a + +(b.bse) + +(b.nse)), 0) 
    rec.pc_utilised = (rec.cum_amount * 100 / bb.buyback_size).toFixed(2)
    /*
    if(i == 0){
      rec.cum_amount = rec.amount
      rec.cum_qty = rec.total
    }
    else{
    rec.cum_amount = +(records.value[i-1].amount) + +(rec.amount)
    rec.cum_qty = records.value[i-1].bse + records.value[i-1].nse + rec.total
    }
    rec.pc_utilised = (rec.cum_amount * 100 / bb.buyback_size).toFixed(2)
    */
  })
  
}

const addRecord = async(bb) => {
  newRecordModal.value = true
  record.value.buyback_id = bb.id
  if(!record.value.id){
    let res = await axios.post('https://droplet.netserve.in/ip-buyback-open-records', record.value)
  }
  else {
    let res = await axios.put('https://droplet.netserve.in/ip-buyback-open-records/'+record.value.id, record.value)
  }
  window.location.reload()
}

const editRecord = (e, r, i) => {
  record.value = {
    id: r.id,
    bse: r.bse,
    nse: r.nse,
    amount: r.amount,
    total: r.total
  }
  newRecordModal.value = true
}

const closeRecordModal = () => {
  record.value = {}
  newRecordModal.value = false
}

const addBuyback = async() => {
  if(buyback.value.id){
    let res = await axios.put('https://droplet.netserve.in/ip-buyback-opens/'+buyback.value.id, buyback.value)
    console.log(res.status)
  }
  else{
    let res = await axios.post('https://droplet.netserve.in/ip-buyback-opens', buyback.value)
    console.log(res.status)
  }
  window.location.reload()
}

const editBuyback = (bb) => {
  buyback.value = bb
  newBuybackModal.value = true
}

const closeBuybackModal = () => {
  buyback.value = {}
  newBuybackModal.value = false
}

onMounted(async() => {
    ombbs.value = await axios.get('https://droplet.netserve.in/ip-buyback-opens').then(r => r.data)
})
</script>