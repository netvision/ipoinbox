<template>
<q-ajax-bar ref="bar" position="top" color="accent" size="10px" />
  <q-page class="q-pa-md">
     <div :style="'background-image: url(\''+ipo.header_img+'\'); height:300px; background-size:cover'">
          <img :src="ipo.company_logo" style="width: 150px; height: 150px; position: absolute; top: 50px; left: 50px">
      </div>
    <q-card flat class="rounded-border bg-orange-1">
      <q-card-section>
      <div class="text-h3 text-deep-orange-6 text-left q-pb-md">{{ipo.company_name}}</div> 
      <div class="q-pa-sm flex q-gutter-sm bg-orange-3 rounded-borders">
        <span><a :href="ipo.company_url" target="_blank">{{ipo.company_url}}</a></span> <q-separator color="orange" vertical /> <a :href="nse.url">NSE</a> <q-separator color="orange" vertical /> <a :href="bse.url">BSE</a><q-separator color="orange" vertical /><span> Registrar: <a :href="registrar.url">{{registrar.name}}</a></span>
      </div>
      <div class="row q-gutter-sm q-pa-md justify-between item-stretch">
        <div class="rounded-border col-grow">
          <q-item>
            <q-item-section>
              <q-item-label overline>Sector</q-item-label>
              <q-item-label class="text-bold">{{curInfo.SectorName}}</q-item-label>
            </q-item-section>
            
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>NSE Symbol</q-item-label>
              <q-item-label class="text-bold">{{curInfo.NSESymbol}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>BSE Code</q-item-label>
              <q-item-label class="text-bold">{{curInfo.BSECode}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>CIN</q-item-label>
              <q-item-label class="text-bold">{{curInfo.CIN}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>ISIN</q-item-label>
              <q-item-label class="text-bold">{{curInfo.isin}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Market Cap</q-item-label>
              <q-item-label class="text-bold">&#8377;{{curInfo.MCAP}} Cr.</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Market Cap Type</q-item-label>
              <q-item-label class="text-bold">{{curInfo.mcaptype}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <q-separator vertical spaced color="orange" />
        <div class="col-grow">
          <q-item>
            <q-item-section>
              <q-item-label overline>Listing Date</q-item-label>
              <q-item-label class="text-bold">{{date.formatDate(nse.listing_date, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Issue Price</q-item-label>
              <q-item-label class="text-bold">{{ipo.issue_price}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Listing At</q-item-label>
              <q-item-label class="text-bold">{{nse.listing_price}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Pre-open Volume</q-item-label>
              <q-item-label class="text-bold">{{nse.preopen_volume}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>High</q-item-label>
              <q-item-label class="text-bold">{{nse.high}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Low</q-item-label>
              <q-item-label class="text-bold">{{nse.low}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Close</q-item-label>
              <q-item-label class="text-bold">{{nse.close}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Volume</q-item-label>
              <q-item-label class="text-bold">{{nse.volume}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Delivery</q-item-label>
              <q-item-label class="text-bold">{{nse.delivery}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Free Float</q-item-label>
              <q-item-label class="text-bold">{{(nse.free_float) ? nse.free_float : 'NA'}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
       <q-separator vertical spaced color="orange" />
        <div class="col-grow">
          <q-item>
            <q-item-section>
              <q-item-label overline>EOD on</q-item-label>
              <q-item-label class="text-bold">{{date.formatDate(eod.date, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Open</q-item-label>
              <q-item-label class="text-bold">{{eod.Open}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Closing</q-item-label>
              <q-item-label class="text-bold">{{eod.Close}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Day High</q-item-label>
              <q-item-label class="text-bold">{{eod.High}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Day Low</q-item-label>
              <q-item-label class="text-bold">{{eod.Low}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Volume</q-item-label>
              <q-item-label class="text-bold">{{eod.Volume}}</q-item-label>
              <q-item-label caption class="text-bold">&#8377;{{eod.Value}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Lifetime High</q-item-label>
              <q-item-label class="text-bold">{{eod.LifeTimeHigh}}</q-item-label>
              <q-item-label caption class="text-bold text-italic">on {{date.formatDate(eod.highdate, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Lifetime Low</q-item-label>
              <q-item-label class="text-bold">{{eod.LifeTimeLow}}</q-item-label>
              <q-item-label caption class="text-bold text-italic">on {{date.formatDate(eod.lowdate, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Market Cap</q-item-label>
              <q-item-label class="text-bold">&#8377;{{eod.mcap}} Cr.</q-item-label>
              <q-item-label caption class="text-bold text-italic">as on {{date.formatDate(eod.date, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
          </q-item> 
        </div>
      </div>
      </q-card-section>
    </q-card>
    <q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
        <div class="text-h5">Company Info</div>
        <div v-html="ipo.about_html" />
      </q-card-section>
    </q-card>
    <Promoters :ipo_id="ipo_id" />
    <pre>{{ipo}}</pre>
    <pre>{{curInfo}}</pre>
    <pre>{{eod}}</pre>
    <q-page-scroller expand position="top" :scroll-offset="450" :offset="[0, 0]">
      <div class="q-pa-sm flex q-gutter-sm bg-orange-3 rounded-borders full-width">
        <span>{{ipo.company_name}}</span> <q-space /><q-separator color="orange" vertical /> <a @click="scrollTo('promoters')">Promoters</a> <q-separator color="orange" vertical /> <a :href="bse.url">BSE</a><q-separator color="orange" vertical /><span> Registrar: <a :href="registrar.url">{{registrar.name}}</a></span>
      </div>
    </q-page-scroller>
  </q-page>
</template>

<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { useRoute } from 'vue-router'
  import { axios } from '../boot/axios'
  import { useMeta, scroll } from 'quasar'
  import { date } from 'quasar'
  import Promoters from '../components/Promoters.vue'
  const { getScrollTarget, setVerticalScrollPosition } = scroll
  const route = useRoute()
  const ipo_id = route.params.ipo_id
  const ipo = ref({})
  const bse = ref({})
  const nse = ref({})
  const registrar = ref({})
  const eod = ref({})
  const curInfo = ref({})

  const scrollTo = (el) => {
    const ele = document.getElementById(el)
    const target = getScrollTarget(ele)
    const offset = ele.offsetTop - ele.scrollHeight
    console.log(offset)
    const duration = 1000
    setVerticalScrollPosition(target, offset, duration)
  }
  onBeforeMount(async() => {
    ipo.value = await axios.get('https://droplet.netserve.in/ipos/'+ipo_id+'?expand=registrar,promoters,listings,subscriptions,sector').then(r => r.data)
    let listings = ipo.value.listings
    nse.value = listings.filter(r => r.exchange == 'NSE')[0]
    bse.value = listings.filter(r => r.exchange == 'BSE')[0]
    let scrips = await axios.get('https://cmotswebapi.cmots.com/SunnyModi/CompanyMaster').then(r => r.data.data)
    let niftyEod = await axios.get('https://cmotswebapi.cmots.com/SunnyModi/NseEODPrices-Unadjusted').then(r => r.data.data)
    curInfo.value = scrips.filter(s => s.NSESymbol === nse.value.scrip_code)[0]
    eod.value = niftyEod.filter(e => e.co_code === curInfo.value.co_code)[0]
    registrar.value = ipo.value.registrar
    useMeta({
      title: ipo.value.company_name,
      titleTemplate: title => `${title} - IPO Inbox`,
    })
    console.log(ipo.value.promoters)
  })
</script>
