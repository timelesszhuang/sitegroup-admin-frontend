<template>
    <div class="select-site">
        <a :href=this.$store.state.app.siteUrl target="_blank" style="padding-right: 20px">
            <Icon type="ios-paperplane-outline"></Icon>
            {{this.$store.state.app.siteName}}
        </a>
        <Dropdown trigger="click" @on-click="setSite">
            <a href="javascript:void(0)">
                <Tooltip :content="tooltip" placement="bottom">
                    <Icon type="arrow-swap" :size="23"></Icon>
                </Tooltip>
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
                tooltip: '切换管理网站',
                // 默认存储在localstorage 中
                siteList: {}
            };
        },
        methods: {
            setSite(siteId) {
                // 确认
                let siteInfo = this.siteList.filter(item => {
                    return item.id === siteId;
                })[0];
                let siteName = siteInfo.site_name;
                let siteUrl = siteInfo.url;
                if (parseInt(localStorage.siteId) === siteId) {
                    this.$Message.warning('当前为' + siteName + '站点，无需切换。');
                    return;
                }
                this.$Modal.confirm({
                    title: '确认',
                    content: '您确定要切换管理站点?。',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.changeSite(siteId, siteName, siteUrl);
                    },
                    onCancel: () => {
                        return false;
                    }
                });
            },
            changeSite(siteId, siteName, siteUrl) {
                // 切换网站相关操作
                // 根据站点的name 相关数据更新
                let data = {
                    site_id: siteId
                }
                this.apiPost('set_site_info', data).then((res) => {
                    this.handleAjaxResponse(res, (data) => {
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
            this.getSiteList();
        },
        mixins: [http]
    };
</script>