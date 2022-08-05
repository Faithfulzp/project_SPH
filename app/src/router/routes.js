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
        meta: { showFooter: true }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: { showFooter: true }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: { showFooter: true }
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
