<template>
  <h4 class="text-h4">Promoters</h4>
  <q-editor v-model="promoters_html" min-height="5rem" />
</template>

<script setup>
  import { ref  } from 'vue' 

  const props = defineProps({
    promoters: String
  })
  const promoters_html = ref(props.promoters)


</script>
