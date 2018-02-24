<template>
  <div>
    <Modal
      v-model="modal" width="1000" :mask-closable="false"
      :styles="{top: '20px'}">
      <p slot="header">
        <span>预览</span>
      </p>
      <div>
        <Row style="">
          <Col span="24">
          <div style="width: 100%;margin: 0 auto;text-align: center;">
            <div><p style="font-size:20px">{{form.title}}</p></div>
          </div>
          </Col>
        </Row>
        <Row style="border-bottom:1px solid #e3e8ee;margin:20px;padding-bottom: 10px">
          <Col span="24">
          <div style="width: 60%;margin: 0 auto;text-align: center">
            <div>行业分类：{{form.industry_name}} &nbsp;&nbsp;  |关键词:{{form.keyword}}|&nbsp; &nbsp;  阅读：{{form.readcount}}</div>
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <div v-html="form.content" style="overflow: hidden;font-size: 15px" class="img"> </div>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <div style="font-size: 20px;font-weight: 700;">核心解读:</div>
          <div v-html="form.summary" style="overflow: hidden;font-size: 15px;" class="img"> </div>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http';
  export default {
      data () {
          return {
              editorOption: {},
              modal: false,
              modal_loading: false,
              form: {
                  title: '',
                  source: '',
                  content: ''
              }
          };
      },
      methods: {
          show (editid) {
              this.apiGet('marketing_mode/' + editid).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.form = data;
                      this.modal = true;
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息
                  this.$Message.error('网络异常，请稍后重试。');
              });
          },
          close () {
              this.modal = false;
          }
      },
      mixins: [http]
  };
</script>
<style scoped>
  .img img{
   max-width: 850px;
  }

</style>
