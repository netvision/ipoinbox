<template>
<q-page class="q-pa-md">
    <h3 class="text-h3">Offer for sale</h3>
    <div class="row">
        <div class="col">
        <q-input v-model="bseUrl" type="text" />
        </div>
        <div class="col">
        <q-input v-model="nseUrl" type="text" />
        </div>
        <div class="col">
        <q-btn label="Get Data" @click="getData" />
        </div>
    </div>
    <div class="row">
        <div class="col" id="bse" v-html="html"></div>
        <div class="col" id="nse">
        <table>
        <tr>
        <th colspan="8">Last Update : <br /> {{nseData?.data[0].dat}}</th>
        </tr>
        <tr>
        <th colspan="5">Quantity</th><th>Cumulative Qty</th>
        </tr>
        <tr>
        <th>price interval</th>
        <th>No. of Bids</th>
        <th>Confirmed</th>
        <th>yet to be Confmd</th>
        <th>Total</th>
        <th>confirmed</th>
        <th>yet to be Confmd</th>
        <th>Total</th>
        </tr>
        <tr v-for="(d, i) in nseData?.data" :key="i">
        <td>{{d.pri}}</td>
        <td>{{d.bids}}</td>
        <td>{{d.conQty}}</td>
        <td>{{d.uCQty}}</td>
        <td>{{d.totQty}}</td>
        <td>{{d.cumConQty}}</td>
        <td>{{d.cumUCQty}}</td>
        <td>{{d.cumTQty}}</td>
    
        </tr>
        </table>
        </div>
    </div>
    <pre>{{html}}</pre>
</q-page>
</template>
<script setup>
import {ref, onMounted } from 'vue'
import { axios } from '../boot/axios'

const bseUrl = ref()
const nseUrl = ref()
const html = ref()
const nseData = ref()

const getData = async() => {
    let parser = new DOMParser()
    let bseOfs = await axios.get(bseUrl.value)
    nseData.value = await axios.get(nseUrl.value).then(r => r.data)
    let rows = parser.parseFromString(bseOfs.data, 'text/html').getElementById('divID').querySelectorAll('td tr')
    let trs = []
    rows.forEach((row, i) => {
        let cols = row.querySelectorAll('td')
        let tr = Object
        let td = Array
        cols.forEach((col, i) => {
            td[i] = col.textContent
        })
        tr.td = td
        trs.push(tr)
        
    })
    console.log(trs[1].td[1])
}

onMounted(() => {
    bseUrl.value = 'https://www.bseindia.com/markets/PublicIssues/BSEBidDetails_ofs_T.aspx?flag=R&Scripcode=500312'
    nseUrl.value = 'https://www1.nseindia.com/live_market/content/live_watch/offer_sale/ofs_details_retail.json'
    //setInterval(getData, 5000)
    getData()
})
</script>