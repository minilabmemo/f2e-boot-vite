<template>
  <main class="container ">

    <h1>vite +vue3+bootstrap 版本練習</h1>
    <hr>
    <h2>bootstrap 練習</h2>
    <div><router-link to="./about"> bootstrap 樣式</router-link></div>
    <div> <router-link to="./bs/row">bootstrap 格線系統</router-link></div>
    <div> <router-link to="./bs/card">bootstrap + flex 卡片 排版</router-link></div>

    <h2>購物車& 路由練習</h2>
    <div><router-link to="./dashboard/products"> dashboard 後臺商品管理</router-link></div>
    <div><router-link to="./user/cart"> user 前台 商品與購物車</router-link></div>
    <h2>pinia 練習</h2>
    <div> <router-link to="./pinia/about/option">go 獲取資料 [option 版本]</router-link></div>
    <div> <router-link to="./pinia/about">go 獲取資料 [composition setup 版本]</router-link></div>
    <div> <router-link to="./pinia/about2">go 獲取資料 [composition script setup 版本]</router-link></div>
    <div> <router-link to="./pinia/cart">user 前台 商品與購物車 [pinia 版本]</router-link></div>
    <h2>排版 Lab</h2>
    <div> <router-link to="./lab/about">關於我</router-link></div>

  </main>
</template>


<script>
export default {

  created() {
    //查看環境變數，本地跟部屬不同
    console.log("NODE_ENV", import.meta.env.NODE_ENV)
    console.log("VITE_API", import.meta.env.VITE_API)
    console.log("BASE_URL", import.meta.env.BASE_URL)
  },
}
</script>