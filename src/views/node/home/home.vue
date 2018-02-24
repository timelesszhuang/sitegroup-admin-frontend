<style lang="less">
    @import "../../Common/home_info/home.less";
    @import "../../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
            <Row class-name="home-page-row1" :gutter="10">
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <!--用户登陆之后展现的统计信息-->
                <userLoginInfo></userLoginInfo>
                </Col>
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        关键词分布
                    </p>
                    <div class="data-source-row">
                        <keyword-pie></keyword-pie>
                    </div>
                </Card>
                </Col>
            </Row>
            </Col>
            <Col :md="24" :lg="16">
            <fourStaticsInfo></fourStaticsInfo>
            <Row>
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        爬虫爬取趋势
                    </p>
                    <div class="line-chart-con">
                        <spider-trend></spider-trend>
                    </div>
                </Card>
            </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-pulse-strong"></Icon>
                    浏览量趋势
                </p>
                <div class="data-source-row">
                    <pageview-trend></pageview-trend>
                </div>
            </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
            <marketMode></marketMode>
            </Col>
            <Col :md="24" :lg="8">
            <caseCenter></caseCenter>
            </Col>
        </Row>
    </div>
</template>

<script>
    import keywordPie from '../../Common/home_info/keyword-pie';
    import spiderTrend from '../../Common/home_info/spider-trend';
    import pageviewTrend from '../../Common/home_info/pageview-trend';
    import userLoginInfo from '../../Common/home_info/user-login-info';
    import fourStaticsInfo from '../../Common/home_info/four-statics-info';
    import marketMode from '../../Common/home_info/market-mode';
    import caseCenter from '../../Common/home_info/case-center';

    export default {
        name: 'home',
        components: {
            keywordPie,
            spiderTrend,
            userLoginInfo,
            fourStaticsInfo,
            pageviewTrend,
            marketMode,
            caseCenter
        },
        methods: {}
    };
</script>
