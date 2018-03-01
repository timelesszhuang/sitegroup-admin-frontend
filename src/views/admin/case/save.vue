<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="900">
                <p slot="header">
                    <span>修改</span>
                </p>
                <div>
                    <Form ref="casesave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
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
                                    style="width:150px;text-align: left;position:relative;text-align: left;"
                                    label-in-value　@on-change="changeIndustry">
                                <Option v-for="(item, index) in industry" :value="item.id" :label="item.name"
                                        :key="index">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="核心解读" prop="summary">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerSaveMark"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Form-item label="案例内容" prop="content">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerSaveContent"></textarea>
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
                        {required: true, message: '请输入关键词', trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            this.init();
        },
        destroyed() {
            tinymce.get('tinymceEditerSaveContent').destroy();
            tinymce.get('tinymceEditerSaveMark').destroy();
        },
        methods: {
            init: function () {
                this.$nextTick(() => {
                    let height = document.body.offsetHeight - 500;
                    this.tinymceInit(this, height, 'tinymceEditerSaveContent');
                    this.tinymceInit(this, height, 'tinymceEditerSaveMark', 'mark');
                });
            },
            addmaterial(src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerSaveContent').insertContent(imgsrc);
                } else if (this.img === 'mark') {
                    // 字段4  自定义字段 写明作用
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerSaveMark').insertContent(imgsrc);
                } else if (this.img === 'thumbnail') {
                    this.form.image = src;
                }
            },
            editdata(editid) {
                this.apiGet('case_center/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.form = data;
                        tinymce.get('tinymceEditerSaveContent').setContent(this.form.content);
                        tinymce.get('tinymceEditerSaveMark').setContent(this.form.summary);
                        this.modal = true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            changeIndustry(value) {
                this.form.industry_name = value.label;
                this.form.industry_id = value.value;
            },
            add() {
                this.$refs.casesave.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        var activeEditor = tinymce.get('tinymceEditerSaveContent');
                        activeEditor.selection.select(activeEditor.getBody());
                        this.form.content = activeEditor.selection.getContent({'format': 'html'});
                        var activeEditor1 = tinymce.get('tinymceEditerSaveMark');
                        activeEditor1.selection.select(activeEditor1.getBody());
                        this.form.summary = activeEditor1.selection.getContent({'format': 'html'});
                        let data = this.form;
                        let id = data.id;
                        this.apiPut('case_center/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                ;
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.casesave.resetFields();
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
