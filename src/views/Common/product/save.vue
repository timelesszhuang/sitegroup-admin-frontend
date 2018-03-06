<template>
    <div>
        <div>
            <Modal v-model="modal" width="900" :styles="{top: '20px'}" :mask-closable="false">
                <p slot="header">
                    <span>修改</span>
                </p>
                <div>
                    <Card>
                        <Form ref="psave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                            <Form-item label="名称" prop="name">
                                <Input type="text" v-model="form.name" placeholder="请输入产品名称 （或其他名称）"></Input>
                            </Form-item>
                            <Form-item label="标记" prop="flag"
                                       style="position: relative;z-index: 10">
                                <CheckboxGroup v-model="form.flag">
                                    <Checkbox v-for="(item) in this.$store.state.commondata.FlagList" :label=item[0]>
                                        {{item[1]}}
                                    </Checkbox>
                                </CheckboxGroup>
                            </Form-item>
                            <Form-item label="缩略图" prop="image">
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
                                        style="text-align:left;display: inline-block">
                                    <Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>
                                </Upload>
                                <Button type="success" style="display: inline-block" :loading="modal_loading"
                                        @click="addimg('thumbnail')">
                                    素材库图片
                                </Button>
                                <div v-if="form.image" style="display: inline-block;width: 100%">
                                    <div style="margin:0px auto;width: 300px">
                                        <img style="max-width: 300px;" :src=form.image alt="">
                                    </div>
                                </div>
                            </Form-item>
                            <Form-item label="编号" prop="sn">
                                <Input type="text" v-model="form.sn" placeholder="请输入产品编号 （或其他编号）"></Input>
                            </Form-item>
                            <Form-item label="产品分类" prop="type_name">
                                <Select ref="select" v-model="form.type_id" style="width:200px;"
                                        label-in-value filterable clearable 　@on-change="changePtype">
                                    <Option-group v-for="(item,index) in this.$store.state.commondata.productType"
                                                  :label="index" :key="index">
                                        <Option v-for="(peritem,perindex) in item" :value="peritem.id"
                                                :label="peritem.name"
                                                :key="perindex">{{ peritem.name }}
                                        </Option>
                                    </Option-group>
                                </Select>
                            </Form-item>
                            <Form-item label="收费方式" prop="payway">
                                <Input type="text" v-model="form.payway" placeholder="请输入收费方式（比如××元/户/年）"></Input>
                            </Form-item>
                            <Form-item label="摘要" prop="summary">
                                <Input type="textarea" :autosize="{minRows: 2,maxRows: 10}" v-model="form.summary"
                                       placeholder="请输入产品摘要 比如相关产品的介绍"></Input>
                            </Form-item>
                            <Form-item label="详情" prop="detail">
                                <Card shadow>
                                    <textarea class='tinymce-textarea' id="tinymceEditerSaveProduct"></textarea>
                                </Card>
                            </Form-item>
                            <Form-item label="页面标题" prop="title">
                                <Input type="text" v-model="form.title" placeholder="请输入页面标题"></Input>
                            </Form-item>
                            <Form-item label="页面关键词" prop="keywords">
                                <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词"></Input>
                            </Form-item>
                            <Form-item label="页面描述" prop="description">
                                <Input v-model="form.description" type="textarea" :rows="4"
                                       placeholder="请输入页面描述"></Input>
                            </Form-item>
                            <Row>
                                <Col span="21">
                                <Form-item v-if="tag_name" label="分类标签" prop="tag_id">
                                    <Select ref="select" :clearable="selects" v-model="form.tag_id"
                                            style="text-align: left;width:350px;"
                                            label-in-value multiple　>
                                        <Option v-for="(item,index) in this.$store.state.commondata.productTag"
                                                :value="index" :label="item"
                                                :key="index">
                                            {{item}}
                                        </Option>
                                    </Select>
                                </Form-item>
                                <Form-item label="分类标签" v-if="!tag_name" prop="tag_id">
                                    <Input type="text" style="width:350px;" v-model="tags"
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
                                    <textarea class='tinymce-textarea'
                                              id="tinymceEditerSaveProductField4"></textarea>
                                </Card>
                            </Form-item>
                            <Alert v-show="other_is_show" type="success" show-icon>
                                注意
                                <span slot="desc">该字段 页面中调取 使用field1、field2、field3、field4等调取</span>
                            </Alert>
                        </Form>
                    </Card>
                </div>
                <div slot="footer">
                    <Button type="success" size="large" :loading="modal_loading" @click="save">保存</Button>
                </div>
            </Modal>
            <materialimg ref="addmaterial" v-on:addmaterial="addmaterial"></materialimg>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import tinymce from 'tinymce';
    import tinymceInit from '../../../libs/tinymceInit';
    // 素材库相关图片
    import materialimg from '../../Common/article/materialimg';

    export default {
        components: {materialimg},
        data() {
            const checkptype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择文章分类'));
                } else {
                    callback();
                }
            };
            return {
                tag_name: true,
                switch1: true,
                selects: true,
                other_is_show: false,
                modal: false,
                modal_loading: false,
                action: window.ImgUploadPath,
                type_name: '',
                form: {
                    default: {
                        name: '',
                        detail: '',
                        image: '',
                        summary: '',
                        payway: '',
                        sn: '',
                        type_name: '',
                        type_id: 0,
                        keywords: '',
                        title: '',
                        description: '',
                        field1: '',
                        field2: '',
                        field3: '',
                        field4: '',
                        content: '',
                        flag: '',
                    }
                },
                tags: '',
                ptype: [],
                tagname: '',
                AddRule: {
                    name: [
                        {required: true, message: '请填写产品或其他名称', trigger: 'blur'}
                    ],
                    detail: [
                        {message: '请填写产品详情', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '请输入产品摘要', trigger: 'blur'}
                    ],
                    type_name: [
                        {required: true, validator: checkptype, trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {},
        methods: {
            init: function () {
                this.$nextTick(() => {
                    let vm = this;
                    let height = document.body.offsetHeight - 500;
                    this.tinymceInit(vm, height, 'tinymceEditerSaveProduct');
                    this.tinymceInit(vm, height, 'tinymceEditerSaveProductField4', 'field4');
                });
            },
            change(status) {
                if (status) {
                    this.tag_name = true;
                    this.$Message.info('切换到 选择标签模式');
                } else {
                    this.tag_name = false;
                    this.$Message.info('切换到 添加标签模式');
                }
            },
            addimg(img) {
                this.img = img;
                this.$refs.addmaterial.getData();
                this.$refs.addmaterial.modal = true;
            },
            addmaterial(src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerSaveProduct').insertContent(imgsrc);
                } else if (this.img === 'thumbnail') {
                    this.form.image = src;
                } else if (this.img === 'field4') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerSaveProductField4').insertContent(imgsrc);
                }
            },
            changeTagtype(value) {
                this.form.tag_id = value.value;
            },
            addtags() {
                let data = {
                    type: 'product',
                    name: this.tags
                };
                this.apiPost('admin/tags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        let tempN = [];
                        let tagId = data.id;
                        let tagnum = tagId.toString();
                        tempN.push(tagnum);
                        this.tags = '';
                        this.getProductTag(true);
                        this.$Message.success(msg);
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            updateData(data) {
                this.form.detail = data;
            },
            changePtype(value) {
                this.form.type_id = value.value;
                this.form.type_name = value.label;
            },
            // 缩略图上传回调
            getResponse(response, file, filelist) {
                this.form.image = response.url;
                if (response.status) {
                    this.$Message.success(response.msg);
                } else {
                    this.$Message.error(response.msg);
                }
                this.$refs.upImg.clearFiles();
            },
            getErrorInfo(error, file, filelist) {
                this.$Message.error(error);
            },
            formatError() {
                this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
            },
            getError(error, file, filelist) {
                this.$Message.error(error);
            },
            formatE() {
                this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
            },
            save() {
                this.$refs.psave.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        var activeEditor = tinymce.get('tinymceEditerSaveProductField4');
                        activeEditor.selection.select(activeEditor.getBody());
                        this.form.field4 = activeEditor.selection.getContent({'format': 'html'});
                        var activeEditor1 = tinymce.get('tinymceEditerSaveProduct');
                        activeEditor1.selection.select(activeEditor1.getBody());
                        this.form.detail = activeEditor1.selection.getContent({'format': 'html'});
                        let id = data.id;
                        this.apiPut('product/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.psave.resetFields();
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
            editdata(editid) {
                this.apiGet('product/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.form = data;
                        tinymce.get('tinymceEditerSaveProduct').setContent(this.form.detail);
                        tinymce.get('tinymceEditerSaveProductField4').setContent(this.form.field4);
                        let tempNUmber = [];
                        if (this.form.tags !== '') {
                            this.form.tags.split(',').map(function (key) {
                                tempNUmber.push(key);
                            });
                        }
                        delete this.form.tags;
                        let flag = [];
                        if (this.form.flag !== '') {
                            this.form.flag.split(',').map(function (key) {
                                flag.push(key);
                                console.log(flag);
                            });
                        }
                        this.form.flag = flag;
                        this.form.tag_id = tempNUmber;
                        this.tags = '';
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                });
            }
        },
        created() {
        },
        mounted() {
            this.init();
        },
        destroyed() {
            tinymce.get('tinymceEditerSaveProduct').destroy();
            tinymce.get('tinymceEditerSaveProductField4').destroy();
        }, props: {
            gpd: {default: 1},
        },
        mixins: [http, common, tinymceInit]
    };
</script>
