<template>
  <div>
      <q-editor 
      v-model="post.body" 
      :definitions="definitions" 
      ref="editor"
      :toolbar= "[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen', 'insert_img'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }" />
  </div>
  <a class="btn" @click="toggleShow">set avatar</a>
	<my-upload field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
		:width="300"
		:height="300"
    :langExt = "lang"
		url="/upload"
		:params="params"
		:headers="headers"
		img-format="png"></my-upload>
	<img :src="imgDataUrl">
</template>

<script>
import { defineComponent } from 'vue'
import 'babel-polyfill'; // es6 shim
import myUpload from 'vue-image-crop-upload';
export default defineComponent({
  name: 'Editor',
  components: {
			'my-upload': myUpload
		},
  data() {
    return {
        definitions: {
                insert_img: {
                    tip: 'Insertar Imagen',
                    icon: 'photo',
                    handler: this.insertImg // handler will call insertImg() method
                }
            },
        lang: {
            hint: 'Click or drag the file here to upload',
            loading: 'Uploading…',
            noSupported: 'Browser is not supported, please use IE10+ or other browsers',
            success: 'Upload success',
            fail: 'Upload failed',
            preview: 'Preview',
            btn: {
              off: 'Cancel',
              close: 'Close',
              back: 'Back',
              save: 'Save'
            },
            error: {
              onlyImg: 'Image only',
              outOfSize: 'Image exceeds size limit: ',
              lowestPx: 'Image\'s size is too low. Expected at least: '
            }
        },
        post: {
            body: "Hello World"
            },
        show: true,
			  params: {
				  token: '123456798',
				  name: 'avatar'
			  },
			  headers: {
				  smail: '*_~'
			  },
			  imgDataUrl: '' // the datebase64 url of created image
      }
        
    },
    methods: {
        insertImg() { // insertImg method
            const post = this.post
            const edit = this.$refs.editor
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
                   
                    // append result to the body of your post
                    edit.runCmd('insertHTML','<div><img src="' + dataUrl + '" /></div>', true) 
                }
                reader.readAsDataURL(file)
            }
            input.click()
        },
        toggleShow() {
				this.show = !this.show;
			},
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
			},
			/**
			 * upload success
			 *
			 * [param] jsonData  server api return data, already json encode
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			}
    }
})
</script>