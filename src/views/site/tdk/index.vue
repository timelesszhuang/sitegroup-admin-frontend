<template>
  <div>
    <div class="top">

    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-ele vator show-sizer></Page>
        </div>
      </div>
    </div>
    <tdksave ref="save" :form="editinfo"></tdksave>
    <savemain ref="mainsave" :siteid="menuid" :keys="keyArr" :oldKey="oldKeyId"></savemain>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http'; ;
  import tdksave from './save.vue';
  import savemain from './savemain.vue';
  export default {
      data () {
          return {
              self: this,
              border: true,
              stripe: true,
              showheader: true,
              showIndex: true,
              size: 'small',
              current: 1,
              total: 0,
              page: 1,
              rows: 10,
              datas: [],
              editinfo: {},
              keyArr: {},
              menuid: 0,
              oldKeyId: ''
          };
      },
      components: {tdksave, savemain},
      created () {
          this.getData();
      },
      methods: {
          getData () {
              let data = {
                  params: {
                      page: this.page,
                      rows: this.rows
                  }
              };
              this.apiGet('pageInfo', data).then((data) => {
                  this.handleAjaxResponse(data, (data, msg) => {
                      this.datas = data.rows;
                      this.total = data.total;
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (data) => {
                  this.$Message.error('网络异常，请稍后重试');
              });
          },
          changePage (page) {
              this.page = page;
              this.getData();
          },
          changePageSize (pagesize) {
              this.rows = pagesize;
              this.getData();
          },
          queryData () {
              this.getData();
          },
          add () {
              this.$refs.add.modal = true;
          },
          edit (index) {
              let editid = this.datas[index].id;
              this.apiGet('pageInfo/' + editid).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.editinfo = data;
                      this.modal = false;
                      this.$refs.save.modal = true;
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息
                  this.$Message.error('网络异常，请稍后重试。');
              });
          },
          editMain (id) {
              this.menuid = this.datas[id].id;
              this.oldKeyId = this.datas[id].akeyword_id;
              this.$refs.mainsave.modal = true;
              this.apiGet('siteAkeyword').then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.keyArr = data;
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息
                  this.$Message.error('网络异常，请稍后重试。');
              });
          }
      },
      computed: {
          tableColumns () {
              let _this = this;
              let columns = [];
              if (this.showCheckbox) {
                  columns.push({
                      type: 'selection',
                      width: 60,
                      align: 'center'
                  });
              }
              if (this.showIndex) {
                  columns.push({
                      type: 'index',
                      width: 60,
                      align: 'center'
                  });
              }
              columns.push({
                  title: '页面类型',
                  width: 110,
                  key: 'page_type',
                  sortable: true
              });
              columns.push({
                  title: '页面名字',
                  width: 110,
                  key: 'page_name',
                  sortable: true
              });
              columns.push({
                  title: '标题',
                  key: 'title',
                  sortable: true
              });
              columns.push({
                  title: '描述',
                  key: 'description',
                  sortable: true
              });

              columns.push({
                  title: '关键词',
                  key: 'keyword',
                  sortable: true
              });
              columns.push(
                  {
                      title: '操作',
                      key: 'action',
                      width: 200,
                      align: 'center',
                      fixed: 'right',
                      render (h, params) {
                          if (params.row.akeyword_id != 0) {
                              return h('div', [
                                  h('Button', {
                                      props: {
                                          size: 'small'
                                      },
                                      style: {
                                          marginRight: '5px'
                                      },
                                      attrs: {
                                          type: 'primary'
                                      },
                                      on: {
                                          click: function () {
                                              // 不知道为什么这个地方不是我需要的this
                                              _this.edit(params.index);
                                          }
                                      }
                                  }, '修改'),
                                  h('Button', {
                                      props: {
                                          size: 'small'
                                      },
                                      attrs: {
                                          type: 'primary'
                                      },
                                      on: {
                                          click: function () {
                                              // 不知道为什么这个地方不是我需要的this
                                              _this.editMain(params.index);
                                          }
                                      }
                                  }, '修改主关键词')
                              ]);
                          } else {
                              h('Button', {
                                  props: {
                                      size: 'small'
                                  },
                                  style: {
                                      marginRight: '5px'
                                  },
                                  attrs: {
                                      type: 'primary'
                                  },
                                  on: {
                                      click: function () {
                                          // 不知道为什么这个地方不是我需要的this
                                          _this.edit(params.index);
                                      }
                                  }
                              }, '修改');
                          }
                      }
                  }
              );
              return columns;
          }
      },
      mixins: [http]
  };
</script>
