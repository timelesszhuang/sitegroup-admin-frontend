<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="500">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="substitutionsave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="要替换的关键词" prop="front_substitution">
              <Input type="text" v-model="form.front_substitution" placeholder="请输入替换前的关键词"></Input>
            </Form-item>
            <Form-item label="替换成的关键词" prop="substitution">
              <Input type="text" v-model="form.substitution" placeholder="请输入替换为的关键词"></Input>
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
      return {
        modal: false,
        modal_loading: false,
        AddRule: {
          front_substitution: [
            {required: true, message: '请输入要替换的关键词', trigger: 'blur'},
          ],
          substitution: [
            {required: true, message: '请输入替换成的关键词', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      add() {
        this.$refs.substitutionsave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('Substitution/' + id, data).then((res) => {
              this.handleAjaxResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.substitutionsave.resetFields();
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
          front_substitution: "",
          substitution: "",
        }
      }
    },
    mixins: [http]
  }
</script>
