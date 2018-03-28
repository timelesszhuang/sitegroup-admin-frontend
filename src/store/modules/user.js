import Cookies from 'js-cookie';

const user = {
    state: {
        // 公司名
        comName: '',
        // 企业完善信息的状态 true 表示已经设置完成
        infoStatus: true,
        lastLoginIp: '',
        lastLoginAddress: '',
        lastLoginTime: '',
        // 用户类型
        typeName: '',
        // 登录名
        userName: ''
    },
    mutations: {
        logout(state, vm) {
            Cookies.remove('user_id');
            Cookies.remove('type');
            Cookies.remove('rememberKey');
            Cookies.remove('siteId');
            Cookies.remove('locking');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        },
        setComName(state, comName) {
            // 设置公司
            state.comName = comName;
        },
        setLoginInfo(state, info) {
            // 设置页面上次登录记录
            state.userName = info.user_name;
            state.lastLoginIp = info.last_login_ip;
            state.lastLoginAddress = info.last_login_address;
            state.lastLoginTime = info.last_login_time;
            state.typeName = localStorage.typeName;
        },
        setInfoStatus(state, infoStatus) {
            // 设置站点的信息
            state.infoStatus = infoStatus;
        }
    }
};

export default user;
