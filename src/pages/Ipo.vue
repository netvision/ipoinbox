<template>
<q-ajax-bar ref="bar" position="top" color="accent" size="10px" />
<q-btn v-if="nxt" class="fixed_right" @click="nextIpo(nxt)" icon="navigate_next" />
<q-btn v-if="pre" class="fixed_left tw-hover:scale-110" @click="nextIpo(pre)" icon="navigate_before" />
  <q-page class="q-pa-md">
     <div :style="'background-image: url(\''+ipo.header_img+'\'); height:300px; background-size:cover'">
          <img :src="ipo.company_logo" style="width: 150px; height: 150px; position: absolute; top: 100px; left: 50px; background-color:aliceblue; padding:1rem">
      </div>
    <q-card flat class="rounded-border bg-orange-2">
      <q-card-section>
        <div class="text-h3 text-deep-orange-6 text-left q-pb-md" style="font-family: 'Josefin Sans', sans-serif;">{{ipo.company_name}}</div> 
        <div class="q-pa-sm flex q-gutter-sm bg-orange-3 rounded-borders">
            <span><a :href="ipo.company_url" target="_blank">{{ipo.company_url}}</a> </span><q-separator color="orange" vertical /><span v-if="nse && nse.url"><a :href="nse.url" target="_blank">NSE</a></span><q-separator color="orange" vertical  v-if="nse && nse.url" /><span v-if="bse && bse.url"><a :href="bse.url" target="_blank">BSE</a></span><q-separator color="orange" vertical  v-if="bse && bse.url" /><span v-if="ipo.rhp_url"><a :href="ipo.rhp_url" target="_blank">Offer Document</a></span><q-separator color="orange" vertical  v-if="ipo.rhp_url" /><span> Registrar: <a :href="registrar?.url" target="_blank">{{registrar?.name}}</a></span> 
        </div> 
      </q-card-section>
      <q-card-section v-if="(nse && nse.listing_date) || (bse && bse.listing_date)">
        <CurInfo :nse="nse" :bse="bse" />
      </q-card-section>
      <q-card-section v-if="ipo.ipo_id">
        <IssueDetail :data="ipo" :id="ipo.ipo_id" />
      </q-card-section>
      <q-card-section v-if="ipo.about_html" id="info">
        <Info :info="ipo.about_html" />
      </q-card-section>
      <q-card-section v-if="ipo.issue_objects_html" id="objects">
        <Objects :content="ipo.issue_objects_html" />
      </q-card-section>
      <q-card-section id="promotors" v-if="ipo.promoters">
        <Promoters :data="ipo.promoters" />
      </q-card-section>
      <q-card-section id="financials" v-if="ipo.financials">
        <Financials :content="ipo.financials" />
      </q-card-section>
      <q-card-section id="peers" v-if="ipo.peers">
        <Peers :content="ipo.peers" />
      </q-card-section>
      <q-card-section v-if="ipo.review_html" id="review">
        <Review :data="ipo.review_html" />
      </q-card-section>
  </q-card>
    
  </q-page>
  <q-page-scroller expand position="top" :scroll-offset="350" :offset="[0, 0]">
    <div class="q-pa-sm flex q-gutter-sm bg-orange-3 rounded-borders full-width">
      <span class="text-h5">{{ipo.company_name}}</span><q-space /><q-btn dense flat label="Info" @click="scrollTo('info')" /><q-separator color="orange" vertical /><q-btn flat dense label="promoters" @click="scrollTo('promoters')" /><q-separator color="orange" vertical /><q-btn dense flat label="objects" @click="scrollTo('objects')" /><q-separator color="orange" vertical /><q-btn dense flat label="Schedule" @click="scrollTo('issue-detail')" /><q-separator color="orange" vertical /><q-btn dense flat label="Financials" @click="scrollTo('financials')" /><q-separator color="orange" vertical /><q-btn flat dense label="peers" @click="scrollTo('peers')" /><q-separator color="orange" vertical /><q-btn flat dense label="Subscriptions" @click="scrollTo('subscriptions')" /><q-separator color="orange" vertical /><q-btn flat dense label="Listing" @click="scrollTo('listings')" />
    </div>
  </q-page-scroller>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { axios } from '../boot/axios'
  import { useMeta, scroll } from 'quasar'
  import { date } from 'quasar'
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/antd.css'
  import CurInfo from '../components/CurInfo.vue'
  import Promoters from '../components/Promoters.vue'
  import Info from '../components/Info.vue'
  import IssueDetail from '../components/IssueDetail.vue'
  import Financials from '../components/Financials.vue'
  import Peers from '../components/Peers.vue'
  import Objects from '../components/Objects.vue'
  import Subscription from '../components/Subscription.vue'
  import Listings from '../components/Listings.vue'
  import Review from '../components/Review.vue'
  
  const { getScrollTarget, setVerticalScrollPosition } = scroll
  const route = useRoute()
  const router = useRouter()
  const ipo_id = ref(route.params.id.split('-')[0])
  const ipo = ref({})
  const scrips = ref({})
  const nseEod = ref({})
  const bse = ref({})
  const nse = ref({})
  const registrar = ref({})
  const eod = ref({})
  const curInfo = ref({})
  const brlms = ref([])
  const val = ref([])
  const pre = ref({})
  const nxt = ref({})

  const scrollTo = (id) => {
    const ele = document.getElementById(id)
    const target = getScrollTarget(ele)
    const offset = ele.offsetTop - ele.scrollHeight - 100
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

  const init = async(ipo_id) => {
    ipo.value = await axios.get('https://droplet.netserve.in/ipos/'+ipo_id+'?expand=registrar,promoters,listings,subscriptions,sector').then(r => r.data)
    console.log(ipo.value)
    let listings = ipo.value.listings
    if(listings.length > 0){
        let nseData = listings.filter(r => r.exchange === 'NSE')[0]
        nse.value = (nseData) ? nseData : null
        
        let bseData = listings.filter(r => r.exchange === 'BSE')[0]
        bse.value = (bseData) ? bseData : null
        if (bse.value && ipo.value.issue_price && bse.value.scrip_code) {
          bse.value.issue_price = ipo.value.issue_price
          //let bseLive = await axios.get('https://stockapi.ipoinbox.com/bse?companyCode='+bse.value.scrip_code.trim()).then(r => r.data)
          //bse.value.liveQuote = bseLive
        }

        if(nse.value && nse.value.scrip_code && nse.value.listing_date){
            nse.value.issue_price = (ipo.value.issue_price) ? ipo.value.issue_price : null
            nse.value.lot_size = (ipo.value.lot_size) ? ipo.value.lot_size : null
            nse.value.totalShares = (ipo.value.no_of_total_shares) ? ipo.value.no_of_total_shares : 0
            let info = scrips.value.data.filter(s => s.NSESymbol === nse.value.scrip_code.trim())[0]
            if (info) {
              nse.value.info = info
              nse.value.eod = nseEod.value.data.filter(e => e.co_code === info.co_code)[0]
            }
        }    
    }
    
    let prenext = await axios.get('https://droplet.netserve.in/ipo/prenext?d='+ipo.value.open_date).then(r => r.data)
    console.log(prenext)
    pre.value = prenext.pre[prenext.pre.findIndex(x => x.ipo_id === ipo.value.ipo_id) + 1]
    nxt.value = prenext.next[prenext.next.findIndex(x => x.ipo_id === ipo.value.ipo_id) + 1]
    console.log(nxt.value)
    // let nifty = await axios.get('https://stockapi.ipoinbox.com/quote?companyName='+nse.value.scrip_code).then(r => r.data)
    
    
    registrar.value = ipo.value.registrar
    brlms.value = JSON.parse(ipo.value.brlms_json)
    useMeta({
      title: ipo.value.company_name,
      titleTemplate: title => `${title} - IPO Inbox`,
    })
  }

  const nextIpo = (ipo) => {
       ipo.value = {}
       nse.value = {}
       bse.value = {}
       init(ipo.ipo_id)
       router.push({name: 'ipo', params: { id: ipo.ipo_id+'-'+encodeURIComponent(ipo.company_name) }})
    }

  onMounted(async() => {
    scrips.value = await axios.get('https://droplet.netserve.in/nse/index').then(r => JSON.parse(r.data))
    nseEod.value = await axios.get('https://droplet.netserve.in/nse/eod').then(r => JSON.parse(r.data))
    init(ipo_id.value)
  })
</script>
<style scoped>
.fixed_right{
    position: fixed; 
     bottom: 50%;
     right: -5px;
     width: 70px; 
     border: 0px solid #d6d6d6;
     z-index: 1000;
}

.fixed_left{
    position: fixed; 
     bottom: 50%;
     left: -5px;
     width: 70px; 
     border: 0px solid #d6d6d6;
     z-index: 1000;
}

.fixed_right:hover{
  transform:scale(1.4);
  right:5px
}
</style>
