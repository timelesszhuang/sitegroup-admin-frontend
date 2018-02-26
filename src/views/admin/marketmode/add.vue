<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="900">
                <p slot="header">
                    <span>添加</span>
                </p>
                <div>
                    <Upload
                            type="drag"
                            ref="upImg"
                            with-credentials
                            name="file"
                            :format="['jpg','jpeg','png','gif']"
                            :on-success="getResponse"
                            :on-error="getErrorInfo"
                            :on-format-error="formatError"
                            :action="action">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将图片拖拽到这里上传 仅支持(jpg jpeg png gif)类型图片</p>
                        </div>
                    </Upload>
                    <Form ref="marketingadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="标题" prop="title">
                            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
                        </Form-item>
                        <Form-item label="关键词" prop="keyword">
                            <Input type="text" v-model="form.keyword" placeholder="请输入关键词"></Input>
                        </Form-item>
                        <Form-item label="行业分类" prop="industry_id">
                            <Select v-model="form.industry_id"
                                    style="width:150px;text-align: left;position:relative;text-align: left;z-index: 10000;"
                                    label-in-value　@on-change="changeIndustry">
                                <Option v-for="(item, index) in industry" :value="item.id" :label="item.name"
                                        :key="index">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="核心解读" prop="summary">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerAddMark"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Form-item label="营销模式" prop="content">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerAddContent"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>

                    </Form>
                </div>
                <div slot="footer">
                    <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
                </div>
            </Modal>
        </div>
        <materialimg ref="addmaterial" v-on:addmaterial="addmaterial"></materialimg>
    </div>

</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import tinymce from 'tinymce';
    import tinymceInit from '../../../libs/tinymceInit';
    import materialimg from '../../Common/article/materialimg';

    export default {
        components: {materialimg},
        data() {
            return {
                img: '',
                spinShow: true,
                modal: false,
                modal_loading: false,
                action: window.ImgUploadPath,
                form: {
                    title: '',
                    keyword: '',
                    content: ''
                },
                AddRule: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    keyword: [
                        {required: true, message: '请输入关键词', trigger: 'blur'}
                    ]

                }
            };
        },
        mounted() {
            this.init();
        },
        destroyed() {
            tinymce.get('tinymceEditerAddContent').destroy();
            tinymce.get('tinymceEditerAddMark').destroy();
        },

        methods: {
            init: function () {
                this.$nextTick(() => {
                    let height = document.body.offsetHeight - 500;
                    this.tinymceInit(this, height, 'tinymceEditerAddContent');
                    this.tinymceInit(this, height, 'tinymceEditerAddMark', 'mark');
                });
            },
            addmaterial(src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerAddContent').insertContent(imgsrc);
                } else if (this.img === 'mark') {
                    // 字段4  自定义字段 写明作用
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerAddMark').insertContent(imgsrc);
                } else if (this.img === 'thumbnail') {
                    this.form.image = src;

                }
            },
            changeIndustry(value) {
                this.form.industry_name = value.label;
                this.form.industry_id = value.value;
            },
            getResponse(response, file, filelist) {
                this.form.img = response.data.url;
                this.$Message.success(response.msg);
            },
            getErrorInfo(error, file, filelist) {
                this.$Message.error(error);
            },
            formatError() {
                this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
            },
            add() {
                if (!this.form.img) {
                    this.$Message.error('请首先图片文件。');
                    return;
                }
                this.$refs.marketingadd.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        var activeEditor = tinymce.get('tinymceEditerAddContent');
                        activeEditor.selection.select(activeEditor.getBody());
                        this.form.content = activeEditor.selection.getContent({'format': 'html'});
                        var activeEditor1 = tinymce.get('tinymceEditerAddMark');
                        activeEditor1.selection.select(activeEditor1.getBody());
                        this.form.summary = activeEditor1.selection.getContent({'format': 'html'});
                        let data = this.form;
                        this.apiPost('marketing_mode', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.marketingadd.resetFields();
                                this.$refs.upImg.clearFiles();
                            }, (data, msg) => {
                                this.modal_loading = false;
                                this.$Message.error(msg);
                            });
                        }, (res) => {
                            // 处理错误信息
                            this.modal_loading = false;
                            this.$Message.error('网络异常，请稍后重试。');
                        });
                    }
                });
            }
        },
        props: {
            industry: {
                default: {}
            },
            gpd: {default: 1},
        },
        mixins: [http, common, tinymceInit]
    };
</script>
