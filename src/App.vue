<script setup lang="ts">
function login() {
  const clientId = "client"; // 替换为你的 OAuth 2.0 客户端 ID
  const redirectUri = encodeURIComponent("http://localhost:5173/redirect"); // 替换为你的回调 URL
  const scope = encodeURIComponent("openid profile email"); // 请求的 scope
  const state = Math.random().toString(36).substring(7); // 随机 state 值防止 CSRF 攻击

  // 构建授权请求 URL
  const authorizeUrl = `http://localhost:8080/oauth2/authorize?response_type=code&client_id=client&redirect_uri=http://localhost:5173/redirect&scope=openid%20profile`;

  // 重定向用户到授权服务器的 /authorize 端点
  window.location.href = authorizeUrl;
}
</script>

<template>
  <button @click="login">LogIn</button>
  <router-view />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
