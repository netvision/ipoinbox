<template>
<q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
    <div class="tw-text-2xl tw-font-serif tw-text-orange-500 tw-pb-4 tw-border-black">Issue Overview</div>

    <div class="row q-col-gutter-sm">
    <div class="col-12 col-md-4 q-ma-sm bg-orange-1">            
        <q-item-label overline>Price Band</q-item-label>
        <q-item-label><span class="text-bold">&#8377;{{ipo.price_band_low}} - &#8377;{{ipo.price_band_high}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Lot Size and Amount</q-item-label>
        <q-item-label><span class="text-bold">{{ipo.lot_size}} Shares @ &#8377;{{ipo.lot_size * ipo.price_band_high}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Issue/Bid Opens on </q-item-label>
        <q-item-label><span class="text-bold">{{date.formatDate(ipo.open_date, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Issue/Bid Closes on</q-item-label>
        <q-item-label><span class="text-bold">{{date.formatDate(ipo.close_date, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Anchor Investors bids on </q-item-label>
        <q-item-label><span class="text-bold">{{date.formatDate(ipo.anchor_date, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Registrar</q-item-label>
        <q-item-label><span class="text-bold">{{ipo.registrar?.name}}</span></q-item-label>
        <q-separator spaced color="orange" />
    </div>
    <div class="col-12 col-md-4 q-ma-sm bg-orange-1">
        <q-item-label overline>Issue Size</q-item-label>
        <q-item-label><span class="text-bold">&#8377;{{formatNum((ipo.fresh_issue + ipo.offer_for_sale) * ipo.price_band_high)}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Fresh Issue</q-item-label>
        <q-item-label><span class="text-bold">{{(ipo.fresh_issue) ? ipo.fresh_issue + ' Shares' : 'NA'}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Offer for Sale</q-item-label>
        <q-item-label><span class="text-bold">{{(ipo.offer_for_sale) ? ipo.offer_for_sale+' Shares' : 'NA'}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Market Cap at the Time of IPO</q-item-label>
        <q-item-label><span class="text-bold">&#8377; {{formatNum(ipo.no_of_total_shares * ipo.price_band_high)}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label overline>Book Running Lead Managers</q-item-label>
        <q-item-label>
        <ol style="list-style-type: decimal; list-style-position: inside;">
            <li v-for="brlm in brlms" :key="brlm.id">
            <span class="text-bold" >{{brlm.name}}</span>
            </li>
        </ol>
        </q-item-label>
    </div>
    <div class="col-12 col-md-grow q-ma-sm bg-orange-1">
        <q-item-label>Tentative Calander</q-item-label>
        <q-item-label>Finalisation of Basis</q-item-label>
        <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_finalisation_of_basis, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label>Initiation of Refunds</q-item-label>
        <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_initiation_of_refunds, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label>Credit of Equity Shares</q-item-label>
        <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_credit_of_equity_shares, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label>Commencement</q-item-label>
        <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_commencement, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
        <q-separator spaced color="orange" />
        <q-item-label>Anchor Unlocking</q-item-label>
        <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_anchor_unlocking, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
        <q-separator spaced color="orange" />
    </div>
    </div>
    </q-card-section>
    </q-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
const props = defineProps({
    data: Object,
    id: Number,
  })
const ipo = ref({})
const brlms = ref([])
const formatNum = (num) => {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 10000000){
        return (num/10000000).toFixed(1) + ' Cr'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }
    console.log(props.id)
    ipo.value = (props.data) ? props.data : {}
    brlms.value = (ipo.value.brlms_json) ? JSON.parse(ipo.value.brlms_json) : []
</script>