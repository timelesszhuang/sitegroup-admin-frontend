<template>
    <div class="echarts">
        <div style="width: 700px;height: 20px;margin: 0 auto">
            <Row>
                <Col span="9">
                <Date-picker type="daterange" v-model="time" placement="bottom-end" placeholder="选择日期查询"></Date-picker>
                </Col>
                <Select v-model="site_id" style="width:310px;" label-in-value filterable clearable>
                    <Option v-for="item in site" :value="item.id" :label="item.text" :key="item">
                        {{ item.text }}
                    </Option>
                </Select>
                &nbsp;<Button type="primary" @click="queryData">查询</Button>
            </Row>
        </div>
        <div style="width:100%;height:100%;" id="keyword_pie"></div>
    </div>
</template>
<script type="text/babel">
    import echarts from 'echarts';
    import http from '../../../libs/http';

    export default {
        name: 'view',
        option: function () {
            return {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}个 ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: this.seriesData
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '66%',
                        center: ['50%', '60%'],
                        data: this.finalseries,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        },
        data: () => ({
            site: [],
            time: [],
            site_id: "",
            loading: false,
            data: [],
            bar: {
                color: ["#20a0ff", "#BBFFFF"],
                title: {
                    text: '浏览量统计',
                    left: 'center',
                    top: 10
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    bottom: 'bottom',
                    data: []
                },
                grid: {
                    left: '5%',
                    right: '25%',
                    bottom: '20%',
                    containLabel: true

                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    axisLabel: {
                        interval: 0,
                        rotate: -25,
                    },
                    axisLine: {show: false},
                    splitNumber: 100,
                    splitLine: {
                        show: true,
                    },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '',
                        type: 'line',
                        stack: '',
                        areaStyle: {normal: {}},
                        data: []
                    },
                ]
            },

        }),
        mounted() {
            this.init();
            this.$nextTick(() => {
                // 延迟加载
                this.getData();
            });
        },
        methods: {
            init() {
                this.keywordPieCharts = echarts.init(document.getElementById('keyword_pie'));
                let _this = this;
                window.addEventListener('resize', function () {
                    _this.keywordPieCharts.resize();
                });
            },
            getData(){
                this.getSite();
                this.doRandom()
            },
            getSite() {
                this.apiGet('getSites').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.site = data
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                })
            },
            queryData() {
                this.doRandom();
                this.getSite((data) => {
                    this.site = data
                });
            },
            doRandom() {
                const that = this;
                let data = {
                    params: {
                        time: this.time,
                        site_id: this.site_id,
                    }
                };
                this.apiGet('pvStatistic', data).then((data) => {
                    this.handleAjaxResponse(data, (data, msg) => {
                        that.bar.legend.data = data.type;
                        that.bar.xAxis.data = data.time;
                        that.bar.series = data.type;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                },)
            }
        },
        mixins: [http]

    };
</script>

<style scoped>
    .echarts {
        width: 800px;
        height: 600px;
        margin: 0 auto;
        padding-bottom: 50px;
    }
</style>
