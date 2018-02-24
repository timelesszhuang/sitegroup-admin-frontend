<style>
    .node-edit-form {
        padding: 20px;
    }
</style>
<template>
    <div>
        <Modal
                v-model="modal">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>修改节点信息</span>
            </p>
            <div>
                <Form ref="nodeedit" :model="form" :label-width="90" :rules="nodeEditRule" class="node-edit-form">
                    <Form-item label="节点名" prop="name">
                        <Input type="text" v-model="form.name" placeholder="请输入节点名"></Input>
                    </Form-item>
                    <Form-item label="详情" prop="detail">
                        <Input type="text" v-model="form.detail" placeholder="请输入节点相关信息"></Input>
                    </Form-item>
                    <Form-item label="公司" prop="com_id">
                        <Select v-model="form.com_id" style="text-align: left"
                                label-in-value 　@on-change="changeCompany">
                            <Option v-for="item in company" :value="item.id" :label="item.name" :key="item.id">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="success" size="large" :loading="modal_loading" @click="edit">修改</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import http from "../../../libs/http";

    export default {
        data() {

            const checkcomtype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择公司名'));
                } else {
                    callback();
                }
            };
            return {
                company: {},
                form: {
                    name: '',
                    detail: '',
                    user_id: '',
                    user_name: ''
                },
                modal: false,
                modal_loading: false,
                label_in_value: true,
                nodeEditRule: {
                    name: [
                        {required: true, message: '请填写节点名', trigger: 'blur'},
                    ],
                    detail: [
                        {required: true, message: '请填写节点详情', trigger: 'blur'},
                    ],
                    com_id: [
                        {required: true, validator: checkcomtype, trigger: "blur"}
                    ]
                },
            }
        },
        mounted(){
            this.getCompany();
        },
        methods: {
            init(editid) {
                this.apiGet('node/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        delete  data.create_time;
                        delete  data.update_time;
                        this.form = data
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                }, (res) => {
                    //处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                })
            },
            getCompany() {
                this.apiGet('getCompany').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.company = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                }, (res) => {
                    //处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            changeCompany(value) {
                this.form.com_name = value.label;
                this.form.com_id = value.value;
            },
            edit() {
                this.$refs.nodeedit.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        let id = data.id;
                        this.apiPut('node/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                this.$parent.getData();
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.nodeedit.resetFields();
                            }, (data, msg) => {
                                this.modal_loading = false;
                                this.$Message.error(msg);
                            })
                        }, (res) => {
                            //处理错误信息
                            this.$Message.error('网络异常，请稍后重试。');
                            this.modal_loading = false;
                        })
                    } else {
                        return false;
                    }
                })
            }
        },
        props: {},
        mixins: [http]
    }
</script>
