<template>
  <div class="common-layout">
    <div class="aside">
      <div class="logo" @click="handleLogoClick">
        <span>SX</span>
      </div>
      <ul>
        <li class="add-btn" @click="handleAddClick">
          +
        </li>
        <li v-for="(item, index) in menuList" :key="index" :class="{ active: activeIndex === index }"
          @click="setActive(index)">
          <img class="icon" :src="activeIndex == index ? item.activeIconPath : item.iconPath" alt="">
        </li>
      </ul>
      <div class="logout">
        <img src="@/assets/icon/logout.svg" alt="logout">
      </div>
    </div>

    <div class="console">
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

import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();


const menuList = ref([
  {
    iconPath: homeIcon,
    activeIconPath: activeHomeIcon,
    index: 0,
    url: '/console/home'
  },
  {
    iconPath: todoIcon,
    activeIconPath: activeTodoIcon,
    index: 1,
    url: '/console/todo'
  },
  {
    iconPath: articleIcon,
    activeIconPath: activeArticleIcon,
    index: 2,
    url: '/console/article/list'
  },
  {
    iconPath: fileIcon,
    activeIconPath: activeFileIcon,
    index: 3,
    url: '/console/file'
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
  router.push("/console/article/edit");
  activeIndex.value = 2
}
const handleLogoClick = () => {
  router.push("/console/home");
  activeIndex.value = 0;
}

// Watch for route changes to update activeIndex
watch(route, (newRoute) => {
  const currentPath = newRoute.path;
  const activeItem = menuList.value.find(item => currentPath.startsWith(item.url));
  if (activeItem) {
    activeIndex.value = activeItem.index;
  }
}, { immediate: true });

window.onbeforeunload = (e: any) => {
  if (route.path == "/console/article/editArticle") {
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
    position: relative;

    .logo {
      position: absolute;
      top: 16px;

      span {
        font-size: 20px;
        user-select: none;
      }
    }

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


        &:active{
          transform: scale(0.95);
        }
      }

      .active {
        transform: scale(1.1);
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

    .logout {
      position: absolute;
      bottom: 12px;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }

  .console {
    flex: 1;
  }
}
</style>
