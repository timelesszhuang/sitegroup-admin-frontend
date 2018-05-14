<template>
    <div>
        <Modal v-model="modal" width="900" :styles="{top: '20px'}" :mask-closable="false">
            <p slot="header">
                <span v-if="this.form.url">添加到私有文章库&nbsp;&nbsp;&nbsp;
                    <a v-bind:href="this.form.url" target="_blank">点此查看原文章</a>
                </span>
                <span v-else>修改文章</span>
            </p>
            <div>
                <Card>
                    <Form ref="save" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Row :gutter="16">
                            <Col span="17">
                            <Form-item label="标题" prop="title">
                                <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
                            </Form-item>
                            </Col>
                            <Col span="5">
                            <ColorPicker v-model="form.title_color"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <Form-item label="标记" prop="flag"
                                       style="position: relative;z-index: 10">
                                <CheckboxGroup v-model="form.flag">
                                    <Checkbox v-for="(item,index) in this.$store.state.commondata.FlagList" :key="index" :label=item[0]>{{item[1]}}</Checkbox>
                                </CheckboxGroup>
                            </Form-item>
                            </Col>
                            <Col span="7">
                                <Form-item label="权重" prop="sort">
                                    <InputNumber :min="1" v-model="form.sort" placeholder="请输入权重"></InputNumber>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <Form-item label="简略标题" prop="shorttitle">
                                <Input type="text" v-model="form.shorttitle" placeholder="请输入简略标题"></Input>
                            </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <Form-item label="来源" prop="come_from">
                                <el-autocomplete
                                        size="small"
                                        class="inline-input"
                                        v-model="form.come_from"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入来源"
                                        @select="handleSelect"
                                ></el-autocomplete>
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
                        <Form-item label="选择显示方式">
                            <RadioGroup v-model="form.stations" @on-change="ChangRadio">
                                <Radio label="10">   <span>全部显示</span></Radio>
                                <Radio label="20">   <span>仅主站</span></Radio>
                                <Radio label="30">   <span>全部子站</span></Radio>
                                <Radio label="40">   <span>选定子站</span></Radio>
                            </RadioGroup>
                        </Form-item>
                        <Row v-if="this.form.stations =='40' && this.ShowId == null">
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
                                    <Select v-model="form.stations_ids"  label-in-value multiple style="text-align: left;width:200px;">
                                        <Option v-for="item in ChildsSitedata" :value="item.district_id" :label="item.name" :key="item.district_id">
                                            {{ item.name }}
                                        </Option>

                                    </Select>
                                </Form-item>
                            </Col>
                        </Row>
                        <Form-item label="文章描述" prop="summary">
                            <Input v-model="form.summary" :rows="3" type="textarea" placeholder="请输入文章描述"></Input>
                        </Form-item>
                        <div style="width:90px;text-align: center;font-size: 12px;">内容
                        </div>
                        <Form-item class="contentarticle">
                            <Card shadow>
                                <textarea class='tinymce-textarea' :id=editImgId></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Row>
                            <Col span="12">
                            <Form-item label="页面关键词" prop="keywords">
                                <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词(请用英文符号,分割)"></Input>
                            </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="21" style="position: relative;z-index: 10">
                            <Form-item v-if="tag_name" label="文章标签" prop="tag_id">
                                <Select ref="select" :clearable="selects" v-model="form.tag_id"
                                        style="position:relative;text-align: left;width:350px;z-index: 10000;"
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
                                       placeholder="请输入文章标签"></Input>
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
                <Button type="success" v-if="this.form.url" size="large" :loading="modal_loading" @click="add">添加
                </Button>
                <Button type="success" size="large" v-else-if="!this.form.url" :loading="modal_loading" @click="save">保存
                </Button>
            </div>
        </Modal>
        <materialimg ref="addmaterial" v-on:addmaterial="addmaterial"></materialimg>
    </div>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import tinymce from 'tinymce';
    import materialimg from './materialimg.vue';
    import tinymceInit from '../../../libs/tinymceInit';

    export default {
        components: {materialimg, tinymceInit},
        data () {
            const checkarticletype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择文章分类'));
                } else {
                    callback();
                }
            };
            return {
                ShowId: '',
                site: [],
                articleType: [],
                ComForm: [],
                Auther: [],
                restaurants: [],
                restaurantscom: [],
                img: '',
                ChildsSitedata: [],
                form: {
                    site_id: 0,
                    testid: 160,
                    stations_ids: [],
                    articletype_id: 0,
                    articletype_name: '',
                    auther: '',
                    summary: '',
                    title: '',
                    title_color: '',
                    content: '',
                    stations: '',
                    come_from: '',
                    posttime: '',
                    thumbnails: '',
                    readcount: 0,
                    keywords: '',
                    shorttitle: '',
                    is_collection: '',
                    tag_id: [],
                    flag: [],
                    sort: 0
                },
                tags: '',
                imgcontent: '',
                spinShow: true,
                tag_name: true,
                switch1: true,
                action: window.ImgUploadPath,
                imgshow: true,
                editorOption: {
                    modules: {
                        history: {
                            delay: 1000,
                            maxStack: 50
                        }
                    }
                },
                selects: true,
                fullscreenLoading: '',
                uploadData: {},
                modal: false,
                modal_loading: false,
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
                        {validator: checkarticletype, trigger: 'blur'}
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
                    // tag_id: [
                    //   {required: true, validator: checktag, trigger: 'blur'}
                    // ]
                },
                editImgId: 'tinymceEditersave'
            };
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
            addexclusive (editid) {
                this.apiGet('public_article/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        data.readcount = 0;
                        data.is_collection = 20;
                        data.title_color = '';
                        this.form = data;
                        this.form.thumbnails = data.thumbnail;
                        this.form.url = data.preurl;
                        this.form.summary = data.summary;
                        this.form.come_from = data.comefrom;
                        this.form.auther = data.author;
                        tinymce.get(this.editImgId).setContent(this.form.content);
                        let tempNUmber = [];
                        this.form.tag_id = tempNUmber;
                        this.form.flag = tempNUmber;
                        this.modal = true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            addqq (editid) {
                this.apiGet('qicq/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        data.thumbnails = '';
                        data.summary = '';
                        data.is_collection = 20;
                        data.readcount = 0;
                        data.title_color = '';
                        this.form = data;
                        this.form.come_from = data.source;
                        this.form.createtime = data.ptime;
                        tinymce.get(this.editImgId).setContent(this.form.content);
                        let tempNUmber = [];
                        this.form.tag_id = tempNUmber;
                        this.form.flag = tempNUmber;
                        this.modal = true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            addhots (editid) {
                this.apiGet('hot_news/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        data.readcount = 0;
                        data.title_color = '';
                        data.is_collection = 20;
                        this.form = data;
                        this.form.articletype_id = '';
                        this.form.articletype_name = '';
                        this.form.come_from = data.source;
                        this.form.createtime = data.ptime;
                        this.form.thumbnails = data.base64img;
                        tinymce.get(this.editImgId).setContent(this.form.content);
                        let tempNUmber = [];
                        this.form.tag_id = tempNUmber;
                        this.form.flag = tempNUmber;
                        this.modal = true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            addsouhu (editid) {
                this.apiGet('souhu/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        data.readcount = 0;
                        data.summary = '';
                        this.form.shorttitle = data.short_title;
                        data.is_collection = 20;
                        data.title_color = '';
                        this.form = data;
                        this.form.come_from = data.source;
                        this.form.thumbnails = data.thumbnail;
                        tinymce.get(this.editImgId).setContent(this.form.content);
                        let tempNUmber = [];
                        this.form.tag_id = tempNUmber;
                        this.form.flag = tempNUmber;
                        this.modal = true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            add163 (editid) {
                this.apiGet('wangyi/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        data.readcount = 0;
                        data.is_collection = 20;
                        data.title_color = '';
                        this.form = data;
                        this.form.thumbnails = data.imgsrc;
                        this.form.summary = data.digest;
                        this.form.come_from = data.source;
                        tinymce.get(this.editImgId).setContent(this.form.content);
                        let tempNUmber = [];
                        this.form.tag_id = tempNUmber;
                        this.form.flag = tempNUmber;
                        this.modal = true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            edit (editid) {
                this.apiGet('article/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.form = data;
                        tinymce.get(this.editImgId).setContent(this.form.content);
                        if (this.form.stations == 40) {
                            this.getChildSitelist(this.form.site_id);
                        }
                        let tempNUmber = [];
                        if (this.form.tags !== '') {
                            this.form.tags.split(',').map(function (key) {
                                tempNUmber.push(Number(key));
                            });
                        }
                        delete this.form.tags;
                        this.form.tag_id = tempNUmber;
                        this.tags = '';
                        let flag = [];
                        if (this.form.flag !== '') {
                            this.form.flag.split(',').map(function (key) {
                                flag.push(key);
                            });
                        }
                        let ChildNUmber = [];
                        if (this.form.stations_ids !== '') {
                            this.form.stations_ids.split(',').map(function (key) {
                                ChildNUmber.push(Number(key));
                            });
                        }
                        this.form.stations_ids = ChildNUmber;
                        this.form.flag = flag;
                        this.flags = '';
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                });
            },
            init: function () {
                this.$nextTick(() => {
                    let vm = this;
                    let height = document.body.offsetHeight - 500;
                    this.tinymceInit(vm, height, this.editImgId);
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
            changeTagtype (value) {
                this.form.tag_id = value.value;
            },
            addmaterial (src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get(this.editImgId).insertContent(imgsrc);
                } else if (this.img === 'suolue') {
                    this.form.thumbnails = src;
                }
            },
            addimg (img) {
                this.img = img;
                this.$refs.addmaterial.getData();
                this.$refs.addmaterial.modal = true;
            },
            addtags () {
                let data = {
                    type: 'article',
                    name: this.tags
                };
                this.apiPost('tags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        let tempN = this.form.tag_id;
                        let tagnum = data.id.toString();
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
            // 缩略图上传回调
            getResponse (response, file, filelist) {
                this.form.thumbnails = response.data.url;
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
            updateData (data) {
                this.form.content = data;
            },
            changeArticletype (value) {
                this.form.articletype_name = value.label;
                this.form.articletype_id = value.value;
            },
            save () {
                this.$refs.save.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let activeEditor = tinymce.get(this.editImgId);
                        activeEditor.selection.select(activeEditor.getBody());
                        let text = activeEditor.selection.getContent({'format': 'html'});
                        this.form.content = text;
                        let data = this.form;
                        console.log(data);
                        let id = data.id;
                        this.apiPut('article/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.save.resetFields();
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
            },
            add () {
                this.$refs.save.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = {
                            articletype_id: this.form.articletype_id,
                            articletype_name: this.form.articletype_name,
                            auther: this.form.auther,
                            summary: this.form.summary,
                            title: this.form.title,
                            title_color: this.form.title_color,
                            content: this.form.content,
                            come_from: this.form.come_from,
                            posttime: this.form.createtime,
                            thumbnails: this.form.thumbnails,
                            readcount: this.form.readcount,
                            keywords: this.form.keywords,
                            shorttitle: this.form.shorttitle,
                            is_collection: this.form.is_collection,
                            tag_id: this.form.tag_id
                        };
                        this.apiPost('article', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.save.resetFields();
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
            },
            querySearch (queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            querySearch1 (queryString, cb) {
                var restaurants = this.restaurantscom;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter (queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            getAuther () {
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
            getComForm () {
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
            loadAll () {
                return this.Auther;
            },
            handleSelect (item) {
            // console.log(item);
            }

        },
        created () {
            this.editImgId = this.editImgId + this.randomWord(true, 3, 32);
        },
        mounted () {
            this.init();
            this.getAuther();
            this.getComForm();

            this.restaurants = this.loadAll();
            this.restaurantscom = this.ComForm;
        },
        destroyed () {
            tinymce.get(this.editImgId).destroy();
        },
        mixins: [http, common, tinymceInit],
        props: {
            gpd: {default: 1}
            //
            // tagname: {
            //     default: {}
            // },
        }
    };
</script>
<style>
    .ql-editor {
        max-height: 1000px !important;
    }

    .contentarticle .ivu-form-item-content {
        margin-left: 20px !important;

    }
</style>
