<template>
    <Card>
        <p slot="title" class="card-title">
            <Icon type="android-wifi"></Icon>
            案例中心
            <span @click="more" class="more">
                <Icon type="more"></Icon>
            </span>
        </p>
        <div class="data-source-row">
            <ul>
                <li v-for="item in caseCenter">
                    <p class="text-overflow">
                        <a :href="item.url" target="_blank"
                           :title="item.title" @click="showCase(item.id)">{{ item.title }} {{ item.create_time }}</a>
                    </p>
                </li>
            </ul>
        </div>
        <caseShow ref="caseCenter"></caseShow>
    </Card>
</template>

<script>
    import http from '../../../libs/http';
    import caseShow from '../case/show';
    import util from '../../../libs/util';

    export default {
        name: 'case-center',
        components: {caseShow},
        data () {
            return {
                caseCenter: []
            };
        },
        methods: {
            more () {
                // 需要执行跳转到案例中心页
                util.openNewPage(this, 'casecenter');
                this.$router.push({
                    name: 'casecenter'
                });
            },
            showCase (id) {
                // alert(id);
                this.$refs.caseCenter.show(id);
            },
            getData () {
                this.apiGet('home_casecenter').then((data) => {
                    this.handleAjaxResponse(data, (data, msg) => {
                        this.caseCenter = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (data) => {
                    this.$Message.error('网络异常，请稍后重试');
                });
            }
        },
        created () {
            this.getData();
        },
        mixins: [http]
    };
</script>

<style scoped>

</style>