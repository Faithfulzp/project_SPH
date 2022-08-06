//引入一级路由插件
/* 
    路由懒加载：
        当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
        如果我们能把不同路由对应的组件分割成不同的代码块，
        然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/
// 方法一：箭头函数赋值
const Home = () => import('@/pages/Home');
const Login = () => import('@/pages/Login');
const Register = () => import('@/pages/Register');
const Search = () => import('@/pages/Search');
const Detail = () => import('@/pages/Detail');
const AddCartSuccess = () => import('@/pages/AddCartSuccess');
const ShopCart = () => import('@/pages/ShopCart');
const Trade = () => import('@/pages/Trade');
const Pay = () => import('@/pages/Pay');
const PaySuccess = () => import('@/pages/PaySuccess');
const Center = () => import('@/pages/Center');
// 方法二：直接在路由里，在组件component里引入,但是可能导致路由路径消失

//引入二级路由插件
const MyOrder = () => import('@/pages/Center/MyOrder');
const GroupOrder = () => import('@/pages/Center/GroupOrder');
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
