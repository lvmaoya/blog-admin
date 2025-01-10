import cache from "@/utils/cache";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      redirect: "/console",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/LoginView.vue"),
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("@/views/detail/DetailArticleView.vue"),
    },
    {
      path: "/console",
      name: "console",
      component: () => import("@/views/console/MainView.vue"),

      children: [
        {
          path: "home",
          name: "home",
          meta: { name: "首页" },

          component: () => import("@/views/console/home/HomeView.vue"),
        },
        {
          path: "todo",
          name: "todo",
          meta: { name: "待办" },

          component: () => import("@/views/console/todo/TodoView.vue"),
        },
        {
          path: "article",
          name: "article",
          children: [
            {
              path: "list",
              name: "articleList",
              meta: { name: "文章列表" },
              component: () => import("@/views/console/article/ArticleList.vue"),
            },
            {
              path: "edit",
              name: "editArticle",
              meta: { name: "文章编辑" },

              component: () =>
                import("@/views/console/article/editArticle/EditArticle.vue"),
            },
            {
              path: "recycle",
              name: "recycle",
              meta: { name: "回收站" },

              component: () =>
                import("@/views/console/article/recycleBin/RecycleBin.vue"),
            },
            {
              path: "temporary",
              name: "temporary",
              meta: { name: "暂存箱" },

              component: () =>
                import(
                  "@/views/console/article/temporaryStorage/TemporaryStrorage.vue"
                ),
            },
            {
              path: "category",
              name: "category",
              meta: { name: "类别管理" },

              component: () => import("@/views/console/category/CategoryView.vue"),
            },
            {
              path: "comment",
              name: "comment",
              meta: { name: "评论审核" },

              component: () => import("@/views/console/comment/CommentView.vue"),
            },
          ]
        },
        {
          path: "file",
          name: "file",
          meta: { name: "文件" },

          component: () => import("@/views/console/file/FileView.vue"),
        },

      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "errorPage",
      component: () => import("@/views/notFound/NotFoundView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  // 如果路径是login，接着登录。
  // 如果不是login，判断是否有token，当是/console 的时候，跳转到/console/home
  if (to.path !== "/login") {
    const token = cache.getCache("token");
    const _token = cache.getCache("_token");
    if (!_token && !token) {
      next({
        path: "/login",
      });
      // 游客登录
    } else {
      if (to.path === "/console" || to.path === "/console/") {
        next({
          name: "home",
        });
      } else {
        next();
      }
      // {
      //   path: "/login",
      //   query: { redirect: to.fullPath },
      // }
    }
  } else {
    next();
  }
});
export default router;
