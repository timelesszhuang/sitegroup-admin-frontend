import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {
    routers,
    noderouters,
    nodeappRouter,
    nodeotherRouter,
    adminrouters,
    adminappRouter,
    adminotherRouter
} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    // iview 相关菜单加载时间操作
    iView.LoadingBar.start();
    // 设置页面的title
    Util.title(to.meta.title);
    // 每次页面路由的时候执行
    let userType = Cookies.get('type');
    if (userType === '1') { // 判断当前是否是锁定状态
        // 系统管理员调用部分
        if (!Cookies.get('user_id') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user_id') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title();
            next({
                name: 'admin_index'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([nodeotherRouter, ...nodeappRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (curRouterObj.access === parseInt(Cookies.get('type'))) {
                    Util.toDefaultPage([adminotherRouter, ...adminappRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else {
                // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...adminrouters], to.name, router, next);
            }
        }
    } else if (userType === '2') {
        if (!Cookies.get('user_id') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user_id') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title();
            next({
                name: 'node_index'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([nodeotherRouter, ...nodeappRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (curRouterObj.access === parseInt(Cookies.get('type'))) {
                    Util.toDefaultPage([nodeotherRouter, ...nodeappRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else {
                // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...noderouters], to.name, router, next);
            }
        }
    } else if (userType === '3') {
        // 小节点用户
    } else if (userType === undefined) {
        // 没有相关的cookie 信息
        if (to.name === 'login') {
            // 跳转到login
            Util.toDefaultPage([...router], to.name, router, next);
        } else {
            // 跳转到其他页面
            next({
                name: 'login'
            });
        }
    }
});

router.afterEach((to) => {
    //    打开新的标签页面操作
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
