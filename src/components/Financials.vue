<template>
    <q-card flat class="q-mt-md rounded-border bg-orange-1">
    <q-card-section>
      <div class="text-h5">Company Financials</div>
    </q-card-section>
    <q-card-section>
        <q-table wrap-cells
            title="Profit and Loss Statement"
            :rows="financials.pl.rows"
            :columns="financials.pl.columns"
            row-key="name"
            hide-bottom
            />
      </q-card-section>
      <q-card-section>
        <q-table wrap-cells virtual-scroll
            title="Balance Sheet"
            :rows="financials.bs.rows"
            :columns="financials.bs.columns"
            row-key="name"
            hide-bottom
            >
        </q-table>
      </q-card-section>
    </q-card>
</template>
<script setup>
import { defineProps, ref, onMounted  } from 'vue'
import { axios } from '../boot/axios'

const props = defineProps({
    content: String
  })
const financials = ref(JSON.parse(props.content))

</script>
<style>

</style>