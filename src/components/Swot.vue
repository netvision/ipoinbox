<template>
    <q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
      <div class="text-h5 q-ma-md">SWOT Analysis</div>
        <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-3 q-pa-md tw-h-full">
                    <h6 class="text-h6">Strengths <span v-if="JSON.parse(data).strengths_score">({{JSON.parse(data).strengths_score}})</span></h6>
                    <div v-html="sanitize(JSON.parse(data).strengths_html)" />  
            </div>
            <div class="col-12 col-md-3 q-pa-md tw-h-full">
                <h6 class="text-h6">Weaknesses <span v-if="JSON.parse(data).weaknesses_score">({{JSON.parse(data).weaknesses_score}})</span></h6>
                <div v-html="sanitize(JSON.parse(data).weaknesses_html)" />
            </div>
            <div class="col-12 col-md-3 q-pa-md tw-h-full">
                <h6 class="text-h6">Opportunities <span v-if="JSON.parse(data).opportunities_score">({{JSON.parse(data).opportunities_score}})</span></h6>
                <div v-html="sanitize(JSON.parse(data).opportunities_html)" />
            </div>
            <div class="col-12 col-md-3 q-pa-md tw-h-full">
                <h6 class="text-h6">Threats <span v-if="JSON.parse(data).threats_score">({{JSON.parse(data).threats_score}})</span></h6>
                <div v-html="sanitize(JSON.parse(data).threats_html)" />
            </div>
            
        </div>
      </q-card-section>
    </q-card>
</template>
<script setup>


const props = defineProps({
    data: String
  })

const sanitize = (html) => html.replace(/>\s+</g,'><')

</script>
<style>
#swot ul{
    list-style-position: outside;
    margin-left: 5px;
}
</style>