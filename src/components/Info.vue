<template>
    <q-card flat class="q-mt-md rounded-border bg-orange-1">
      <q-card-section>
      <div class="text-h5">Info</div>
        <div class="wp-style" v-html="content" />
      </q-card-section>
    </q-card>
</template>
<script setup>
import { ref, onMounted  } from 'vue'
import { axios } from '../boot/axios'

const props = defineProps({
    id: Number
  })
const content = ref('')
onMounted(async() => {
    console.log(props.id)
    if(props.id != null){
        let post = await axios.get('https://blog.ipoinbox.com/wp-json/wp/v2/posts/'+props.id).then(r => r.data)
        content.value = post.content.rendered
    }   
})

</script>
<style>
h3{
    position: relative;
    padding: 0;
    margin: 0;
    font-family: "Raleway", sans-serif;
    font-weight: 300;
    font-size: 26px;
    color: #080808;
    -webkit-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
}

.wp-style{
  color: #222; 
  font-family: 'Open Sans', sans-serif; 
  font-size: 15px; font-weight: 400; 
  line-height: 24px; 
  margin: 0 0 14px; 
  text-align:justify;
}

.wp-style h3{
  font-family: 'Josefin Sans', sans-serif;
  font-size: 21px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.5em;
  margin-bottom: 15px;
  position: relative;
  text-transform: uppercase;
}

.wp-style h3:before{
   position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 2px;
  content: "";
  background-color: #c50000;
}

</style>