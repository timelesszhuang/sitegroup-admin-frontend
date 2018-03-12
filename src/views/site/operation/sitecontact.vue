<style>
    .change-pwd-form {
        padding: 20px;
    }
</style>
<template>
    <card>
        <div>
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>联系方式填写</span>
            </p>
            <div style="text-align:center">
                <Form ref="add" :model="form" :label-width="100" :rules="companyRule" class="change-pwd-form">
                    <Form-item label="传真" prop="fax">
                        <Input type="text" v-model="form.fax" placeholder="请输入传真"></Input>
                    </Form-item>
                    <Form-item label="微信" prop="weixin">
                        <Input type="text" v-model="form.weixin" placeholder="请输入微信"></Input>
                    </Form-item>
                    <Form-item label="QQ" prop="qq">
                        <Input type="text" v-model="form.qq" placeholder="请输入QQ"></Input>
                    </Form-item>
                    <Form-item label="400电话" prop="four00">
                        <Input type="text" v-model="form.four00" placeholder="请输入400电话"></Input>
                    </Form-item>
                    <Form-item label="邮编" prop="zipcode">
                        <Input type="text" v-model="form.zipcode" placeholder="请输入邮编"></Input>
                    </Form-item>
                    <Form-item label="邮箱" prop="email">
                        <Input type="text" v-model="form.email" placeholder="请输入邮箱"></Input>
                    </Form-item>
                    <Form-item label="手机" prop="mobile">
                        <Input type="text" v-model="form.mobile" placeholder="请输入手机"></Input>
                    </Form-item>
                    <Form-item label="座机" prop="telephone">
                        <Input type="text" v-model="form.telephone" placeholder="请输入座机"></Input>
                    </Form-item>
                    <Form-item label="通讯地址" prop="address">
                        <Input type="text" v-model="form.address" placeholder="请输入通讯地址"></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="success" size="large" :loading="modal_loading" @click="add">更新</Button>
            </div>
        </div>
    </card>
</template>
<script>
    import http from '../../../libs/http';

    export default {
        data() {
            return {
                modal: false,
                modal_loading: false,
                companyRule: {},
            }
        },
        created() {
        },
        methods: {
            add() {
                this.$refs.add.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = {
                            id: this.form.id,
                            fax: this.form.fax,
                            weixin: this.form.weixin,
                            qq: this.form.qq,
                            four00: this.form.four00,
                            zipcode: this.form.zipcode,
                            email: this.form.email,
                            mobile: this.form.mobile,
                            telephone: this.form.telephone,
                            address: this.form.address,
                        }
                        this.apiPost('user/siteResource', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.add.resetFields();
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
            },
        },
        props: {
            form: {}
        },
        mixins: [http]
    }
</script>
