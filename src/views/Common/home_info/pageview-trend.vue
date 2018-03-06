<template>
    <!--浏览量趋势-->
    <div style="width:100%;height:100%;" id="pageview-trend"></div>
</template>

<script>
    import echarts from 'echarts';
    import http from '../../../libs/http';

    export default {
        name: 'pageviewTrend',
        data() {
            return {
                spiderTrendCharts: {},
                xAxisData: [],
                series: [],
                color: this.$store.state.commondata.color
            };
        },
        computed: {
            finalseries: function () {
                let length = this.color.length;
                let _this = this;
                let random = Math.ceil(Math.random() * 100);
                return this.series.map(function (data, index) {
                    let colorIndex = (index + random) % length;
                    let color = _this.color[colorIndex];
                    data['areaStyle'] = {
                        normal: {
                            color: color
                        }
                    };
                    data['name'] = '浏览量(pv)统计';
                    return data;
                });
            },
            option: function () {
                return {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {
                        top: '3%',
                        left: '1.2%',
                        right: '1%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.xAxisData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: this.finalseries
                };
            }
        },
        methods: {
            getData() {
                // 获取相关统计信息
                this.apiGet('pv_show').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        //console.log(data);
                        this.series = data.type;
                        this.xAxisData = data.time;
                        this.spiderTrendCharts.setOption(this.option);
                    });
                });
            },
            init() {
                this.spiderTrendCharts = echarts.init(document.getElementById('pageview-trend'));
                // 页面resize 的时候触发
                let _this = this;
                window.addEventListener('resize', function () {
                    _this.spiderTrendCharts.resize();
                });
            }
        },
        mounted() {
            this.init();
            // 加载获取数据库中数据
            this.getData();
        },
        mixins: [http]
    };
</script>