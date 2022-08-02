<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 如果categoryName存在则显示面包屑，点击×则关闭 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyWord">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>
            </li>
            <!--
              因为props是一个数组，商品的属性可以点击多个进行细选，
              所以要遍历出props里的所有商品属性，放到面包屑上
            -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              <!-- 面包屑只需要显示属性值即可 -->
              {{ attrValue.split(":")[1] }}
              <!--
                删除属性值的面包屑，因为是在一个数组里，
                所以需要判断的是哪一个面包屑的索引值并调用函数删除该索引值对应的面包屑 
              -->
              <i @click="removeAttrInfo(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <!-- 自定义事件接收子传过来的参数 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>
                    综合<span
                      v-show="isOne"
                      :class="['iconfont', isAsc ? 'icon-up' : 'icon-down']"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>
                    价格<span
                      v-show="isTwo"
                      :class="['iconfont', isAsc ? 'icon-up' : 'icon-down']"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ good.hotScore }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 pageNo:当前页数 pageSize:页数展示的数量 total:数据总条数 continues:连续的页数-->
          <Pagination
            :pageNo="searchList.pageNo"
            :pageSize="searchList.pageSize"
            :total="searchList.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        category1Id: "", // 一级分类id
        category2Id: "", // 二级分类id
        category3Id: "", // 三级分类id
        categoryName: "", // 分类名字
        keyword: "", // 关键字
        order: "1:desc", //排序 1：综合，2：价格 ; asc:升序，desc：降序
        pageNo: 1, //分页器页数
        pageSize: 3, // 每页展示数据个数
        props: [], // 售卖参数，商品介绍
        trademark: "", // 品牌
      },
    };
  },
  beforeMount() {
    // this.searchParams.category1Id = this.$route.query.category1Id;//复杂写法，一个个赋值
    // 拷贝 ,后面两个参数会和第一个参数进行比较，并对第一个参数进行赋值
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    //防止
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("search", ["goodsList"]),
    // 这里可以拿到page页数等商品信息
    ...mapState("search", ["searchList"]),
    // 判断点击的是价格还是综合
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 判断是否是升序，true为升序，false为降序
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    // 删除分类名字
    removeCategoryName() {
      // 删除的时候将这些都清除，所以这些给服务器也没用
      // undefined让该参数没值的时候不携带出去，空字符串的话还是会携带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      /*
      1、重新发送请求，请求数据并不会携带undefined的参数减少带宽
      2、因为下面会重新跳转路由， 
      watch监听到数据变化会将清除过的searchParams和路由跳转请求的query和parmas合并后发请求，
      因为只有跳转只带了params，所以删除了面包屑，地址栏的query也会消失，并发送一遍数据请求。 
      3、这里再发一次请求可以，但显得有点多余，因为后面watch里整理好后的searchParams会重新发一次
      */
      // this.getData();
      // 数据回来了但路由地址还没改，还是原来有参数的
      // 重新路由跳转，并且如果有params参数则不会删除，因为删除的只是面包屑的category
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.param,
        });
      }
    },
    // 清除keyword面包屑
    removeKeyWord() {
      this.searchParams.keyword = undefined;
      this.getData();
      // 全局事件总线清除组件Header中的搜索框中的keyword
      this.$bus.$emit("clear");
      // 清除keyword之后判断,判断是否还有query参数并携带原有的query参数发请求
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    // 将自定义事件，子给父传过来的trademark参数给searchParams并发请求
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 清除品牌trademark面包屑
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 获取attrInfo信息
    attrInfo(attr, attrValue) {
      // 整理接收过来的参数：[属性id:属性值:属性名]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 多次点击一个属性值的时候，判断searchParams的props里是否有了该参数，没有才能push进去
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      // 将整理好的searchParams的props发送给服务器，请求数据
      this.getData();
    },
    // 清除平台售卖属性值面包屑
    removeAttrInfo(index) {
      //接收传过来的index，调用splice删除props数组中对应索引值的参数
      this.searchParams.props.splice(index, 1);
      // 删除之后重新发送请求，把新的props传给服务器
      this.getData();
    },
    // 改变排序方法
    changeOrder(flag) {
      // flag是判断点击的是综合（1）还是价格（2）
      // 获取原来的排序方法
      let originFlag = this.searchParams.order.split(":")[0]; // 综合or价格
      let originSort = this.searchParams.order.split(":")[1]; // 升序or降序
      let newOrder = "";
      // 判断点击的是否为当前所在的排序方法，
      if (flag == originFlag) {
        // 如果为当前所在排序，则判断是否为降序，如果是降序再点击一次应该换为升序
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 如果不是就将点击的flag重新赋值给newOrder，默认为降序，并带给searchParams
        newOrder = `${flag}:${"desc"}`;
      }
      // 整理好的排序重新赋值
      this.searchParams.order = newOrder;
      // 发送排序请求
      this.getData();
    },
    // 获取当前页数
    getPageNo(nowPageNo) {
      // 将当前页数发送给后台获取数据
      this.searchParams.pageNo = nowPageNo;
      this.getData();
    },
  },
  watch: {
    $route(newValue, oldValue) {
      // 监听到路由的query和params参数变化了，再次发请求之前先将参数拷贝给searchParams
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发起ajax请求请求search数据
      // 如果先发送了请求再合并会导致，发送过去的searchParams还是上一组数据
      this.getData();
      // 每次请求完毕，把1、2、3级分类id置空，以免下一次点击不同级id时，之前的id没被覆盖掉还存在。
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang='less' scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>