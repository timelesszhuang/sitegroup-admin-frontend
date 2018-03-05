<template>

    <card>
        <div class="echarts">
            <div style="width: 700px;height: 20px;margin: 0 auto">
                <Row>
                    <Col span="9">
                    <Date-picker type="daterange" v-model="time" placement="bottom-end" placeholder="选择日期查询"></Date-picker>
                    </Col>
                    <Select v-model="site_id" style="width:310px;" label-in-value filterable clearable>
                        <Option v-for="item in site" :value="item.id" :label="item.text" :key="item.id">
                            {{ item.text }}
                        </Option>
                    </Select>
                    &nbsp;<Button type="primary" @click="queryData">查询</Button>
                </Row>
            </div>
            <div style=" width: 700px;
    height: 500px;
    margin: 0 auto;
    padding-bottom: 50px;" id="spider-trend"></div>
        </div>
    </card>

</template>

<script>
  import echarts from 'echarts';
  import http from '../../../libs/http';

  export default {
      name: 'spiderTrend',
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
              this.apiGet('engineCount', data).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.series = data.type;
                      this.xAxisData = data.time;
                      this.spiderTrendCharts.setOption(this.option);
                  });
              });
          },
          init () {
              this.spiderTrendCharts = echarts.init(document.getElementById('spider-trend'));
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