<template>
    <card>
        <div class="echarts">
            <div style="width: 700px;height: 20px;margin: 0 auto">
                <Row>
                    <Col span="9">
                    <Date-picker type="daterange" v-model="time" placement="bottom-end" placeholder="选择日期查询"></Date-picker>
                    </Col>
                    <Select v-show="this.showsite" v-model="site_id" style="width:310px;" label-in-value filterable clearable>
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
    padding-bottom: 50px;" id="keyword_pie"></div>
        </div>
    </card>
</template>

<script>
  import echarts from 'echarts';
  import http from '../../../libs/http';

  export default {
      name: 'dataSourcePie',
      data () {
          return {
              showsite: true,
              site: [],
              time: [],
              site_id: '',
              keywordPieCharts: {},
              countArr: [],
              nameArr: [],
              color: this.$store.state.commondata.color
          };
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
                  let name = _this.nameArr[index];
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
                  title: {
                      text: ' 搜索引擎占比统计',
                      left: 'center',
                      top: 10
                  },
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
              this.apiGet('acount', data).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.nameArr = data.name;
                      this.countArr = data.count;
                      this.keywordPieCharts.setOption(this.option);
                  });
              });
          },
          init () {
              if (localStorage.siteId) {
                  this.showsite = false;
              }
              this.keywordPieCharts = echarts.init(document.getElementById('keyword_pie'));
              let _this = this;
              window.addEventListener('resize', function () {
                  _this.keywordPieCharts.resize();
              });
          }
      },
      mounted () {
          this.init();
          this.$nextTick(() => {
              // 延迟加载
              this.getData();
          });
          this.getSite((data) => {
              this.site = data;
          });
      },
      mixins: [http]
  };
</script>
