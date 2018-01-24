import util from "./util";

/**
 * Created by timeless on 18.1.20
 * @author 赵兴壮<834916321@qq.com>
 * 该组件 主要用于ajax 相关请求
 */

const ajaxMethods = {
    methods: {
        apiGet (url, data) {
            return new Promise((resolve, reject) => {
                axios.get(url, data).then((response) => {
                    resolve(response.data);
                }, (response) => {
                    reject(response);
                });
            });
        },
        // ajax post相关的操作
        apiPost (url, data) {
            return new Promise(function (resolve, reject) {
                axios.post(url, data).then((response) => {
                    resolve(response.data);
                }).catch(function (response) {
                    reject(response);
                });
            });
        },
        apiDelete (url, id) {
            return new Promise((resolve, reject) => {
                axios.delete(url + id).then((response) => {
                    resolve(response.data);
                }, (response) => {
                    reject(response);
                });
            });
        },
        apiPut (url, obj) {
            return new Promise((resolve, reject) => {
                axios.put(url, obj).then((response) => {
                    resolve(response.data);
                }, (response) => {
                    reject(response);
                });
            });
        },
        handleAjaxResponse (res, cb, errCb) {
            console.log(res);
            // 处理ajax请求完成之后相应
            if (res.status === 'success') {
                if (typeof cb === 'function') {
                    cb(res.data, res.msg);
                }
            } else if (res.status === 'failed') {
                if (typeof errCb === 'function') {
                    errCb(res.data, res.msg);
                }
            } else if (res.status === 'loginout') {
                errCb(res.data, res.msg);
            }
        }
    }
}
export default ajaxMethods;
