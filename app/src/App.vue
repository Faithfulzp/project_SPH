<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通过Vuex向服务器发送请求获取数据存储到仓库中
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style>
</style>
