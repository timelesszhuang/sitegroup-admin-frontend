<template>
 <card>
<el-tree
        :data="data4"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent">
</el-tree>
     <AkeywordAdd ref="akeywordadd" v-on:getd="keyyy"></AkeywordAdd>
 </card>

  </template>
<script>
  import http from '../../../libs/http';
  import AkeywordAdd from './Akeywordadd.vue';
  let id = 1000;

  export default {
      components: { AkeywordAdd},
      data () {
          return {
              idd: '',
              keywordceshi: '',
                node:[],
              data4: [{
                  id: 1,
                  label: '一级 1',
                  children: [{
                      id: 4,
                      label: '二级 1-1',
                      children: [{
                          id: 9,
                          label: '三级 1-1-1'
                      }, {
                          id: 10,
                          label: '三级 1-1-2'
                      }]
                  }]
              }, {
                  id: 2,
                  label: '一级 2',
                  children: [{
                      id: 5,
                      label: '二级 2-1'
                  }, {
                      id: 6,
                      label: '二级 2-2'
                  }]
              }, {
                  id: 3,
                  label: '一级 3',
                  children: [{
                      id: 7,
                      label: '二级 3-1'
                  }, {
                      id: 8,
                      label: '二级 3-2'
                  }]
              }],
              defaultProps: {
                  children: 'children',
                  label: 'label'
              }
          };
      },

      methods: {
          append (node) {
              this.$refs.akeywordadd.modal = true;
              if (!node.children) {
                  this.$set(node, 'children', []);
              }
                this.node=node
              // this.data4.push(newChild);
          },
          keyyy (data) {
            console.log(data);
            this.idd = data.id;
            this.keywordceshi = data.keyword;
            const newChild = { id: this.idd, label: this.keywordceshi, children: [] };
            this.node.children.push(newChild);

          },
          remove (node, data) {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);
          },

          renderContent (h, { node, data, store }) {
              return (
                  <span style="font-size: 14px;">
                      <span>
                          <span>{node.label}</span>
                      </span>
                      <span>
                          <el-button style="margin-left:20px;font-size: 12px;" type="text" on-click={ () => this.append(data) }>添加</el-button>
                          <el-button style="margin-left:20px;font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                      </span>
                  </span>);
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