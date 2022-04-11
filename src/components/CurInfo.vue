<template>
    <q-card flat class="q-pa-sm rounded-border bg-orange-2">
      <q-card-section>
        <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-4 bg-orange-1">
                <div v-if="nse && nse.liveQuote" id="nse-live" class="bg-orange-3">
                    <h3 :class="(nse.liveQuote.change > 0) ? 'text-positive text-h3': 'text-negative text-h3'">{{nse?.liveQuote?.lastPrice}}</h3>
                    <h5 :class="(nse.liveQuote.change > 0) ? 'text-positive': 'text-negative'">{{nse?.liveQuote?.change}} <span>({{nse?.liveQuote?.pChange}}%) <q-icon v-if="nse.liveQuote.change > 0" name="arrow_upward" color="positive" /> <q-icon v-if="nse.liveQuote.change < 0" name="arrow_downward" color="negative" /></span></h5>
                    <p class="text-subtitle2">{{date.formatDate(nse?.liveQuote?.lastUpdate, 'DD-MMMYYYY | HH:mm:ss')}}</p>
                </div>
                <div>
                   <q-item>
                    <q-item-section>
                      <q-item-label overline>BSE Scrip Code</q-item-label>
                      <q-item-label class="text-bold">{{bse?.scrip_code}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label overline class="text-right">NSE Symbol</q-item-label>
                      <q-item-label class="text-bold text-right">{{nse?.scrip_code}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-bold">ISIN </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-bold text-right">{{nse?.info?.isin}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Open</q-item-label>
                      <q-item-label class="text-bold">{{nse?.liveQuote?.open}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label overline class="text-right">Close</q-item-label>
                      <q-item-label class="text-bold text-right">{{(nse.liveQuote && nse.liveQuote.closePrice > 0) ? nse.liveQuote.closePrice : 'Live'}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item>
                    <q-item-section>
                      <q-item-label overline>Day High</q-item-label>
                      <q-item-label class="text-bold">{{nse?.liveQuote?.dayHigh}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label overline class="text-right">Day Low</q-item-label>
                      <q-item-label class="text-bold text-right">{{nse?.liveQuote?.dayLow}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle1">Day Volume</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-bold text-right">{{nse?.liveQuote?.quantityTraded}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle1">Total Turnover</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-bold text-right">{{nse?.liveQuote?.totalTradedValue}} </q-item-label>
                    </q-item-section>
                  </q-item>

                </div>
            </div>
            <div class="col-12 col-md-4 bg-orange-1">
                <div>
                  <q-item>
                     <q-item-section>
                      <q-item-label overline class="text">Listing Date</q-item-label>
                      <q-item-label class="text-bold">{{date.formatDate(nse?.listing_date, 'DD-MMM-YYYY')}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label overline class="text-right">Issue Price</q-item-label>
                      <q-item-label class="text-bold text-right">{{nse?.issue_price}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item>
                     <q-item-section>
                      <q-item-label overline class="text">Listing Price NSE</q-item-label>
                      <q-item-label class="text-bold">{{nse?.listing_price}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label overline class="text-right">Listing Price BSE</q-item-label>
                      <q-item-label class="text-bold text-right">{{bse?.listing_price}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle1 q-pb-sm q-pt-md">Listing Day Low and High</q-item-label>
                      <vue-slider :min="Math.round(nse?.low)" :max="Math.round(nse?.high)" v-model="listingClose" width="100%" disabled />
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                     <q-item-section>
                      <q-item-label class="text-bold">{{nse?.low}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-bold text-right">{{nse?.high}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-separator />
                  <q-item v-if="nse.liveQuote">
                    <q-item-section>
                      <q-item-label class="text-subtitle1 q-pb-sm">52 Week Low and High</q-item-label>
                      <vue-slider :min="Math.round(nse.liveQuote.low52)" :max="Math.round(nse.liveQuote.high52)" v-model="close" width="100%" disabled />
                    </q-item-section>
                  </q-item>
                  <q-item dense v-if="nse.liveQuote">
                     <q-item-section>
                      <q-item-label class="text-bold">{{nse?.liveQuote?.low52}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-bold text-right">{{nse?.liveQuote?.high52}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item v-if="nse && nse.eod">
                    <q-item-section>
                      <q-item-label class="text-subtitle1 q-pb-sm">Lifetime Low and High</q-item-label>
                      <vue-slider :min="Math.round(nse.eod.LifeTimeLow)" :max="Math.round(nse.eod.LifeTimeHigh)" v-model="close" width="100%" disabled />
                    </q-item-section>
                  </q-item>
                  <q-item dense v-if="nse.eod">
                     <q-item-section>
                      <q-item-label class="text-bold">{{nse?.eod?.LifeTimeLow}}</q-item-label>
                      <q-item-label overline>{{date.formatDate(nse?.eod?.lowdate, 'DD-MMM-YYYY')}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-bold text-right">{{nse?.eod?.LifeTimeHigh}}</q-item-label>
                      <q-item-label overline class="text-right">{{date.formatDate(nse?.eod?.highdate, 'DD-MMM-YYYY')}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  
                </div>
            </div>
            <div class="col-12 col-md-4 bg-orange-1">
            <q-item>
              <q-item-section>
              <q-item-label>Return Calculations</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline class="text-left">CAGR</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-right">{{cagr}}%</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline class="text-left">Return in %</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-right">{{preturn}}%</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline class="text-left">Return per allotment</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-right">Rs. {{allotReturn}}</q-item-label>
              </q-item-section>
            </q-item>
            </div>
        </div>
      </q-card-section>
    </q-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import { axios } from '../boot/axios'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
const props = defineProps({
    nse: Object,
    bse: Object
  })
const bse = ref(props.bse)
const nse = ref(props.nse)
const close = ref()
const listingClose = ref()
close.value = (props.nse && props.nse.eod && props.nse.eod.Close) ? Math.round(props.nse.eod.Close) : 0
listingClose.value = (props.nse && props.nse.close) ? Math.round(props.nse.close) : 0
const cagr = ref()
const preturn = ref()
const allotReturn = ref()
onMounted(async() => {
  if(bse.value && bse.value.scrip_code){
    let liveQuote = await axios.get('https://stockapi.ipoinbox.com/bse?companyCode='+bse.value.scrip_code.trim()).then(r => r.data)
    bse.value.liveQuote = liveQuote
  }
  if(nse.value.scrip_code){
    let nselive = await axios.get('https://stockapi.ipoinbox.com/quote?companyName='+nse.value.scrip_code.trim()).then(r => r.data)
      if(nselive.data[0]){
        nse.value.liveQuote = nselive.data[0]
        nse.value.liveQuote.lastUpdate = nselive.lastUpdateTime
      }
  }

  let duration = date.getDateDiff(new Date(), new Date(nse.value.listing_date), 'days')/365
  let gain = nse.value.eod.Close / nse.value.issue_price
  cagr.value = (Math.pow(gain, 1/duration) - 1).toFixed(2)
  let ret = (nse.value.eod.Close - nse.value.issue_price) * 100 / nse.value.issue_price
  preturn.value = ret.toFixed(2)

  allotReturn.value = ((nse.value.eod.Close - nse.value.issue_price) * nse.value.lot_size).toFixed(2)
})

</script>
<style>
h3{
    position: relative;

    padding: 0;
    margin: 0;
    font-family: "Raleway", sans-serif;
    font-weight: 300;
    font-size: 26px;
    color: #080808;
    -webkit-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
}
#nse-live{
  width:80%;
  margin:10px auto;
  padding:5px;
  text-align:center;
  border-radius: 10px;
}
#nse-live h3{
  padding-bottom: 5px;
}

#nse-live h5{
  margin-top: -15px;
  font-size:14px;
}
.wp-style{
  color: #222; 
  font-family: 'Open Sans', sans-serif; 
  font-size: 15px; font-weight: 400; 
  line-height: 24px; 
  margin: 0 0 14px; 
  text-align:justify;
}

.wp-style h3{
  font-size: 21px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.5em;
  margin-bottom: 15px;
  position: relative;
  text-transform: uppercase;
}

.wp-style h3:before{
   position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 2px;
  content: "";
  background-color: #c50000;
}

</style>