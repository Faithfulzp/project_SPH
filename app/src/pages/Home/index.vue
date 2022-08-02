<template>
  <div>
    <!-- 三级联动组件为全局组件，不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- 通过for遍历数据，创建多个Floor标签，数据的id为每一个楼层 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //请求floor数据，如果放在floor中，多个楼层会多次请求数据
    this.$store.dispatch("home/getFloorList");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style scoped>
</style>