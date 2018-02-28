<template>
    <card>
        <Tabs value="menu" @on-click="getdata">
            <Tab-pane label="个人中心" name="ownspace">
                <ownspace ref="ownspace"></ownspace>
            </Tab-pane>
            <Tab-pane label="用户登录日志" name="loginlog">
                <loginlog ref="loginlog"></loginlog>
            </Tab-pane>
        </Tabs>
    </card>
</template>
<script>
    import http from '../../../libs/http';
    import ownspace from './own-space.vue';
    import loginlog from './login-log';

    export default {
        components: {ownspace,loginlog},
        methods: {
            getdata(name) {
                if (name === 'ownspace') {
                    this.$refs.ownspace.getData();
                } else if (name === 'loginlog') {
                    this.$refs.loginlog.getData();
                }
            }
        },
        mixins: [http]
    };
</script>
