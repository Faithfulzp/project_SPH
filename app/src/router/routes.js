//引入路由插件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
//创建一个路由实例
//配置路由,向外暴露路由数组
export default [
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
