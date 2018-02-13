<template>
    <div style="width:100%;height:100%;" id="keyword_pie"></div>
</template>

<script>
    import echarts from 'echarts';
    import http from '../../../libs/http';

    export default {
        name: 'dataSourcePie',
        data() {
            return {
                keywordPieCharts: {},
                countArr: [],
                nameArr: [],
                color: this.$store.state.commondata.color
            }
        },
        computed: {
            seriesData: function () {
                return this.nameArr.map(function (name, index) {
                    return name + '类关键词';
                });
            },
            finalseries: function () {
                let length = this.color.length;
                let _this = this;
                let random = Math.ceil(Math.random() * 100);
                return this.countArr.map(function (count, index) {
                    let colorIndex = (index + random) % length;
                    let color = _this.color[colorIndex];
                    let name = _this.nameArr[index] + '类关键词';
                    let item = {};
                    item = {
                        itemStyle: {
                            normal: {
                                color: color
                            }
                        },
                        name: name,
                        value: parseInt(count)
                    };
                    return item;
                });
                // 原始数据
                return [
                    {value: 2103456, name: 'ios', itemStyle: {normal: {color: '#9bd598'}}},
                    {value: 1305923, name: 'android', itemStyle: {normal: {color: '#ffd58f'}}}
                ];
            },
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
            }
        },
        methods: {
            getData() {
                // 获取相关统计信息
                this.apiGet('keyword_count').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.nameArr = data.name;
                        this.countArr = data.count;
                        this.keywordPieCharts.setOption(this.option);
                    });
                });
            },
            init() {
                this.keywordPieCharts = echarts.init(document.getElementById('keyword_pie'));
                let _this = this;
                window.addEventListener('resize', function () {
                    _this.keywordPieCharts.resize();
                });
            }
        },
        mounted() {
            this.init();
            this.$nextTick(() => {
                // 延迟加载
                this.getData();
            });
        },
        mixins: [http]
    };
</script>
