<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="600" :mask-closable="false">
                <p slot="header">
                    <span>修改</span>
                </p>
                <div>
                    <Form ref="linksave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="名称" prop="name">
                            <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
                        </Form-item>
                        <Form-item label="链接" prop="domain">
                            <Input type="text" v-model="form.domain" placeholder="请输入域名"></Input>
                        </Form-item>
                        <Form-item label="详情" prop="detail">
                            <Input v-model="form.detail" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                                   placeholder="请输入详情">
                            </Input>
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
    export default {
        data() {
            return {
                modal: false,
                modal_loading: false,
                AddRule: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    domain: [
                        {required: true, message: '请输入链接', trigger: 'blur'},
                    ],
                    detail: [
                        { message: '请输入详情', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            add() {
                this.$refs.linksave.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        let id = data.id;
                        this.apiPut('links/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.getFriendLink(true);
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.linksave.resetFields();
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
        props: {
            gpd: {default: 1},
            form: {
                default: {
                    name: '',
                    detail: '',
                    domain: ''
                }
            }
        },
        mixins: [http,common]
    }
</script>
