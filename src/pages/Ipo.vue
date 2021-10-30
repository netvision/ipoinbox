<template>
  <q-page padding>
    <h2>Hello {{ $route.params.id }}</h2>
  </q-page>
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router'
  const route = useRoute()
  console.log(route.params.id)
</script>
