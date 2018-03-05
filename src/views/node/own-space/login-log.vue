<template>
    <card>
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
    </card>
</template>

<script>
    import http from '../../../libs/http';

    export default {
        name: 'login-log',
        mixins: [http],
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
                datas: [],
                editinfo: {},
                questiontypelist: [],
                showhtmldata: [],
                tagname: {}
            };
        },
        methods: {
            getData() {
                let data = {
                    params: {
                        page: this.page,
                        rows: this.rows
                    }
                };
                this.apiGet('userLoginLog', data).then((data) => {
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
            }
        },
        created() {
            this.getData();
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
                    title: 'IP',
                    key: 'ip',
                    sortable: true
                });
                columns.push({
                    title: '地理位置',
                    key: 'location',
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
        }
    };
</script>

<style scoped>

</style>