import util from './util';

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
                    reject(response);
                });
            });
        },
        apiDelete(url, id) {
            return new Promise((resolve, reject) => {
                axios.delete(url + id).then((response) => {
                    resolve(response.data);
                }, (response) => {
                    reject(response);
                });
            });
        },
        apiPut(url, obj) {
            return new Promise((resolve, reject) => {
                axios.put(url, obj).then((response) => {
                    resolve(response.data);
                }, (response) => {
                    reject(response);
                });
            });
        },
        handleAjaxResponse(res, cb, errCb = '') {
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
                    cb(res.data, res.msg);
                }
            } else if (res.status === 'failed') {
                if (typeof errCb === 'function') {
                    errCb(res.data, res.msg);
                } else {
                    this.$Notice.error({
                        title: res.msg === '' ? '操作异常，请售后再试' : res.msg,
                        desc: res.detail === undefined ? '' : res.detail
                    });
                }
            } else if (res.status === 'logout') {
                // 后端提示没有权限操作的时候跳到403页面
                // errCb(res.data, res.msg);
                this.$Notice.error({
                    title: res.msg === '' ? '操作异常，请售后再试' : res.msg,
                    desc: res.detail === undefined ? '' : res.detail
                });
                this.$store.commit('logout', this);
                this.$router.push({
                    name: 'login'
                });
            } else if (res.status === 'noauth') {
                this.$Notice.warning({
                    title: res.msg === '' ? '操作异常，请售后再试' : res.msg,
                    desc: res.detail === undefined ? '' : res.detail
                });
            }
        }
    }
};
export default ajaxMethods;
