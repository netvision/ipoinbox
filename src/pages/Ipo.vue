<template>
<q-ajax-bar ref="bar" position="top" color="accent" size="10px" />
  <q-page class="q-pa-md">
     <div :style="'background-image: url(\''+ipo.header_img+'\'); height:300px; background-size:cover'">
          <img :src="ipo.company_logo" style="width: 150px; height: 150px; position: absolute; top: 100px; left: 50px; background-color:aliceblue; padding:1rem">
      </div>
    <q-card flat class="rounded-border bg-orange-2">
      <q-card-section>
      <div class="text-h3 text-deep-orange-6 text-left q-pb-md" style="font-family: 'Josefin Sans', sans-serif;">{{ipo.company_name}}</div> 
      <div class="q-pa-sm flex q-gutter-sm bg-orange-3 rounded-borders">
        <span><a :href="ipo.company_url" target="_blank">{{ipo.company_url}}</a></span> <q-separator color="orange" vertical /> <a :href="nse.url">NSE</a> <q-separator color="orange" vertical /> <a :href="bse.url">BSE</a><q-separator color="orange" vertical /><span> Registrar: <a :href="registrar.url">{{registrar.name}}</a></span> <q-slider
            class="q-mt-xl"
            v-model="priceModel"
            color="green"
            :inner-min="3"
            :inner-max="6"
            markers
            :marker-labels="arrayMarkerLabel"
            label-always
            :label-value="`$ ${priceModel}`"
            switch-label-side
            switch-marker-labels-side
            :min="2"
            :max="7"
          />
      </div>
      <div class="row q-col-gutter-sm q-pt-md justify-between item-stretch">
        <div class="rounded-border col-12 col-md-4 bg-orange-1 q-ma-sm">
          <q-item class="tw-divide-x tw-divide-y">
            <q-item-section>
              <q-item-label overline>CIN</q-item-label>
              <q-item-label class="text-bold">{{curInfo.CIN}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Sector</q-item-label>
              <q-item-label class="text-bold">{{curInfo.SectorName}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>ISIN</q-item-label>
              <q-item-label class="text-bold">{{curInfo.isin}}</q-item-label>
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
              <q-item-label overline>Market Cap</q-item-label>
              <q-item-label class="text-bold">&#8377;{{curInfo.MCAP}} Cr.</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Market Cap Type</q-item-label>
              <q-item-label class="text-bold">{{curInfo.mcaptype}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div class="col-12 col-md-4 q-ma-sm bg-orange-1">
          <q-item>
            <q-item-section>
              <q-item-label overline>Listing Date</q-item-label>
              <q-item-label class="text-bold">{{date.formatDate(nse.listing_date, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Issue Price</q-item-label>
              <q-item-label class="text-bold">&#8377;{{ipo.issue_price}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Listed At</q-item-label>
              <q-item-label class="text-bold">&#8377;{{nse.listing_price}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Pre-open Volume</q-item-label>
              <q-item-label class="text-bold">{{nse.preopen_volume}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>High</q-item-label>
              <q-item-label class="text-bold">&#8377;{{nse.high}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Low</q-item-label>
              <q-item-label class="text-bold">&#8377;{{nse.low}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Close</q-item-label>
              <q-item-label class="text-bold">&#8377;{{nse.close}}</q-item-label>
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
        <div class="col-12 col-md-grow q-ma-sm bg-orange-1">
          
          <q-item>
            <q-item-section>
              <q-item-label overline>EOD on</q-item-label>
              <q-item-label class="text-bold">{{date.formatDate(eod.date, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Open</q-item-label>
              <q-item-label class="text-bold">&#8377;{{eod.Open}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Closing</q-item-label>
              <q-item-label class="text-bold">&#8377;{{eod.Close}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Day High</q-item-label>
              <q-item-label class="text-bold">&#8377;{{eod.High}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Day Low</q-item-label>
              <q-item-label class="text-bold">&#8377;{{eod.Low}}</q-item-label>
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
              <q-item-label class="text-bold">&#8377;{{eod.LifeTimeHigh}}</q-item-label>
              <q-item-label caption class="text-bold text-italic">on {{date.formatDate(eod.highdate, 'DD-MM-YYYY')}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label overline>Lifetime Low</q-item-label>
              <q-item-label class="text-bold">&#8377;{{eod.LifeTimeLow}}</q-item-label>
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
    <div v-if="ipo.blog_id" id="info">
      <Info :id="ipo.blog_id" />
    </div>
    <div id="promoters">
      <Promoters :ipo_id="ipo_id" />
    </div>
    <div id="issue-detail">
      <q-card flat class="q-mt-md rounded-border bg-orange-2">
        <q-card-section>
          <div class="tw-text-2xl tw-font-serif tw-text-orange-500 tw-pb-4 tw-border-black">Issue Overview</div>
        </q-card-section>
        <q-card-section>
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
    </div>
    <div id="objects" v-if="ipo.issue_objects_html">
      <Objects :content="ipo.issue_objects_html" />
    </div>
    <div id="financials" v-if="ipo.financials">
      <Financials :content="ipo.financials" />
    </div>
    <div v-if="ipo.peers" id="peers">
      <Peers :content="ipo.peers" />
    </div>
    <div id="subscriptions">
      <Subscription :subs="ipo.subscriptions" v-if="ipo.subscriptions" />
    </div>
    <div id="listings">
      <Listings :data="ipo.listings" :issue="ipo.issue_price" v-if="ipo.listings" />
    </div>
    <div id="review">
      <Review :data="ipo.review_html" v-if="ipo.review_html" />
    </div>
    
  </q-page>
  <q-page-scroller expand position="top" :scroll-offset="350" :offset="[0, 0]">
    <div class="q-pa-sm flex q-gutter-sm bg-orange-3 rounded-borders full-width">
      <span class="text-h5">{{ipo.company_name}}</span><q-space /><q-btn dense flat label="Info" @click="goTo('info')" /><q-separator color="orange" vertical /><q-btn flat dense label="promoters" @click="goTo('promoters')" /><q-separator color="orange" vertical /><q-btn dense flat label="objects" @click="goTo('objects')" /><q-separator color="orange" vertical /><q-btn dense flat label="Schedule" @click="goTo('issue-detail')" /><q-separator color="orange" vertical /><q-btn dense flat label="Financials" @click="goTo('financials')" /><q-separator color="orange" vertical /><q-btn flat dense label="peers" @click="goTo('peers')" /><q-separator color="orange" vertical /><q-btn flat dense label="Subscriptions" @click="goTo('subscriptions')" /><q-separator color="orange" vertical /><q-btn flat dense label="Listing" @click="goTo('listings')" />
    </div>
  </q-page-scroller>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { axios } from '../boot/axios'
  import { useMeta, scroll } from 'quasar'
  import { date } from 'quasar'
  import Promoters from '../components/Promoters.vue'
  import Info from '../components/Info.vue'
  import Financials from '../components/Financials.vue'
  import Peers from '../components/Peers.vue'
  import Objects from '../components/Objects.vue'
  import Subscription from '../components/Subscription.vue'
  import Listings from '../components/Listings.vue'
  import Review from '../components/Review.vue'
  const { getScrollTarget, setVerticalScrollPosition } = scroll
  const route = useRoute()
  const ipo_id = route.params.id.split('-')[0]
  const cmp = ref(862)
  const ipo = ref({})
  const bse = ref({})
  const nse = ref({})
  const registrar = ref({})
  const eod = ref({})
  const curInfo = ref({})
  const brlms = ref([])

  const priceModel = ref(4)
  
  const arrayMarkerLabel = [
        { value: 3, label: '$3' },
        { value: 4, label: '$4' },
        { value: 5, label: '$5' },
        { value: 6, label: '$6' }
      ]

  const goTo = (el) => {
    const ele = document.getElementById(el)
    const target = getScrollTarget(ele)
    const offset = ele.offsetTop - ele.scrollHeight - 100
    console.log(offset)
    const duration = 1000
    setVerticalScrollPosition(target, offset, duration)
    /*
   console.log(ele)
   ele.scrollIntoView()
   */
  }

  const formatNum = (num) => {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 10000000){
        return (num/10000000).toFixed(1) + ' Cr'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }
  onMounted(async() => {
    ipo.value = await axios.get('https://droplet.netserve.in/ipos/'+ipo_id+'?expand=registrar,promoters,listings,subscriptions,sector').then(r => r.data)
    let listings = ipo.value.listings
    nse.value = listings.filter(r => r.exchange == 'NSE')[0]
    bse.value = listings.filter(r => r.exchange == 'BSE')[0]
    
    let scrips = await axios.get('https://droplet.netserve.in/nse/index').then(r => r.data)
    let niftyEod = await axios.get('https://droplet.netserve.in/nse/eod').then(r => r.data)
    
    // let nifty = await axios.get('https://stockapi.ipoinbox.com/quote?companyName='+nse.value.scrip_code).then(r => r.data)
    
    niftyEod = JSON.parse(niftyEod)
    scrips = JSON.parse(scrips)
    curInfo.value = scrips.data.filter(s => s.NSESymbol === nse.value.scrip_code)[0]
    eod.value = niftyEod.data.filter(e => e.co_code === curInfo.value.co_code)[0]
    registrar.value = ipo.value.registrar
    brlms.value = JSON.parse(ipo.value.brlms_json)
    useMeta({
      title: ipo.value.company_name,
      titleTemplate: title => `${title} - IPO Inbox`,
    })
    console.log(ipo.value.peers)
  })
</script>
