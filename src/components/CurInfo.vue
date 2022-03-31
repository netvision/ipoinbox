<template>
    <q-card flat class="q-pa-sm rounded-border bg-orange-2">
      <q-card-section>
        <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-4 bg-orange-1">
                <div v-if="nse.liveQuote" id="nse-live" :style="(+nse.liveQuote.lastPrice < 0) ? 'background-color:red' : 'background-color:green'">
                    <h3>{{nse?.liveQuote?.lastPrice}}</h3>
                    <h5>{{nse?.liveQuote?.change}} <span>({{nse?.liveQuote?.pChange}}%)</span></h5>
                    <p>at {{nse?.liveQuote?.lastUpdate}}</p>
                </div>
                <div>
                   <q-item>
                    <q-item-section>
                      <q-item-label overline>BSE Scrip Code</q-item-label>
                      <q-item-label class="text-bold">{{bse.scrip_code}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label overline>NSE Symbol</q-item-label>
                      <q-item-label class="text-bold">{{nse.scrip_code}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <pre>{{nse?.liveQuote}}</pre>
            </div>
            <div class="col-12 col-md-4 bg-orange-1">
                <pre>{{nse.info}}</pre>
            </div>
            <div class="col-12 col-md-4 bg-orange-1">
                <pre>{{bse}}</pre>
            </div>
        </div>
      </q-card-section>
    </q-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { axios } from '../boot/axios'
const props = defineProps({
    nse: Object,
    bse: Object
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