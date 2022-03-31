<template>
<q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
      <div class="text-h5 q-mb-md">Listing Day Data</div>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6 bg-orange-2" v-if="nse">
          <div class="text-h6">NSE</div>
            <q-item class="bg-white q-pa-sm">
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Listing Date</q-item-label>
              <q-item-label class="text-bold">{{date.formatDate(nse.listing_date, 'DD-MM-YYYY')}}</q-item-label>
              
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Issue Price</q-item-label>
              <q-item-label class="text-bold">&#8377;{{props.issue}}</q-item-label>
              
            </q-item-section>
          </q-item>
          <q-item class="bg-white q-pa-sm">
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Listed At</q-item-label>
              <q-item-label class="text-bold">&#8377;{{nse.listing_price}}</q-item-label>
              
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Pre-open Volume</q-item-label>
              <q-item-label class="text-bold">{{nse.preopen_volume}}</q-item-label>
              
            </q-item-section>
          </q-item>
          <q-item class="bg-white q-pa-sm">
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>High</q-item-label>
              <q-item-label class="text-bold">&#8377;{{nse.high}}</q-item-label>
              
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Low</q-item-label>
              <q-item-label class="text-bold">&#8377;{{nse.low}}</q-item-label>
              
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Close</q-item-label>
              <q-item-label class="text-bold">&#8377;{{nse.close}}</q-item-label>
              
            </q-item-section>
          </q-item>
          <q-item class="bg-white q-pa-sm">
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Volume</q-item-label>
              <q-item-label class="text-bold">{{nse.volume}}</q-item-label>
              
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Delivery</q-item-label>
              <q-item-label class="text-bold">{{nse.delivery}}</q-item-label>
              
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Free Float</q-item-label>
              <q-item-label class="text-bold">{{(nse.free_float) ? nse.free_float : 'NA'}}</q-item-label>
              
            </q-item-section>
          </q-item>
        </div>
        
        <div class="col-12 col-sm-6 bg-orange-2" v-if="bse">
          <div class="text-h6">BSE</div>
            <q-item class="bg-white q-pa-sm">
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Listing Date</q-item-label>
              <q-item-label class="text-bold">{{date.formatDate(bse.listing_date, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Issue Price</q-item-label>
              <q-item-label class="text-bold">&#8377;{{props.issue}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="bg-white q-pa-sm">
          <q-separator vertical color="orange" /> 
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Listed At</q-item-label>
              <q-item-label class="text-bold">&#8377;{{bse.listing_price}}</q-item-label>
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Pre-open Volume</q-item-label>
              <q-item-label class="text-bold">{{bse.preopen_volume}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="bg-white q-pa-sm">
          <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>High</q-item-label>
              <q-item-label class="text-bold">&#8377;{{bse.high}}</q-item-label>
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Low</q-item-label>
              <q-item-label class="text-bold">&#8377;{{bse.low}}</q-item-label>
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Close</q-item-label>
              <q-item-label class="text-bold">&#8377;{{bse.close}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="bg-white q-pa-sm">
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Volume</q-item-label>
              <q-item-label class="text-bold">{{bse.volume}}</q-item-label>
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Delivery</q-item-label>
              <q-item-label class="text-bold">{{bse.delivery}}</q-item-label>
            </q-item-section>
            <q-separator vertical color="orange" />
            <q-item-section class="q-pa-sm">
              <q-item-label overline>Free Float</q-item-label>
              <q-item-label class="text-bold">{{(bse.free_float) ? bse.free_float : 'NA'}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
      
      </q-card-section>
    </q-card>
</template>
<script setup>
import { ref } from 'vue'
import { date } from 'quasar'
const props = defineProps({
    data: Array,
    issue: String 
  })

const list = ref(props.data)
const bse = list.value.find(l => l.exchange === 'BSE')
const nse = list.value.find(l => l.exchange === 'NSE')

</script>