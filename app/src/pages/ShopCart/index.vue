<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @click="updataCheckCartById(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 节流
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      this.$store.dispatch("shopCart/getShopCarList");
    },
    // 改变商品数量,节流
    handler: throttle(async function (type, disNum, cart) {
      // type:操作类型，minus减1，add加1，change用户输入
      // disNum：与原有数据的差值
      // cart：判断点击的是那个商品
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          // 原来的数据>1才可减1，否则传0表示没变化
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 判断是否是非法字符，和输入的是否是负数
          if (isNaN(disNum) || disNum < 1) {
            // 是则传0，无变化
            disNum = 0;
          } else {
            // 输入的数正的小数，需要取整在算差值，如果输入的比原来的小，得出来的disNum为负数绝对值也不可能比原来的数大
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      try {
        // 派发actions，提交数据修改后台数据
        await this.$store.dispatch("detail/addOrUpdateCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 修改成功后，重新获取购物车的数据进行展示
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 500),
    // 删除商品
    async deleteCart(cart) {
      // 等待删除成功
      await this.$store.dispatch("shopCart/deleteCart", cart.skuId);
      // 再重新发送请求拿数据
      this.getData();
    },
    // 修改一个商品是否选中
    async updataCheckCartById(cart, event) {
      // 获取复选框是否选中，如果是则传1否则传0。1：选中，0：没选
      let isChecked = event.target.checked ? "1" : "0";
      try {
        // 将商品id和选中状态发送给服务器过去
        await this.$store.dispatch("shopCart/checkCartById", {
          skuId: cart.skuId,
          isChecked: isChecked,
        });
        // 重新获取更新后的数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除全部选中商品
    async deleteAllCheckedCart() {
      try {
        // 等待数据删除成功
        await this.$store.dispatch("shopCart/deleteAllCheckedCart");
        // 重新获取更新后的数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 全选框,全选与取消全选
    async updateAllCartChecked(event) {
      // 判断是否勾选
      let isChecked = event.target.checked ? "1" : "0";
      try {
        // 发请求将全部框进行勾选
        await this.$store.dispatch("shopCart/checkAllCart", isChecked);
        // 重新获取更新后的数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters("shopCart", ["shopCart"]),
    // 再次简化购物车数据
    cartInfoList() {
      return this.shopCart.cartInfoList || [];
    },
    // 计算出所有商品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.cartPrice * item.skuNum;
      });
      return sum;
    },
    // 判断全选按钮是否勾上【全部商品的ischecked==1则勾上】
    isAllChecked() {
      return this.cartInfoList.every((item) => {
        // every是遍历数组里面全部元素是否满足条件
        // 只要有一个不满足条件则返回false，否则返回true
        return item.isChecked == 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>