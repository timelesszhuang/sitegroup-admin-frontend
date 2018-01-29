import {
    siteotherRouter,
    siteappRouter,
    adminappRouter,
    adminotherRouter,
    nodeappRouter,
    nodeotherRouter
} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
    state: {
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'node_index'
        }],
        currentPageName: '',
        currentPath: [], // 面包屑数组
        menuList: [],
        routers: [],
        tagsList: [],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
        userType: localStorage.type,
        homeIndex: 'admin_index',
        homePath: '/admin'
    },
    mutations: {
        updateMenulist(state) {
            let accessCode = parseInt(Cookies.get('userType'));
            let menuList = [];
            let Router = adminappRouter;
            if (state.userType === 2) {
                Router = nodeappRouter;
            } else if (state.userType === 3) {
                // 最小用户相关操作
                Router = siteappRouter;
            }
            Router.forEach((item, index) => {
                // 如果 item 设置权限的话 执行的操作
                if (item.access !== undefined) {
                    if (Util.showThisRoute(item.access, accessCode)) {
                        if (item.children.length === 1) {
                            menuList.push(item);
                        } else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter(child => {
                                if (child.access !== undefined) {
                                    if (child.access === accessCode) {
                                        return child;
                                    }
                                } else {
                                    return child;
                                }
                            });
                            menuList[len - 1].children = childrenArr;
                        }
                    }
                } else {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (Util.showThisRoute(child.access, accessCode)) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        if (childrenArr === undefined || childrenArr.length === 0) {
                            menuList.splice(len - 1, 1);
                        } else {
                            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                            handledItem.children = childrenArr;
                            menuList.splice(len - 1, 1, handledItem);
                        }
                    }
                }
            });
            state.menuList = menuList;
        },
        changeMenuTheme(state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme(state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu(state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage(state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage(state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag(state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList(state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags(state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList(state) {
            // 默认打开第一个页面
            let router = adminotherRouter;
            if (parseInt(Cookies.get('type')) === 2) {
                router = nodeotherRouter;
            } else if (parseInt(Cookies.get('type') === 3)) {
                router = siteotherRouter;
            }
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [router.children[0]];
        },
        setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName(state, name) {
            state.currentPageName = name;
        },
        setAvator(state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang(state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu(state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount(state, count) {
            state.messageCount = count;
        },
        increateTag(state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setUserType(state, userType) {
            state.userType = userType;
        },
        setInitTags(state) {
            let tag = [...adminotherRouter.children];
            let appRouter = adminappRouter;
            if (state.userType == 2) {
                tag = [...nodeotherRouter.children];
                appRouter = nodeappRouter;
            } else if (state.userType == 3) {
                // tag =[]
            }
            state.tagsList = tag;
            let tagsList = [];
            appRouter.map((item) => {
                if (item.children.length <= 1) {
                    tagsList.push(item.children[0]);
                } else {
                    tagsList.push(...item.children);
                }
            });
            state.tagsList.push(...tagsList);
        },
        setInitRouter(state) {
            let router = [adminotherRouter, ...adminappRouter];
            if (state.userType == 2) {
                router = [nodeotherRouter, ...nodeappRouter];
            } else if (state.userType == 3) {

            }
            state.routers = router;
        },
        // 面包屑导航
        setInitCurrentPath(state) {
            let homeIndex = 'admin_index';
            let path = '/admin';
            let currentpath = {
                title: '首页',
                path: path,
                name: homeIndex
            };
            if (state.userType == 2) {
                homeIndex = 'node_index';
                path = '/node';
                currentpath = {
                    title: '首页',
                    path: path,
                    name: homeIndex
                };
            } else if (state.userType == 3) {
                homeIndex = 'site_index';
                path = '/site';
                currentpath = {
                    title: '首页',
                    path: path,
                    name: homeIndex
                };
            }
            state.pageOpenedList[0].name = homeIndex;
            state.pageOpenedList[0].path = path;
            state.homePath = path;
            state.homeIndex = homeIndex;
            state.currentPath.push(currentpath);
        }
    }
};

export default app;
