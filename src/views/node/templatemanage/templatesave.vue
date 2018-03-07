<template>
    <Modal v-model="modal1" :title="model_name" @on-ok="ok" width="700">
        <div style="font-size: 25px;">当前修改模板{{this.filename}}.html
        </div>
        <Input ref="con" v-model="content" type="textarea" :rows="30"></Input>
        <Upload
                type="select"
                ref="replace_file"
                with-credentials
                name="file"
                :format="['jpg','jpeg','png','gif']"
                :action="action"
                >
            <Button type="ghost" icon="ios-cloud-upload-outline">替换</Button>
        </Upload>
    </Modal>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';

    export default {
        data() {
            return {
                content: '',
                filename: '',
                model_name: '',
                site_id: '',
                modal1: false,
                action: window.HOST + 'upload_img_list_imgser'
            }
        },
        methods: {
            init(name, site_id, model_name) {
                this.site_id = site_id;
                this.model_name = '修改' + model_name + "文件";
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
        props: {},
        mixins: [http]
    }
</script>
