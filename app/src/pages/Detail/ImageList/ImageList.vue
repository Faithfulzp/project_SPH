<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img
          :src="slide.imgUrl"
          @click="changeCurrentIndex(index)"
          :class="{ active: currentIndex == index }"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["skuImageList"],
  methods: {
    // 修改响应式数据，把当前图片索引给它
    changeCurrentIndex(index) {
      this.currentIndex = index;
      // 将当前索引值告诉放大镜，让放大镜修改图片
      this.$bus.$emit("getIndex", index);
    },
  },
  watch: {
    // 监听数据
    skuImageList(newValue, oldValue) {
      // 等数据更新完之后，DOM更新结束后调用
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          //ref可以避免直接操作DOM
          // 前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 显示图片个数
          slidesPerView: 3,
          // 每次切换图片个数
          slidePerGroup: 1,
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>