<!--<template>-->
  <!--<div class="echarts">-->
    <!--<IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>-->
  <!--</div>-->
<!--</template>-->
<!--<script type="text/babel">-->
  <!--import echarts from 'echarts';-->
  <!--import http from '../../../libs/http';-->
  <!--export default {-->
    <!--name: 'view',-->
    <!--components: {-->
      <!--IEcharts,-->
    <!--},-->
    <!--props: {},-->
    <!--data: () => ({-->
      <!--loading: false,-->
      <!--bar: {-->
        <!--color: ["#13CE66","#F7BA2A","#FF4949"],-->
        <!--tooltip: {-->
          <!--trigger: 'axis',-->
          <!--formatter: '{b} <br/>{a}:{c}个',-->
          <!--axisPointer: {            // 坐标轴指示器，坐标轴触发有效-->
            <!--type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'-->
          <!--}-->
        <!--},-->
        <!--grid: {-->
          <!--left: '20%',-->
          <!--right: '25%',-->
          <!--containLabel: true-->
        <!--},-->
        <!--title: {-->
          <!--text: '关键词统计',-->
          <!--left: 'center',-->
          <!--top: 10-->
        <!--},-->
        <!--xAxis: [-->
          <!--{-->
            <!--formatter: '{b}<br/>{a}:{c}',-->
            <!--type: 'category',-->
            <!--data: [],-->
            <!--axisLabel: {-->
              <!--interval: 0,-->
              <!--rotate: -20,-->
              <!--formatter: function (value) {-->
                <!--return value + "类关键词";-->
              <!--}-->
            <!--},-->
          <!--}-->
        <!--],-->
        <!--yAxis: [-->
          <!--{-->
            <!--type: 'value'-->
          <!--}-->
        <!--],-->
        <!--series: [-->
          <!--{-->
            <!--color: ["#13CE66","#F7BA2A","#FF4949"],-->
            <!--name: '共',-->
            <!--type: 'bar',-->
            <!--barWidth: '17%',-->
            <!--data: [],-->
          <!--}-->
        <!--]-->
      <!--},-->

    <!--}),-->
    <!--methods: {-->
      <!--init(){-->
        <!--this.doRandom();-->
      <!--},-->
      <!--queryData() {-->
        <!--this.doRandom();-->
      <!--},-->
      <!--doRandom() {-->
        <!--const that = this;-->
        <!--this.apiGet('keyword/KeywordCount').then((data) => {-->
          <!--this.handleAjaxResponse(data, (data, msg) => {-->
            <!--that.bar.series[0].data = data.count;-->
            <!--that.bar.xAxis[0].data = data.name;-->
          <!--}, (data, msg) => {-->
            <!--this.$Message.error(msg);-->
          <!--})-->
        <!--},)-->

<!--//        that.loading = !that.loading;-->
      <!--},-->
      <!--onReady(instance) {-->
      <!--},-->
      <!--onClick(event, instance, echarts) {-->
      <!--}-->
    <!--},-->
    <!--mixins: [http]-->

  <!--};-->
<!--</script>-->

<!--<style scoped>-->
  <!--.echarts {-->
    <!--width: 98%;-->
   <!--margin-top: 30px;-->
    <!--height: 500px;-->
    <!--float: left;-->
    <!--padding-bottom: 50px;-->
  <!--}-->
<!--</style>-->
<template>
  <div style=" width: 700px;
    height: 500px;
    margin: 0 auto;
    padding-bottom: 50px;" id="pageview-keyword"></div>

</template>

<script>
  import echarts from 'echarts';
  import http from '../../../libs/http';

  export default {
      name: 'pageviewTrend',
      data () {
          return {
              site: [],
              time: [],
              site_id: '',
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
                  title: {
                      text: '浏览量统计',
                      left: 'center',
                      top: 10
                  },
                  tooltip: {
                      trigger: 'axis',
                      formatter: '{b} <br/>{a}:{c}个',
                      axisPointer: { // 坐标轴指示器，坐标轴触发有效
                          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  grid: {
                      left: '20%',
                      right: '25%',
                      containLabel: true
                  },
                  xAxis: [
                      {
                          formatter: '{b}<br/>{a}:{c}',
                          type: 'category',
                          data: [],
                          axisLabel: {
                              interval: 0,
                              rotate: -20,
                              formatter: function (value) {
                                  return value + '类关键词';
                              }
                          }
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
          queryData () {
              this.getData();
              this.getSite((data) => {
                  this.site = data;
              });
          },
          getSite () {
              this.apiGet('getSites').then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.site = data;
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息
                  this.$Message.error('网络异常，请稍后重试。');
              });
          },
          getData () {
              // 获取相关统计信息
              let data = {
                  params: {
                      time: this.time,
                      site_id: this.site_id
                  }
              };
              this.apiGet('pvStatistic', data).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.series = data.type;
                      this.xAxisData = data.time;
                      this.spiderTrendCharts.setOption(this.option);
                  });
              });
          },
          init () {
              this.spiderTrendCharts = echarts.init(document.getElementById('pageview-keyword'));
              // 页面resize 的时候触发
              let _this = this;
              window.addEventListener('resize', function () {
                  _this.spiderTrendCharts.resize();
              });
          }
      },
      mounted () {
          this.getSite((data) => {
              this.site = data;
          });
          this.init();
          // 加载获取数据库中数据
          this.getData();
      },
      mixins: [http]
  };
</script>
<style scoped>
  .echarts {
    width: 800px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 50px;
  }
</style>