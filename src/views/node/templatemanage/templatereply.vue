<template>
    <Modal v-model="modal1" :title="model_name" width="700">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>当前替换文件:{{form.filename}}</span>
        </p>
        <Row>
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
                <Button type="ghost" icon="ios-cloud-upload-outline" style="display: inline-block;">直接替换文件
                </Button>
            </Upload>
        </Row>
        <div slot="footer">
            <Button size="large" @click="exit">取消</Button>
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
                info: '',
                file_type: '',
                ruleInline: {}
            }
        },
        computed: {
            uploaddata: function () {
                return {
                    'site_id': this.site_id,
                    'file_type': this.file_type,
                    'flag': 'replace',
                    'filename': this.form.filename,
                };
            },
        },
        methods: {
            uploadsuccess(response) {
                if (response.status === 'success') {
                    this.$Message.success(response.msg);
                    this.$emit('getdata');
                    this.modal1 = false;
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
                    this.format = ['html'];
                    this.accept = '.html';
                }
                if (index1 >= 0) {
                    let postf = this.form.filename.substring(index1 + 1, index2);
                    this.format = [postf];
                    this.accept = "." + postf;
                }
                this.canedit = ((this.info.type === 'html') || (this.file_type === 'static' && this.info.type === 'css' || this.info.type === 'js'));
            },
            init(name, site_id, file_type, model_name,info) {
                if (file_type === 'html') {
                    this.format = ['html'];
                    this.accept = '.html';
                } else {
                    this.canedit = false
                }
                this.site_id = site_id;
                this.info = info;
                this.file_type = file_type;
                this.model_name = '替换' + model_name + '<a href="www.baidu.com"></a>';
                this.apiPost('templateRead', {site_id: site_id, name: name, file_type: this.file_type}).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.form = data;
                        this.modal1 = true;
                        this.filenamechange();
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                });
            },
            exit(){
                this.modal1 = false;
            },
            ok() {
                this.apiPost('templateSave', {
                    content: this.form.content,
                    site_id: this.site_id,
                    flag: 'update',
                    filename: this.form.filename,
                    file_type: this.file_type
                }).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.modal1 = false;
                        this.$Message.success(msg);
                        this.$emit('getdata');
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
