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
    
</script>
<style>
#objects p { 
  margin-top:2rem;
}
#objects table {
  border-spacing: 1; 
  border-collapse: collapse;
  border-color: rgb(202, 193, 193);
  border-width: 1px;
  border-radius:6px;
  overflow:hidden;
  max-width:800px; 
  width:100%;
  margin:0 10px;
  position:relative;
}
#objects td, #objects th{
  border: 1px solid rgb(202, 193, 193);
  padding: 5px;
  text-align: left;
}


</style>
