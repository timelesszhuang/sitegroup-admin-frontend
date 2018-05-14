<template>
    <div>
        <card>
            <div class="top">
                分类名:
                <Input v-model="name" placeholder="产品名" style="width:300px;"/>
                <Select v-model="type_id" style="width:200px;position: relative;z-index: 10000;"
                        label-in-value filterable multiple clearable placeholder="根据分类查询">
                    <Option-group v-for="(item,index) in this.$store.state.commondata.productType" :label="index"
                                  :key="index">
                        <Option v-for="(items, indexs) in item" :value="items.id" :label="items.name" :key="indexs">{{
                            items.name }}
                        </Option>
                    </Option-group>
                </Select>
                <Button type="primary" @click="queryData">查询</Button>
                <Button type="success" @click="add">添加</Button>
            </div>
            <div>
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
            <padd ref="add" v-on:getdata="getData"></padd>
            <psave ref="edit" v-on:getdata="getData"></psave>
            <editimg ref="editimg" ></editimg>
            <showhtml ref="showhtml" :form="showhtmldata"></showhtml>
        </card>
    </div>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import padd from './add.vue';
    import psave from './save.vue';
    import editimg from './editimg.vue';
    import showhtml from './showhtml.vue';
    export default {
        data () {
            return {
                action: window.HOST + 'admin/uploadProductSerImg',
                self: this,
                border: true,
                stripe: true,
                showheader: true,
                showIndex: false,
                size: 'small',
                current: 1,
                total: 0,
                page: 1,
                rows: 10,
                name: '',
                datas: [],
                editinfo: {},
                imginfo: {},
                ptype: [],
                type_id: [],
                showhtmldata: [],
                tagname: {}
            };
        },
        // psave, editimg,
        components: {padd, psave, editimg, showhtml},
        mounted () {
            this.getProductType();
            this.getProductTag();
        },
        created () {
            this.getData();
        },
        methods: {
            getData () {
                let data = {
                    params: {
                        page: this.page,
                        rows: this.rows,
                        name: this.name,
                        type_id: this.type_id.join(',')
                    }
                };
                this.apiGet('product', data).then((data) => {
                    this.handleAjaxResponse(data, (data, msg) => {
                        this.datas = data.rows;
                        this.total = data.total;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (data) => {
                    this.$Message.error('网络异常，请稍后重试');
                });
            },
            changePage (page) {
                this.page = page;
                this.getData();
            },
            changePageSize (pagesize) {
                this.rows = pagesize;
                this.getData();
            },
            queryData () {
                this.getData();
            },
            add () {
                // 重置表单页面
                this.$refs.add.formReset();
                this.$refs.add.modal = true;
            },
            error (nodesc) {
                this.$Notice.error({
                    title: '预览模板页被浏览器拦截,请允许',
                    desc: nodesc ? '' : ''
                });
            },
            showhtml (index) {
                let data = this.datas[index];
                this.apiPost('product_show_html', data).then((res) => {
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
            edit (index) {
                let editid = this.datas[index].id;
                this.$refs.edit.modal = true;
                this.$refs.edit.editdata(editid);
                this.$refs.edit.getSite();
                this.$refs.edit.getArticleType();
            },
            remove (index) {
                // 需要删除确认
                let id = this.datas[index].id;
                let _this = this;
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '您确定删除该记录?',
                    okText: '删除',
                    cancelText: '取消',
                    onOk: (index) => {
                        _this.apiDelete('product/', id).then((res) => {
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
            },
            editimg (index) {
                let editid = this.datas[index].id;
                this.$refs.editimg.editimg(editid);
            }
        },
        computed: {
            tableColumns () {
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
                    title: '缩略图',
                    width: '200',
                    key: 'base64',
                    sortable: true,
                    render (h, params) {
                        return h('img', {
                            attrs: {
                                src: params.row.image,
                                title: params.row.name,
                                style: 'max-width: 190px;max-height: 150px'
                            }
                        });
                    }
                });
                columns.push({
                    width: '150',
                    title: '编号',
                    key: 'sn'
                });

                columns.push({
                    title: '产品名称',
                    key: 'name',
                    sortable: true
                });
                columns.push({
                    title: '所属分类',
                    key: 'type_name',
                    sortable: true
                });
                columns.push({
                    title: '收费方式',
                    key: 'payway',
                    sortable: true
                });
                columns.push(
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed: 'right',
                        render (h, params) {
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
                                        type: 'primary',
                                        style: 'margin-left:3px'
                                    },
                                    on: {
                                        click: function () {
                                            // 不知道为什么这个地方不是我需要的this
                                            _this.editimg(params.index);
                                        }
                                    }
                                }, '修改产品图集'),
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
