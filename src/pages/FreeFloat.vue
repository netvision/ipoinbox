<template>
<q-page class="q-pa-md">
<pre>{{companies}}</pre>
</q-page>
</template>
<script setup>
import {ref, onMounted } from 'vue'
import { axios } from '../boot/axios'
import usersData from "../assets/nselist.json";
const companies = ref([])
onMounted(()=>{
    /*
    usersData.data.forEach(async(el) => {
        //console.log(el)
        if(el.NSESymbol != null){
            let data = await axios.get('https://stockapi.ipoinbox.com/quote?companyName='+el.NSESymbol).then(r => r.data)
            companies.value.push({sym: el.NSESymbol, name: el.CompanyName, ff: data.data[0].cm_ffm, price: data.data[0].lastPrice})
        }
    })*/

    usersData.data.forEach(el =>{
        if(el.NSESymbol === null){
            companies.value.push(el)
        }
    })
    console.log(companies.value.length)
})

</script>