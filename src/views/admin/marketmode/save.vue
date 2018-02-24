<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <div style="width: 200px;margin: 0 auto"><img width="200px" :src="this.form.img" alt="图片"></div>
          <Upload
            type="drag"
            ref="upImg"
            with-credentials
            name="file_name"
            :format="['jpg','jpeg','png','gif']"
            :on-success="getResponse"
            :on-error="getErrorInfo"
            :on-format-error="formatError"
            :action="action">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将图片拖拽到这里上传 仅支持(jpg jpeg png gif)类型图片</p>
            </div>
          </Upload>
          <Form ref="marketingsave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
            </Form-item>
            <Form-item label="关键词" prop="keyword">
              <Input type="text" v-model="form.keyword" placeholder="请输入关键词"></Input>
            </Form-item>
            <Form-item label="行业分类" prop="industry_id">
              <Select v-model="form.industry_id"
                      style="width:150px;text-align: left;position:relative;text-align: left;z-index: 10000;"
                      label-in-value　@on-change="changeIndustry">
                <Option v-for="(item, index) in industry" :value="item.id" :label="item.name" :key="index">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="核心解读" prop="summary">
              <Card shadow>
                <textarea class='tinymce-textarea' id="tinymceEditerSaveMark"></textarea>
              </Card>
              <Spin fix v-if="spinShow">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载组件中...</div>
              </Spin>
            </Form-item>
            <Form-item label="营销模式" prop="content">
              <Card shadow>
                <textarea class='tinymce-textarea' id="tinymceEditerSaveContent"></textarea>
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
  import tinymce from 'tinymce';
  import tinymceInit from '../../../libs/tinymceInit';
  import materialimg from '../../Common/article/materialimg';
  export default {
      components: {materialimg},
      data () {
          return {
              modal: false,
              modal_loading: false,
              spinShow: true,
              action: window.ImgUploadPath,
              form: {
                  title: '',
                  keyword: '',
                  content: ''
              },
              AddRule: {
                  title: [
                      {required: true, message: '请输入标题', trigger: 'blur'}
                  ],
                  keyword: [
                      {required: true, message: '请输入关键词', trigger: 'blur'}
                  ],
                  content: [
                      {required: true, message: '请输入营销模式', trigger: 'blur'}
                  ],
                  summary: [
                      {required: true, message: '请输入核心解读', trigger: 'blur'}
                  ]
              }
          };
      },
      mounted () {
          this.init();
      },
      destroyed () {
          tinymce.get('tinymceEditerSaveContent').destroy();
          tinymce.get('tinymceEditerSaveMark').destroy();
      },
      methods: {
        init: function () {
          this.$nextTick(() => {
            let height = document.body.offsetHeight - 500;
            this.tinymceInit(this, height, 'tinymceEditerSaveContent');
            this.tinymceInit(this, height, 'tinymceEditerSaveMark', 'mark');
          });
        },
          editdata (editid) {
              this.apiGet('marketing_mode/' + editid).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.form = data;
                    tinymce.get('tinymceEditerSaveContent').setContent(this.form.content);
                    tinymce.get('tinymceEditerSaveMark').setContent(this.form.summary);
                      this.modal = true;
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息
                  this.$Message.error('网络异常，请稍后重试。');
              });
          },
          changeIndustry (value) {
              this.form.industry_name = value.label;
              this.form.industry_id = value.value;
          },
          addmaterial (src) {
              if (this.img === 'content') {
                  let imgsrc = '<img src=' + src + '>';
                  tinymce.get('tinymceEditerSaveContent').insertContent(imgsrc);
              } else if (this.img === 'mark') {
                  // 字段4  自定义字段 写明作用
                  let imgsrc = '<img src=' + src + '>';
                  tinymce.get('tinymceEditerSaveMark').insertContent(imgsrc);
              } else if (this.img === 'thumbnail') {
                  this.form.image = src;
              }
          },
          getResponse (response, file, filelist) {
              this.form.img = response.data;
              this.$Message.success(response.msg);
          },
          getErrorInfo (error, file, filelist) {
              this.$Message.error(error);
          },
          formatError () {
              this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
          },
          add () {
              if (!this.form.img) {
                  this.$Message.error('请首先图片文件。');
                  return;
              }
              this.$refs.marketingsave.validate((valid) => {
                  if (valid) {
                      this.modal_loading = true;
                      var activeEditor = tinymce.get('tinymceEditerSaveContent');
                      activeEditor.selection.select(activeEditor.getBody());
                      this.form.content = activeEditor.selection.getContent({'format': 'html'});
                      var activeEditor1 = tinymce.get('tinymceEditerSaveMark');
                      activeEditor1.selection.select(activeEditor1.getBody());
                      this.form.summary = activeEditor1.selection.getContent({'format': 'html'});
                      let data = this.form;
                      let id = data.id;
                      this.apiPut('marketing_mode/' + id, data).then((res) => {
                          this.handelResponse(res, (data, msg) => {
                              this.modal = false;
                              this.$parent.getData();
                              this.$Message.success(msg);
                              this.modal_loading = false;
                              this.$refs.marketingsave.resetFields();
                              this.$refs.upImg.clearFiles();
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
          industry: {
              default: []
          }
      },
      mixins: [http, common, tinymceInit]
  };
</script>
