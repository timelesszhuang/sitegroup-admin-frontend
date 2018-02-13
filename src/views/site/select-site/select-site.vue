<style lang="less">
    @import "./select-site.less";
</style>
<template>
    <div>
        <div class="select-region">
            <Row>
                <div class="alert-title">
                    <Alert type="success" show-icon v-show="successShow">
                        <span slot="desc"> 正在进入站点&nbsp;&nbsp;&nbsp;
                        <Icon v-show="successShow" type="load-c" class="demo-spin-icon-load"></Icon></span>
                    </Alert>
                </div>
            </Row>
            <Row>
                <div class="selectsite">
                    <h2 class="title">
                        <Icon type="information-circled" style="color: #00a050"></Icon>
                        站点选择
                    </h2>
                    <ul class="site-select-ul">
                        <li class="persite" v-for="persite in siteList">
                            <Button class="btn" @click="changeSite(persite.id,persite.site_name,persite.url)">{{
                                persite.site_name
                                }}
                            </Button>
                            <span class="site-select-url">
                                <a class="link" :href=persite.url target="_blank">{{persite.url}}</a>
                            </span>
                        </li>
                    </ul>
                    <Alert type="success" show-icon>
                        站点选择
                        <span slot="desc">选择您要管理的网站</span>
                    </Alert>
                </div>
            </Row>
        </div>
    </div>
</template>
<script>
    import http from '../../../libs/http';

    export default {
        name: 'select-site',
        data() {
            return {
                modal: false,
                siteList: [],
                successShow: false
            };
        },
        methods: {
            getSiteList() {
                if (parseInt(Cookies.get('type')) === 3) {
                    // 请求站点列表
                    this.apiGet('get_site_list').then((res) => {
                        this.handleAjaxResponse(res, (data, msg) => {
                            // 需要设置下相关的 SITEID
                            this.siteList = data;
                            // 存储在 localStorage 中 因为页面会刷新
                        });
                    });
                }
            },
            changeSite(siteId, siteName, siteUrl) {
                this.successShow = true;
                let data = {
                    site_id: siteId
                }
                this.apiPost('set_site_info', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        // 站点的site相关信息
                        this.$store.commit('changeSiteInfo', {
                            'siteId': siteId,
                            'siteName': siteName,
                            'siteUrl': siteUrl
                        });
                        this.$store.commit('changeSite');
                        this.$router.push({
                            name: 'site_index'
                        });
                    }, (res) => {
                        // 处理错误信息
                        this.$Message.error('网络异常，请稍后重试。');
                    });
                });
            }
        },
        mounted() {
            // 加载时候触发
            this.getSiteList();
        },
        mixins: [http]
    };
</script>