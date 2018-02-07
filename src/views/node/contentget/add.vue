<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="800">
        <p slot="header">
          <span>添加内容</span>
        </p>
        <div>
          <Form ref="content" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="内容名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="英文名" prop="en_name">
              <Input type="text"  v-model="form.en_name" placeholder="请输入英文名"></Input>
            </Form-item>
            <Form-item label="链接" prop="href">
              <Input type="text" v-model="form.href" placeholder="请输入链接"></Input>
            </Form-item>
            <Form-item  label="内容">
              <Card shadow>
                <textarea class='tinymce-textarea' id="tinymceEditerAddContent"></textarea>
              </Card>
              <Spin fix v-if="spinShow">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载组件中...</div>
              </Spin>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
        </div>
      </Modal>
    </div>
      <materialimg ref="addmaterial" v-on:addmaterial="addmaterial"></materialimg>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http';
  import common from '../../../libs/common';
  import tinymceInit from '../../../libs/tinymceInit';
  import tinymce from 'tinymce';
  // 素材库相关图片
  import materialimg from '../../Common/article/materialimg';
  export default {
      components: {materialimg},
      data () {
          return {
              spinShow: true,
              modal: false,
              modal_loading: false,
              form: {
                  name: '',
                  en_name: '',
                  content: '',
                  href: ''
              },
              AddRule: {
                  en_name: [
                      {required: true, message: '请填写英文名', trigger: 'blur'}
                  ],
                  name: [
                      {required: true, message: '请输入名称', trigger: 'blur'}
                  ]
              }
          };
      },
      mounted () {
          this.init();
      },
      destroyed () {
          tinymce.get('tinymceEditerAddContent').destroy();
      },
      methods: {
          init: function () {
              this.$nextTick(() => {
                  let height = document.body.offsetHeight - 500;
                  this.tinymceInit(this, height, 'tinymceEditerAddContent');
              });
          },
          addmaterial (src) {
              if (this.img === 'content') {
                  let imgsrc = '<img src=' + src + '>';
                  tinymce.get('tinymceEditerAddContent').insertContent(imgsrc);
              } else if (this.img === 'suolue') {
                  this.form.thumbnails = src;
              }
          },
          addimg (img) {
              this.img = img;
              this.$refs.addmaterial.getData();
              this.$refs.addmaterial.modal = true;
          },
          add () {
              this.$refs.content.validate((valid) => {
                  if (valid) {
                      this.modal_loading = true;
                      var activeEditor = tinymce.get('tinymceEditerAddContent');
                      activeEditor.selection.select(activeEditor.getBody());
                      this.form.content = activeEditor.selection.getContent({'format': 'html'});
                      let data = this.form;
                      this.apiPost('content_get', data).then((res) => {
                          this.handleAjaxResponse(res, (data, msg) => {
                              this.modal = false;
                              this.$emit('getdata');
                              this.$Message.success(msg);
                              this.modal_loading = false;
                              this.$refs.content.resetFields();
                          }, (data, msg) => {
                              this.modal_loading = false;
                              this.$Message.error(msg);
                          });
                      }, (res) => {
                          // 处理错误信息
                          this.modal_loading = false;
                          this.$Message.error('网络异常，请稍后重试。');
                      });
                  }
              });
          }
      },
      mixins: [http, common, tinymceInit]
  };
</script>
