<template>
<q-page class="q-pa-md">
    <h3 class="text-h3">Offer for sale</h3>
    <div class="row">
        <div class="col">
        <q-select v-model="ofstype" :options="['Retail', 'Non-retail']" label="OFS Type" />
        </div>
        <div class="col">
        <q-input v-model="nsecode" label="NSE Scrip Symbol" type="text" />
        </div>
        <div class="col">
        <q-input v-model="bsecode" label="BSE Scrip Code" type="text" />
        </div>
        <div class="col">
        <q-select v-model="refresh" :options="[2, 3, 4, 5, 6, 7, 8, 9, 10]" label="Refresh After Seconds" />
        </div>
        <div class="col">
            <q-btn label="Get Data" @click="getData" />
        </div>
    </div>
    <div class="row">
        <div class="col" id="bse" v-if="html">
            <table class="tw-min-w-ful ofs">
            <tr>
            <th>Price Interval</th><th>BSE Bids</th><th>BSE Confirmed</th><th>NSE Bids</th><th>NSE Confirmed</th><th>Accumulated</th>
            </tr>
            <tr v-for="(item, k) in html" :key="k">
                <td>{{item.price}}</td><td>{{item.bsebids}}</td><td>{{item.bseConfirmed}}</td><td>{{item.nsebids}}</td><td>{{item.nseConfirmed}}</td><td>{{item.acc}}</td>
            </tr>
            </table>
        </div>
        <div v-else>
        Loading
        </div>
    </div>
</q-page>
</template>
<script setup>
import {ref, onMounted } from 'vue'
import { axios } from '../boot/axios'
const ofstype = ref()
const bsecode = ref()
const nsecode = ref()
const bseUrl = ref()
const nseUrl = ref()
const html = ref()
const nseData = ref()
const refresh = ref()

const getData = async() => {
    html.value = null
    if(ofstype.value === 'Retail'){
        bseUrl.value = 'https://www.bseindia.com/markets/PublicIssues/BSEBidDetails_ofs.aspx?flag=R&Scripcode='+bsecode.value
        nseUrl.value = 'https://stockapi.ipoinbox.com/ofs?type=retail&symbol='+nsecode.value
    }
    else {
        bseUrl.value = 'https://www.bseindia.com/markets/PublicIssues/BSEBidDetails_ofs.aspx?flag=NR&Scripcode='+bsecode.value
        nseUrl.value = 'https://stockapi.ipoinbox.com/ofs?symbol='+nsecode.value
    }
    nseData.value = await axios.get(nseUrl.value).then(r => r.data)
    
    let parser = new DOMParser()
    let bseOfs = await axios.get(bseUrl.value)
    let rows = parser.parseFromString(bseOfs.data, 'text/html').getElementById('divID').querySelectorAll('tr tr')
    if(rows && rows.length > 0 && nseData.value){
        let trs = []
        rows.forEach((row, i) => {
        if(i > 1){
            let cols = rows[i].querySelectorAll('td')
            let tr = []
            let td = {}
            cols.forEach((col, j) => {
                if(j === 0) td.price = col.textContent
                if(j === 1) td.bids = col.textContent
                if(j === 2) td.confirmed = col.textContent
            })
            
            trs.push(td)
        }
        })
        html.value = processData(trs, nseData.value).reverse()
    }
    else html.value = {}
    console.log('ok')
}

const processData = (bse, nse) => {
    let bsePrices = bse.map(x => +x.price)
    let nsePrices = nse.map(y => +y.pri)
    let prices = [...nsePrices, ...bsePrices].sort(function(a, b){return b - a});
    let uniqPri = [...new Set(prices)]
    
    let final = []
    let acc = 0
    uniqPri.forEach(pri => {
       if(!isNaN(pri)){
           let bData = bse.find(x => x.price == pri)
       let nData = nse.find(y => y.pri == pri)
       let nseConfirmed = (nData?.conQty.replace(/,/g,"")) ? nData?.conQty.replace(/,/g,"") : 0
        let bseConfirmed = (bData?.confirmed.replace(/,/g,"")) ? bData?.confirmed.replace(/,/g,"") : 0
        acc = acc + +nseConfirmed + +bseConfirmed
       final.push({price: pri, nsebids: nData?.bids, nseConfirmed: nseConfirmed, bsebids: bData?.bids, bseConfirmed: bseConfirmed, acc: acc})

       } /*
        let bData = bse.filter(x => x.price == pri)[0]
        let nData = nse.filter(y => y.pri == pri)[0]
        final.push({bse: bData, nse: nData})
        */
       
    })
    return final
}
onMounted(() => {
   /*
    bseUrl.value = 'https://www.bseindia.com/markets/PublicIssues/BSEBidDetails_ofs.aspx?flag=NR&Scripcode=506222'
    //nseUrl.value = 'https://www1.nseindia.com/live_market/content/live_watch/offer_sale/ofs_details_retail.json'
    nseUrl.value = 'https://stockapi.ipoinbox.com/nseofs'
    //setInterval(getData, 5000)
    */
    ofstype.value = 'Non-retail'
    bsecode.value = '542760'
    nsecode.value = 'SWSOLAR'
    refresh.value = 10
    setInterval(getData, refresh.value * 1000)
})
</script>
<style>
.ofs{
    width:100%;
	border:1px solid #333;
}

.ofs tr{
    display:flex;
	width:100%;
}
.ofs td, .ofs th{
    flex: 1 1 20%;
	text-align:center;
    border: 1px solid #333;
    
	padding:3px;
}
</style>