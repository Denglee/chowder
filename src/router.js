import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import staticRoute from '@/router/staticRoute'

import Login from '@/assets/js/login'

import whiteList from '@/router/whiteList'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'


var permissionList = []

function initRoute(router) {
    return new Promise((resolve) => {
        console.log(resolve);
        if (permissionList.length == 0) {
            console.log("没有权限数据，正在获取")
            store.dispatch('StoreTagNav/getNavList').then((res) => {
                console.log(res);
                permissionList = res;
                // 将菜单列表扁平化形成权限列表
                store.dispatch('StoreTagNav/getPermissionList').then((res) => {
                    console.log("权限列表生成完毕");
                    console.log(res);
                    permissionList = res;
                    res.forEach(function (v) {
                        let routeItem = router.match(v.path)
                        if (routeItem) {
                            routeItem.meta.permission = v.permission ? v.permission : []
                            routeItem.meta.name = v.name
                        }
                    })
                    resolve(res)
                })
            })
        } else {
            console.log("已有权限数据")
            resolve()
        }
    })
}


NProgress.configure({ showSpinner: false });

Vue.use(Router)

const router = new Router({
    mode: 'hash', //history
    routes: staticRoute
})



// 路由跳转前验证
router.beforeEach((to, from, next) => {
    console.log(permissionList);
    // 开启进度条
    NProgress.start();

    next();

    // console.log(Auth.login);
    // 判断用户是否处于登录状态
    // debugger
    /*if (Login.isLogin()) {
        // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
        // 这种情况出现在手动修改地址栏地址时
        if (to.path === '/login') {
            next({path: "/home", replace: true})
        } else if (to.path.indexOf("/error") >= 0) {
            // 防止因重定向到error页面造成beforeEach死循环
            next()
        } else {
            initRoute(router).then(() => {
                let isPermission = false
                console.log("进入权限判断")
                permissionList.forEach((v) => {
                    // 判断跳转的页面是否在权限列表中
                    if (v.path == to.fullPath) {
                        isPermission = true
                    }
                });
            })

            // 没有权限时跳转到401页面
            if (!isPermission) {
                next({path: "/error/401", replace: true})
            } else {
                next()
            }
        }
    }
    else {
        // 如果是免登陆的页面则直接进入，否则跳转到登录页面
        if (whiteList.indexOf(to.path) >= 0) {

            console.log('该页面无需登录即可访问')
            next();
        } else {
            console.warn('当前未处于登录状态，请登录')
            next({path: "/login", replace: true})
            // 如果store中有token，同时Cookie中没有登录状态
            if (store.state.user.token) {
                Message({
                    message: '登录超时，请重新登录'
                })
            }

            console.log('该页面无需登录即可访问');
            next()
        }
        /!*else{
            console.warn('当前未处于登录状态，请登录');
            next({path: "/login", replace: true})
            // 如果store中有token，同时Cookie中没有登录状态
            // if(stor){
            //   Message({
            //     message: '登录超时，请重新登录';
            //   })
            // }

            // NProgress.done()
        }*!/
    }*/
})




router.afterEach((to, from) => {

    NProgress.done(); // 结束Progress
})

export default router



/*export default new Router({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes: staticRoute
  /!*routes: [
    {
      path: '/',
      // name: 'home',
      redirect:'/index'   //重定向
    },
    {
      path: '/index',
      name: 'index',

      // vue异步组件实现路由懒加载
      // component：resolve=>(['需要加载的路由的地址'，resolve])
      component: () => import('@/views/index/index'),
    },

    // reception: 前台
    {
      path: "/reception/register",
      name: 'register',
      component: () => import('@/views/reception/register'),
    },
    {
      path: "/reception/query",
      name: 'query',
      component: () => import('@/views/reception/query'),
    },

    //contract 合同
    {
      path: '/home',
      name: 'home',
      component: firstItem
    },

    {
      path: '/firstItem',
      name: 'firstItem',
      component: firstItem
    },
    {
      path: '/secondMain',
      name: 'secondMain',
      component: secondMain
    },
    {
      path: '/thirdIndex',
      name: 'thirdIndex',
      component: thirdIndex
    }

    // {
    // path: '/about',
    // name: 'about',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
    // }
  ]*!/
})*/

