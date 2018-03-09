<template>
    <Modal v-model="modal1" :title="model_name" width="700">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>当前重命名文件:{{form.filename}}</span>
        </p>
        <Form ref="formInline" :model="form" :rules="ruleInline">
            <Row>
                <Input v-model="newname" placeholder="请输入..."
                       style="width: 300px"/>
            </Row>
        </Form>
        <div slot="footer">
            <Button type="success" size="large" :loading="modal_loading" @click="ok">保存</Button>
        </div>
    </Modal>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';

    export default {
        data() {
            return {
                modal1: false,
                modal_loading: false,
                form: {
                    filename: '',
                },
                newname: '',
                model_name: '',
                site_id: '',
                info: '',
                file_type: '',
                ruleInline: {}
            }
        },
        methods: {
            init(name, site_id, file_type, model_name, info) {
                this.form.content = '';
                this.form.filename = '';
                if (file_type === 'html') {
                    this.format = ['html'];
                    this.accept = '.html';
                } else {
                    this.canedit = false
                }
                this.info = info;
                this.form.filename = info['name'];
                this.site_id = site_id;
                this.file_type = file_type;
                this.model_name = '重命名' + model_name;
                this.modal1 = true;
            },
            ok() {
                this.apiPost('templateRename', {
                    newfilename: this.newname,
                    site_id: this.site_id,
                    flag: 'Rename',
                    filename: this.form.filename,
                    file_type: this.file_type
                }).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.modal1 = false;
                        this.$Message.success(msg);
                        this.$emit('getdata');
                        this.newname = '';
                        this.form.filename = '';
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                }, (res) => {
                    //处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });

            }
        },
        mixins: [http]
    }
</script>
