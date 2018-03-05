<template>
  <div>
    <div class="top">
      <Input v-model="name" placeholder="请输入产品名字" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询</Button>
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
    <tdksave ref="save" :filename="filename" :form="editinfo"></tdksave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http';
  import tdksave from './save.vue';

  export default {
    data() {
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
        editinfo: '',
        keyArr: {},
        menuid: 0,
        oldKeyId: '',
        filename: '',
        name: ''
      }
    },
    components: {tdksave},
    created() {
//      console.log(this.editinfo);
//      this.getData();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name
          }
        }
        this.apiGet('producttdk', data).then((data) => {
          this.handleAjaxResponse(data, (data, msg) => {
            this.datas = data.rows
            this.total = data.total;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      changePage(page) {
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize) {
        this.rows = pagesize;
        this.getData();
      },
      queryData() {
        this.getData();
      },
      add() {
        this.$refs.add.modal = true
      },
      edit(index) {
        let Base64 = require('js-base64').Base64;
        let data = {
          params: {
            edit: "product" + this.datas[index].id
          }
        }
        this.filename = "product" + this.datas[index].id
        this.apiGet('producttdksave', data).then((data) => {
          this.handleAjaxResponse(data, (data, msg) => {
            this.editinfo =Base64.decode(data)
            this.modal = false;
            this.$refs.save.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
    },
    computed: {
      tableColumns() {
        let columns = [];
        let _this = this;
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns.push({
            title: 'ID',
            width: 110,
            key: 'id',
            sortable: true
          })
        }
        columns.push({
          title: '产品名字',
          key: 'name',
          sortable: true
        });

        columns.push({
          title: '时间',
          key: 'create_time',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render(h, params) {
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
                      //不知道为什么这个地方不是我需要的this
                      _this.edit(params.index)
                    }
                  }
                }, '修改'),
              ]);
            },
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>
