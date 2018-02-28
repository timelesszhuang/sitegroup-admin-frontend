<template>
    <Modal v-model="modal1" title="修改模板" @on-ok="ok" width="700">
        <div style="font-size: 25px;">当前修改模板{{this.filename}}.html
        </div>
        <Input ref="con" v-model="content" type="textarea" :rows="30"></Input>
    </Modal>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';

    export default {
        data() {
            return {
                content: '',
                filename: '',
                site_id: '',
                modal1: false,
            }
        },
        methods: {
            init(name,site_id){
                this.site_id = site_id;
                this.apiGet('/templateRead/' + site_id + "/" + name).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.content = data.content;
                        this.filename = data.filename;
                        this.modal1 = true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                });
            },
            ok() {
                this.apiPost('templateSave/' + this.site_id + '/' + this.filename, {content: this.$refs.con.$refs.textarea.value}).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$Message.success(msg);
                        this.$parent.getInfo();
                        this.modal1 = false
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                }, (res) => {
                    //处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        props: {
        },
        mixins: [http]
    }
</script>
