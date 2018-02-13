<template>
    <Card>
        <Row type="flex" class="user-infor">
            <!--<Col span="8">-->
            <!--<Row class-name="made-child-con-middle" type="flex" align="middle">-->
                <!--<img class="avator-img" :src="avatorPath"/>-->
            <!--</Row>-->
            <!--</Col>-->
            <Col span="16" style="padding-left:6px;">
            <Row class-name="made-child-con-middle" type="flex" align="middle">
                <div>
                    <b class="card-user-infor-name">
                        {{this.$store.state.user.userName}}
                    </b>
                    <p>
                        {{this.$store.state.user.lastLoginTime}}
                    </p>
                </div>
            </Row>
            </Col>
        </Row>
        <div class="line-gray"></div>
        <Row class="margin-top-8">
            <Col span="8">
            <p class="notwrap">上次登录时间:</p></Col>
            <Col span="16" class="padding-left-8">
            {{this.$store.state.user.lastLoginTime}}
            </Col>
        </Row>
        <Row class="margin-top-8">
            <Col span="8">
            <p class="notwrap">上次登录地点:</p>
            </Col>
            <Col span="16" class="padding-left-8">
            {{this.$store.state.user.lastLoginAddress}}
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "user-login-info",
        computed: {
            avatorPath() {
                return localStorage.avatorImgPath;
            }
        }
    }
</script>

<style scoped>

</style>