<template>
    <div>
        <div>
            <Modal
                    v-model="modal"
                    width="900"
                    :styles="{top: '20px'}"
            >
                <p slot="header">
                    <span>添加</span>
                </p>
                <div>
                    <Form ref="padd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="名称" prop="name">
                            <Input type="text" v-model="form.name" placeholder="请输入产品名称 （或其他名称）"></Input>
                        </Form-item>
                        <Form-item label="产品缩略图" prop="name">
                            <Upload
                                    type="select"
                                    ref="upImg"
                                    with-credentials
                                    name="file"
                                    :format="['jpg','jpeg','png','gif']"
                                    :on-success="getResponse"
                                    :on-error="getErrorInfo"
                                    :on-format-error="formatError"
                                    :action="action"
                                    style="text-align:left;">
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>
                            </Upload>
                            <div v-if="imgshow" style="display: inline-block;width: 100%">
                                <div style="margin:0px auto;width: 300px">
                                    <img style="max-width: 300px;" :src=this.form.image alt="">
                                </div>
                            </div>
                        </Form-item>
                        <Form-item label="编号" prop="sn">
                            <Input type="text" v-model="form.sn" placeholder="请输入产品编号 （或其他编号）"></Input>
                        </Form-item>
                        <Form-item label="产品分类" prop="type_name">
                            <Select v-model="form.type_id" ref="select" :clearable="selects"
                                    style="width:200px;position: relative;z-index: 10000;"
                                    label-in-value filterable clearable placeholder="根据分类查询" @on-change="changePtype">
                                <Option-group v-for="(item,index) in this.$store.state.commondata.productType"
                                              :label="index" :key="index">
                                    <Option v-for="(items, indexs) in item" :value="items.id" :label="items.name"
                                            :key="indexs">{{ items.name }}
                                    </Option>
                                </Option-group>
                            </Select>
                        </Form-item>
                        <Form-item label="收费方式" prop="payway">
                            <Input type="text" v-model="form.payway" placeholder="请输入收费方式（比如××元/户/年）"></Input>
                        </Form-item>
                        <Form-item label="摘要" prop="summary">
                            <Input type="textarea" :autosize="{minRows: 3,maxRows: 10}" v-model="form.summary"
                                   placeholder="请输入产品摘要 比如相关产品的介绍"></Input>
                        </Form-item>
                        <Form-item label="详情" prop="detail">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Form-item label="页面标题" prop="title">
                            <Input type="text" v-model="form.title" placeholder="请输入页面标题"></Input>
                        </Form-item>
                        <Form-item label="页面关键词" prop="keywords">
                            <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词"></Input>
                        </Form-item>
                        <Form-item label="页面描述" prop="description">
                            <Input v-model="form.description" type="textarea" :rows="4" placeholder="请输入页面描述"></Input>
                        </Form-item>
                        <Row>
                            <Col span="21">
                            <Form-item v-if="tag_name" label="分类标签" prop="tags">
                                <Select ref="select" :clearable="selects" v-model="form.tag_id"
                                        style="position:relative;text-align: left;width:350px;z-index: 10000;"
                                        label-in-value multiple　>
                                    <Option v-for="(item,index) in this.$store.state.commondata.productTag"
                                            :value="index" :label="item" :key="index">
                                        {{item}}
                                    </Option>
                                </Select>
                            </Form-item>
                            <Form-item label="分类标签" v-if="!tag_name" prop="tag_id">
                                <Input type="text" style="width:350px;" v-model="form.tags"
                                       placeholder="请输入标签区分分类"></Input>
                                <Button type="success" size="small" :loading="modal_loading" @click="addtags">添加标签
                                </Button>
                            </Form-item>
                            </Col>
                            <Col span="3">
                            <i-switch size="large" v-model="switch1" @on-change="change">
                                <span slot="open">选择</span>
                                <span slot="close">填写</span>
                            </i-switch>
                            </Col>
                        </Row>
                        <Form-item>
                            <Button @click="other_is_show = !other_is_show">其他字段</Button>
                        </Form-item>
                        <Form-item v-show="other_is_show" label="字段1" prop="field1">
                            <Input v-model="form.field1" type="text" :rows="4"></Input>
                        </Form-item>
                        <Form-item v-show="other_is_show" label="字段2" prop="field2">
                            <Input v-model="form.field2" type="text" :rows="4"></Input>
                        </Form-item>
                        <Form-item v-show="other_is_show" label="字段3" prop="field3">
                            <Input v-model="form.field3" type="text" :rows="4"></Input>
                        </Form-item>
                        <Form-item v-show="other_is_show" label="字段4" prop="field4">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditer1"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Alert v-show="other_is_show" type="success" show-icon>
                            注意
                            <span slot="desc">其他字段页面中调取 使用field1、field2、field3、field4等</span>
                        </Alert>
                    </Form>
                </div>
                <div slot="footer">
                    <Button type="success" v-if="!this.edit" size="large" :loading="modal_loading" @click="add">保存
                    </Button>
                    <Button type="success" v-if="this.edit" size="large" :loading="modal_loading" @click="save">修改
                    </Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http';
  import common from '../../../libs/common';
  import tinymce from 'tinymce';

  export default {
      data () {
          const checkptype = (rule, value, callback) => {
              if (!value) {
                  callback(new Error('请选择文章分类'));
              } else {
                  callback();
              }
          };
          return {
              spinShow: true,
              switch1: true,
              tag_name: true,
              other_is_show: false,
              modal: false,
              modal_loading: false,
              action: HOST + 'article_image_upload',
              otheraction: HOST + 'admin/uploadProductSerImg',
              type_name: '',
              imgshow: false,
              value1: 0,
              selects: true,
              edit: '',
              form: {
                  name: '',
                  detail: '',
                  image: '',
                  summary: '',
                  payway: '',
                  sn: '',
                  type_name: '',
                  type_id: 0,
                  imgser: [],
                  keywords: '',
                  title: '',
                  field1: '',
                  field2: '',
                  field3: '',
                  field4: '',
                  description: '',
                  tag_id: [],
                  tags: ''
              },
              AddRule: {
                  // name: [
                  //     {required: true, message: '请填写产品或其他名称', trigger: 'blur'}
                  // ],
                  // detail: [
                  //     {required: true, message: '请填写产品详情', trigger: 'blur'}
                  // ],
                  // summary: [
                  //     {required: true, message: '请输入产品摘要', trigger: 'blur'}
                  // ],
                  // type_name: [
                  //     {required: true, validator: checkptype, trigger: 'blur'}
                  // ]
              }
          };
      },
      mounted () {
          this.init();
          this.init1();
      },
      destroyed () {
          tinymce.get('tinymceEditer').destroy();
          tinymce.get('tinymceEditer1').destroy();
      },
      methods: {

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
                      automatic_uploads: true,
                      images_reuse_filename: true,
                      images_upload_url: 'http://bn.sjy/index.php/article_image_upload',
                      images_upload_handler: function (blobInfo, success, failure) {
                          let xhr, formData;
                          xhr = new XMLHttpRequest();
                          xhr.withCredentials = true;
                          xhr.open('POST', 'http://bn.sjy/index.php/article_image_upload');
                          xhr.onload = function () {
                              var json;
                              if (xhr.status != 200) {
                                  failure('HTTP Error: ' + xhr.status);
                                  return;
                              }
                              json = JSON.parse(xhr.responseText);
                              if (!json || typeof json.data.url !== 'string') {
                                  failure('Invalid JSON: ' + xhr.responseText);
                                  return;
                              }
                              success(json.data.url);
                          };
                          formData = new FormData();
                          formData.append('file', blobInfo.blob(), blobInfo.filename());
                          xhr.send(formData);
                      },
                      table_default_styles: {
                          width: '100%',
                          borderCollapse: 'collapse'
                      },
                      setup: function (editor) {
                          editor.on('init', function (e) {
                              vm.spinShow = false;
                              // tinymce.get('tinymceEditer').setContent(vm.imgcontent)
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
                          // editor.addMenuItem('myitem', {
                          //   text: 'My menu item',
                          //   context: 'tools',
                          //   onclick: function () {
                          //     editor.insertContent('&nbsp;Here\'s some content!&nbsp;')
                          //   }
                          // })
                      }
                  });
              });
          },
          init1: function () {
              this.$nextTick(() => {
                  let vm = this;
                  let height = document.body.offsetHeight - 300;
                  tinymce.init({
                      selector: '#tinymceEditer1',
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
                      automatic_uploads: true,
                      images_reuse_filename: true,
                      images_upload_url: 'http://bn.sjy/index.php/article_image_upload',
                      images_upload_handler: function (blobInfo, success, failure) {
                          let xhr, formData;
                          xhr = new XMLHttpRequest();
                          xhr.withCredentials = true;
                          xhr.open('POST', 'http://bn.sjy/index.php/article_image_upload');
                          xhr.onload = function () {
                              var json;
                              if (xhr.status != 200) {
                                  failure('HTTP Error: ' + xhr.status);
                                  return;
                              }
                              json = JSON.parse(xhr.responseText);
                              if (!json || typeof json.data.url !== 'string') {
                                  failure('Invalid JSON: ' + xhr.responseText);
                                  return;
                              }
                              success(json.data.url);
                          };
                          formData = new FormData();
                          formData.append('file', blobInfo.blob(), blobInfo.filename());
                          xhr.send(formData);
                      },
                      table_default_styles: {
                          width: '100%',
                          borderCollapse: 'collapse'
                      },
                      setup: function (editor) {
                          editor.on('init', function (e) {
                              vm.spinShow = false;
                              // tinymce.get('tinymceEditer').setContent(vm.imgcontent)
                          });
                          editor.on('keydown', function (e) {
                              // editor.insertContent(vm.form.content)
                              // localStorage.editorContent = tinymce.get('tinymceEditer').getContent()
                              // tinymce.get('tinymceEditer').setContent(vm.form.content)
                          });
                          // editor.addMenuItem('myitem', {
                          //   text: 'My menu item',
                          //   context: 'tools',
                          //   onclick: function () {
                          //     editor.insertContent('&nbsp;Here\'s some content!&nbsp;')
                          //   }
                          // })
                      }
                  });
              });
          },
          change (status) {
              if (status) {
                  this.tag_name = true;
                  this.$Message.info('切换到下拉选择');
              } else {
                  this.tag_name = false;
                  this.$Message.info('切换到添加标签');
              }
          },
          editdata (editid) {
              this.edit = true;
              this.apiGet('product/' + editid).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      this.form = data;
                      tinymce.editors[0].setContent(this.form.detail);
                      tinymce.editors[1].setContent(this.form.field4);
                      let tempNUmber = [];
                      if (this.form.tags !== '') {
                          this.form.tags.split(',').map(function (key) {
                              tempNUmber.push(key);
                          });
                      }
                      this.form.tag_id = tempNUmber;
                      this.form.tags = '';
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息

              });
          },
          changeTagtype (value) {
              this.form.tag_id = value.value;
          },

          addtags () {
              let data = {
                  type: 'product',
                  name: this.form.tags
              };
              this.apiPost('tags', data).then((res) => {
                  this.handleAjaxResponse(res, (data, msg) => {
                      let tempN = this.form.tag_id;
                      let tagId = data.id;
                      let tagnum = tagId.toString();
                      tempN.push(tagnum);
                      this.form.tags = '';
                      this.getProductTag(true);
                      this.$Message.success(msg);
                  }, (data, msg) => {
                      this.$Message.error(msg);
                  });
              }, (res) => {
                  // 处理错误信息

              });
          },
          imgpath () {
              return this.form.image;
          },
          chage_other_show () {
              this.other_is_show = !this.other_is_show;
          },
          changePtype (value) {
              this.form.type_id = value.value;
              this.form.type_name = value.label;
          },
          // 缩略图上传回调
          getResponse (response, file, filelist) {
              this.form.image = response.data.url;
              if (response.status) {
                  this.$Message.success(response.msg);
                  this.imgpath();
                  this.imgshow = true;
                  this.$refs.upImg.clearFiles();
              } else {
                  this.$Message.error(response.msg);
              }
              this.$refs.upImg.clearFiles();
          },
          getErrorInfo (error, file, filelist) {
              this.$Message.error(error);
          },
          formatError () {
              this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
          },
          getError (error, file, filelist) {
              this.$Message.error(error);
          },
          formatE () {
              this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
          },
          save () {
              this.$refs.padd.validate((valid) => {
                  if (valid) {
                      this.modal_loading = true;
                      var activeEditor = tinymce.editors[0];
                      var activeEditor1 = tinymce.editors[1];
                      var editBody = activeEditor.getBody();
                      var editBody1 = activeEditor1.getBody();
                      activeEditor.selection.select(editBody);
                      activeEditor1.selection.select(editBody1);
                      var text = activeEditor.selection.getContent({'format': 'html'});
                      var text1 = activeEditor1.selection.getContent({'format': 'html'});
                      this.form.detail = text;
                      this.form.field4 = text1;
                      let data = this.form;
                      let id = data.id;
                      this.apiPut('product/' + id, data).then((res) => {
                          this.handleAjaxResponse(res, (data, msg) => {
                              this.modal = false;
                              this.modal_loading = false;
                              this.$refs.padd.resetFields();
                              this.$parent.getData();
                              this.$Message.success(msg);
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
          },
          add () {
              this.$refs.padd.validate((valid) => {
                  if (valid) {
                      this.modal_loading = true;
                      let data = this.form;
                      delete data.id;
                      var activeEditor = tinymce.editors[0];
                      var activeEditor1 = tinymce.editors[1];
                      var editBody = activeEditor.getBody();
                      var editBody1 = activeEditor1.getBody();
                      activeEditor.selection.select(editBody);
                      activeEditor1.selection.select(editBody1);
                      var text = activeEditor.selection.getContent({'format': 'html'});
                      var text1 = activeEditor1.selection.getContent({'format': 'html'});
                      this.form.detail = text;
                      this.form.field4 = text1;
                      this.apiPost('product', data).then((res) => {
                          this.handleAjaxResponse(res, (data, msg) => {
                              this.modal = false;
                              this.$parent.getData();
                              this.$Message.success(msg);
                              this.modal_loading = false;
                              this.imgshow = false;
                              this.form.image = '';
                              this.$refs.padd.resetFields();
                              this.$refs.select.clearSingleSelect();
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
      mixins: [http, common]

  };
</script>

