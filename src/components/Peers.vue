<template>
    <q-card flat class="q-mt-md rounded-border bg-orange-1">
    <q-card-section>
      <div class="text-h5">Peers Comparision</div>
    </q-card-section>
    <q-card-section v-if="peers.row.length > 0">
        <q-table wrap-cells
            :rows="peers.row"
            :columns="peers.col"
            row-key="name"
            hide-bottom
            />
    </q-card-section>
    <q-card-section v-if="peers.htmlNotes" v-html="peers.htmlNotes">
    </q-card-section>
      
    </q-card>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
    content: String
  })
const peers = ref(JSON.parse(props.content))
console.log(props)
</script>
<style>

</style>