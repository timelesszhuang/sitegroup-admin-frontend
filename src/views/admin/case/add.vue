<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="900">
                <p slot="header">
                    <span>添加</span>
                </p>
                <div>
                    <Form ref="caseadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="标题" prop="title">
                            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
                        </Form-item>
                        <Form-item label="来源" prop="source">
                            <Input type="text" v-model="form.source" placeholder="请输入来源"></Input>
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
                        <Form-item label="案例内容" prop="content">
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
    // 素材库相关图片
    import materialimg from '../../Common/article/materialimg';

    export default {
        components: {materialimg},
        data() {
            return {
                img: '',
                spinShow: true,
                modal: false,
                modal_loading: false,
                form: {
                    title: '',
                    source: '',
                    content: ''
                },
                AddRule: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    source: [
                        {required: true, message: '请输入来源', trigger: 'blur'}
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
            changeIndustry(value) {
                this.form.industry_name = value.label;
                this.form.industry_id = value.value;
            },
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
            add() {
                this.$refs.caseadd.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        var activeEditor = tinymce.get('tinymceEditerAddContent');
                        activeEditor.selection.select(activeEditor.getBody());
                        this.form.content = activeEditor.selection.getContent({'format': 'html'});
                        var activeEditor1 = tinymce.get('tinymceEditerAddMark');
                        activeEditor1.selection.select(activeEditor1.getBody());
                        this.form.summary = activeEditor1.selection.getContent({'format': 'html'});
                        let data = this.form;
                        this.apiPost('case_center', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.caseadd.resetFields();
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
                default: []
            },
            gpd: {default: 1},
        },
        mixins: [http, common, tinymceInit]
    };
</script>
