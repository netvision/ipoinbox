<template>
    <q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
      <div class="text-h5">Objects of the Issue</div>
        <div v-html="content" />
      </q-card-section>
    </q-card>
</template>
<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        content: String
    })
    const content = ref(props.content)
</script>
