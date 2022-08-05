//引入一级路由插件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
//引入二级路由插件
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder';

//创建一个路由实例
//配置路由,向外暴露路由数组
export default [
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: { showFooter: true },
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                // 进入path时，默认跳到redirect
                path: '/center',
                redirect: '/center/myorder',
            },
        ]
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: PaySuccess,
        meta: { showFooter: true },
        // 路由独享守卫，进入路由前判断
        beforeEnter: (to, from, next) => {
            // 支付成功必须从pay路由才能来
            if (from.path == "/pay") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            // 支付页面必须从trade订单页面来
            if (from.path == "/trade") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            // 订单交易页面必须从shopcart购物车路由来
            if (from.path == "/shopcart") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart,
        meta: { showFooter: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { showFooter: true }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { showFooter: true }
    },
    {
        path: '/home',
        component: Home,
        meta: { showFooter: true }
    },
    {
        name: 'search',
        path: '/search/:keyword',
        // path: '/search',
        component: Search,
        meta: { showFooter: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { showFooter: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { showFooter: false }

    },
    {
        path: '*',
        redirect: '/home'
    },
]
