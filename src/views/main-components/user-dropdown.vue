<template>
    <div class="user-dropdown-menu-con">
        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                    <span class="main-user-name">
                        {{this.$store.state.user.userName}}
                    </span>
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="(item, index) in dropdown" :key="index" :name="item.name">
                        {{ item.text }}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <!--<Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>-->
        </Row>
    </div>
</template>

<script>
    import util from '@/libs/util.js';
    import http from '../../libs/http';

    export default {
        name: 'user-dropdown',
        data() {
            return {
                dropdown: [
                    {'name': 'adminownSpace', 'text': '个人中心'},
                    {'name': 'loginout', 'text': '退出系统'}
                ],
                nodedropdown: [
                    {'name': 'nodeownSpace', 'text': '个人中心'},
                    {'name': 'companyinfo', 'text': '企业信息'},
                    {'name': 'loginout', 'text': '退出系统'}
                ],
                userdropdown: [
                    {'name': 'userownSpace', 'text': '个人中心'},
                    {'name': 'loginout', 'text': '退出系统'}
                ]
            };
        },
        methods: {
            // 获取相关用户的信息
            handleClickUserDropdown(name) {
                if (name === 'nodeownSpace') {
                    // node企业的个人信息相关信息
                    util.openNewPage(this, 'nodeownspace');
                    this.$router.push({
                        name: 'nodeownspace'
                    });
                } else if (name === 'adminownSpace') {
                    // 管理员的个人中心
                    util.openNewPage(this, 'adminownspace');
                    this.$router.push({
                        name: 'adminownspace'
                    });
                } else if (name === 'userownSpace') {
                    // 用户的个人中心
                    util.openNewPage(this, 'userownspace');
                    this.$router.push({
                        name: 'userownspace'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.apiGet('logout').then((res) => {
                        this.handleAjaxResponse(res, (data) => {
                            this.$store.commit('logout', this);
                            this.$store.commit('clearOpenedSubmenu');
                            this.$router.push({
                                name: 'login'
                            });
                        });
                    }, (res) => {
                        // 出错的处理方法
                    });
                } else if (name === 'companyinfo') {
                    // 公司相关信息完善
                }
            },
            // 获取用户的相关信息
            getUserInfo() {
                // 获取用户相关信息
                this.apiGet('home_info').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        let type = Cookies.get('type');
                        this.$store.commit('setLoginInfo', data);
                        localStorage.userName = data.user_name;
                        if (parseInt(type) === 2) {
                            localStorage.comeId = data.com_id;
                            // 用vuex 更新数据
                            this.$store.commit('setComName', data.com_name);
                            // 企业信息完善状态 1未填写 2待审核 3审核失败 4需要审核
                            localStorage.infoStatus = data.info_status;
                            let infoStatus = true;
                            if (parseInt(data.info_status) === 1 || parseInt(data.info_status) === 3) {
                                infoStatus = false;
                            }
                            this.$store.commit('setInfoStatus', infoStatus);
                        }
                    });
                });
            }
        },
        mixins: [http],
        created() {
            if (parseInt(Cookies.get('type')) === 3) {
                this.dropdown = this.userdropdown;
            } else if (parseInt(Cookies.get('type')) === 2) {
                this.dropdown = this.nodedropdown;
            }
            this.getUserInfo();
        }
    };
</script>

<style scoped>

</style>