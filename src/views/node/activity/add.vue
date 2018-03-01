<template>
    <div>
        <div>
            <Modal
                    v-model="modal"
                    width="900"
                    :styles="{top: '20px'}"
            >
                <p slot="header">
                    <span>添加</span>
                </p>
                <div>
                    <Form ref="padd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="标题" prop="title">
                            <Input type="text" v-model="form.title" placeholder="请输入活动标题"></Input>
                        </Form-item>
                        <Form-item label="大活动图" prop="oss_img_src">
                            <Upload
                                    type="select"
                                    ref="upImg"
                                    with-credentials
                                    name="file"
                                    :format="['jpg','jpeg','png','gif']"
                                    :on-success="getResponse"
                                    :on-error="getErrorInfo"
                                    :on-format-error="formatError"
                                    :action="action"
                                    style="text-align:left;">
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传活动图</Button>
                            </Upload>
                            <div v-if="imgshow" style="display: inline-block;width: 100%">
                                <div style="margin:0px auto;width: 300px">
                                    <img style="max-width: 300px;" :src=imgpath() alt="">
                                </div>
                            </div>
                        </Form-item>
                        <Form-item label="小活动图" prop="smalloss_img_src">
                            <Upload
                                    type="select"
                                    ref="upImage"
                                    with-credentials
                                    name="file"
                                    :format="['jpg','jpeg','png','gif']"
                                    :on-success="getRes"
                                    :on-error="getError"
                                    :on-format-error="formatErr"
                                    :action="action"
                                    style="text-align:left;">
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传活动图</Button>
                            </Upload>
                            <div v-if="imgshowimage" style="display: inline-block;width: 100%">
                                <div style="margin:0px auto;width: 300px">
                                    <img style="max-width: 300px;" :src=path() alt="">
                                </div>
                            </div>
                        </Form-item>
                        <Form-item label="英文名" prop="en_name">
                            <Input type="text" v-model="form.en_name" placeholder="请输入英文名"></Input>
                        </Form-item>
                        <Form-item label="活动描述" prop="activity_summary">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerAdddatile"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Form-item label="活动规则" prop="rule">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerAddrule"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Form-item label="详情" prop="content">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerAddinfo"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Form-item label="页面关键词" prop="keywords">
                            <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词"></Input>
                        </Form-item>
                        <Form-item label="页面描述" prop="summary">
                            <Input type="textarea" :autosize="{minRows: 3,maxRows: 10}" v-model="form.summary"
                                   placeholder="请输入页面描述">
                            </Input>
                        </Form-item>
                    </Form>
                    <Alert type="success" show-icon>
                        说明:
                        <span slot="desc">页面关键词、页面描述用于活动页面SEO优化。 </span>
                    </Alert>
                </div>
                <div slot="footer">
                    <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import tinymceInit from '../../../libs/tinymceInit';
    import tinymce from 'tinymce';
    import materialimg from '../../Common/article/materialimg.vue';

    export default {
        data() {
            return {
                spinShow: false,
                modal: false,
                modal_loading: false,
                action: HOST + 'image_upload',
                imgshow: false,
                imgshowimage: false,
                value1: 0,
                selects: true,
                form: {
                    oss_img_src: '',
                    summary: '',
                    keywords: '',
                    title: '',
                    content: '',
                    rule: "",
                    en_name: '',
                    activity_summary: '',
                    smalloss_img_src: ''
                },
                AddRule: {
                    title: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    oss_img_src: [
                        {required: true, message: '请上传活动图', trigger: 'blur'},
                    ],
                    en_name: [
                        {required: true, message: '请输入英文名', trigger: 'blur'},
                    ],
                    keywords: [
                        {required: true, message: '请输入页面关键词', trigger: 'blur'},
                    ],
                    summary: [
                        {required: true, message: '请输入页面描述', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
            this.init();
        },
        destroyed() {
            tinymce.get('tinymceEditerAdddatile').destroy();
            tinymce.get('tinymceEditerAddrule').destroy();
            tinymce.get('tinymceEditerAddinfo').destroy();
        },
        methods: {
            addmaterial(src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerAdddatile').insertContent(imgsrc);
                } else if (this.img === 'rule') {
                    // 字段4  自定义字段 写明作用
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerAddrule').insertContent(imgsrc);
                } else if (this.img === 'info') {
                    // 字段4  自定义字段 写明作用
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerAddinfo').insertContent(imgsrc);
                } else if (this.img === 'thumbnail') {
                    this.form.image = src;
                    console.log(this.form.image)
                }
            },
            init: function () {
                this.$nextTick(() => {
                    let height = document.body.offsetHeight - 500;
                    this.tinymceInit(this, height, 'tinymceEditerAdddatile');
                    this.tinymceInit(this, height, 'tinymceEditerAddrule','rule');
                    this.tinymceInit(this, height, 'tinymceEditerAddinfo','info');
                });
            },
            imgpath() {
                return this.form.oss_img_src;
            },
            path() {
                return this.form.smalloss_img_src;
            },
            updateData(data) {
                this.form.content = data
            },
            updateData2(data) {
                this.form.activity_summary = data
            },
            updateData3(data) {
                this.form.rule = data
            },
            //缩略图上传回调
            getResponse(response, file, filelist) {
                this.form.oss_img_src = response.data.url;
                if (response.status) {
                    this.$Message.success(response.msg);
                    this.imgpath();
                    this.imgshow = true
                    this.$refs.upImg.clearFiles();
                } else {
                    this.$Message.error(response.msg);
                }
                this.$refs.upImg.clearFiles()
            },
            getErrorInfo(error, file, filelist) {
                this.$Message.error(error);
            },
            formatErr() {
                this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
            },
            getRes(response, file, filelist) {
                this.form.smalloss_img_src = response.data.url;
                if (response.status) {
                    this.$Message.success(response.msg);
                    this.path();
                    this.imgshowimage = true
                    this.$refs.upImage.clearFiles();
                } else {
                    this.$Message.error(response.msg);
                }
                this.$refs.upImage.clearFiles()
            },
            getError(error, file, filelist) {
                this.$Message.error(error);
            },
            formatError() {
                this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
            },
            add() {
                this.$refs.padd.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        var activeEditor = tinymce.get('tinymceEditerAdddatile');
                        activeEditor.selection.select(activeEditor.getBody());
                        this.form.activity_summary = activeEditor.selection.getContent({'format': 'html'});
                        var activeEditor1 = tinymce.get('tinymceEditerAddrule');
                        activeEditor1.selection.select(activeEditor1.getBody());
                        this.form.rule = activeEditor1.selection.getContent({'format': 'html'});
                        var activeEditor2 = tinymce.get('tinymceEditerAddinfo');
                        activeEditor2.selection.select(activeEditor2.getBody());
                        this.form.content = activeEditor2.selection.getContent({'format': 'html'});
                        console.log(this.form);
                        let data = this.form;
                        this.apiPost('activityabout', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                this.$parent.getData();
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.imgshow = false;
                                this.form.oss_img_src = '';
                                this.$refs.padd.resetFields();
                            }, (data, msg) => {
                                this.modal_loading = false;
                                this.$Message.error(msg);
                            })
                        }, (res) => {
                            //处理错误信息
                            this.modal_loading = false;
                            this.$Message.error('网络异常，请稍后重试。');
                        })
                    }
                })
            }
        },
        mixins: [http, common, tinymceInit, tinymce],
        props: {}
    }
</script>

