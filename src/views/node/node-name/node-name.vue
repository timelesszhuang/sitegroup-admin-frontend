<template>
    <div class="node-name">
        <a target="_blank" class="node-name-a" @click="sitelist">
            <Icon type="ios-paperplane-outline"></Icon>
            {{this.$store.state.user.comName}}
        </a>
    </div>
</template>

<script>
    export default {
        name: 'node-name',
        data () {
            return {
                // 企业信息完善的状态 true 表示已经完善
                infoStatus: this.$store.state.user.infoStatus
            };
        },
        methods: {
            sitelist () {
                this.$router.push({
                    name: 'site-management'
                });
            },
            setComInfo () {
                // 设置完善公司的相关信息
            }
        }
    };
</script>

<style scoped>

</style>