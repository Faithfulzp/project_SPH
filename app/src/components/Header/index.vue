<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userInfo.name }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    //  组件挂载时就监听clear事件，clear事件在search模块中定义
    //  当删除关键字面包屑时，触发该事件，同时header的输入框绑定的keyword要删除
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  methods: {
    goSearch() {
      //  编程式路由导航
      /*为什么要判断query是否存在？(TypeNav那边的判断同理)
       因为有可能先点击了TypeNav发路由请求就存在一个query参数
       然后再在搜索框中输入信息点击搜索的话
       不加判断会导致发送的路由请求只有params参数而原来的query参数被覆盖掉了
       所以判断如果原来有query的话，就把query参数加到路由请求里一起发送，这样既保留了原来的query参数，又有新的params参数 
      */
      if (this.$route.query) {
        //不加这个if判断也可以直接给location添加属性并给路由传参
        let location = {
          //想要额外添加属性必须赋值后再操作
          name: "search",
          params: {
            keyword: this.keyword || undefined, //解决传递空串路由路径出现错误的问题
          },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 退出登录
    async logout() {
      try {
        // 发送退出登录请求，会把服务器里的token等数据删除
        await this.$store.dispatch("user/userLogout");
        // 并以游客身份跳转到主页
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    // 获取用户信息
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>>
</style>