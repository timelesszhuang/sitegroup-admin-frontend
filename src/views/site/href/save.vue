<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="hrefsave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="内容" prop="content">
              <Input type="text" v-model="form.content" placeholder="请输入内容"></Input>
            </Form-item>
            <Form-item label="title" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入title"></Input>
            </Form-item>
            <Form-item label="链接" prop="href">
              <Input type="text" v-model="form.href" placeholder="请输入链接"></Input>
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
        AddRule: {
          name: [
            {required: true, message: '请填写公共管理代码名称', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请填写代码', trigger: 'blur'},
          ],
          href: [
            {required: true, validator: checkhref, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      add() {
        this.$refs.hrefsave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('ArticleInsertA/' + id, data).then((res) => {
              this.handleAjaxResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.hrefsave.resetFields();
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
    props: {
      form: {
        default: {
          content: "",
          title: "",
          href: ""
        }
      }
    },
    mixins: [http]
  }
</script>
