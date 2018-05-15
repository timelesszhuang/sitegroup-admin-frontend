<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="800">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="linksave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="title" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入title"></Input>
            </Form-item>
            <Form-item label="关键词" prop="keyword">
              <Input type="text" v-model="form.keyword" placeholder="请输入关键词用逗号隔开"></Input>
            </Form-item>
            <Form-item label="description" prop="description">
              <Input v-model="form.description" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                     placeholder="请输入description">
              </Input>
            </Form-item>
            <Form-item label="子站title" prop="childsite_title">
              <Input type="text" v-model="form.childsite_title" placeholder="请输入子站title"></Input>
            </Form-item>
            <Form-item label="子站关键词" prop="childsite_keyword">
              <Input type="text" v-model="form.childsite_keyword" placeholder="请输入子站关键词用逗号隔开"></Input>
            </Form-item>
            <Form-item label="子站description" prop="childsite_description">
              <Input v-model="form.childsite_description" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                     placeholder="请输入子站description">
              </Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http';
  export default {
      data () {
          return {
              modal: false,
              modal_loading: false,
              AddRule: {
                  title: [
                      {required: true, message: '请输入title', trigger: 'blur'}
                  ],
                  keyword: [
                      {required: true, message: '请输入keyword', trigger: 'blur'}
                  ],
                  description: [
                      {required: true, message: '请输入description', trigger: 'blur'}
                  ]
              }
          };
      },
      methods: {
          add () {
              this.$refs.linksave.validate((valid) => {
                  if (valid) {
                      this.modal_loading = true;
                      let data = this.form;
                      let id = data.id;
                      this.apiPost('articletdkedit/' + id, data).then((res) => {
                          this.handleAjaxResponse(res, (data, msg) => {
                              this.modal = false;
                              this.$parent.getData();
                              this.$Message.success(msg);
                              this.modal_loading = false;
                              this.$refs.linksave.resetFields();
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
      props: {
          form: {
              default: {
                  name: '',
                  detail: '',
                  domain: ''
              }
          }
      },
      mixins: [http]
  };
</script>
