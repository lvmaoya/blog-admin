<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
  <div class="container">
    <div id="editor">

    </div>
  </div>
</template>

<script setup lang="ts">
import "quill/dist/quill.core.css";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import "@/assets/css/editor.css"
import { onMounted } from "vue";
onMounted(() => {
  const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
      ]
    }
  });
})

</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  // background-color: white;

  #editor {
    flex: 1;
    overflow: hidden;
    border: none;
  }
}
</style>
<style>
.container {
  .ql-toolbar {
    border: none;
    text-align: center;
  }
}
</style>