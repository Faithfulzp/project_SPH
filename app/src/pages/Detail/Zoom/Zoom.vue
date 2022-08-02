<template>
  <div class="spec-preview">
    <!-- 小图 -->
    <img :src="skuImage.imgUrl" />
    <!-- 主体容器，添加鼠标事件 -->
    <div class="event" @mousemove="handler" ref="conMouse"></div>
    <!-- 大图 -->
    <div class="big">
      <!-- 需要对图片进行操作 -->
      <img :src="skuImage.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    // 接收props
    skuImage() {
      // 防止报错，数据没回来时其至少要是一个对象
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    this.$bus.$on("getIndex", (index) => {
      this.currentIndex = index;
    });
  },
  methods: {
    // 鼠标移动事件
    handler(event) {
      let conMouse = this.$refs.conMouse; //获取容器
      let big = this.$refs.big; // 获取大图
      let mask = this.$refs.mask; // 获取遮罩层
      let top = event.offsetY - mask.offsetHeight / 2; //遮罩层上边缘离顶部位置：鼠标离容器顶部距离-遮罩层高度/2
      let left = event.offsetX - mask.offsetWidth / 2; //遮罩层左边缘离左部位置：鼠标离容器左边距离-遮罩层宽度/2
      // 约束条件
      // 限制左边：如果遮罩层离左侧距离为0，则恒为0停在左侧
      if (left <= 0) {
        left = 0;
      }
      // 限制右边：如果遮罩层离右侧距离为大于（容器宽度-遮罩层宽度），则为向右移动的最大距离，超过则停在最大距离处
      if (left > conMouse.offsetWidth - mask.offsetWidth) {
        left = conMouse.offsetWidth - mask.offsetWidth;
      }
      // 顶部的上下边缘同理
      if (top <= 0) {
        top = 0;
      }
      if (top > conMouse.offsetHeight - mask.offsetHeight) {
        top = conMouse.offsetHeight - mask.offsetHeight;
      }
      // 修改遮罩层样式
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 大图的显示
      // 显示区域固定，移动的是大图，大图是小图的2倍，相对来说是相反反向移动的
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>