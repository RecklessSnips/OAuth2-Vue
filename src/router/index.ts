// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Redirect from "@/components/redirect.vue";

// 定义路由，每个路由都需要映射到一个组件
const routes = [
  {
    path: "/redirect", // 路由路径
    name: "redirect", // 路由名称
    component: Redirect, // 组件
  },
];

// 创建路由实例并传入 `routes` 配置
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
