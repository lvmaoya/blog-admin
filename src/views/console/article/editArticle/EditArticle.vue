<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
  <div class="container">
    <div class="middle">
      <div id="toolbar">
        <select class="ql-size">
          <option value="large"></option>
          <option value="normal" selected></option>
          <option value="small"></option>
        </select>
        <select class="ql-header">
          <option value="1">一级标题</option>
          <option value="2">二级标题</option>
          <option value="3">三级标题</option>
          <option value="4">四级标题</option>
          <option value="5">五级标题</option>
          <option value="0" selected>Normal</option>
        </select>
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-align" value="left"></button>
        <button class="ql-align" value="center"></button>
        <button class="ql-align" value="right"></button>
        <button class="ql-align" value="justify"></button>
        <select class="ql-color"></select>
        <select class="ql-background"></select>
        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="ql-clean"></button>
        <button class="ql-custom" @click="handleAIClick">AI</button>
      </div>
      <div class="title-input">
        <input type="text" placeholder="请输入文章标题">
      </div>
      <div id="editor">
      </div>
    </div>
    <div class="right" v-show="isAiIframeShow">
      <input type="text">
      <div class="frame">
        <iframe style="width: 100%; height: 100%;" :src="aiIframeSrc[currentAiFrameIndex]"></iframe>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import "quill/dist/quill.core.css";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import "@/assets/css/editor.css"
import { onMounted, ref } from "vue";
const aiIframeSrc = ref(["https://www.doubao.com/chat/807464071024642", "https://yiyan.baidu.com/"]);
const isAiIframeShow = ref(false)
const currentAiFrameIndex = ref(0)
onMounted(() => {
  const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: "输入 / 以选择输入类型",
    modules: {
      toolbar: '#toolbar'
    }
  });
})

const handleAIClick = () => {
  isAiIframeShow.value = !isAiIframeShow.value
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  font-family: "oppo-sans";

  .middle {
    #editor {
      flex: 1;
      overflow: hidden;
      border: none;
      width: 100%;
      max-width: 900px;
    }

    .title-input {
      padding: 0 15px;
      width: 100%;
      max-width: 900px;
      height: 50px;

      input {
        height: 100%;
        border: none;
        font-size: 20px;
        width: 100%;
        border-bottom: 1px solid #f2f2f2;

        &::placeholder {
          color: #999;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    // padding: 20px;
    background-color: #999;
    border-left: 1px solid #999;
    width: 50%;
    margin: 20px;
    border-radius: 20px;

    .frame {
      width: 100%;
      height: 100%;
      overflow: hidden;

      iframe {
        border: none;
      }
    }
  }
}
</style>
<style>
.container {
  .ql-container {
    font-size: 16px;
  }

  .ql-toolbar {
    border: none;
    text-align: center;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }

  .ql-editor.ql-blank::before {
    font-style: normal;
    color: #999;
  }

  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border: none;
  }

  .ql-snow .ql-picker.ql-expanded .ql-picker-label {
    color: #444;
  }

  .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
    fill: #444;
  }

  .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: #444;
  }

  .ql-snow .ql-transparent {
    opacity: 1;
  }

  .ql-toolbar.ql-snow .ql-picker-options {
    border: 0px solid transparent;
    box-shadow: none;
    border-radius: 8px;
  }
}
</style>