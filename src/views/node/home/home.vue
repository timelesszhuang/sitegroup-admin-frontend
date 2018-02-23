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
    import cityData from './map-data/get-city-value.js';
    import keywordPie from '../../Common/home_info/keyword-pie';
    import visiteVolume from './components/visiteVolume.vue';
    import spiderTrend from '../../Common/home_info/spider-trend';
    import pageviewTrend from '../../Common/home_info/pageview-trend';
    import userFlow from './components/userFlow.vue';
    import mapDataTable from './components/mapDataTable.vue';
    import toDoListItem from './components/toDoListItem.vue';
    import userLoginInfo from '../../Common/home_info/user-login-info';
    import fourStaticsInfo from '../../Common/home_info/four-statics-info';
    import marketMode from '../../Common/home_info/market-mode';
    import caseCenter from '../../Common/home_info/case-center';

    export default {
        name: 'home',
        components: {
            keywordPie,
            visiteVolume,
            spiderTrend,
            userFlow,
            mapDataTable,
            toDoListItem,
            userLoginInfo,
            fourStaticsInfo,
            pageviewTrend,
            marketMode,
            caseCenter
        },
        data() {
            return {
                toDoList: [
                    {
                        title: '去iView官网学习完整的iView组件'
                    },
                    {
                        title: '去iView官网学习完整的iView组件'
                    },
                    {
                        title: '去iView官网学习完整的iView组件'
                    },
                    {
                        title: '去iView官网学习完整的iView组件'
                    },
                    {
                        title: '去iView官网学习完整的iView组件'
                    }
                ],
                cityData: cityData,
                showAddNewTodo: false,
                newToDoItemValue: ''
            };
        },
        methods: {
            addNewToDoItem() {
                this.showAddNewTodo = true;
            },
            addNew() {
                if (this.newToDoItemValue.length !== 0) {
                    this.toDoList.unshift({
                        title: this.newToDoItemValue
                    });
                    setTimeout(() => {
                        this.newToDoItemValue = '';
                    }, 200);
                    this.showAddNewTodo = false;
                } else {
                    this.$Message.error('请输入待办事项内容');
                }
            },
            cancelAdd() {
                this.showAddNewTodo = false;
                this.newToDoItemValue = '';
            }
        }
    };
</script>
