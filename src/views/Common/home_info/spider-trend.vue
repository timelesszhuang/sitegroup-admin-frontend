<template>
    <!--浏览量趋势-->
    <div style="width:100%;height:100%;" id="spider-trend"></div>
</template>

<script>
    import echarts from 'echarts';
    import http from '../../../libs/http';

    export default {
        name: 'spiderTrend',
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
                    return data;
                });
                // 实例代码
                return [
                    {
                        name: '运营商/网络服务',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#2d8cf0'
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    }
                ];
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
                this.apiGet('home_en').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.series = data.type;
                        this.xAxisData = data.time;
                        this.spiderTrendCharts.setOption(this.option);
                    });
                });
            },
            init() {
                this.spiderTrendCharts = echarts.init(document.getElementById('spider-trend'));
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