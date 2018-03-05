<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="href" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="关键词" prop="keyword">
              <Input type="text" v-model="form.keyword" placeholder="请输入关键词"></Input>
            </Form-item>
            <Form-item label="title" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入title"></Input>
            </Form-item>
            <Form-item label="链接" prop="link">
              <Input type="text" v-model="form.link" placeholder="请输入链接"></Input>
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
    data() {
      const checkhref = (rule, value, callback) => {
        let url = value
        if (url.indexOf("http://") != -1) {
          callback();
        } else {
          callback(new Error('请填写http://'));
        }
      };
      return {
        modal: false,
        modal_loading: false,
        form: {
          keyword: "",
          title: "",
          link: ""
        },
        AddRule: {
          keyword: [
            {required: true, message: '请填写关键词', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请填写title', trigger: 'blur'},
          ],
          link: [
            {required: true, validator: checkhref, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      add() {
        this.$refs.href.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('articleReplaceKeyword', data).then((res) => {
              this.handleAjaxResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.href.resetFields();
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          }
        })
      }
    },
    mixins: [http]
  }
</script>
