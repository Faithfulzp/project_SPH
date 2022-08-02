<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="nowPageNo(pageNo - 1)">
      上一页
    </button>

    <!-- 上 -->
    <!-- 根据起始页判断，这两个button是否显示 -->
    <button v-if="startNumAndEndNum.start > 1" @click="nowPageNo(1)">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中 -->
    <!-- 遍历1到end的所有数字，再根据start判断哪些显示 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="nowPageNo(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <!-- 根据结束页end判断，最后这两个button是否显示 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="nowPageNo(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="nowPageNo(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 连续页数的起始值和结束值
    startNumAndEndNum() {
      let start = 0;
      let end = 0;
      const { totalPage, continues, pageNo } = this; // this里解构出来
      // 不正常现象【连续页数 > 总页数】
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象【连续页数 < 总页数】
        // 如果不大于的话，start就是当前页数 - (连续页数/2) 向下取整，end则是+
        // 因为连续页数肯定在中间，连续页数起始和结束就是通过当前页数+-得来
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 不正常现象【如果当前页数较小，起始页出现负数或者0】
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 不正常现象【如果当前页数较大，结束页大过总页数】
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
  methods: {
    // 获取当前页数，触发自定义事件传值给search父组件
    nowPageNo(nowPage) {
      this.$emit("getPageNo", nowPage);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>