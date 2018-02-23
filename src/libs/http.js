/**
 * Created by timeless on 18.1.20
 * @author 赵兴壮<834916321@qq.com>
 * 该组件 主要用于ajax 相关请求
 */

const ajaxMethods = {
    methods: {
        apiGet(url, data) {
            return new Promise((resolve, reject) => {
                axios.get(url, data).then((response) => {
                    resolve(response.data);
                }, (response) => {
                    // console.log(response.status);
                    reject(response);
                });
            });
        },
        // ajax post相关的操作
        apiPost(url, data) {
            return new Promise(function (resolve, reject) {
                axios.post(url, data).then((response) => {
                    resolve(response.data);
                }).catch(function (response) {
                    // console.log(response.status);
                    reject(response);
                });
            });
        },
        apiDelete(url, id) {
            return new Promise((resolve, reject) => {
                axios.delete(url + id).then((response) => {
                    resolve(response.data);
                }, (response) => {
                    // console.log(response.status);
                    reject(response);
                });
            });
        },
        apiPut(url, obj) {
            return new Promise((resolve, reject) => {
                axios.put(url, obj).then((response) => {
                    resolve(response.data);
                }, (response) => {
                    // console.log(response.status);
                    reject(response);
                });
            });
        },
        handleAjaxResponse: function (res, cb, errCb = '') {
            // 处理ajax请求完成之后相应的数据字段规范
            // status 字符串且不可为空
            //        状态分为： success 表示请求成功 包含查询等数据为空的情况
            //           failed  表示请求操作失败，需要给出提示
            //           logout  表示需要重新登陆 没有获取到session信息
            //           noauth  表示没有权限操作 比如调取接口错误
            // msg   可为空字符串 提醒的标题信息
            // detail 错误等的相关信息
            // data  可为空数组 请求成功的数据
            if (res.status === 'success') {
                if (typeof cb === 'function') {
                    res.msg = res.msg === '' ? '操作成功' : res.msg;
                    if (typeof cb === 'function') {
                        cb(res.data, res.msg);
                    } else {
                        this.$Notice.success({
                            title: res.msg,
                            desc: res.detail === undefined ? '' : res.detail
                        });
                    }
                }
            } else if (res.status === 'failed') {
                if (typeof errCb === 'function') {
                    errCb(res.data, res.msg);
                } else {
                    this.$Notice.error({
                        title: res.msg === '' ? '操作失败' : res.msg,
                        desc: res.detail === undefined ? '' : res.detail
                    });
                }
            } else if (res.status === 'logout') {
                // 后端提示没有权限操作的时候跳到403页面
                if (!this.$store.state.app.autoLoginStatus) {
                    // 设置自动登陆
                    this.$store.commit('changeAutoLoginStatus', true);
                    // if (typeof errCb === 'function') {
                    //     errCb(res.data, res.msg);
                    // } else {
                    //     this.$Notice.error({
                    //         title: res.msg === '' ? '操作异常，请售后再试' : res.msg,
                    //         desc: res.detail === undefined ? '' : res.detail
                    //     });
                    // }
                    this.autologin();
                }
            } else if (res.status === 'noauth') {
                this.$Notice.warning({
                    title: res.msg === '' ? '操作异常，请稍后再试' : res.msg,
                    desc: res.detail === undefined ? '' : res.detail
                });
            } else {
                this.$Notice.warning({
                    title: res.msg === '' ? '返回值状态异常，请稍后再试' : res.msg
                });
            }
        },
        autologin() {
            // 首先判断是不是允许自动登陆
            if (!Cookies.get('remember') || !Cookies.get('rememberKey')) {
                // 用户没有设置自动登陆
                this.$store.commit('logout', this);
                this.$router.push({
                    name: 'login'
                });
                return;
            }
            this.$Message.success('系统正在自动登录......');
            let type = 'node';
            if (parseInt(Cookies.get('type')) === 3) {
                type = 'site';
            }
            let data = {
                remember_key: Cookies.get('rememberKey'),
                login_id: Cookies.get('user_id'),
                login_type: type
            };
            this.apiPost('auto_login', data).then((res) => {
                this.handleAjaxResponse(res, (data, msg) => {
                    // 自动登陆成功的操作
                    // 用户的user_id
                    let user_id = data.login_id;
                    // 自动登陆的key
                    let rememberKey = data.remember_key;
                    // 用户的类型
                    let type = data.login_type;
                    Cookies.set('user_id', user_id);
                    Cookies.set('type', type);
                    Cookies.set('rememberKey', rememberKey);
                    this.$store.commit('changeAutoLoginStatus', false);
                    if (parseInt(type) === 3) {
                        // 清空下session 中siteId 然后就会跳转到 选择站点的页面
                        Cookies.remove('siteId');
                        // 需要跳转到站点选择页面
                        this.$router.push({
                            name: 'site_select'
                        });
                        return;
                    }
                    this.$router.push({
                        name: this.$store.state.app.homeIndex
                    });
                }, (data, msg) => {
                    // 自动登录失败的操作
                    this.$store.commit('logout');
                    this.$router.push({
                        name: 'login'
                    });
                });
            });
        }
    }
};
export default ajaxMethods;
