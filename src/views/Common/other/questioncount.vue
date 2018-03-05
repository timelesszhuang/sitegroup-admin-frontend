<template>
  <!--浏览量趋势-->
  <div style="
    width:100%;
    height: 500px;
    float: left;
    padding-bottom: 50px;
  " id="question_count"></div>
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
                  tooltip: {
                      formatter: '{b} <br/>{a}:{c}篇',
                      trigger: 'axis',
                      axisPointer: {
                          type: 'cross',
                          label: {
                              backgroundColor: '#6a7985'
                          }
                      }
                  },
                  title: {
                      text: '问答统计',
                      left: 'center',
                      top: 10
                  },
                  grid: {
                      top: '15%',
                      left: '1%',
                      right: '2%',
                      bottom: '15%',
                      containLabel: true
                  },
                  xAxis: [
                      {
                          type: 'category',
                          boundaryGap: false,
                          data: this.xAxisData,
                          axisLabel: {
                              interval: 0,
                              rotate: -33
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
              this.apiGet('questionCount').then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.series = data.count;
                      this.xAxisData = data.name;
                      this.spiderTrendCharts.setOption(this.option);
                  });
              });
          },
          init () {
              this.spiderTrendCharts = echarts.init(document.getElementById('question_count'));
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