<template>
  <!--浏览量趋势-->
  <div style="

    height: 500px;

    padding-bottom: 50px;
  " id="keyword"></div>
</template>

<script>
  import echarts from 'echarts';
  import http from '../../../libs/http';

  export default {
      name: 'spiderTr',
      data () {
          return {
              spiderTrendCharts: {},
              xAxisData: [],
              series: [],
              color: this.$store.state.commondata.color
          };
      },
      computed: {
          option: function () {
              return {
                  color: ['#3398DB'],
                  tooltip: {
                      formatter: '{b} <br/>{a}:{c}个',
                      trigger: 'axis',
                      axisPointer: { // 坐标轴指示器，坐标轴触发有效
                          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  title: {
                      text: '关键词统计',
                      left: 'center',
                      top: 10
                  },
                  grid: {
                      left: '20%',
                      right: '20%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis: [
                      {
                          type: 'category',
                          data: this.xAxisData,
                          axisLabel: {
                              formatter: function (value) {
                                  return value + '类关键词';
                              }
                          },
                          axisTick: {
                              alignWithLabel: true
                          }
                      }
                  ],
                  yAxis: [
                      {
                          type: 'value'
                      }
                  ],
                  series: [
                      {
                          name: '共',
                          type: 'bar',
                          barWidth: '17%',
                          data: this.series
                      }
                  ]

              };
          }
      },
      methods: {
          getData () {
              // 获取相关统计信息
              this.apiGet('keyword_count').then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.series = data.count;
                      this.xAxisData = data.name;
                      this.spiderTrendCharts.setOption(this.option);
                  });
              });
          },
          init () {
              this.spiderTrendCharts = echarts.init(document.getElementById('keyword'));
              // 页面resize 的时候触发
              let _this = this;
              window.addEventListener('resize', function () {
                  _this.spiderTrendCharts.resize();
              });
          }
      },
      mounted () {
          this.init();
          // 加载获取数据库中数据
          this.getData();
      },
      mixins: [http]
  };
</script>