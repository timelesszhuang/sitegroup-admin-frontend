<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="600" :mask-closable="false">
                <p slot="header">
                    <span>添加子站</span>
                </p>
                <div>
                    <Form ref="savechildsite" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="子站点名" prop="name" style="text-align: left;width:500px;">
                            <Input type="text" v-model="form.name"
                                   placeholder="请填写子站点名"></Input>
                        </Form-item>
                        <Form-item label="子站英文名" prop="en_name"  style="text-align: left;width:500px;">
                            <Input type="text" v-model="form.en_name"
                                   placeholder="请填写子站英文名"></Input>
                        </Form-item>
                        <Form-item label="详情" prop="detail"  style="text-align: left;width:500px;">
                            <Input v-model="form.detail" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                                   placeholder="请填写子站详情">
                            </Input>
                        </Form-item>
                        <Form-item label="排序" prop="sort"  style="text-align: left;width:500px;">
                            <Input-number :min="0" v-model="form.sort" placeholder="请填写当前排序"></Input-number>
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
        data () {
            return {
                modal: false,
                modal_loading: false,
                form: {
                    name: '',
                    en_name: '',
                    detail: '',
                    sort: 0

                },
                AddRule: {
                    name: [
                        {required: true, message: '请填写子站点名', trigger: 'blur'}
                    ],
                    en_name: [
                        {required: true, message: '请填写子站英文名', trigger: 'blur'}
                    ],
                    detail: [
                        {required: true, message: '请填写子站详情', trigger: 'blur'}
                    ]

                }
            };
        },
        methods: {
            getSiteId (site_id) {
                this.form.site_id = site_id;
            },
            getEditData (editid) {
                this.apiGet('childsitelist/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.form = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                // 处理错误信息
                });
            },
            add () {
                this.$refs.savechildsite.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        let id = data.id;
                        this.apiPut('childsitelist/'+ id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                this.$emit('getchilddata');
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.savechildsite.resetFields();
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
        mixins: [http, common]
    };
</script>
