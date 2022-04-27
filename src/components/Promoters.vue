/* eslint-disable vue/valid-template-root */
<template>
<q-card flat class="q-mt-md rounded-border bg-orange-1">
<q-card-section><div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">Promoters</div></q-card-section>
    <q-card-section class="q-pa-md q-gutter-md">
        <q-card v-for="promoter in promoters" :key="promoter.id" flat>
            <q-card-section horizontal>
                <q-card-section class="col-5 flex items-start">
                <q-img
                    class="rounded-borders"
                    :src="promoter.photo"
                />
                <div class="q-pa-md">
                    <p class="text-subtitle1">Pre-offer Shareholding</p>
                    <p class="text-overline">{{promoter.pre_offer_shares}} ({{promoter.pre_offer_percentage}}%)</p>
                    <q-separator spaced />
                    <p class="text-subtitle1">Post-offer Shareholding</p>
                    <p class="text-overline">{{promoter.post_offer_shares}} ({{promoter.post_offer_percentage}}%)</p>
                </div>
                </q-card-section>
                <q-card-section class="q-pt-xs">
                <div class="text-overline">{{promoter.type}}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{promoter.name}}</div>
                <div class="text-caption text-grey" v-html="promoter.description"></div>
                </q-card-section>
            </q-card-section>
        </q-card>
    </q-card-section>
</q-card>
</template>
<script setup>
import { ref, onMounted  } from 'vue'
import { axios } from '../boot/axios'
const props = defineProps({
    data: Object
  })
const promoters = ref(props.data)
onMounted(async() => {
    //promoters.value = await axios.get('https://droplet.netserve.in/promoters?ipo_id='+props.ipo_id).then(r => r.data)
    console.log(props.data)
})
</script>