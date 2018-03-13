<style lang="less">
    @import './own-space.less';
</style>
<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div >
                <Form ref="add" :model="form" :label-width="100" style="width: 400px" :rules="companyRule" class="change-pwd-form">
                    <Form-item label="公司" prop="name">
                        <Input type="text" v-model="form.name" placeholder="请输入公司"></Input>
                    </Form-item>
                    <Form-item label="联系人" prop="contacts">
                        <Input type="text" v-model="form.contacts" placeholder="请输入联系人"></Input>
                    </Form-item>
                    <Form-item label="手机" prop="mobile">
                        <Input type="text" v-model="form.mobile" placeholder="请输入手机"></Input>
                    </Form-item>
                    <Form-item label="邮箱" prop="email">
                        <Input type="text" v-model="form.email" placeholder="请输入邮箱"></Input>
                    </Form-item>
                    <Form-item label="固话" prop="tel">
                        <Input type="text" v-model="form.tel" placeholder="请输入固话"></Input>
                    </Form-item>
                    <Form-item label="微信" prop="wechat">
                        <Input type="text" v-model="form.wechat" placeholder="请输入微信"></Input>
                    </Form-item>
                    <Form-item label="QQ" prop="QQ">
                        <Input type="text" v-model="form.qq" placeholder="请输入qq"></Input>
                    </Form-item>
                    <FormItem label="登录密码：">
                        <Button  size="small" @click="changePwd">修改密码</Button>
                    </FormItem>
                    <div style="text-align: right">  <Button type="success" size="large" :loading="modal_loading" @click="add">更新</Button></div>

                </Form>

            </div>
        </Card>
        <changePwd ref="changePwd" ></changePwd>
    </div>
</template>

<script>
    import http from '../../../libs/http';
    import changePwd from '../../Common/Account/Changepwd.vue';

    export default {
        data () {
            return {
                form: {
                    name: '',
                    contacts: '',
                    email: '',
                    mobile: '',
                    tel: '',
                    wechat: '',
                    qq: ''
                },
                modal_loading: false,
                companyRule: {}
            };
        },
        components: {changePwd},
        created () {
            this.getdata();
        },

        methods: {
            changePwd () {
                this.$refs.changePwd.modal = true;
            },
            getdata () {
                this.apiGet('readuser').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.form = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            add () {
                this.$refs.add.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        let id = data.id;
                        this.apiPut('user/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.$Message.success(msg);
                                this.modal_loading = false;
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
        mixins: [http]
    };
</script>
