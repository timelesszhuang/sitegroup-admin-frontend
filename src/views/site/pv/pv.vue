<template>
  <div class="echarts">
    <div style="width: 500px;height: 20px;margin: 0 auto">
      <Row>
        <Col span="9">
        <Date-picker type="daterange" v-model="time" placement="bottom-end" placeholder="选择日期查询"></Date-picker>
        </Col>
        &nbsp;<Button type="primary" @click="queryData">查询</Button>
      </Row>
    </div>
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
  </div>
</template>
<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import http from '../../../libs/http';
  export default {
    name: 'view',
    components: {
      IEcharts,
    },
    props: {},
    data: () => ({
      time:[],
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
            name:'',
            type:'line',
            stack: '',
            areaStyle: {normal: {}},
            data:[]
          },
        ]
      },
    }),
    created() {
      this.doRandom();
    },
    methods: {
      queryData() {
        this.doRandom();
      },
      doRandom() {
        const that = this;
        let data = {
          params: {
            time: this.time,
          }
        }
        this.apiGet('user/pv', data).then((data) => {
          this.handleAjaxResponse(data, (data, msg) => {
            that.bar.legend.data = data.type;
            that.bar.xAxis.data = data.time;
            that.bar.series = data.type;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        },)

//        that.loading = !that.loading;
      },
      onReady(instance) {
      },
      onClick(event, instance, echarts) {
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
