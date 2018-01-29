<template>
    <div>
        <div class="top">
            标题:
            <Input v-model="title" placeholder="请输入文章标题" style="width:300px;"></Input>
            文章分类:
            <Select v-model="article_type" style="width:200px"
                    label-in-value filterable clearable>
                <Option-group v-for="(item,index) in this.$store.state.commondata.articleType" :label="index"
                              :key="index">
                    <Option v-for="(peritem,perindex) in item" :value="peritem.id" :label="peritem.name"
                            :key="peritem.id">{{ peritem.name }}
                    </Option>
                </Option-group>
            </Select>
            <Button type="primary" @click="queryData">查询</Button>
            <Button type="success" @click="add">添加</Button>
            <!--<Button type="error" @click="importadd">csv导入</Button>-->
        </div>
        <div class="content" style="margin-top:10px;">
            <Table :border="border" :stripe="stripe" :show-header="showheader"
                   :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
            </Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page v-show="page_show" :total="total" :current="current" :page-size="pageSize"
                          @on-change="changePage"
                          @on-page-size-change="changePageSize"
                          show-total
                          show-elevator show-sizer>
                    </Page>
                </div>
            </div>
        </div>
        <articleadd ref="add"></articleadd>
    </div>
</template>

<script>
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import articleadd from './add';
    export default {
        name: 'index',
        data () {
            return {
                page_show: true,
                border: true,
                stripe: true,
                showheader: true,
                showIndex: true,
                size: 'small',
                total: 0,
                page: 1,
                rows: 10,
                current: 1,
                pageSize: 10,
                title: '',
                article_type: 0,
                datas: []
            };
        },
        mounted () {
            this.getArticleType();
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
                        title: this.title,
                        article_type: this.article_type
                    }
                };
                this.apiGet('article', data).then((data) => {
                    this.handleAjaxResponse(data, (data, msg) => {
                        this.datas = data.rows;
                        this.total = data.total;
                        this.pageSize = 10;
                    });
                }, (data) => {
                    this.$Message.error('网络异常，请稍后重试');
                });
            },
            queryData () {
                this.page = 1;
                this.page_show = false;
                this.getData();
                this.page_show = true;
            },
            changePage (page) {
                this.page = page;
                this.getData();
            },
            changePageSize (pagesize) {
                this.rows = pagesize;
                this.getData();
            },
            // 添加文章相关操作
            add () {
                this.$refs.add.modal = true;
            }
        },
        components: {articleadd},
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
                // columns.push({
                //   title: 'ID',
                //   key: 'id',
                //   width: 60,
                //   align: 'center'
                // })
                columns.push({
                    title: '标题',
                    sortable: true,
                    render (h, params) {
                        return h('span', {
                            attrs: {
                                title: params.row.title,
                                style: 'color:' + params.row.title_color
                            }
                        }, params.row.title);
                    }
                });
                columns.push({
                    title: '分类名称',
                    key: 'articletype_name',
                    sortable: true
                });
                columns.push({
                    title: '作者',
                    key: 'auther',
                    sortable: true
                });
                columns.push({
                    title: '添加时间',
                    key: 'create_time',
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
                                        type: 'info',
                                        style: 'margin-left:3px'
                                    },
                                    on: {
                                        click: function () {
                                            // 不知道为什么这个地方不是我需要的this
                                            _this.showhtml(params.index);
                                        }
                                    }
                                }, '页面预览'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    attrs: {
                                        type: 'default',
                                        style: 'margin-left:3px'
                                    },
                                    on: {
                                        click: function () {
                                            // 不知道为什么这个地方不是我需要的this
                                            _this.show(params.index);
                                        }
                                    }
                                }, '查看')

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

<style scoped>

</style>