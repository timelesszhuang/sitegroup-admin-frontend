<template>
  <div>
    <div>
      <Modal
        v-model="modal"
        width="800"
        :styles="{top: '20px'}"
      >
        <p slot="header">
          <span>添加问答</span>
        </p>
        <div>
          <Form ref="questionadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="问题名" prop="question">
              <Input type="text" v-model="form.question" placeholder="请填写问题"></Input>
            </Form-item>
            <Form-item label="问答分类" prop="articletype_id">
              <Select v-model="form.type_id"  ref="select" :clearable="selects" style="width:200px;position: relative;z-index: 10000;"
                      label-in-value  filterable clearable  placeholder="根据分类查询" @on-change="changeArticletype"  >
                <Option-group  v-for="(item,index) in this.$store.state.commondata.questionType" :label="index" :key="index">
                  <Option v-for="(items, indexs) in item"  :value="items.id" :label="items.name" :key="indexs">{{ items.name }}</Option>
                </Option-group>
              </Select>
            </Form-item>
            <Form-item label="答案" prop="content_paragraph">
              <Card shadow>
                <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
              </Card>
              <Spin fix v-if="spinShow">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载组件中...</div>
              </Spin>

            </Form-item>
            <Form-item label="页面关键词" prop="keywords">
              <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词(尽量用英文符号分割)" style="width: 200px;"></Input>
            </Form-item>
            <Form-item label="页面文章描述" prop="description">
              <Input v-model="form.description" :rows="3" type="textarea" placeholder="请输入页面文章描述"></Input>
            </Form-item>
            <Row>
              <Col span="21">
              <Form-item v-if="tag_name" label="分类标签" prop="tags">
                <Select ref="select" :clearable="selects" v-model="form.tag_id"
                        style="position:relative;text-align: left;width:350px;z-index: 10000;"
                        label-in-value multiple　>
                  <Option v-for="(item,index) in this.$store.state.commondata.questionTag" :value="index" :label="item" :key="index">
                    {{item}}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="分类标签" v-if="!tag_name" prop="tag_id">
                <Input type="text" style="width:350px;" v-model="form.tags" placeholder="请输入标签区分分类"></Input>
                <Button type="success" size="small" :loading="modal_loading" @click="addtags">添加标签</Button>
              </Form-item>
              </Col>
              <Col span="3">
              <i-switch size="large" v-model="switch1" @on-change="change">
                <span slot="open">选择</span>
                <span slot="close">填写</span>
              </i-switch>
              </Col>
            </Row>
          </Form>

        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
        </div>
      </Modal>
      <materialimg ref="addmaterial"></materialimg>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http';
  import common from '../../../libs/common';
  import tinymce from 'tinymce';
  import materialimg from '../article/materialimg.vue';
  export default {
      components: {materialimg},
      data () {
          const checkquestiontype = (rule, value, callback) => {
              if (!value) {
                  callback(new Error('请选择问答分类'));
              } else {
                  callback();
              }
          };
          return {
              img: '',
              spinShow: true,
              switch1: true,
              tag_name: true,
              modal: false,
              modal_loading: false,
              form: {
                  question: '',
                  content_paragraph: '',
                  type_id: 0,
                  type_name: '',
                  tag_id: [],
                  tags: ''
              },

              selects: true,
              AddRule: {
                  question: [
                      {required: true, message: '请填写问题名', trigger: 'blur'}
                  ],

                  questiontype_id: [
                      {required: true, validator: checkquestiontype, trigger: 'blur'}
                  ]
              }
          };
      },
      methods: {
          change (status) {
              if (status) {
                  this.tag_name = true;
                  this.$Message.info('切换到下拉选择');
              } else {
                  this.tag_name = false;
                  this.$Message.info('切换到添加标签');
              }
          },
          init: function () {
              this.$nextTick(() => {
                  let vm = this;
                  let height = document.body.offsetHeight - 300;
                  tinymce.init({
                      selector: '#tinymceEditer',
                      branding: false,
                      elementpath: false,
                      height: height,
                      language: 'zh_CN.GB2312',
                      menubar: 'edit insert view format table tools',
                      plugins: [
                          'fullscreen',
                          'wordcount',
                          'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                          'searchreplace visualblocks visualchars code fullpage',
                          'insertdatetime media nonbreaking save table contextmenu directionality',
                          'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                      ],
                      toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample | mybutton | fullscreen |',
                      autosave_interval: '20s',
                      image_advtab: true,
                      table_default_styles: {
                          width: '100%',
                          borderCollapse: 'collapse'
                      },
                      setup: function (editor) {
                          editor.on('init', function (e) {
                              vm.spinShow = false;
                              // tinymce.get('tinymceEditer').setContent(vm.form.content);
                          });
                          editor.on('keydown', function (e) {
                              // editor.insertContent(vm.form.content)
                              // localStorage.editorContent = tinymce.get('tinymceEditer').getContent()
                              // tinymce.get('tinymceEditer').setContent(vm.form.content)
                          });
                          editor.addButton('mybutton', {
                              text: '素材库图片',
                              icon: false,
                              onclick: function () {
                                  vm.img = 'content';
                                  vm.$refs.addmaterial.getData();
                                  vm.$refs.addmaterial.modal = true;
                              }
                          });
                      }
                  });
              });
          },
          changeTagtype (value) {
              this.form.tag_id = value.value;
          },
          getsrc (src) {
              if (this.img == 'content') {
                  let imgsrc = '<img src=' + src + '>';
                  tinymce.get('tinymceEditer').insertContent(imgsrc);
              } else if (this.img == 'suolue') {
                  this.form.thumbnails = src;
              }
          },
          addtags () {
              let data = {
                  type: 'question',
                  name: this.form.tags
              };
              this.apiPost('admin/tags', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                      let tempN = this.form.tag_id;
                      let tagId = data.id;
                      let tagnum = tagId.toString();
                      tempN.push(tagnum);
                      this.$parent.gettag();
                      this.$Message.success(msg);
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息

              });
          },
          changeArticletype (type) {
              this.form.type_name = type.label;
          },
          add () {
              this.$refs.questionadd.validate((valid) => {
                  if (valid) {
                      this.modal_loading = true;
                      var activeEditor = tinymce.activeEditor;
                      var editBody = activeEditor.getBody();
                      activeEditor.selection.select(editBody);
                      var text = activeEditor.selection.getContent({'format': 'html'});
                      this.form.content_paragraph = text;
                      let data = this.form;
                      this.apiPost('question', data).then((res) => {
                          this.handleAjaxResponse(res, (data, msg) => {
                              this.modal = false;
                              this.$parent.getData();
                              this.$Message.success(msg);
                              this.modal_loading = false;
                              this.$refs.questionadd.resetFields();
                              this.$refs.select.clearSingleSelect();
                          }, (data, msg) => {
                              this.modal_loading = false;
                              this.$Message.error(msg);
                          });
                      }, (res) => {
                          // 处理错误信息
                          this.modal_loading = false;
                      });
                  }
              });
          }
      },
      mounted () {
          this.init();
      },
      destroyed () {
          tinymce.get('tinymceEditer').destroy();
      },
      mixins: [http, common]
  
  };
</script>
