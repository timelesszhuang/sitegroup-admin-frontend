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
    adminotherRouter,
    siterouters,
    siteappRouter,
    siteotherRouter
} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    let locking = Cookies.get('locking');
    //console.log(to.name);
    //console.log(locking);
    //console.log(typeof locking);
    if(Cookies.get('user_id')&&to.name!=='login'&&to.name!=='locking'&&locking&&locking==='1'){
        next({
            name: 'locking'
        });
        return;
    }
    if (to.name === 'error-404' || to.name === 'error-403' || to.name === 'error-500') {
        next();
        return;
    }
    // 需要处理下自动登陆的情况
    // iview 相关菜单加载时间操作
    iView.LoadingBar.start();
    // 设置页面的title
    Util.title(to.meta.title);
    // 每次页面路由的时候执行
    let userType = Cookies.get('type');
    //console.log(userType);
    if (userType === '1') { // 判断当前是否是锁定状态
        // 系统管理员调用部分 不能跳转倒其他管理员的部分
        if ((to.path === '/node' || to.path === '/' || to.path === '' || to.path === '/site')&&(to.path !== '/site'&&to.path !== '/node'&&to.path !== '/admin')) {
            next({
                name: 'admin_index'
            });
        }
        if (!Cookies.get('user_id') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user_id') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title();
            if(locking!=='1'){
                next({
                    name: 'admin_index'
                });
            }else{
                next();
            }
        } else {
            const curRouterObj = Util.getRouterObjByName([...adminrouters], to.name);
            if (!curRouterObj) {
                //console.log("111");
                next({
                    name: 'error-404'
                });
            }
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (curRouterObj.access === parseInt(Cookies.get('type'))) {
                    Util.toDefaultPage([...adminrouters], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
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
        // admin用户 不能跳转到其他的管理后台首页
        if ((to.path === '/node' || to.path === '/' || to.path === '' || to.path === '/site')&&(to.path !== '/site'&&to.path !== '/node'&&to.path !== '/admin')) {
            next({
                name: 'node_index'
            });
        }
        if (!Cookies.get('user_id') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user_id') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title();
            if(locking!=='1'){
                next({
                    name: 'node_index'
                });
            }else{
                next();
            }
        } else {
            const curRouterObj = Util.getRouterObjByName([...noderouters], to.name);
            if (!curRouterObj) {
                //console.log("222");
                next({
                    name: 'error-404'
                });
            }
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (curRouterObj.access === parseInt(Cookies.get('type'))) {
                    Util.toDefaultPage([...noderouters], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
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
        // 暂时有个问题不能完成更新
        // site用户 不能跳转到其他的管理后台首页
        if ((to.path === '/node' || to.path === '/' || to.path === '' || to.path === '/site')&&(to.path !== '/site'&&to.path !== '/node'&&to.path !== '/admin')) {
            next({
                name: 'site_index'
            });
        }
        if (!Cookies.get('siteId') && Cookies.get('user_id')) {
            // 已经登陆过了 但是没有选择管理的站点
            if (to.name !== 'site_select') {
                next({
                    name: 'site_select'
                });
            } else {
                next();
            }
        } else {
            if (!Cookies.get('user_id') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
                next({
                    name: 'login'
                });
            } else if (Cookies.get('user_id') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
                Util.title();
                if(locking!=='1'){
                    next({
                        name: 'site_index'
                    });
                }else{
                    next();
                }
            } else {
                const curRouterObj = Util.getRouterObjByName([...siterouters], to.name);
                if (!curRouterObj) {
                    //console.log("333");
                    next({
                        name: 'error-404'
                    });
                }
                if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                    if (curRouterObj.access === parseInt(Cookies.get('type'))) {
                        Util.toDefaultPage([...siterouters], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                    } else {
                        next({
                            replace: true,
                            name: 'error-403'
                        });
                    }
                } else {
                    // 没有配置权限的路由, 直接通过
                    Util.toDefaultPage([...siterouters], to.name, router, next);
                }
            }
        }
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
