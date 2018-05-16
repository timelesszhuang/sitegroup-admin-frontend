
<style>
    .change-pwd-form {
        padding: 20px;
    }
</style>
<template>
    <card>
        <div>
            <div style="text-align:center">
                <!--<Button type="info" @click="generatIndex()">生成首页</Button>-->
                <!--<Button type="success" @click="generatArticle()">文章同步</Button>-->
                <!--<Button type="warning" @click="generatMenu()">更新栏目</Button>-->
                <Button type="error" @click="aKeyGeneration()">页面生成</Button>
            </div>
            <div slot="footer">
            </div>
        </div>
    </card>
</template>
<script>
    import http from '../../../libs/http';
    import util from '@/libs/util.js';

    export default {
        data () {
            return {
                modal: false,
                modal_loading: false
            };
        },
        mounted () {
            // this.aKeyGeneration();
        },
        methods: {
            aKeyGeneration () {
                this.$Modal.confirm({
                    title: '一键生成',
                    content: '是否一键生成站点?',
                    okText: '更新',
                    cancelText: '取消',
                    onOk: (index) => {
                        let id = localStorage.siteId;
                        this.apiGet('siteGetCurl/' + id + '/oneKeyGenerate').then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                this.modal_loading = false;
                                this.$Message.success(msg);
                            }, (data, msg) => {
                                this.modal_loading = false;
                                this.$Message.error(msg, 5);
                            });
                        }, (res) => {
                            // 处理错误信息
                            this.modal_loading = false;
                            this.$Message.error('网络异常，请稍后重试。');
                        });
                    },
                    onCancel: () => {
                        return false;
                    }
                });
            }

        },
        mixins: [http]
    };
</script>
