<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="900" :mask-closable="false">
                <p slot="header">
                    <span>修改</span>
                </p>
                <div>
                    <Form ref="systempushsave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="标题" prop="title">
                            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
                        </Form-item>
                        <Form-item label="推送节点" prop="node_ids">
                            <Select v-model="form.node_ids" multiple filterable
                                    style="width:150px;text-align: left;position:relative;text-align: left;">
                                <Option v-for="item in nodeids" :value="item.id" :label="item.name" :key="item.id">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="推送内容" prop="content">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerSave"></textarea>
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
    </div>

</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import tinymceInit from '../../../libs/tinymceInit';
    import tinymce from 'tinymce';

    export default {
        data() {
            return {
                spinShow: false,
                modal: false,
                modal_loading: false,
                AddRule: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            this.init();
        },
        destroyed() {
            tinymce.get('tinymceEditerSave').destroy();
        },
        methods: {
            init: function () {
                this.$nextTick(() => {
                    let height = document.body.offsetHeight - 500;
                    this.tinymceInit(this, height, 'tinymceEditerSave');
                });
            },
            updateData(data) {
                this.form.content = data;
            },
            changeIndustry(value) {
                this.form.industry_name = value.label;
                this.form.industry_id = value.value;
            },
            add() {
                this.$refs.systempushsave.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let activeEditor = tinymce.activeEditor;
                        let editBody = activeEditor.getBody();
                        activeEditor.selection.select(editBody);
                        let text = activeEditor.selection.getContent({'format': 'html'});
                        this.form.content = text;
                        let data = this.form;
                        let id = data.id;
                        this.apiPut('system_notice/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.systempushsave.resetFields();
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
            gpd: {default: 1},
            form: {
                default: {
                    node_ids: []
                }
            },
            nodeids: {
                default: []
            }
        },
        mixins: [http, common, tinymceInit, tinymce]
    };
</script>
