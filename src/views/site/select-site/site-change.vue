<template>
    <div style="display:inline-block;">
        <a :href=siteUrl target="_blank" style="padding-right: 20px">
            <Icon type="ios-paperplane-outline"></Icon>
            {{siteName}}
        </a>
        <Dropdown trigger="click" @on-click="setSite">
            <a href="javascript:void(0)">
                切换网站
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) in siteList" :key="index" :name="item.id">
                    <Row type="flex" justify="start" align="middle">
                        <Icon type="ios-paperplane-outline"></Icon>&nbsp;
                        <span style="margin-right:10px;font-size:large">
                         {{item.site_name}}
                        </span>
                        <span>{{item.url}}</span>
                    </Row>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    import http from '../../../libs/http';

    export default {
        name: 'siteselect',
        data() {
            return {
                // 默认存储在localstorage 中
                siteList: {},
                siteName: localStorage.siteName,
                siteUrl: localStorage.siteUrl
            };
        },
        methods: {
            setSite(siteId) {
                // 确认
                alert(siteId)
                let _this = this;
                this.$Modal.confirm({
                    title: '确认',
                    content: '您确定要切换管理站点?切换会关闭所有已经打开的标签页。',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                    },
                    onCancel: () => {
                        return false
                    }
                })
            },
            getSiteList() {
                this.apiGet('get_site_list').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        // 需要设置下相关的 SITEID
                        this.siteList = data;
                        // 存储在 localStorage 中 因为页面会刷新
                    });
                });
            }
        },
        mounted() {
            console.log(localStorage.siteList);
            this.getSiteList();
        },
        mixins: [http]
    };
</script>