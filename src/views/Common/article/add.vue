<template>
    <div>
        <Modal v-model="modal" width="900" :styles="{top: '20px'}" :mask-closable="false">
            <p slot="header">
                <span>添加文章</span>
            </p>
            <div>
                <Card>
                    <Form ref="add" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Row :gutter="16">
                            <Col span="17">
                                <Form-item label="标题" prop="title">
                                    <Input type="text" v-model="form.title" placeholder="请输入标题"/>
                                </Form-item>
                            </Col>
                            <Col span="3">
                                <ColorPicker v-model="form.title_color"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form-item label="标记" prop="flag"
                                           style="position: relative;z-index: 10">
                                    <CheckboxGroup v-model="form.flag">
                                        <Checkbox v-for="(item,index) in this.$store.state.commondata.FlagList"
                                                  :key="index"
                                                  :label=item[0]>{{item[1]}}
                                        </Checkbox>
                                    </CheckboxGroup>
                                </Form-item>
                            </Col>
                            <Col span="7">
                                <Form-item label="权重" prop="sort">
                                    <Tooltip content="权重越大月越显示在前面" placement="top-start" class="tooltip">
                                        <InputNumber :min="1" v-model="form.sort" placeholder="请输入权重"></InputNumber>
                                    </Tooltip>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <Form-item label="简略标题" prop="shorttitle">
                                    <Input type="text" v-model="form.shorttitle" placeholder="请输入简略标题"/>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form-item label="来源" prop="come_from">
                                    <!--<Input type="text" v-model="form.come_from" placeholder="请输入来源"-->
                                    <!--style="width: 200px;"/>-->
                                    <el-autocomplete
                                            size="small"
                                            class="inline-input"
                                            v-model="form.come_from"
                                            :fetch-suggestions="querySearch"
                                            placeholder="请输入来源"
                                            @select="handleSelect"
                                    ></el-autocomplete>
                                </Form-item>
                                </Form-item>
                            </Col>
                            <Col span="12">
                                <Form-item label="作者" prop="auther">
                                    <el-autocomplete
                                            size="small"
                                            class="inline-input"
                                            v-model="form.auther"
                                            :fetch-suggestions="querySearch1"
                                            placeholder="请输入作者"
                                            @select="handleSelect"
                                    ></el-autocomplete>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form-item label="缩略图上传">
                                    <Upload
                                            style="display: inline-block"
                                            type="select"
                                            ref="upImg"
                                            with-credentials
                                            name="file"
                                            :format="['jpg','jpeg','png','gif']"
                                            :on-success="getResponse"
                                            :on-error="getErrorInfo"
                                            :on-format-error="formatError"
                                            :action="action">
                                        <Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>
                                    </Upload>
                                    <Button type="success" style="display: inline-block" :loading="modal_loading"
                                            @click="addimg('suolue')">
                                        素材库图片
                                    </Button>
                                </Form-item>
                            </Col>
                            <Col span="12">
                                <div v-if="imgshow" style="margin:0 auto;max-width: 200px;margin-right: 300px">
                                    <img style="max-width: 200px;" :src=this.form.thumbnails alt=""></div>
                            </Col>
                        </Row>
                        <Form-item label="显示范围">
                            <RadioGroup v-model="form.stations" @on-change="ChangRadio">
                                <Tooltip content="主站（主域名）和所有子站（二级域名）显示该篇文章" placement="top-start">
                                    <Radio label="10"><span>全部显示</span></Radio>
                                </Tooltip>
                                <Tooltip content="只有主站（主域名）显示该篇文章" placement="top-start" class="tooltip">
                                    <Radio label="20"><span>仅主站</span></Radio>
                                </Tooltip>
                                <Tooltip content="全部子站（二级域名）显示该篇文章" placement="top-start" class="tooltip">
                                    <Radio label="30"><span>全部子站</span></Radio>
                                </Tooltip>
                                <Tooltip content="选定的子站（二级域名）显示该篇文章" placement="top-start" class="tooltip">
                                    <Radio label="40"><span>特定子站</span></Radio>
                                </Tooltip>
                            </RadioGroup>
                        </Form-item>
                        <Row v-if="this.form.stations =='40' && this.ShowId == null">
                            <Col span="17">
                                <Form-item label="选择站点">
                                    <Select v-model="form.site_id" style="width:300px" label-in-value filterable
                                            clearable @on-change="changeChildSite">
                                        <Option v-for="item in site" :value="item.id" :label="item.text" :key="item.id">
                                            {{ item.text }}
                                        </Option>
                                    </Select>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form-item label="文章分类" prop="articletype_id">
                                    <Select ref="select" :clearable="true" v-model="form.articletype_id"
                                            style="width:200px;"
                                            label-in-value filterable @on-change="changeArticletype">
                                        <Option-group v-for="(item,index) in articleType"
                                                      :label="index" :key="index">
                                            <Option v-for="(peritem ,perindex) in item" :value="peritem.id"
                                                    :label="peritem.name"
                                                    :key="perindex">{{ peritem.name }}
                                            </Option>
                                        </Option-group>
                                    </Select>
                                </Form-item>
                            </Col>
                            <Col span="12" v-if="this.form.stations =='40' ">
                                <Form-item label="子站选择" prop="stations_ids">
                                    <Select v-model="form.stations_ids" label-in-value multiple
                                            style="text-align: left;width:200px;">
                                        <Option v-for="item in ChildsSitedata" :value="item.district_id"
                                                :label="item.name" :key="item.district_id">
                                            {{ item.name }}
                                        </Option>
                                    </Select>
                                </Form-item>
                            </Col>
                        </Row>
                        <Form-item label="阅读次数" prop="readcount">
                            <InputNumber :min="1" v-model="form.readcount" placeholder="请输入作者"></InputNumber>
                        </Form-item>
                        <Form-item label="文章描述" prop="summary">
                            <Input v-model="form.summary" :rows="3" type="textarea" placeholder="请输入文章描述"></Input>
                        </Form-item>
                        <div style="width: 90px;text-align: center;font-size: 12px;">内容
                        </div>
                        <Form-item class="contentarticle" label="内容">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditerAddArticle"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Row>
                            <Col span="12">
                                <Form-item label="页面关键词" prop="keywords">
                                    <Input type="text" v-model="form.keywords"
                                           placeholder="请输入页面关键词(请用英文符号,分割)"></Input>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="21">
                                <Form-item v-if="tag_name" label="文章标签" prop="tag_id"
                                           style="position: relative;z-index: 10">
                                    <Select v-model="form.tag_id"
                                            style="text-align: left;width:350px;"
                                            label-in-value multiple filterable　>
                                        <Option v-for="(item,index) in this.$store.state.commondata.articleTag"
                                                :value="index"
                                                :label="item" :key="index">
                                            {{item}}
                                        </Option>
                                    </Select>
                                </Form-item>
                                <Form-item label="分类标签" v-if="!tag_name" prop="tags">
                                    <Input type="text" style="width:350px;" v-model="tags"
                                           placeholder="请输入文章标签">
                                    </Input>
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
                    </Form>
                </Card>
                <Alert style="font-size:15px;font-weight: bold;text-align:center;" type="warning">
                    图片上传限制:&nbsp;&nbsp;&nbsp;单张图片限制为512KB大小&nbsp;&nbsp;&nbsp;
                </Alert>
            </div>
            <div slot="footer">
                <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
            </div>
        </Modal>
        <materialimg ref="addmaterial" v-on:addmaterial="addmaterial"></materialimg>
    </div>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import materialimg from './materialimg.vue';
    import tinymceInit from '../../../libs/tinymceInit';
    import tinymce from 'tinymce';

    export default {
        components: {materialimg},
        data() {
            const checkarticletype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择文章分类'));
                } else {
                    callback();
                }
            };
            return {
                ShowId: '',
                site_id: Number,
                site: [],
                articleType: [],
                ComForm: [],
                Auther: [],
                restaurants: [],
                restaurantscom: [],
                spinShow: true,
                switch1: true,
                tag_name: true,
                action: window.ImgUploadPath,
                modal: false,
                imgshow: true,
                modal_loading: false,
                editor_id: '',
                img: '',
                imgcontent: '',
                ChildsSitedata: [],
                form: {
                    site_id: 0,
                    stations: '10',
                    stations_ids: [],
                    summary: '',
                    thumbnails: '',
                    keywords: '',
                    readcount: 0,
                    title: '',
                    shorttitle: '',
                    auther: '',
                    come_from: '',
                    articletype_id: 0,
                    articletype_name: '',
                    content: '',
                    title_color: '',
                    tag_id: [],
                    flag: [],
                    sort: 0
                },
                tags: '',
                tagname: {},
                selects: true,
                AddRule: {
                    title: [
                        {required: true, message: '请填写文章标题', trigger: 'blur'}
                    ],
                    come_from: [
                        {required: true, message: '请填写文章来源', trigger: 'blur'}
                    ],
                    auther: [
                        {required: true, message: '请填写文章作者', trigger: 'blur'}
                    ],
                    articletype_id: [
                        {required: true, validator: checkarticletype, trigger: 'blur'}
                    ],
                    stations_ids: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value.length === 0) {
                                callback(new Error('请选择分类'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            ChangRadio(value) {
                this.form.stations = value;
                this.ShowId = localStorage.siteId;
                if (this.ShowId) {
                    this.getChildSitelist(this.ShowId);
                } else {
                    this.ShowId == '';
                }
                if (value === '40') {
                    this.$set(this.AddRule, 'stations_ids', [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value.length === 0) {
                                callback(new Error('请选择分类'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }]);
                }
            },
            changeChildSite(value) {
                this.getArticleType(value.value);
                this.getChildSitelist(value.value);
            },
            getArticleType(site_id) {
                let data = {
                    params: {
                        module_type: 'article',
                        site_id: site_id
                    }
                };
                this.apiGet('get_type_list', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.articleType = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            getChildSitelist(site_id) {
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
            getSite() {
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
                    this.tinymceInit(this, height, 'tinymceEditerAddArticle');
                });
            },
            change(status) {
                if (status) {
                    this.tag_name = true;
                    this.$Message.info('切换到下拉选择');
                } else {
                    this.tag_name = false;
                    this.$Message.info('切换到添加标签');
                }
            },
            changeTagtype(value) {
                this.form.tag_id = value.value;
            },
            addmaterial(src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditerAddArticle').insertContent(imgsrc);
                } else if (this.img === 'suolue') {
                    this.form.thumbnails = src;
                }
            },
            addimg(img) {
                this.img = img;
                this.$refs.addmaterial.getData();
                this.$refs.addmaterial.modal = true;
            },
            addtags() {
                let data = {
                    type: 'article',
                    name: this.tags
                };
                this.apiPost('tags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        let tempN = this.form.tag_id;
                        let tagId = data.id;
                        let tagnum = tagId.toString();
                        tempN.push(tagnum);
                        this.tags = '';
                        this.getArticleTag(true);
                        this.$Message.success(msg);
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                });
            },
            getResponse(response, file, filelist) {
                this.form.thumbnails = response.data.url;
                if (response.status) {
                    this.$Message.success('上传成功');
                    this.imgshow = true;
                    this.$refs.upImg.clearFiles();
                } else {
                    this.$Message.error('上传失败');
                }
                this.$refs.upImg.clearFiles();
            },
            getErrorInfo(error, file, filelist) {
                this.$Message.error(error);
            },
            formatError() {
                this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
            },
            changeArticletype(value) {
                this.form.articletype_name = value.label;
                this.form.articletype_id = value.value;
            },
            add() {
                this.$refs.add.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let activeEditor = tinymce.activeEditor;
                        let editBody = activeEditor.getBody();
                        activeEditor.selection.select(editBody);
                        let text = activeEditor.selection.getContent({'format': 'html'});
                        this.form.content = text;
                        let data = this.form;
                        this.apiPost('article', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal_loading = false;
                                this.imgshow = false;
                                this.form.thumbnails = '';
                                this.form.articletype_id = 0;
                                this.$refs.add.resetFields();
                                this.$refs.select.clearSingleSelect();
                                tinymce.get('tinymceEditerAddArticle').setContent('');
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
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
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            querySearch1(queryString, cb) {
                var restaurants = this.restaurantscom;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            getAuther() {
                this.apiGet('articleautopoint/auther').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        data.forEach((item) => {
                            const newChild = item;
                            this.Auther.push(newChild);
                        });
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            getComForm() {
                this.apiGet('articleautopoint/come_from').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        data.forEach((item) => {
                            const newChild = item;
                            this.ComForm.push(newChild);
                        });
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            loadAll() {
                return this.Auther;
            },
            handleSelect(item) {
                // console.log(item);
            }
        },
        mounted() {
            this.init();
            this.getAuther();
            this.getComForm();
            this.getSite();
            this.getArticleType();
            this.restaurants = this.loadAll();
            this.restaurantscom = this.ComForm;
        },
        destroyed() {
            tinymce.get('tinymceEditerAddArticle').destroy();
        },
        mixins: [http, common, tinymceInit],
        props: {
            imgsrc: {},
            gpd: {default: 1}
        }
    };
</script>
<style>
    .ql-container .ql-editor {
        min-height: 20em;
        padding-bottom: 1em;
        max-height: 25em;
    }

    .contentarticle .ivu-form-item-content {
        margin-left: 20px !important;

    }
</style>
