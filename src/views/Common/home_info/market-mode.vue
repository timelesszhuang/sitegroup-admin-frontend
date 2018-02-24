<template>
    <Card>
        <p slot="title" class="card-title">
            <!--首页营销模式 node 跟site 页面都需要-->
            <Icon type="android-map"></Icon>
            营销模式
            <span @click="more" class="more">
                <Icon type="more"></Icon>
            </span>
        </p>
        <div class="data-source-row">
            <ul>
                <li v-for="item in marketMode">
                    <span class="text-overflow">
                        <Icon type="android-more-vertical"></Icon>
                        <a :href="item.url" target="_blank"
                           :title="item.title" @click="showMode(item.id)">{{ item.title }} {{ item.create_time }}</a>
                    </span>
                </li>
            </ul>
        </div>
        <show ref="show"></show>
    </Card>
</template>

<script>
    import http from '../../../libs/http';
    import show from '../marketingmode/show';
    import util from '../../../libs/util';
    export default {
        name: 'marketmode',
        components: {show},
        data () {
            return {
                marketMode: []
            };
        },
        methods: {
            more () {
                // 需要执行跳转到营销模式页
                util.openNewPage(this, 'marketingmode');
                this.$router.push({
                    name: 'marketingmode'
                });
            },
            showMode (id) {
                this.$refs.show.show(id);
            },
            getData () {
                this.apiGet('home_marketmode').then((data) => {
                    this.handleAjaxResponse(data, (data, msg) => {
                        this.marketMode = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (data) => {
                    this.$Message.error('网络异常，请稍后重试');
                });
            }
        },
        created () {
            // 加载完成之后执行的操作
            this.getData();
        },
        mixins: [http]
    };
</script>

<style scoped>

</style>