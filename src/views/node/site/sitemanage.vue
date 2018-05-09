<template>
    <div>
    <Modal v-model="modal2" width="960">
    <p slot="header" style="color:dodgerblue;;font-size: 18px;">
      <Icon type="flag"></Icon>
      <span>子站管理</span>
    </p>
      <div class="ivu-table-header" style="margin-bottom: 10px">
          &nbsp;
          <Input v-model="all" placeholder="请输入子站点名字或者英文名查询" style="width:300px;"></Input>
          <button @click="queryData()" type="button" class="ivu-btn ivu-btn-success ivu-btn-big"
                  style="margin-right: 5px;">查询
          </button>

          <button @click="addSiteChilds()" type="button" class="ivu-btn ivu-btn-warning ivu-btn-big"
                  style="margin-right: 5px;">批量添加
          </button>
          <button @click="addSiteChild()" type="button" class="ivu-btn ivu-btn-primary ivu-btn-big"
                  style="margin-right: 5px;">添加
          </button>

      </div>
    <div style="text-align:center">
      <div class="ivu-table ivu-table-border"><!---->
        <div class="ivu-table-header">
          <table cellspacing="0" cellpadding="0" border="0" style="width:100%;">
            <thead>
            <tr>
              <th colspan="2">
                <div class="ivu-table-cell"><span>子站点名</span></div>
              </th>
              <th>
                <div class="ivu-table-cell"><span>英文名</span></div>
              </th>
                <th>
                    <div class="ivu-table-cell"><span>操作</span></div>
                </th>
            </tr>
            </thead>
          </table>
        </div>
        <table cellspacing="0" cellpadding="0" border="0" style="width:100%;">
          <tbody class="ivu-table-tbody">
          <tr class="ivu-table-row" v-for="item in this.datas">
            <td colspan="2">
              <div class="ivu-table-cell"><span v-html="item['name']" style="width: 100%;"></span></div>
            </td>
            <td>
              <div class="ivu-table-cell"><span>{{item["en_name"]}}</span></div>
            </td>

            <td class="ivu-table-column-center">
              <div class="ivu-table-cell">
                <div>
                  <button @click="savechildsite(item['id'])" type="button" class="ivu-btn ivu-btn-primary ivu-btn-small"
                          style="margin-right: 5px;">修改
                   </button>
                    <button @click="removechildsite(item['id'])" type="button" class="ivu-btn ivu-btn-error ivu-btn-small"
                          style="margin-right: 5px;">删除
                   </button>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
          <div class="content" style="margin-top:10px;">
              <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                      <Page v-show="page_show" :total="total" :current="current" :page-size="pageSize"
                            @on-change="changePage"
                            @on-page-size-change="changePageSize"
                            show-total
                            show-elevator show-sizer>
                      </Page>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <div slot="footer">
    </div>
  </Modal>
        <addchildsites ref="childaddsites" v-on:getchilddata="getChildData"> </addchildsites>
        <addchildsite ref="childaddsite" v-on:getchilddata="getChildData"> </addchildsite>
        <savechildsite ref="childsavesite" v-on:getchilddata="getChildData"> </savechildsite>
    </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http';
  import addchildsites from './addchildsites';
  import addchildsite from './addchildsite';
  import savechildsite from './savechildsite';

  export default {
      components: {addchildsites, addchildsite, savechildsite},
      data () {
          return {
              page_show: true,
              border: true,
              stripe: true,
              showheader: true,
              showIndex: true,
              size: 'small',
              total: 0,
              page: 1,
              rows: 10,
              current: 1,
              pageSize: 10,
              site_id: '',
              datas: [],
              modal2: false,
              modal_loading: false,
              all: ''
          };
      },
      methods: {
          getChildData () {
              let data = {
                  params: {
                      page: this.page,
                      rows: this.rows,
                      site_id: this.site_id,
                      all: this.all

                  }
              };
              this.apiGet('childsitelist', data).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.datas = data.rows;
                      this.total = data.total;
                      this.pageSize = 10;
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息
                  this.$Message.error('网络异常，请稍后重试。');
              });
          },
          addSiteChilds () {
              this.$refs.childaddsites.modal = true;
              this.$refs.childaddsites.distridata();
              this.$refs.childaddsites.getSiteId(this.site_id);
          },
          addSiteChild () {
              this.$refs.childaddsite.modal = true;
              this.$refs.childaddsite.getSiteId(this.site_id);
          },
          queryData () {
              this.page = 1;
              this.page_show = false;
              this.getChildData(this.site_id);
              this.page_show = true;
          },
          changePage (page) {
              this.page = page;
              this.getChildData();
          },
          changePageSize (pagesize) {
              this.rows = pagesize;
              this.getChildData(this.site_id);
          },
          setsiteid (siteid) {
              this.site_id = siteid;
          },
          savechildsite (id) {
              this.$refs.childsavesite.modal = true;
              this.$refs.childsavesite.getEditData(id);
              this.$refs.childaddsite.getSiteId(this.site_id);
          },
          removechildsite (id) {
              // 需要删除确认
              let _this = this;
              this.$Modal.confirm({
                  title: '确认删除',
                  content: '您确定删除该记录?',
                  okText: '删除',
                  cancelText: '取消',
                  onOk: (index) => {
                      _this.apiDelete('childsitelist/', id).then((res) => {
                          _this.handleAjaxResponse(res, (data, msg) => {
                              _this.getChildData();
                              _this.$Message.success(msg);
                          }, (data, msg) => {
                              _this.$Message.error(msg);
                          });
                      }, (res) => {
                          // 处理错误信息
                      });
                  },
                  onCancel: () => {
                      return false;
                  }
              });
          }

          // sendTemp (id) {
          //     this.apiGet('ignoreFrontend/' + id + '/' + this.sid + '/activity').then((res) => {
          //         this.handleAjaxResponse(res, (data, msg) => {
          //             this.modal = false;
          //             this.modal_loading = false;
          //             this.$parent.sendActivity(this.sid);
          //             this.$Message.success(msg);
          //         }, (data, msg) => {
          //             this.modal_loading = false;
          //             this.$Message.error(msg, 5);
          //         });
          //     }, (res) => {
          //         // 处理错误信息
          //         this.modal_loading = false;
          //         this.$Message.error('网络异常，请稍后重试。');
          //     });
          // }
      },

      mixins: [http]
  };
</script>
<style>


</style>
