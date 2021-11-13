<template>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="left"
    narrow-indicator
  >
    <q-tab name="info" label="Company Info" />
    <q-tab name="promoters" label="Promoters" />
    <q-tab name="objects" label="Objects of the Issue" />
  </q-tabs>
  <q-separator />

  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="info">
      <div class="text-h6">Company Info</div>
      <q-editor
        v-model="html"
        min-height="5rem"
        :definitions="definitions"
        :toolbar="[
            ['bold', 'italic', 'strike', 'underline'],
            ['insert_img']
          ]" />
    </q-tab-panel>

    <q-tab-panel name="promoters">
      <div class="text-h6">Promoters</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="objects">
      <div class="text-h6">Objects of the Issue</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>
   
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
        definitions: {
                insert_img: {
                    tip: 'Insertar Imagen',
                    icon: 'photo',
                    handler: this.insertImg // handler will call insertImg() method
                }
            }
        }
    },
    methods: {
        insertImg() { // insertImg method
            const post = ref(this.html)
            // create an input file element to open file dialog
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.png, .jpg' // file extensions allowed
            let file
            input.onchange = _ => {
                const files = Array.from(input.files)
                file = files[0]
  
               // lets load the file as dataUrl
                const reader = new FileReader()
                let dataUrl = ''
                reader.onloadend = function() {
                    dataUrl = reader.result
                   
                    post.value = '<div><img src="' + dataUrl + '" /></div>'
                }
                reader.readAsDataURL(file)
            }
            input.click()
        }
    }
})
</script>

<script setup>
import { ref  } from 'vue' 
  const tab = ref('info')
  const props = defineProps({
    about_html: String
  })
  const html = ref({})
  const init = async () => {
    html.value = props.about_html
  }
  
  init()
</script>
