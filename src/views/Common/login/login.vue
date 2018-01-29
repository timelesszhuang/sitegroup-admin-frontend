<style lang="less">
    @import 'login.less';
</style>
<template>
    <div>
        <div class="innr1">
            <div class="loginlogo" style="width:150px;height:60px;">
                <div class="tp"><img src="../../../images/loginlogo.png"></div>
            </div>
            <p style="float:left;font-size:20px;line-height:60px;">&nbsp;</p>
            <div class="logor">客服热线：4006-360-163 |
                <a href="http://www.salesman.cc/help.html" target="_blank">帮助</a>
            </div>
        </div>
        <div id="container">
            <div>
                <Row>
                    <Col span="14" offset="5">
                    <div class="login-form" v-show="showlogin">
                        <Tabs value="name1">
                            <TabPane :label=nodeName name="name1">
                                <Form ref="loginform" :model="loginform" :rules="loginRule">
                                    <Form-item prop="user_name">
                                        <Input type="text" v-model="loginform.user_name" size="large" placeholder="用户名">
                                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                                        </Input>
                                    </Form-item>
                                    <Form-item prop="password">
                                        <Input type="password" v-model="loginform.password" size="large"
                                               placeholder="密码">
                                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                        </Input>
                                    </Form-item>
                                    <Form-item prop="verify_code">
                                        <Row>
                                            <Col span="8">
                                            <Input type="text" v-model="loginform.verify_code" size="large"
                                                   placeholder="验证码">
                                            <Icon type="images" slot="prepend"></Icon>
                                            </Input>
                                            </Col>
                                            <Col span="12">
                                            <img :src="verifyUrl" @click="refreshVerify()" class="verify-pos"/>
                                            </Col>
                                        </Row>
                                    </Form-item>
                                    <Form-item>
                                        <Checkbox v-model="remember">记住我</Checkbox>
                                    </Form-item>
                                    <Form-item>
                                        <Button type="success" @click="handleSubmit('loginform')" size="large"
                                                :loading="loading" long
                                                icon="log-in">登录
                                        </Button>
                                    </Form-item>
                                </Form>
                            </TabPane>
                            <TabPane :label=siteName name="name2">
                                <Form ref="siteloginform" :model="siteloginform" :rules="loginRule">
                                    <Form-item prop="user_name">
                                        <Input type="text" v-model="siteloginform.user_name" size="large"
                                               placeholder="用户名">
                                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                                        </Input>
                                    </Form-item>
                                    <Form-item prop="password">
                                        <Input type="password" v-model="siteloginform.password" size="large"
                                               placeholder="密码">
                                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                        </Input>
                                    </Form-item>
                                    <Form-item prop="verify_code">
                                        <Row>
                                            <Col span="8">
                                            <Input type="text" v-model="siteloginform.verify_code" size="large"
                                                   placeholder="验证码">
                                            <Icon type="images" slot="prepend"></Icon>
                                            </Input>
                                            </Col>
                                            <Col span="12">
                                            <img :src="verifyUrl" @click="refreshVerify()" class="verify-pos"/>
                                            </Col>
                                        </Row>
                                    </Form-item>
                                    <Form-item>
                                        <Checkbox v-model="remember">记住我</Checkbox>
                                    </Form-item>
                                    <Form-item>
                                        <Button type="info" @click="handleSubmit('siteloginform')" size="large"
                                                :loading="loading" long
                                                icon="log-in">登录
                                        </Button>
                                    </Form-item>
                                </Form>
                            </TabPane>
                        </Tabs>

                    </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="login_di">
            <ul>
                <li><a href="http://mail.qiyvkf.com/" target="_blank">易至信</a></li>
                <li><a href="http://www.youdao.so/" target="_blank">有道云协作</a></li>
                <li><a href="http://www.qiangbi.cc/" target="_blank">网站建设</a></li>
                <li class="no_border">2015-{{copytime}} &copy; 北京易至信科技有限公司</li>
            </ul>
            <br/>
            <div style="text-align: center;padding-top: 20px">京ICP12019481号</div>
        </div>
    </div>
</template>
<script>
    import http from '../../../libs/http';
    import moment from 'moment';
    import util from '@/libs/util.js';

    export default {
        data() {
            return {
                showlogin: true,
                loginform: {
                    user_name: '',
                    password: '',
                    verify_code: ''
                },
                siteloginform: {
                    user_name: '',
                    password: '',
                    verify_code: ''
                },
                loginRule: {
                    user_name: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ],
                    verify_code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                title: '',
                nodeName: '系统管理员',
                siteName: '站点管理员',
                loading: false,
                verifyUrl: '',
                verifyImg: window.HOST + 'captcha.html',
                successMsg: '',
                successShow: false,
                warningMsg: '',
                warningShow: false,
                remember: true,
                boswer_show: false,
                copytime: ''
            };
        },
        methods: {
            refreshVerify() {
                this.verifyUrl = this.verifyImg + '?v=' + moment().unix();
            },
            handleSubmit(loginform) {
                if (this.loading) return;
                let type = 'node';
                let validate = false;
                let data = {};
                if (loginform === 'siteloginform') {
                    type = 'site';
                    this.$refs.siteloginform.validate((valid) => {
                        validate = valid;
                        data = this.siteloginform;
                    });
                } else {
                    this.$refs.loginform.validate((valid) => {
                        validate = valid;
                        data = this.loginform;
                    });
                }
                data.remember = this.remember;
                data.login_type = type;
                if (validate) {
                    this.loading = !this.loading;
                    this.apiPost('login', data).then((res) => {
                        this.handleAjaxResponse(res, (data, msg) => {
                            // 用户的user_id
                            let user_id = data.login_id;
                            // 自动登陆的key
                            let rememberKey = data.remember_key;
                            // 用户的类型
                            let type = data.login_type;
                            if (this.remember) {
                                Cookies.set('remember', true, {expires: 7});
                            }
                            Cookies.set('user_id', user_id);
                            Cookies.set('type', type);
                            Cookies.set('rememberKey', rememberKey);
                            localStorage.user_id = user_id;
                            localStorage.type = type;
                            localStorage.rememberKey = rememberKey;
                            // 需要跳转到首页
                            this.$store.commit('setUserType', type);
                            if (type === 2) {
                                // 节点首页
                                this.$router.push({
                                    name: 'node_index'
                                });
                            } else if (type === 3) {
                                // 用户首页
                                this.$router.push({
                                    name: 'user_index'
                                });
                            } else if (type === 1) {
                                // 公司总管理后台账号进入
                                this.$router.push({
                                    name: 'admin_index'
                                });
                            } else {
                                // 异常
                                this.$store.commit('setUserType', 0);
                                this.$router.push({
                                    name: 'login'
                                });
                            }
                        }, (data, msg) => {
                            // 根据状态来判断登陆状态
                            this.refreshVerify();
                            this.loading = false;
                            // 错误提示
                            util.errorNotice(this, '登录异常', msg);
                        });
                    }, (res) => {
                        // 处理错误信息
                        this.loading = false;
                        util.errorNotice(this, '网络异常', '请稍后再试或检查网络状况。');
                    });
                } else {
                    return false;
                }
            }
        },
        created: function () {
            let date1 = new Date();
            this.copytime = date1.getFullYear();
            // 第一次如果是记住密码的话  会到本地存储中取出相关数据 然后自动登录
            // this.checkIsRememberpassword();
            // 没有设置记住密码 的话 或者是第一次登陆的情况下 会到后台获取基本的配置数据
            /* this.apiGet('common/login/getNoauth').then((res) => {
                this.handelResponse(res, (data, msg) => {
                    this.showTitle(data);
                }, (data, msg) => {
                    this.showMsg('warning', msg);
                });
            }, (data) => {
                this.showMsg('warning', '网络异常，请稍后重试');
            }); */
            this.verifyUrl = this.verifyImg;
        },
        mixins: [http]
    };
</script>


<style scoped>


</style>
