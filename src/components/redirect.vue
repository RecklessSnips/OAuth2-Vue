<template>
  <h1>
    <p>Success!</p>
    <p>Here's your authorization code: {{ authCode }}</p>
    <button v-if="flag" @click="fetchAccessToken(authCode)">
      Get access token
    </button>
    <hr />
    <button v-if="flag1" @click="getProtectedData(accessToken)">
      Real Login
    </button>
    <p>Your access token: {{ accessToken }}</p>
    <hr />
    <h1 v-if="flag3">Response: {{ text }}</h1>
  </h1>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

// 使用 ref 来存储授权码
let authCode = ref("");
let accessToken = ref("");
let text = ref("");
let flag = ref(false);
let flag1 = ref(false);
let flag3 = ref(false);

// onMounted 生命周期钩子中获取 URL 中的授权码
onMounted(() => {
  console.log("Redirect page mounted"); // 调试信息
  // 从回调 URL 中获取授权码
  const urlParams = new URLSearchParams(window.location.search);
  authCode.value = urlParams.get("code") || "";
  flag.value = true;
});

async function fetchAccessToken(authorizationCode: string) {
  const clientId = "client"; // 替换为你的 OAuth 客户端 ID
  const clientSecret = "secret"; // 替换为你的 OAuth 客户端密钥
  const redirectUri = "http://localhost:5173/redirect"; // 替换为你的回调 URL

  const basicAuth = "Basic " + btoa(`${clientId}:${clientSecret}`);

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", authorizationCode);
  params.append("redirect_uri", redirectUri);
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  try {
    const response = await axios.post(
      "http://localhost:8080/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: basicAuth,
        },
      }
    );

    // {
    //     "access_token": "your-access-token-here",
    //     "token_type": "Bearer",
    //     "expires_in": 3600,
    //     "refresh_token": "your-refresh-token-here",
    //     "scope": "openid profile"
    // }
    accessToken.value = response.data.access_token;
    console.log("Access Token:", accessToken.value);
    flag1.value = true;
    // 使用 access_token 来访问受保护的资源
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}

async function getProtectedData(accessToken: string) {
  try {
    console.log(accessToken);
    const response = await axios.get("http://localhost:8081/hello", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 使用 Bearer Token 进行授权
      },
    });
    text.value = response.data;
    flag3.value = true;
    console.log("Protected data:", response.data); // 输出资源服务器返回的数据
  } catch (error) {
    console.error("Error fetching protected data:", error);
  }
}
</script>

<script lang="ts">
export default {
  name: "redirect",
};
</script>
