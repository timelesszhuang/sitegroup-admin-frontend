<template>
    <Modal v-model="modal1" :title="model_name" width="700">
        <Form ref="formInline" :model="form" :rules="ruleInline">
            <Form-item prop="filename">
                <Row>
                    <Col span="3">
                    文件名:</Col>
                    <Col span="11">
                    <Input v-model="form.filename" @on-change="filenamechange" placeholder="请输入..."
                           style="width: 300px"/>
                    </Col>
                    <Col span="9">
                    <Upload
                            type="select"
                            ref="updateimg"
                            with-credentials
                            name="file"
                            :on-success="uploadsuccess"
                            :on-error="uploaderror"
                            :format="format"
                            :accept="accept"
                            :action="action"
                            :data="uploaddata">
                        <Button type="ghost" icon="ios-cloud-upload-outline" style="display: inline-block;">上传文件
                        </Button>
                    </Upload>
                    </Col>
                </Row>
            </Form-item>
            <Form-item prop="content" v-if="canedit">
                <Row>
                    <Col span="3">
                    内容:</Col>
                    <Col span="21">
                    <Input v-model="form.content" type="textarea" :rows="7"/>
                    </Col>
                </Row>
            </Form-item>
        </Form>
        <div slot="footer">
            <Button type="success" size="large" :disabled="!canedit" :loading="modal_loading" @click="ok">保存</Button>
        </div>
    </Modal>

</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';

    export default {
        data() {
            return {
                format: [],
                accept: '',
                modal1: false,
                action: window.HOST + 'uploadtemplatestatic',
                canedit: true,
                modal_loading: false,
                form: {
                    filename: '',
                    content: ''
                },
                model_name: '',
                site_id: '',
                file_type: '',
                ruleInline: {}
            }
        },
        computed: {
            uploaddata: function () {
                return {
                    'site_id': this.site_id,
                    'file_type': this.file_type,
                    'flag': 'add',
                    'filename': this.form.filename,
                };
            },
        },
        methods: {
            uploadsuccess(response) {
                if (response.status === 'success') {
                    this.$refs.formInline.resetFields();
                    this.$Message.success(response.msg);
                    this.modal1=false;
                } else {
                    this.$Message.error(response.msg);
                }
                this.$refs.updateimg.clearFiles();
            },
            uploaderror(error) {
                this.$Message.error(error);
            },
            filenamechange() {
                let index1 = this.form.filename.lastIndexOf(".");
                let index2 = this.form.filename.length;
                this.format = [];
                this.accept = '';
                if (this.file_type === 'html') {
                    this.format = [html];
                    this.accept = '.html';
                }
                if (index1 >= 0) {
                    let postf = this.form.filename.substring(index1 + 1, index2);
                    this.format = [postf];
                    this.accept = "." + postf;
                }
                this.canedit = ((this.file_type === 'html' && this.form.filename.slice(-'html'.length) === 'html') || (this.file_type === 'static' && this.form.filename.slice(-'css'.length) === 'css' || this.form.filename.slice(-'js'.length) === 'js'));
            },
            init(site_id, file_type, model_name) {
                this.$refs.formInline.resetFields();
                if (file_type === 'html') {
                    this.format = ['html'];
                    this.accept = '.html';
                } else {
                    this.canedit = false
                }
                this.site_id = site_id;
                this.file_type = file_type;
                this.model_name = "添加" + model_name;
                this.modal1 = true;
            },
            ok() {
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
                        this.apiPost('templateAdd', {
                            content: this.form.content,
                            site_id: this.site_id,
                            flag: 'add',
                            filename: this.form.filename,
                            file_type: this.file_type
                        }).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal1 = false;
                                this.$Message.success(msg);
                                this.$emit('getdata');
                                this.$refs.updateimg.clearFiles();
                                this.$refs.formInline.resetFields();
                            }, (data, msg) => {
                                this.$Message.error(msg);
                            })
                        }, (res) => {
                            //处理错误信息
                            this.$Message.error('网络异常，请稍后重试。');
                        });
                    } else {

                    }
                })

            }
        },
        mixins: [http]
    }

</script>
