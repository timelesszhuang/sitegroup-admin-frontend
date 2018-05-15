<style lang="less">
    @import "../../Common/home_info/home.less";
    @import "../../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
                <fourStaticsInfo></fourStaticsInfo>

            </Col>

            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="24"  :style="{marginBottom: '10px'}">
                        <!--用户登陆之后展现的统计信息-->
                        <Row>
                            <Card>
                                <p slot="title" class="card-title">
                                    <Icon type="ios-shuffle-strong"></Icon>
                                  用户登录信息
                                </p>
                                <div class="line-chart-con1">
                                    <userLoginInfo></userLoginInfo>
                                </div>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="16">

                <Row>
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="ios-shuffle-strong"></Icon>
                            浏览量趋势
                        </p>
                        <div class="line-chart-con1">
                            <pageview-trend></pageview-trend>
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
  import keywordPie from '../../Common/home_info/keyword-pie';
  import pageviewTrend from '../../Common/home_info/rootpageview-trend';
  import userLoginInfo from '../../Common/home_info/rootuser-login-info';
  import fourStaticsInfo from '../../Common/home_info/rootfour-statics-info';

  export default {
      name: 'home',
      components: {
          keywordPie,
          userLoginInfo,
          fourStaticsInfo,
          pageviewTrend

      },
      methods: {}
  };
</script>
