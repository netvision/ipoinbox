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
        <div class="col" id="bse" v-html="nseHtml"></div>
    </div>
</q-page>
</template>
<script setup>
import {ref, onMounted } from 'vue'
import { axios } from '../boot/axios'

const bseUrl = ref()
const nseUrl = ref()
const html = ref()
const nseHtml = ref()

const getData = async() => {
    let parser = new DOMParser()
    let bseOfs = await axios.get(bseUrl.value)
    let nseOfs = await axios.get(nseUrl.value).then(r => r.data)
    html.value = parser.parseFromString(bseOfs.data, 'text/html').getElementById('divID').innerHTML
    
    console.log(nseOfs)
}
</script>