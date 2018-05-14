<template>
    <div>
        <div>
            <Modal v-model="modal" width="900" :styles="{top: '20px'}" :mask-closable="false">
                <p slot="header">
                    <span>添加</span>
                </p>
                <div>
                    <Card>
                        <Form ref="padd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                            <Form-item label="名称" prop="name">
                                <Input type="text" v-model="form.name" placeholder="请输入产品名称 （或其他名称）"></Input>
                            </Form-item>
                            <Row>
                                <Col span="12">
                            <Form-item label="标记" prop="flag"
                                       style="position: relative;z-index: 10">
                                <CheckboxGroup v-model="form.flag">
                                    <Checkbox v-for="(item,index) in this.$store.state.commondata.FlagList" :key="index"
                                              :label=item[0]>
                                        {{item[1]}}
                                    </Checkbox>
                                </CheckboxGroup>
                            </Form-item>
                                </Col>
                            <Col span="7">
                                <Form-item label="权重" prop="sort">
                                    <Input type="text" v-model="form.sort" placeholder="请输入权重"
                                           style="width: 200px;"/>
                                </Form-item>
                            </Col>
                            </Row>
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
                                        style="text-align:left;display: inline-block">
                                    <Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>
                                </Upload>
                                <Button type="success" style="display: inline-block" :loading="modal_loading"
                                        @click="addimg('thumbnail')">
                                    素材库图片
                                </Button>
                                <div v-if="form.image" style="display: inline-block;width:100%">
                                    <div style="margin:0px auto;width: 300px">
                                        <img style="max-width: 300px;" :src=form.image alt="">
                                    </div>
                                </div>
                            </Form-item>
                            <Form-item label="编号" prop="sn">
                                <Input type="text" v-model="form.sn" placeholder="请输入产品编号 （或其他编号）"></Input>
                            </Form-item>

                            <Form-item label="选择显示方式">
                                <RadioGroup v-model="form.stations" @on-change="ChangRadio">
                                    <Radio label="10">   <span>全部显示</span></Radio>
                                    <Radio label="20">   <span>仅主站</span></Radio>
                                    <Radio label="30">   <span>全部子站</span></Radio>
                                    <Radio label="40">   <span>选定子站</span></Radio>
                                </RadioGroup>
                            </Form-item>
                            <Row v-if="this.form.stations =='40'  ">
                                <Col span="17">
                                    <Form-item label="选择站点">
                                        <Select v-model="form.site_id"  style="width:300px" label-in-value filterable clearable @on-change="changeChildSite">
                                            <Option v-for="item in site" :value="item.id" :label="item.text" :key="item.id">
                                                {{ item.text }}
                                            </Option>
                                        </Select>

                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="产品分类" prop="type_name">
                                        <Select v-model="form.type_id" ref="select" :clearable="selects"
                                                style="width:200px;"
                                                label-in-value filterable clearable placeholder="根据分类查询"
                                                @on-change="changePtype">
                                            <Option-group v-for="(item,index) in productType"
                                                          :label="index" :key="index">
                                                <Option v-for="(peritem, perindex) in item" :value="peritem.id"
                                                        :label="peritem.name" :key="perindex">{{ peritem.name }}
                                                </Option>
                                            </Option-group>
                                        </Select>
                                    </Form-item>
                                </Col>
                                <Col span="12" v-if="this.form.stations =='40' ">
                                    <Form-item label="子站选择" prop="stations_ids">
                                        <Select v-model="form.stations_ids"  label-in-value multiple style="text-align: left;width:200px;">
                                            <Option v-for="item in ChildsSitedata" :value="item.district_id" :label="item.name" :key="item.district_id">
                                                {{ item.name }}
                                            </Option>

                                        </Select>
                                    </Form-item>

                                    <!--<Form-item label="子站选择" prop="stations_ids">-->
                                    <!--<InputNumber :min="1" v-model="form.stations_ids" placeholder="请选择站点"></InputNumber>-->
                                    <!--</Form-item>-->
                                </Col>
                            </Row>


                            <Form-item label="收费方式" prop="payway">
                                <Input type="text" v-model="form.payway" placeholder="请输入收费方式（比如××元/户/年）"></Input>
                            </Form-item>
                            <Form-item label="摘要" prop="summary">
                                <Input type="textarea" :autosize="{minRows: 3,maxRows: 10}" v-model="form.summary"
                                       placeholder="请输入产品摘要 比如相关产品的介绍"></Input>
                            </Form-item>
                            <Form-item label="详情" prop="detail">
                                <Card shadow>
                                    <textarea class='tinymce-textarea' id="tinymceEditerAddProduct"></textarea>
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
                                <Input v-model="form.description" type="textarea" :rows="4"
                                       placeholder="请输入页面描述"></Input>
                            </Form-item>
                            <Row>
                                <Col span="21">
                                <Form-item v-if="tag_name" label="分类标签" prop="tags">
                                    <Select ref="select" :clearable="selects" v-model="form.tag_id"
                                            style="text-align: left;width:350px;"
                                            label-in-value multiple　>
                                        <Option v-for="(item,index) in this.$store.state.commondata.productTag"
                                                :value="index" :label="item" :key="index">
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
                                    <textarea class='tinymce-textarea' id="tinymceEditerAddProductField4"></textarea>
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
                    </Card>
                </div>
                <div slot="footer">
                    <Button type="success" size="large" :loading="modal_loading" @click="add">保存
                    </Button>
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
    // 素材库相关图片
    import materialimg from '../../Common/article/materialimg';

    export default {
        components: {materialimg},
        data () {
            const checkptype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择产品分类'));
                } else {
                    callback();
                }
            };
            return {
                ShowId: '',
                ChildsSitedata: [],
                site_id: Number,
                site: [],
                productType: [],
                spinShow: true,
                switch1: true,
                tag_name: true,
                other_is_show: false,
                modal: false,
                modal_loading: false,
                action: window.ImgUploadPath,
                type_name: '',
                imgshow: false,
                selects: true,
                form: {
                    stations_ids: [],
                    name: '',
                    detail: '',
                    image: '',
                    summary: '',
                    payway: '',
                    sn: '',
                    stations: '10',
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
                    flag: [],
                    site_id:0,
                    sort: 0
                },
                tags: '',
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
                    ],
                    stations_ids: [{required: true,
                        validator: (rule, value, callback) => {
                            if (value.length === 0) {
                                callback(new Error('请选择分类'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'}]
                }
            };
        },
        mounted () {
            this.getSite();
            this.getArticleType();
            this.init();
        },
        destroyed () {
            tinymce.get('tinymceEditerAddProduct').destroy();
            tinymce.get('tinymceEditerAddProductField4').destroy();
        },
        methods: {
            ChangRadio (value) {
                this.form.stations = value;
                this.ShowId = localStorage.siteId;
                if (this.ShowId) {
                    this.getChildSitelist(this.ShowId);
                }
                if (value === '40') {
                    this.$set(this.AddRule, 'stations_ids', [{required: true,
                        validator: (rule, value, callback) => {
                            if (value.length === 0) {
                                callback(new Error('请选择分类'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'}]);
                }
            },
            changeChildSite (value) {
                this.getArticleType(value.value);
                this.getChildSitelist(value.value);
            },
            getArticleType (site_id) {
                let data = {
                    params: {
                        module_type: 'product',
                        site_id: site_id
                    }
                };
                this.apiGet('get_type_list', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.productType = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            getChildSitelist (site_id) {
                let data = {
                    params: {
                        site_id: site_id
                    }
                };
                this.apiGet('childsitelistbysiteid', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.ChildsSitedata = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            getSite () {
                this.apiGet('getSites').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.site = data;
                        //            console.log(this.site)
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            init: function () {
                this.$nextTick(() => {
                    let height = document.body.offsetHeight - 500;
                    this.tinymceInit(this, height, 'tinymceEditerAddProduct');
                    this.tinymceInit(this, height, 'tinymceEditerAddProductField4', 'field4');
                });
            },
            addimg (img) {
                this.img = img;
                this.$refs.addmaterial.getData();
                this.$refs.addmaterial.modal = true;
            },
            formReset () {
                // 表单重置
                this.$refs.padd.resetFields();
            },
            addmaterial (src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerAddProduct').insertContent(imgsrc);
                } else if (this.img === 'field4') {
                    // 字段4  自定义字段 写明作用
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerAddProductField4').insertContent(imgsrc);
                } else if (this.img === 'thumbnail') {
                    this.form.image = src;
                    // console.log(this.form.image)
                }
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
            changeTagtype (value) {
                this.form.tag_id = value.value;
            },
            addtags () {
                let data = {
                    type: 'product',
                    name: this.tags
                };
                this.apiPost('tags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        let tempN = this.form.tag_id;
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
                });
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
            add () {
                this.$refs.padd.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        var activeEditor = tinymce.get('tinymceEditerAddProductField4');
                        activeEditor.selection.select(activeEditor.getBody());
                        this.form.field4 = activeEditor.selection.getContent({'format': 'html'});
                        var activeEditor1 = tinymce.get('tinymceEditerAddProduct');
                        activeEditor1.selection.select(activeEditor1.getBody());
                        this.form.detail = activeEditor1.selection.getContent({'format': 'html'});
                        this.apiPost('product', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
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
        destroyed () {
            tinymce.get('tinymceEditerAddProduct').destroy();
            tinymce.get('tinymceEditerAddProductField4').destroy();
        },
    props: {
            gpd: {default: 1}
        },
        mixins: [http, common, tinymceInit]
    };
</script>

