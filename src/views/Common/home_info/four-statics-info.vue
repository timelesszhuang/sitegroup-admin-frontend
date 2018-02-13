<template>
    <!--四个统计信息-->
    <Row :gutter="5">
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="user_created_count"
                :end-val="count.article"
                iconType="android-add-circle"
                color="#2d8cf0"
                intro-text="今日添加文章数"
        ></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="visit_count"
                :end-val="count.pv"
                iconType="ios-eye"
                color="#64d572"
                :iconSize="50"
                intro-text="今日浏览量"
        ></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="collection_count"
                :end-val="count.shoulu"
                iconType="upload"
                color="#ffd572"
                intro-text="收录数量"
        ></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="transfer_count"
                :end-val="count.useragent"
                iconType="bug"
                color="#f25e43"
                intro-text="爬取次数"
        ></infor-card>
        </Col>
    </Row>
</template>

<script>
    import http from '../../../libs/http';
    import inforCard from './inforCard.vue';

    export default {
        name: 'four-statics-info',
        data() {
            return {
                count: {
                    article: 0,
                    pv: 0,
                    shulu: 0,
                    useragent: 0,
                    // 甩单暂时去学校
                    shuaidan: 0
                }
            };
        },
        methods: {
            init() {
                // 获取相关统计信息
                this.apiGet('home_count').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.count = data;
                    });
                });
            }
        },
        created() {
            // 创建时间
            this.init();
        },
        components: {inforCard},
        mixins: [http]
    };
</script>

<style scoped>

</style>