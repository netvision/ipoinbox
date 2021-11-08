<template>
  <q-page class="q-pa-md">
    <h2>{{ipo.company_name}}</h2>
    <q-stepper v-model="step" header-nav ref="stepper" color="secondary" animated>
      <q-step :name="1" title="overview" :done="done1">
        <ipoOverview :ipo="ipo_id" />
      </q-step>
      <q-step :name="2" title="About Company" :done="done2">
        <IpoAboutCompany :about_html = "ipo.about_company_html" />
      </q-step>
      <q-step :name="3" title="Promoters" :done="done3">
        <IpoPromoters :promoters="ipo.about_promoters_html" />
      </q-step>
      <q-step :name="4" title="Promoters" :done="done4">
        <Editor />
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { api } from '../boot/axios'
  import IpoOverview from '../components/IpoOverview.vue'
  import IpoAboutCompany from '../components/IpoAboutCompany.vue'
  import IpoPromoters from '../components/IpoPromoters.vue'
  import Editor from '../components/Editor.vue'
  const route = useRoute()
  const ipo_id = route.params.id
  const ipo = ref({})
  const step = ref(null)
  const done1 = ref(false)
  const done2 = ref(false)
  const done3 = ref(false)
  const done4 = ref(false)
  onMounted(async() => {
    ipo.value = await api.get('/ipo/id/'+ipo_id).then(r => r.data.data)
  })
</script>
