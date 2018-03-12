<template>
    <div>
        <div>
            <Modal v-model="modal" width="800" :styles="{top: '20px'}" 　:mask-closable="false">
                <p slot="header">
                    <span>修改问答</span>
                </p>
                <div>
                    <Form ref="questionadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="问题名称" prop="question">
                            <Input type="text" v-model="form.question" placeholder="请填写问答分类"></Input>
                        </Form-item>
                        <Form-item label="标记" prop="flag"
                                   style="position: relative;z-index: 10">
                            <CheckboxGroup v-model="form.flag">
                                <Checkbox v-for="(item,index) in this.$store.state.commondata.FlagList" :key="index" :label=item[0]>
                                    {{item[1]}}
                                </Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                        <Form-item label="问答分类" prop="type_id">
                            <Select v-model="form.type_id" ref="select" :clearable="selects" style="width:200px;"
                                    label-in-value filterable clearable @on-change="changeArticletype">
                                <Option-group v-for="(item,index) in this.$store.state.commondata.questionType"
                                              :label="index" :key="index">
                                    <Option v-for="(items, indexs) in item" :value="items.id" :label="items.name"
                                            :key="indexs">{{ items.name }}
                                    </Option>
                                </Option-group>
                            </Select>
                        </Form-item>
                        <Form-item class="contentarticle" label="内容">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditersave"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </Form-item>
                        <Form-item label="页面关键词" prop="keywords">
                            <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词(尽量用英文符号分割)"
                                   style="width: 200px;"></Input>
                        </Form-item>
                        <Form-item label="页面描述" prop="description">
                            <Input v-model="form.description" :rows="3" type="textarea" placeholder="请输入页面描述"></Input>
                        </Form-item>
                        <Row>
                            <Col span="21">
                            <Form-item v-if="tag_name" label="分类标签" prop="tags">
                                <Select ref="select" :clearable="selects" v-model="form.tag_id"
                                        style="text-align: left;width:350px;"
                                        label-in-value multiple filterable　>
                                    <Option v-for="(item,index) in this.$store.state.commondata.questionTag"
                                            :value="index"
                                            :label="item" :key="index">
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
                    </Form>
                </div>
                <div slot="footer">
                    <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
                </div>
            </Modal>
            <materialimg ref="editmaterial" v-on:addmaterial="addmaterial"></materialimg>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import tinymce from 'tinymce';
    import tinymceInit from '../../../libs/tinymceInit';
    import materialimg from '../article/materialimg.vue';

    export default {
        components: {materialimg},
        data() {
            const checkquestiontype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择问答分类'));
                } else {
                    callback();
                }
            };
            return {
                switch1: true,
                tag_name: true,
                modal: false,
                selects: true,
                spinShow: true,
                modal_loading: false,
                img: '',
                form: {
                    question: '',
                    content_paragraph: '',
                    type_id: 0,
                    type_name: '',
                    tag_id: [],
                    flag: []
                },
                tags: '',
                AddRule: {
                    question: [
                        {required: true, message: '请填写问题名', trigger: 'blur'}
                    ],
                    type_id: [
                        {required: true, validator: checkquestiontype, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            init: function () {
                this.$nextTick(() => {
                    this.tinymceInit(this, document.body.offsetHeight - 500, 'tinymceEditersave');
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
            updateData(data) {
                this.form.content_paragraph = data;
            },
            changeArticletype(type) {
                this.form.type_name = type.label;
            },
            addtags() {
                let data = {
                    type: 'question',
                    name: this.tags
                };
                this.apiPost('tags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        let tempN = this.form.tag_id;
                        let tagId = data.id;
                        let tagnum = tagId.toString();
                        tempN.push(tagnum);
                        this.tags = '';
                        this.getQuestionTag(true);
                        this.$Message.success(msg);
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息

                });
            },
            clearQuestionType() {
                this.$refs.select.clearSingleSelect();
            },
            edit(editid) {
                this.apiGet('question/' + editid).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.form = data;
                        tinymce.get('tinymceEditersave').setContent(this.form.content_paragraph);
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
                                //console.log(flag);
                            });
                        }
                        this.form.flag = flag;
                        this.form.tag_id = tempNUmber;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息

                });
            },
            add() {
                this.$refs.questionadd.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        let id = data.id;
                        var activeEditor = tinymce.activeEditor;
                        var editBody = activeEditor.getBody();
                        activeEditor.selection.select(editBody);
                        var text = activeEditor.selection.getContent({'format': 'html'});
                        this.form.content_paragraph = text;
                        this.apiPut('question/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
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
            },
            addmaterial(src) {
                if (this.img === 'content') {
                    let imgsrc = '<img src=' + src + '>';
                    tinymce.get('tinymceEditersave').insertContent(imgsrc);
                } else if (this.img === 'suolue') {
                    this.form.thumbnails = src;
                }
            },
        },
        mounted() {
            this.init();
        },
        destroyed() {
            tinymce.get('tinymceEditersave').destroy();
        }, props: {
            gpd: {default: 1},
        },
        mixins: [http, common, tinymceInit]
    };
</script>
