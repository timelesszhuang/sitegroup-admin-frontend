import Main from '@/views/Main.vue'

// access 表示方可的类型  跟cookie 中的数据进行比对 1 代表 系统管理用户 2 node节点用户 3 site用户

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '乐销易营销平台 - 登录'
    },
    component: () => import('@/views/Common/login/login.vue')
}

export const page404 = {
    path: '/404',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/Common/error-page/404.vue')
}

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/Common/error-page/403.vue')
}

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/Common/error-page/500.vue')
}

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
}

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
}

export const selectsite = {
    path: '/site_select',
    title: '管理站点选择',
    name: 'site_select',
    component: () => import('@/views/site/select-site/select-site.vue')
}

// node 的 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在nodeotherRouter里
export const nodeotherRouter = {
    path: '/',
    name: 'nodeotherRouter',
    redirect: '/node',
    component: Main,
    title: '管理后端',
    children: [
        {
            path: 'node',
            title: {i18n: 'home'},
            name: 'node_index',
            component: () => import('@/views/node/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'nodeownspace_index',
            component: () => import('@/views/own-space/own-space.vue')
        },
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'nodeorder-info',
            component: () => import('@/views/advanced-router/component/order-info.vue')
        }, // 用于展示动态路由
        {
            path: 'shopping',
            title: '购物详情',
            name: 'nodeshopping',
            component: () => import('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
        {
            path: 'message',
            title: '消息中心',
            name: 'message',
            component: () => import('@/views/node/message/message.vue')
        },
        {
            path: 'error-message',
            title: '错误中心',
            name: 'error-message',
            component: () => import('@/views/node/error-message/error-message.vue')
        }
    ]
}

// 作为node Main组件的子页面展示并且在左侧菜单显示的路由写在nodeappRouter里
export const nodeappRouter = [
    {
        path: '/content',
        icon: 'key',
        name: 'content',
        title: '内容管理',
        component: Main,
        children: [
            {
                path: 'articlemanage',
                icon: 'edit',
                title: '文章管理',
                name: 'articlemanage',
                component: () => import('@/views/node/articlemanage/tab.vue')
            },
            {
                path: 'question',
                icon: 'ios-help',
                title: '问答管理',
                name: 'question',
                component: () => import('@/views/node/questionmanage/tab.vue')
            },
            {
                path: 'product',
                icon: 'ios-briefcase',
                title: '产品管理',
                name: 'product',
                component: () => import('@/views/node/productmanage/tab.vue')
            },
            {
                path: 'imglist',
                title: '图片集管理',
                icon: 'images',
                name: 'imglist',
                component: () => import('@/views/node/imglist/index.vue')
            },
            {
                path: 'contentget',
                title: '内容管理',
                icon: 'ionic',
                name: 'contentget',
                component: () => import('@/views/node/contentget/index.vue')
            },
            {
                path: 'index',
                icon: 'images',
                title: '活动创意管理',
                name: 'access_index',
                component: () => import('@/views/access/access.vue')
            },
            // {path: 'index', title: '场景秀', name: 'access_index', component: () => import('@/views/access/access.vue')},
            // {path: 'index', title: '案例中心', name: 'access_index', component: () => import('@/views/access/access.vue')},
        ]
    },
    {
        path: '/resource',
        icon: 'soup-can',
        name: 'resource',
        title: '资源聚合',
        component: Main,
        children: [
            {

                path: 'hotnews',
                icon: 'pricetag',
                title: '新闻管理',
                name: 'hotnews',
                component: () => import('@/views/Common/news/tab.vue')
            }, {
                path: 'wechat',
                icon: 'edit',
                title: '公众号',
                name: 'wechat',
                component: () => import('@/views/node/articlemanage/tab.vue')
            },

        ]
    },
    {
        path: '/sub-site',
        icon: 'soup-can',
        name: '子站点设置',
        title: '子站点设置',
        component: Main,
        children: [
            // {
            //     path: 'column-management',
            //     icon: 'ios-bookmarks',
            //     title: '栏目管理',
            //     name: 'column-management',
            //     component: () => import('@/views/node/column-management/index.vue')
            // },
            // {
            //     path: 'elements-set',
            //     icon: 'image',
            //     title: '网站元素设置',
            //     name: 'elements-set',
            //     component: () => import('@/views/node/elements-set/index.vue')
            // },
            // {
            //     path: 'site-management',
            //     icon: 'image',
            //     title: '站点管理',
            //     name: 'site-management',
            //     component: () => import('@/views/node/site-management/index.vue')
            // },
            {
                path: 'user-management',
                icon: 'image',
                title: '用户管理',
                name: 'user-management',
                component: () => import('@/views/node/user-management/siteuser.vue')
            },

        ]
    },
    {
        path: '/exclusive',
        icon: 'soup-can',
        name: 'exclusive',
        title: '素材库',
        component: Main,
        children: [
            {
                path: 'exclusivearticle',
                icon: 'ios-bookmarks',
                title: '专属文章',
                name: 'exclusivearticle',
                component: () => import('@/views/node/publicarticle/index.vue')
            },
            {
                path: 'exclusiveimg',
                icon: 'image',
                title: '专属图片',
                name: 'exclusiveimg',
                component: () => import('@/views/node/publicimage/index.vue')
            },

        ]
    },
    {
        path: '/keyword',
        icon: 'ios-navigate',
        name: 'keyword',
        title: '站点关键词',
        component: Main,
        children: [
            {
                path: 'keywordmanage',
                icon: 'ios-navigate',
                title: '关键词管理',
                name: 'keywordmanage',
                component: () => import('@/views/node/keyword/keyword.vue')
            },
        ]
    },
    {
        path: '/marketing',
        icon: 'ios-navigate',
        name: 'marketing',
        title: '营销计划',
        component: Main,
        children: [
            {
                path: 'marketingmode',
                icon: 'ios-navigate',
                title: '营销模式',
                name: 'marketingmode',
                component: () => import('@/views/Common/marketingmode/index.vue')
            },
            {
                path: 'casecenter',
                icon: 'paper-airplane',
                title: '案例中心',
                name: 'casecenter',
                component: () => import('@/views/Common/case/index.vue')
            },
        ]
    },
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        access: 1,
        component: Main,
        children: [
            {
                path: 'index',
                access: 1,
                title: '权限管理',
                name: 'access_index',
                component: () => import('@/views/access/access.vue')
            }
        ]
    },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: {i18n: 'international'},
    //             name: 'international_index',
    //             component: () => import('@/views/international/international.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //
    //             path: 'test',
    //             icon: 'compose',
    //             name: 'test',
    //             title: '编辑器',
    //             component: () => import('@/views/my-components/test/index.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'artical-publish',
    //             title: '文章发布',
    //             name: 'artical-publish',
    //             icon: 'compose',
    //             component: () => import('@/views/form/article-publish/article-publish.vue')
    //         },
    //         {
    //             path: 'workflow',
    //             title: '工作流',
    //             name: 'workflow',
    //             icon: 'arrow-swap',
    //             component: () => import('@/views/form/work-flow/work-flow.vue')
    //         }
    //
    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'dragableTable',
    //             title: '可拖拽排序',
    //             name: 'dragable-table',
    //             icon: 'arrow-move',
    //             component: () => import('@/views/tables/dragable-table.vue')
    //         },
    //         {
    //             path: 'editableTable',
    //             title: '可编辑表格',
    //             name: 'editable-table',
    //             icon: 'edit',
    //             component: () => import('@/views/tables/editable-table.vue')
    //         },
    //         {
    //             path: 'searchableTable',
    //             title: '可搜索表格',
    //             name: 'searchable-table',
    //             icon: 'search',
    //             component: () => import('@/views/tables/searchable-table.vue')
    //         },
    //         {
    //             path: 'exportableTable',
    //             title: '表格导出数据',
    //             name: 'exportable-table',
    //             icon: 'code-download',
    //             component: () => import('@/views/tables/exportable-table.vue')
    //         },
    //         {
    //             path: 'table2image',
    //             title: '表格转图片',
    //             name: 'table-to-image',
    //             icon: 'images',
    //             component: () => import('@/views/tables/table-to-image.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'mutative-router',
    //             title: '动态路由',
    //             name: 'mutative-router',
    //             icon: 'link',
    //             component: () => import('@/views/advanced-router/mutative-router.vue')
    //         },
    //         {
    //             path: 'argument-page',
    //             title: '带参页面',
    //             name: 'argument-page',
    //             icon: 'android-send',
    //             component: () => import('@/views/advanced-router/argument-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: '错误页面',
    //             name: 'errorpage_index',
    //             component: () => import('@/views/error-page/error-page.vue')
    //         }
    //     ]
    // }
]

// admin 的 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在nodeotherRouter里
export const adminotherRouter = {
    path: '/',
    name: 'adminotherRouter',
    redirect: '/admin',
    title: '公司管理后台',
    component: Main,
    children: [
        {
            path: 'admin',
            title: {i18n: 'home'},
            name: 'admin_index',
            component: () => import('@/views/admin/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'nodeownspace_index',
            component: () => import('@/views/own-space/own-space.vue')
        },
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'nodeorder-info',
            component: () => import('@/views/advanced-router/component/order-info.vue')
        }, // 用于展示动态路由
        {
            path: 'shopping',
            title: '购物详情',
            name: 'nodeshopping',
            component: () => import('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
    ]
}
// 作为admin Main组件的子页面展示并且在左侧菜单显示的路由写在nodeappRouter里
export const adminappRouter = [
    {

        path: '/market',
        icon: 'ios-navigate',
        name: 'market',
        title: '营销计划',
        component: Main,
        children: [
            {
                path: 'marketmode',
                icon: 'ios-navigate',
                title: '营销模式',
                name: 'marketmode',
                component: () => import('@/views/admin/marketmode/index.vue')
            },
            {
                path: 'case',
                icon: 'paper-airplane',
                title: '案例中心',
                name: 'case',
                component: () => import('@/views/admin/case/index.vue')
            },
        ]
    },
    {
        path: '/message-send',
        icon: 'paper-airplane',
        title: '信息发布',
        name: 'messagesend',
        component: Main,
        children: [
            {
                path: 'push',
                title: '系统推送',
                name: 'messagesend-push',
                component: () => import('@/views/admin/message/index.vue')
            }
        ]
    },
    {
        path: '/node-user-management',
        icon: 'paper-airplane',
        title: '节点/用户管理',
        name: 'node-user-management',
        component: Main,
        children: [
            {
                path: 'root-user-management',
                title: '用户管理',
                name: 'root-user-management',
                component: () => import('@/views/admin/user/user.vue')
            },
            {
                path: 'node-management',
                title: '节点管理',
                name: 'node-management',
                component: () => import('@/views/admin/node/node.vue')
            }
        ]
    },
    {
        path: '/template-management',
        icon: 'paper-airplane',
        title: '模板管理',
        name: 'template-management',
        component: Main,
        children: [
            {
                path: '/template-list',
                title: '模板管理',
                name: 'template-list',
                component: () => import('@/views/admin/template/template.vue')
            }
        ]

    },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: {i18n: 'international'},
    //             name: 'international_index',
    //             component: () => import('@/views/international/international.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'artical-publish',
    //             title: '文章发布',
    //             name: 'artical-publish',
    //             icon: 'compose',
    //             component: () => import('@/views/form/article-publish/article-publish.vue')
    //         },
    //         {
    //             path: 'workflow',
    //             title: '工作流',
    //             name: 'workflow',
    //             icon: 'arrow-swap',
    //             component: () => import('@/views/form/work-flow/work-flow.vue')
    //         }
    //
    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'dragableTable',
    //             title: '可拖拽排序',
    //             name: 'dragable-table',
    //             icon: 'arrow-move',
    //             component: () => import('@/views/tables/dragable-table.vue')
    //         },
    //         {
    //             path: 'editableTable',
    //             title: '可编辑表格',
    //             name: 'editable-table',
    //             icon: 'edit',
    //             component: () => import('@/views/tables/editable-table.vue')
    //         },
    //         {
    //             path: 'searchableTable',
    //             title: '可搜索表格',
    //             name: 'searchable-table',
    //             icon: 'search',
    //             component: () => import('@/views/tables/searchable-table.vue')
    //         },
    //         {
    //             path: 'exportableTable',
    //             title: '表格导出数据',
    //             name: 'exportable-table',
    //             icon: 'code-download',
    //             component: () => import('@/views/tables/exportable-table.vue')
    //         },
    //         {
    //             path: 'table2image',
    //             title: '表格转图片',
    //             name: 'table-to-image',
    //             icon: 'images',
    //             component: () => import('@/views/tables/table-to-image.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'mutative-router',
    //             title: '动态路由',
    //             name: 'mutative-router',
    //             icon: 'link',
    //             component: () => import('@/views/advanced-router/mutative-router.vue')
    //         },
    //         {
    //             path: 'argument-page',
    //             title: '带参页面',
    //             name: 'argument-page',
    //             icon: 'android-send',
    //             component: () => import('@/views/advanced-router/argument-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: '错误页面',
    //             name: 'errorpage_index',
    //             component: () => import('@/views/error-page/error-page.vue')
    //         }
    //     ]
    // }
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const siteotherRouter = {
    path: '/',
    name: 'siteotherRouter',
    redirect: '/site',
    component: Main,
    title: '网站管理后台',
    children: [
        {
            path: 'site',
            title: {i18n: 'home'},
            name: 'site_index',
            component: () => import('@/views/site/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () => import('@/views/own-space/own-space.vue')
        },
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'order-info',
            component: () => import('@/views/advanced-router/component/order-info.vue')
        }, // 用于展示动态路由
        {
            path: 'shopping',
            title: '购物详情',
            name: 'shopping',
            component: () => import('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
    ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const siteappRouter = [
    {
        path: '/sitearticle',
        icon: 'earth',
        title: "文章管理",
        name: 'sitearticlemanage',
        component: Main,
        children: [
            {
                path: 'index',
                icon: 'edit',
                title: "文章管理",
                name: 'sitearticle',
                component: () => import('@/views/Common/article/index.vue')
            }
        ]
    },
    {
        path: '/sitequestion',
        icon: 'ios-help',
        title: "问答管理",
        name: 'sitequestionmanage',
        component: Main,
        children: [
            {
                path: 'index',
                icon: 'ios-help',
                title: "问答管理",
                name: 'sitequestion',
                component: () => import('@/views/Common/question/index.vue')
            }
        ]
    },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: {i18n: 'international'},
    //             name: 'international_index',
    //             component: () => import('@/views/international/international.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'artical-publish',
    //             title: '文章发布',
    //             name: 'artical-publish',
    //             icon: 'compose',
    //             component: () => import('@/views/form/article-publish/article-publish.vue')
    //         },
    //         {
    //             path: 'workflow',
    //             title: '工作流',
    //             name: 'workflow',
    //             icon: 'arrow-swap',
    //             component: () => import('@/views/form/work-flow/work-flow.vue')
    //         }
    //
    //     ]
    // },
    {
        path: '/marketing',
        icon: 'ios-navigate',
        name: 'marketing',
        title: '营销计划',
        component: Main,
        children: [
            {
                path: 'marketingmode',
                icon: 'ios-navigate',
                title: '营销模式',
                name: 'marketingmode',
                component: () => import('@/views/Common/marketingmode/index.vue')
            },
            {
                path: 'casecenter',
                icon: 'paper-airplane',
                title: '案例中心',
                name: 'casecenter',
                component: () => import('@/views/Common/case/index.vue')
            },
        ]
    },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: {i18n: 'international'},
    //             name: 'international_index',
    //             component: () => import('@/views/international/international.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'artical-publish',
    //             title: '文章发布',
    //             name: 'artical-publish',
    //             icon: 'compose',
    //             component: () => import('@/views/form/article-publish/article-publish.vue')
    //         },
    //         {
    //             path: 'workflow',
    //             title: '工作流',
    //             name: 'workflow',
    //             icon: 'arrow-swap',
    //             component: () => import('@/views/form/work-flow/work-flow.vue')
    //         }
    //
    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'dragableTable',
    //             title: '可拖拽排序',
    //             name: 'dragable-table',
    //             icon: 'arrow-move',
    //             component: () => import('@/views/tables/dragable-table.vue')
    //         },
    //         {
    //             path: 'editableTable',
    //             title: '可编辑表格',
    //             name: 'editable-table',
    //             icon: 'edit',
    //             component: () => import('@/views/tables/editable-table.vue')
    //         },
    //         {
    //             path: 'searchableTable',
    //             title: '可搜索表格',
    //             name: 'searchable-table',
    //             icon: 'search',
    //             component: () => import('@/views/tables/searchable-table.vue')
    //         },
    //         {
    //             path: 'exportableTable',
    //             title: '表格导出数据',
    //             name: 'exportable-table',
    //             icon: 'code-download',
    //             component: () => import('@/views/tables/exportable-table.vue')
    //         },
    //         {
    //             path: 'table2image',
    //             title: '表格转图片',
    //             name: 'table-to-image',
    //             icon: 'images',
    //             component: () => import('@/views/tables/table-to-image.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'mutative-router',
    //             title: '动态路由',
    //             name: 'mutative-router',
    //             icon: 'link',
    //             component: () => import('@/views/advanced-router/mutative-router.vue')
    //         },
    //         {
    //             path: 'argument-page',
    //             title: '带参页面',
    //             name: 'argument-page',
    //             icon: 'android-send',
    //             component: () => import('@/views/advanced-router/argument-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: '错误页面',
    //             name: 'errorpage_index',
    //             component: () => import('@/views/error-page/error-page.vue')
    //         }
    //     ]
    // }
]

// 全部的路由信息
export const routers = [
    loginRouter,
    //默认菜单
    // 节点相关的菜单
    nodeotherRouter,
    ...nodeappRouter,
    //　管理员端的相关账号
    siteotherRouter,
    ...siteappRouter,
    // 公司总管理员账号
    adminotherRouter,
    ...adminappRouter,
    selectsite,
    preview,
    locking,
    page500,
    page403,
    page404
]

//节点相关的路由信息
export const noderouters = [
    loginRouter,
    nodeotherRouter,
    ...nodeappRouter,
    selectsite,
    preview,
    locking,
    page500,
    page403,
    page404
]

//公司总管理员端的相关的路由信息
export const adminrouters = [
    loginRouter,
    adminotherRouter,
    ...adminappRouter,
    selectsite,
    preview,
    locking,
    page500,
    page403,
    page404
]

//小站点的相关的路由信息
export const siterouters = [
    loginRouter,
    siteotherRouter,
    ...siteappRouter,
    selectsite,
    preview,
    locking,
    page500,
    page403,
    page404
]


