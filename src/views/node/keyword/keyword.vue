<template>
    <div>
        <Row>
            <Col span="24" style="padding: 10px;">
            <!--<Button type="primary" shape="circle" icon="android-add" @click="addkeyword">批量上传关键词</Button>-->
            <Button type="success" shape="circle" icon="android-add" @click="addA">添加A类关键词</Button>
            <!--<Button type="success" shape="circle" icon="android-done" @click="saveKeyword">修改关键词</Button>-->
            <Button type="error" shape="circle" icon="android-add" @click="removeKeyword">删除关键词</Button>
            </Col>
        </Row>
        <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText"
                style="margin-bottom: 10px;">
        </el-input>
        <el-tree
        :data="data"
        :props="props"
        show-checkbox
        check-strictly
        :load="loadNode"
        lazy
        node-key="id"
        :render-content="renderContent"
        ref="tree"
        :filter-node-method="filterNode"
        >
        </el-tree>
        <!--操作相关子组件-->
        <Alert type="warning" style="margin-top: 10px">
            <span style="margin-top:20px;font-size:16px;font-weight: bold">添加关键词注意事项</span>
            <p style="font-size:14px;line-height: 23px">必须首先添加A类关键词,&nbsp;&nbsp;&nbsp;在A类关键词下批量添加B类关键词,&nbsp;&nbsp;&nbsp;同理,&nbsp;&nbsp;&nbsp;在B类关键词下批量添加C类关键词</p>
            <p style="font-size:14px;">B,C类关键词不宜过多,B,C类关键词重复不会添加</p>
        </Alert>
        <keywordUpload ref="upload" :id="checkedNodeId"></keywordUpload>
        <AkeywordAdd ref="akeywordadd" v-on:getkeya="addAkeyword"  ></AkeywordAdd>
        <BkeywordAdd ref="bkeywordadd"   v-on:getkeybc="keyadd"  :pid="checkedNodeId"></BkeywordAdd>
        <CkeywordAdd ref="ckeywordadd"></CkeywordAdd>
        <Updatekeyword ref="updatekeyword" :datas="form"></Updatekeyword>
    </div>
</template>


<script>
  import http from '../../../libs/http';
  import keywordUpload from './keywordupload.vue';
  import AkeywordAdd from './Akeywordadd.vue';
  import BkeywordAdd from './Bkeywordadd.vue';
  import CkeywordAdd from './Ckeywordadd.vue';
  import Updatekeyword from './Updatekeyword.vue';

  export default {
      watch: {
          filterText (val) {
              this.$refs.tree.filter(val);
          }
      },
      components: {keywordUpload, AkeywordAdd, BkeywordAdd, CkeywordAdd, Updatekeyword},
      data () {
          return {
              keyid: '',
              checkedNodeId: 0,
              node: [],
              nodedelete: [],
              data: [],
              nodedata1: [],
              props: {
                  label: 'label',
                  children: 'children'
              },
              filterText: '',
              ids: [],
              form: {}
          };
      },
      methods: {

          renderContent (h, { node, data, store }) {
              if (node.data.tag === 'C') {
                  return (
                      <span style="font-size: 14px;">
                          <span>
                              <span>{node.label}</span>
                          </span>
                          <span>
                              <el-button style="margin-left:20px;font-size: 12px;" type="text" on-click={ () => this.editkeyw(node, data) }>修改</el-button>
                              <el-button style="margin-left:20px;font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                          </span>
                      </span>);
              } else {
                  return (
                      <span style="font-size: 14px;">
                          <span>
                              <span>{node.label}</span>
                          </span>
                          <span>
                              <el-button style="margin-left:20px;font-size: 12px;" type="text" on-click={ () => this.append(node, data) }>添加</el-button>
                              <el-button style="margin-left:20px;font-size: 12px;" type="text" on-click={ () => this.appendall(node, data) }>批量上传 </el-button>
                              <el-button style="margin-left:20px;font-size: 12px;" type="text" on-click={ () => this.editkeyw(node, data) }>修改</el-button>
                              <el-button style="margin-left:20px;font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                          </span>
                      </span>);
              }
          },
          append (de, node) {
              if (!node.children && node.tag !== 'C') {
                  this.$set(node, 'children', this.nodedata1);
              }
              this.checkedNodeId = node.id;
              // console.log(node.id)
              this.$refs.bkeywordadd.modal = true;
              this.node = node;
          },
          appendall (de, node) {
              if (!node.children && node.tag !== 'C') {
                  this.$set(node, 'children', this.nodedata1);
              }
              this.checkedNodeId = node.id;
              // console.log(node.id)
              this.$refs.upload.modal = true;
              this.node = node;
          },
          keyadd (data) {
              data.forEach((item) => {
                  const newChild = {id: item.id, label: item.label, children: [] };
                  this.node.children.push(newChild);
              });
          },
          editkeyw (de, node) {
              this.form = node;
              this.$refs.updatekeyword.modal = true;
          },
          remove (node, data1) {
              this.nodedelete = node;
              let _this = this;
              this.$Modal.confirm({
                  title: '确认删除',
                  content: '您确定删除关键词?',
                  okText: '删除',
                  cancelText: '取消',
                  onOk: () => {
                      _this.apiDelete('keyword/', _this.nodedelete.data.id).then((res) => {
                          _this.handleAjaxResponse(res, (data, msg) => {
                              // 删除数据库中信息
                              let keyid = 0;
                              _this.nodedelete.parent.childNodes.forEach((item, index) => {
                                  if (item.data.id === data1.id) {
                                      keyid = index;
                                  }
                              });
                              _this.nodedelete.parent.childNodes.splice(keyid, 1);
                              _this.$Message.success(msg);
                          }, (data, msg) => {
                              _this.$Message.error(msg);
                          });
                      }, (res) => {
                          // 处理错误信息
                          _this.$Message.error('网络异常，请稍后重试');
                      });
                  },
                  onCancel: () => {
                      return false;
                  }
              });
          },
          removeKeyword () {
              let node = this.$refs.tree.getCheckedNodes();
              node.forEach((item) => {
                  this.ids.push(item.id);
              });
              let _this = this;
              let data = {
                  ids: this.ids
              };
              this.$Modal.confirm({
                  title: '确认删除',
                  content: '您确定删除关键词?',
                  okText: '删除',
                  cancelText: '取消',
                  onOk: () => {
                      _this.apiPost('delete_keywords', data).then((res) => {
                          _this.handleAjaxResponse(res, (data, msg) => {
                              // 删除数据库中信息
                              _this.$Message.success(msg);
                          }, (data, msg) => {
                              _this.$Message.error(msg);
                          });
                      }, (res) => {
                          // 处理错误信息
                          _this.$Message.error('网络异常，请稍后重试');
                      });
                  },
                  onCancel: () => {
                      return false;
                  }
              });
          },
          saveKeyword () {
              let node = this.$refs.tree.getCheckedNodes();
              if (node.length != 1) {
                  this.$Message.info('请选择一个关键词');
                  return;
              }
              this.form = node[0];
              this.$refs.updatekeyword.modal = true;
          },
          change (data, current, sel) {

          },
          addkeyword () {
              let node = this.$refs.tree.getCheckedNodes();
              if (node.length == 1) {
                  if (node[0].tag == 'C') {
                      this.$Message.info('不能选择C类关键词作为上级节点');
                      return;
                  }
                  this.checkedNodeId = node[0].id;
                  this.$refs.upload.modal = true;
              } else if (node.length == 0) {
                  this.$Message.info('请至少选择一个父亲关键词');
              } else {
                  this.$Message.info('只能选择一个节点作为上级关键词');
              }
          },
          // 添加A 类关键词
          addAkeyword (data) {
              // 添加A 类 关键词
              data.forEach((item) => {
                  const newChild = {id: item.id, label: item.label, children: [] };
                  // console.log(this.data);
                  this.data.push(newChild);
              });
          },
          addA () {
              this.$refs.akeywordadd.modal = true;
          },
          addBkeyword () {
              let node = this.$refs.tree.getCheckedNodes();
              if (node.length == 1) {
                  if (node[0].tag == 'C') {
                      this.$Message.info('不能选择C类关键词作为上级节点');
                      return;
                  }
                  this.checkedNodeId = node[0].id;
                  this.$refs.bkeywordadd.modal = true;
              } else if (node.length == 0) {
                  this.$Message.info('请至少选择一个关键词');
              } else {
                  this.$Message.info('只能选择一个节点作为上级关键词');
              }
          },
          // 过滤数据
          filterNode (value, data) {
              if (!value) return true;
              return data.label.indexOf(value) !== -1;
          },
          getData (id, func) {
              let data = {};
              if (id != 0) {
                  data = {
                      params: {
                          id: id
                      }
                  };
              }
              this.apiGet('keyword', data).then((res) => {
                  this.handleAjaxResponse(res, (childdata, msg) => {
                      func(childdata);
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息
                  this.$Message.error('网络异常，请稍后重试。');
              });
          },
          loadNode (node, resolve) {
              if (node.level === 0) {
                  // 第一次请求资源的时候
                  this.getData(0, (data) => {
                      this.data = data;
                      return resolve(data);
                  });
              } else if (node.level >= 3) {
                  return resolve([]);
              } else {
                  this.getData(node.data.id, (data) => {
                      this.nodedata1 = data;
                      resolve(data);
                  });
              }
          }
      },
      mixins: [http]
  };
</script>
<style>
.el-icon-caret-right:before{
content: none !important;


}

</style>