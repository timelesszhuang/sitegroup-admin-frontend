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
                        <h2 class="title">{{systemName}}</h2>
                        <Form ref="loginform" :model="loginform" :rules="loginRule">
                            <Form-item prop="user_name">
                                <Input type="text" v-model="loginform.user_name" size="large" placeholder="用户名">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="pwd">
                                <Input type="password" v-model="loginform.pwd" size="large" placeholder="密码">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="verifyCode">
                                <Row>
                                    <Col span="8">
                                    <Input type="text" v-model="loginform.verifyCode" size="large" placeholder="验证码">
                                    <Icon type="images" slot="prepend"></Icon>
                                    </Input>
                                    </Col>
                                    <Col span="12">
                                    <img :src="verifyUrl" @click="refreshVerify()" class="verify-pos"/>
                                    </Col>
                                </Row>
                            </Form-item>
                            <Form-item>
                                <Checkbox v-model="rememberMe">记住我</Checkbox>
                            </Form-item>
                            <Form-item>
                                <Button type="success" @click="handleSubmit('loginform')" size="large"
                                        :loading="loading" long
                                        icon="log-in">登录
                                </Button>
                            </Form-item>
                        </Form>
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
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';

    export default {
        data() {
            return {
                showlogin: true,
                loginform: {
                    user_name: '',
                    pwd: '',
                    verifyCode: ''
                },
                loginRule: {
                    user_name: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ],
                    verifyCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                title: '',
                systemName: '',
                loading: false,
                verifyUrl: '',
                verifyImg: window.HOST + 'captcha.html',
                successMsg: '',
                successShow: false,
                warningMsg: '',
                warningShow: false,
                rememberMe: true,
                boswer_show: false,
                copytime: ''
            };
        },
        methods: {
            showTitle(data) {
                this.systemName = data.SYSTEM_NAME;
                document.title = data.SYSTEM_NAME;
            },
            refreshVerify() {
                this.verifyUrl = this.verifyImg + '?v=' + moment().unix();
            },
            checkIsRememberPwd() {
                if (Cookies.get('rememberMe')) {
                    this.$Message.success('正在自动登录......');
                    let data = {
                        // remember: Lockr.get('rememberKey'),
                        // user_id: Lockr.get('user_id')
                    };
                    this.apiPost('common/login/autoLogin', data).then((res) => {
                        this.handelResponse(res, (data, msg) => {
                            // 成功的操作
                            this.resetCommonData(data, msg);
                        }, (data, msg) => {
                            // 失败的操作
                            this.loading = false;
                            this.showMsg('warning', '自动登录失败，请重新登陆');
                            Cookies.set('rememberMe', false);
                            this.showlogin = true;
                        });
                    });
                } else {
                    this.showlogin = true;
                }
            },
            handleSubmit() {
                if (this.loading) return;
                this.$refs.loginform.validate((valid) => {
                    if (valid) {
                        let data = {};
                        data.user_name = this.loginform.user_name;
                        data.pwd = this.loginform.pwd;
                        data.verifyCode = this.loginform.verifyCode;
                        this.loading = !this.loading;
                        this.apiPost('common/login/login', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                if (data.node_id === 0 && data.type === 2) {
                                    this.loading = !this.loading;
                                    util.warningNotice(this, '登陆异常', '该用户无管理权限');
                                    return false;
                                }
                                if (this.rememberMe) {
                                    Cookies.set('rememberMe', true, {expires: 7});
                                    Cookies.set('code', data.rememberKey, {expire: 7});
                                }
                                Cookies.set('type', data.type);
                                Cookies.set('user_id', data.type);
                                localStorage.rememberKey = data.rememberKey;
                                localStorage.userInfo = data;
                                localStorage.user_id = data.id;
                                localStorage.name = data.name;
                                localStorage.type = data.type;
                                // 需要跳转到首页
                                if (data.type === 2) {
                                    this.$store.commit('setUserType', data.type);
                                    this.$router.push({
                                        name: 'node_index'
                                    });
                                } else if (data.type === 1) {
                                    // 公司总管理后台账号进入
                                    this.$store.commit('setUserType', data.type);
                                    this.$router.push({
                                        name: 'admin_index'
                                    });
                                }
                            }, (data, msg) => {
                                // 根据状态来判断登陆状态
                                this.refreshVerify();
                                this.loading = false
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
                });
            }
        },
        created: function () {
            let date1 = new Date();
            this.copytime = date1.getFullYear();
            // 第一次如果是记住密码的话  会到本地存储中取出相关数据 然后自动登录
            // this.checkIsRememberPwd();
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
