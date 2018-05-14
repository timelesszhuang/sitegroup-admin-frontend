<template>
    <!-- node 跟 user四个统计信息-->
    <Row :gutter="5">
        <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="user_created_count"
                :end-val="count.site_num"
                iconType="android-add-circle"
                color="#2d8cf0"
                intro-text="总站点数"
        ></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="visit_count"
                :end-val="count.keyword"
                iconType="ios-eye"
                color="#64d572"
                :iconSize="50"
                intro-text="关键词数"
        ></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="collection_count"
                :end-val="count.article"
                iconType="ios-book"
                color="#ffd572"
                intro-text="总文章数"
        ></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="transfer_count"
                :end-val="count.product"
                iconType="bug"
                color="#f25e43"
                intro-text="总产品数"
        ></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
            <infor-card
                    id-name="question_count"
                    :end-val="count.question"
                    iconType="ios-help-outline"
                    color="#2d8cf0"
                    intro-text="总问答数"
            ></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
        <infor-card
                id-name="shoulucount"
                :end-val="count.shoulu"
                iconType="upload"
                color="#ffd572"
                intro-text="收录量"
        ></infor-card>
        </Col>

    </Row>
</template>

<script>
    import http from '../../../libs/http';
    import inforCard from './inforCard.vue';

    export default {
        name: 'four-statics-info',
        data () {
            return {
                count: {
                    article: 0,
                    customer_num: 0,
                    keyword: 0,
                    product: 0,
                    pv: 0,
                    question: 0,
                    shoulu: 0,
                    site_num: 0
                }
            };
        },
        methods: {
            init () {
                // 获取相关统计信息
                this.apiGet('root_count').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        //console.log(data);
                        this.count = data;
                    });
                });
            }
        },
        created () {
            // 创建时间
            this.init();
        },
        components: {inforCard},
        mixins: [http]
    };
</script>

<style scoped>

</style>