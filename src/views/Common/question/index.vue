<template>
    <div>
        <card>
            <div class="top">
                问答:
                <Input v-model="content" placeholder="问答" style="width:300px;"></Input>
                问答分类:
                <Select v-model="type_id" style="width:200px;position: relative;z-index: 10000;"
                        label-in-value multiple filterable clearable placeholder="根据分类查询">
                    <Option-group v-for="(item,index) in this.$store.state.commondata.questionType" :label="index"
                                  　:key="index">
                        <Option v-for="(items, indexs) in item" :value="items.id" :label="items.name" :key="indexs">{{
                            items.name }}
                        </Option>
                    </Option-group>
                </Select>
                <Button type="primary" @click="queryData">查询</Button>
                <Button type="success" @click="add">添加</Button>
            </div>
            <div class="content" style="margin-top:10px;">
                <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
                       :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current="current" @on-change="changePage"
                              @on-page-size-change="changePageSize"
                              show-total
                              show-elevator>
                        </Page>
                    </div>
                </div>
            </div>
            <questionadd ref="add" v-on:getdata="getData"></questionadd>
            <questionsave ref="save" v-on:getdata="getData"></questionsave>
            <showhtml ref="showhtml" :form="showhtmldata"></showhtml>
        </card>
    </div>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import questionadd from './add.vue';
    import questionsave from './save.vue';
    import showhtml from './showhtml.vue';

    export default {
        data() {
            return {
                self: this,
                border: true,
                stripe: true,
                showheader: true,
                showIndex: true,
                size: 'small',
                total: 0,
                page: 1,
                current: 1,
                rows: 10,
                content: '',
                type_id: [],
                datas: [],
                editinfo: {},
                questiontypelist: [],
                showhtmldata: [],
                tagname: {}
            };
        },
        components: {
            questionadd, questionsave, showhtml
        },
        created() {
            this.getData();
        },
        mounted() {
            this.getQuestionType();
            this.getQuestionTag();
        },
        methods: {
            getData() {
                let data = {
                    params: {
                        page: this.page,
                        rows: this.rows,
                        content: this.content,
                        type_id: this.type_id.join(',')
                    }
                };
                this.apiGet('question', data).then((data) => {
                    this.handleAjaxResponse(data, (data, msg) => {
                        this.datas = data.rows;
                        this.total = data.total;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (data) => {

                });
            },
            changePage(page) {
                this.page = page;
                this.getData();
            },
            changePageSize(pagesize) {
                this.rows = pagesize;
                this.getData();
            },
            queryData() {
                this.getData();
            },
            add() {
                this.$refs.add.modal = true;
            },
            error(nodesc) {
                this.$Notice.error({
                    title: '预览模板页被浏览器拦截,请允许',
                    desc: nodesc ? '' : ''
                });
            },
            edit(index) {
                let editid = this.datas[index].id;
                this.$refs.save.edit(editid);
                this.$refs.save.modal = true;
            },
            showhtml(index) {
                let data = this.datas[index];
                this.apiPost('question_show_html', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        if (data.length === 1) {
                            let open = window.open(data[0].url);
                            if (!open) {
                                this.error(false);
                            }
                        } else {
                            this.showhtmldata = data;
                            this.$refs.showhtml.modal = true;
                        }
                        this.modal = false;
                    }, (data, msg) => {
                        this.modal_loading = false;
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.modal_loading = false;
                });
            },
            remove(index) {
                // 需要删除确认
                let id = this.datas[index].id;
                let _this = this;
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '您确定删除该记录?',
                    okText: '删除',
                    cancelText: '取消',
                    onOk: (index) => {
                        _this.apiDelete('question/', id).then((res) => {
                            _this.handleAjaxResponse(res, (data, msg) => {
                                _this.getData();
                                _this.$Message.success(msg);
                            }, (data, msg) => {
                                _this.$Message.error(msg);
                            });
                        }, (res) => {
                            // 处理错误信息
                        });
                    },
                    onCancel: () => {
                        return false;
                    }
                });
            }
        },
        computed: {
            tableColumns() {
                let columns = [];
                let _this = this;
                if (this.showCheckbox) {
                    columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    });
                }
                if (this.showIndex) {
                    columns.push({
                        type: 'index',
                        width: 60,
                        align: 'center'
                    });
                }
                columns.push({
                    title: '问题',
                    key: 'question',
                    sortable: true
                });
                columns.push({
                    title: '分类',
                    key: 'type_name',
                    sortable: true
                });
                columns.push({
                    title: '添加时间',
                    key: 'create_time'
                });
                columns.push(
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed: 'right',
                        render(h, params) {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    attrs: {
                                        type: 'primary'
                                    },
                                    on: {
                                        click: function () {
                                            // 不知道为什么这个地方不是我需要的this
                                            _this.edit(params.index);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    attrs: {
                                        type: 'error',
                                        style: 'margin-left:3px'
                                    },
                                    on: {
                                        click: function () {
                                            // 不知道为什么这个地方不是我需要的this
                                            _this.remove(params.index);
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    attrs: {
                                        type: 'info',
                                        style: 'margin-left:3px'
                                    },
                                    on: {
                                        click: function () {
                                            // 不知道为什么这个地方不是我需要的this
                                            _this.showhtml(params.index);
                                        }
                                    }
                                }, '页面预览')
                            ]);
                        }
                    }
                );
                return columns;
            }
        },
        mixins: [http, common]
    };
</script>
