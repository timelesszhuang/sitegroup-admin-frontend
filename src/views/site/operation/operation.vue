
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
                        // let name = 'operation';
                        // this.$store.state.app.pageOpenedList.map((item, index) => {
                        //     if (item.name === name) {
                        //         this.$store.state.app.pageOpenedList.splice(index, 1);
                        //     }
                        // });
                        //
                        // // util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                        // let openpageHasTag = this.$store.state.app.pageOpenedList.some(item => {
                        //     if (item.name === name) {
                        //         return true;
                        //     }
                        // });
                        // if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                        //     this.$store.state.app.pageOpenedList.map((item, index) => {
                        //
                        //
                        //
                        //     });
                        //
                        //     util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                        // }
                        return false;
                    }
                });
            }

        },
        mixins: [http]
    };
</script>
