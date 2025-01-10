<template>
  <div class="common-layout">
    <div class="aside">
      <ul>
        <li class="add-btn" @click="handleAddClick">
          +
        </li>
        <li v-for="(item, index) in menuList" :key="index" :class="{ active: activeIndex === index }"
          @click="setActive(index)">
          <img class="icon" :src="activeIndex == index ? item.activeIconPath : item.iconPath" alt="">
        </li>
      </ul>
    </div>

    <div class="main">
      <router-view v-slot="{ Component }">
        <KeepAlive exclude="EditArticle">
          <Component :is="Component" :key="route.name"></Component>
        </KeepAlive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import homeIcon from "@/assets/icon/tab/home.svg";
import todoIcon from "@/assets/icon/tab/todo.svg";
import articleIcon from "@/assets/icon/tab/article.svg";
import fileIcon from "@/assets/icon/tab/file.svg";
import activeHomeIcon from "@/assets/icon/tab-active/home.svg";
import activeTodoIcon from "@/assets/icon/tab-active/todo.svg";
import activeArticleIcon from "@/assets/icon/tab-active/article.svg";
import activeFileIcon from "@/assets/icon/tab-active/file.svg";

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();


const menuList = ref([
  {
    iconPath: homeIcon,
    activeIconPath: activeHomeIcon,
    index: 0,
    url: '/main/home'
  },
  {
    iconPath: todoIcon,
    activeIconPath: activeTodoIcon,
    index: 1,
    url: '/main/todo'
  },
  {
    iconPath: articleIcon,
    activeIconPath: activeArticleIcon,
    index: 2,
    url: '/main/article/list'
  },
  {
    iconPath: fileIcon,
    activeIconPath: activeFileIcon,
    index: 3,
    url: '/main/file'
  },
])
let activeIndex = ref(0)
const setActive = (index: number) => {
  if (activeIndex.value != index) {
    activeIndex.value = index
    router.push(menuList.value[index].url);
  }
}
const handleAddClick = () => {
  router.push("/main/article/edit");
  activeIndex.value = 2
}

window.onbeforeunload = (e: any) => {
  if (route.path == "/main/article/editArticle") {
    e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
      e.returnValue = "关闭提示";
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return "关闭提示";
  } else {
    window.onbeforeunload = null;
  }
};

</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100%;
  display: flex;

  .aside {
    width: 70px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    ul {
      width: 100%;
      position: relative;

      li {
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        user-select: none;
        cursor: pointer;
        transition: all 0.3s;

        &:not(.add-btn):hover {
          // transform: scale(1.4);
        }
      }

      .active {
        transform: scale(1.4);
      }


      .add-btn {
        box-shadow: 0 6px 16px rgba(130, 203, 235, 0.5);
        background-color: #68d0fd;
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: white;
        border-radius: 50%;
        font-size: 30px;
        font-weight: 300;
        position: absolute;
        top: -100px;
        left: 0;
        right: 0;
        margin: 0 auto;
      }

      .icon {
        width: 18px;
        height: 18px;
      }
    }
  }

  .main {
    flex: 1;
  }
}
</style>
