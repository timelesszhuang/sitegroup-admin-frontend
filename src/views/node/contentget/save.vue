<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="800" :mask-closable="false">
                <p slot="header">
                    <span>修改</span>
                </p>
                <div>
                    <Form ref="contentsave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="内容名称" prop="name">
                            <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
                        </Form-item>
                        <Form-item label="英文名" prop="en_name">
                            <Input type="text" v-model="form.en_name" placeholder="请输入英文名"></Input>
                        </Form-item>
                        <Form-item label="链接" prop="href">
                            <Input type="text" v-model="form.href" placeholder="请输入链接"></Input>
                        </Form-item>
                        <Form-item label="内容">
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
    import tinymceInit from '../../../libs/tinymceInit';
    import tinymce from 'tinymce';
    // 素材库相关图片
    import materialimg from '../../Common/article/materialimg';

    export default {
        components: {materialimg},
        data() {
            return {
                spinShow: true,
                modal: false,
                modal_loading: false,
                form: {
                    name: '',
                    en_name: '',
                    content: '',
                    href: ''
                },
                AddRule: {
                    en_name: [
                        {required: true, message: '请填写英文名', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            edit(editid) {
                this.apiGet('content_get/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.form = data;
                        tinymce.get('tinymceEditerSaveContent').setContent(this.form.content);
                        this.modal = true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            init: function () {
                this.$nextTick(() => {
                    let height = document.body.offsetHeight - 500;
                    this.tinymceInit(this, height, 'tinymceEditerSaveContent');
                });
            },
            addmaterial(src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerSaveContent').insertContent(imgsrc);
                } else if (this.img === 'suolue') {
                    this.form.thumbnails = src;
                }
            },
            addimg(img) {
                this.img = img;
                this.$refs.addmaterial.getData();
                this.$refs.addmaterial.modal = true;
            },
            add() {
                this.$refs.contentsave.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        let id = data.id;
                        this.apiPut('content_get/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.contentsave.resetFields();
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
        mounted() {
            this.init();
        },
        destroyed() {
            tinymce.get('tinymceEditerSaveContent').destroy();
        },
        props: {
            gpd: {default: 1},
        },
        mixins: [http, common, tinymceInit]
    };
</script>
