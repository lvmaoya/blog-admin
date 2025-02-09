<template>
    <!-- message消息提示 -->
    <div
      v-if="showMessage"
      :class="[
        'message-box',
        activeClass,
        showMessage ? 'message-box-active' : '',
      ]"
    >
      <div class="message-body">
        <span class="text">{{ messageText }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  const showMessage = ref(false);
  const activeClass = ref("");
  const time = ref(0);
  const messageText = ref("");

  
  const handlerShow = ({
    type = "success",
    duration = 3000,
    text = "消息提示",
  }) => {
    //展示提示框
    showMessage.value = true;
    //什么类型的提示框
    activeClass.value = type;
    //提示内容
    messageText.value = text;
    //持续时间
    time.value = duration;
    //定时器关闭
    setTimeout(() => {
      showMessage.value = false;
    }, time.value);
  };
  
  //将handlerShow暴露出去
  defineExpose({
    handlerShow,
  });
  </script>
  
  <style lang="scss">
  .message-box {
    position: fixed;
    top: 0;
    z-index: 9;
    min-width: 300px;
    border-radius: 40px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    padding: 8px 12px;
    opacity: 0;
    transition: opacity 0.3s, transform 0.4s, top 0.4s;
    .message-body {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text {
      font-size: 14px;
      font-weight: 500;
    }
  }
  .message-box-active {
    opacity: 1;
    top: 10vh;
  }
  .success {
    background: #52ac25;
    .text {
      color: white
    }
  }
  .warning {
    background: #e6a23c;
    .text {
      color: white
    }
  }
  .error {
    background: #f56c6c;
    .text {
      color: white;
    }
  }
  </style>