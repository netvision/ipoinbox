/* eslint-disable vue/valid-template-root */
<template>
<q-card flat class="q-mt-md rounded-border bg-orange-1">
    <q-card-section>
        <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">Promoters</div>
    </q-card-section>
    <q-card-section class="q-pa-md">
        <div class="row">
            <div class="col-12 col-md-4" v-for="promoter in promoters" :key="promoter.id">
                <q-card flat class="q-ma-md">
                    <q-card-section v-if="!promoter.photo.includes('placeholder')">
                        <q-avatar square size="100px">
                            <img :src="promoter.photo" />
                        </q-avatar>
                    </q-card-section>
                    <q-card-section class="q-pt-xs">
                        <div class="text-overline">{{promoter.type}}</div>
                        <div class="text-h5 q-mt-sm q-mb-xs">{{promoter.name}}</div>
                        <div class="text-caption text-grey" v-html="promoter.description"></div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="text-h6" style="font-family: 'Josefin Sans', sans-serif;">Promoters Shareholding Pattern</div>
        <div class="">
            <table class="tw-table-fixed tw-w-full tw-border">
                <thead class="tw-bg-gray-200">
                <tr class="tw-border tw-border-gray-400">
                    <th rowspan="2" class="tw-border tw-border-gray-400">Name</th>
                    <th colspan="2" class="tw-border tw-border-gray-400 tw-text-center">Pre Offer</th>
                    <th colspan="2" class="tw-border tw-border-gray-400 tw-text-center">Post Offer</th>
                </tr>
                <tr class="tw-border tw-border-gray-400">
                    <th class="tw-border tw-border-gray-400">Eq. Shares</th>
                    <th class="tw-border tw-border-gray-400">Percent</th>
                    <th class="tw-border tw-border-gray-400">Eq. Shares</th>
                    <th class="tw-border tw-border-gray-400">Percent</th>
                </tr>
                </thead>
                <tbody class="">
                    <tr v-for="holding in holdings" :key="holding.name" class="tw-border tw-border-gray-400">
                        <td class="tw-px-4 tw-py-2 tw-text-gray-900 tw-border tw-border-gray-400">{{holding.name}}</td>
                        <td class="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-border-gray-400">{{holding.preOffer}}</td>
                        <td class="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-border-gray-400">{{holding.prePercent}}</td>
                        <td class="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-border-gray-400">{{holding.postOffer}}</td>
                        <td class="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-border-gray-400">{{holding.postPercent}}</td>
                    </tr>
                </tbody>
            </table>
        
        </div>
        
    </q-card-section>
</q-card>
</template>
<script setup>
import { ref } from 'vue'
//import { axios } from '../boot/axios'
const props = defineProps({
    data: Object
  })
const promoters = ref([])
const holdings = ref([])
if(props.data.length > 0){
    props.data.forEach(promoter => {
        holdings.value.push({name: promoter.name, preOffer: promoter.pre_offer_shares, prePercent: promoter.pre_offer_percentage, postOffer: promoter.post_offer_shares, postPercent: promoter.post_offer_percentage})
        promoters.value.push({name: promoter.name, type: promoter.type, photo: promoter.photo, description: promoter.description})
    })
}

</script>
<style>
ul {
    list-style: disc inside;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>