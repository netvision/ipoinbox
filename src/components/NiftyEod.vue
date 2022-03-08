<template>
    <div class="q-pa-md bg-orange-1">
        <VueMultiselect class="q-mb-md"
            v-model="selected"
            label="CompanyName"
            track-by="CompanyName"
            :options="scripts"
            @select="getScrip">
        </VueMultiselect>
        <q-space />
        <q-card class="my-card">
            <q-card-section>
                <div class="text-h6">{{selected.CompanyName}}</div>
            </q-card-section>
            <q-list bordered separator>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label overline>NSE Symbol</q-item-label>
                        <q-item-label>{{selected.NSESymbol}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>isin</q-item-label>
                        <q-item-label>{{selected.isin}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>CIN</q-item-label>
                        <q-item-label>{{selected.CIN}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label overline>Sector</q-item-label>
                        <q-item-label>{{selected.SectorName}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>Type</q-item-label>
                        <q-item-label>{{selected.mcaptype}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>Market Cap</q-item-label>
                        <q-item-label>{{selected.MCAP}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-card-section>
                <div class="text-h6">EOD as on {{dateFormat(dt)}}</div>
            </q-card-section>
            <q-list bordered separator v-if="selEod[0]">
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label overline>Open</q-item-label>
                        <q-item-label>{{selEod[0].Open}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>High</q-item-label>
                        <q-item-label>{{selEod[0].High}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>Low</q-item-label>
                        <q-item-label>{{selEod[0].Low}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>Close</q-item-label>
                        <q-item-label>{{selEod[0].Close}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label overline>Volume</q-item-label>
                        <q-item-label>{{selEod[0].Volume}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>Total Value</q-item-label>
                        <q-item-label>{{selEod[0].Value}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>Life Time High</q-item-label>
                        <q-item-label>{{selEod[0].LifeTimeHigh}}</q-item-label>
                        <q-item-label caption>{{dateFormat(selEod[0].highdate)}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label overline>Life Time Low</q-item-label>
                        <q-item-label>{{selEod[0].LifeTimeLow}}</q-item-label>
                        <q-item-label caption>{{dateFormat(selEod[0].lowdate)}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-list bordered separator v-else>
                <q-item>
                    <q-item-label>Not Listed on NSE</q-item-label>
                </q-item>
            </q-list>
        </q-card>
        
    </div>
</template>
<script setup>
import VueMultiselect from 'vue-multiselect'
import moment from 'moment'
import { ref, onMounted } from 'vue'
import { axios } from '../boot/axios'
const tab = ref('one')
const scripts = ref([])
const dt = ref('');
const eod = ref([])
const selEod = ref([])
const selected = ref({})
const dateFormat = (val) => {
    return moment(val).format("DD-MM-YYYY")
}

const getScrip = (selectedOption, id) => {
    selEod.value = eod.value.filter(scrip => scrip.co_code === selectedOption.co_code)
}
onMounted(async() => {
    let scrips = await axios.get('https://droplet.netserve.in/nse/index').then(r => r.data)
    let niftyEod = await axios.get('https://droplet.netserve.in/nse/eod').then(r => r.data)
    scripts.value = JSON.parse(scrips).data
    selected.value = scripts.value[0]
    eod.value = JSON.parse(niftyEod).data
    selEod.value = [eod.value[0]]
    dt.value = eod.value[0].date
})

</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>