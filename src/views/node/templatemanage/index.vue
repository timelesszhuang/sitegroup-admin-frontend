<template>
    <div style="padding-left: 5px;padding-right: 5px">
        <Col>
        站点选择:
        <Select v-model="site_type_id" style="width:300px" label-in-value filterable clearable>
            <Option v-for="item in sitetype" :value="item.id" :label="item.text" :key="item.id">{{ item.text}}</Option>
        </Select>
        <Select v-model="file_type" style="width:90px" label-in-value filterable clearable @on-change="changeFileType">
            <Option v-for="(item,index) in this.$store.state.commondata.FileType" :value="item[0]" :label="item[1]"
                    :key="index">{{item[1]}}
            </Option>
        </Select>
        <Button type="primary" @click="getInfo">查询</Button>
        <Button type="info" @click="addTemplate">添加{{file_type_name}}</Button>
        </Col>
        <Col>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选
            </Checkbox>
            <Checkbox :label="type" v-for="type in typeList" :key="type">
                <span>{{type}}</span>
            </Checkbox>
        </CheckboxGroup>
        </Col>
        <div class="content" style="margin-top:10px;margin-left: 5px;margin-right: 5px">
            <Table ref="table" :context="self" :border="border" :stripe="stripe" :show-header="showheader"
                   :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
            </Table>
        </div>
        <Save ref="save" v-on:getdata="getInfo"/>
        <Add ref="add" v-on:getdata="getInfo"/>
        <Reply ref="reply" v-on:getdata="getInfo"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import Save from './templatesave.vue';
    import Add from './templateadd.vue'
    import Reply from './templatereply.vue'

    export default {
        data() {
            return {
                indeterminate: false,
                checkAll: false,
                checkAllGroup: [],
                typeList: [],
                sitetype: [],
                site_type_id: '',
                file_type: 'html',
                file_type_name: '模板',
                self: this,
                border: true,
                stripe: true,
                showheader: true,
                size: 'small',
                datas: [],
                shows_datas: [],
                site_id: 0,
                content: '',
                filename: ''
            }
        },
        components: {
            Save, Add, Reply
        },
        created() {
            this.getSiteType()
        },
        methods: {
            handleCheckAll() {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = this.typeList;
                } else {
                    this.checkAllGroup = [];
                }
                this.checkAllGroupChange(this.checkAllGroup)
            },
            checkAllGroupChange(data) {
                if (data.length === this.typeList.length) {
                    this.datas = this.big_datas;
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                    this.datas = this.big_datas.filter(function (val) {
                        if (data.indexOf(val.type)>=0)
                            return true
                    });
                } else {
                    this.datas = this.big_datas;
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
            addTemplate() {
                if (this.site_id > 0) {
                    this.$refs.add.init(this.site_id, this.file_type, this.file_type_name)
                } else {
                    this.$Message.error('请先选择站点->点击查询!');
                }
            },
            init() {
                this.getSiteType()
            },
            changeFileType(value) {
                this.file_type_name = value.label;
            },
            editTemplate(row) {
                let name = row.name;
                if (this.site_id > 0) {
                    this.$refs.save.init(name, this.site_id, this.file_type, this.file_type_name, row);
                } else {
                    this.$Message.error('请先选择站点->点击查询!');
                }
            },
            replyTemplate(row) {
                let name = row.name;
                if (this.site_id > 0) {
                    this.$refs.reply.init(name, this.site_id, this.file_type, this.file_type_name, row);
                } else {
                    this.$Message.error('请先选择站点->点击查询!');
                }
            },
            getInfo() {
                this.site_id = this.site_type_id;
                if (this.site_id > 0) {
                    this.apiGet('/templateList/' + this.site_id + '/' + this.file_type).then((res) => {
                        this.handleAjaxResponse(res, (data, msg) => {
                            this.big_datas = data;
                            let list = [];
                            data.map(function (val) {
                                list[val.type] = 1
                            });
                            this.typeList = [];
                            for (let key in list) {
                                this.typeList.push(key);
                            }
                            this.checkAllGroupChange(this.checkAllGroup);
                        }, (data, msg) => {
                            this.$Message.error(msg);
                        })
                    }, (res) => {
                        //处理错误信息
                        this.$Message.error('网络异常，请稍后重试。');
                    });
                }
            },
            getSiteType() {
                this.apiGet('getSites').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.sitetype = data
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                }, (res) => {
                    //处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        watch: {
            // site_type_id: function () {
            //     this.getInfo()
            // },
            // file_type: function () {
            //     this.getInfo()
            // }
        },
        computed: {
            tableColumns() {
                let _this = this;
                let columns = [];
                if (this.showCheckbox) {
                    columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    })
                }
                columns.push({
                    title: '文件名称',
                    key: 'name',
                    sortable: true,
                    render(h, params) {
                        let button_list = [];
                        button_list.push(h('a', {
                            style: {
                                marginRight: '5px'
                            },
                            attrs: {
                                href: params.row.downloadpath,
                                alt: "点击下载",
                            },
                        }, params.row.name));
                        return button_list;
                    }
                });
                columns.push({
                    title: '预览',
                    key: 'path',
                    render(h, params) {
                        let button_list = [];
                        if (params.row.type === 'image')
                            button_list.push(h('img', {
                                style: {
                                    'max-height': '40px',
                                    'max-width': '120px'
                                },
                                attrs: {
                                    src: params.row.path,
                                },
                            }));
                        return button_list;
                    }
                });
                columns.push({
                    title: '大小',
                    key: 'size',
                });
                columns.push({
                    title: '大小',
                    key: 'size',
                    filters: [
                        {
                            label: 'Greater than 25',
                            value: 'html'
                        },
                        {
                            label: 'Less than 25',
                            value: 'other'
                        }
                    ],
                    filterMethod(value, row) {
                        return row.type === value;
                    }
                });
                columns.push({
                    title: '创建时间',
                    key: 'filemtime',
                    sortable: true
                });
                columns.push(
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        fixed: 'right',
                        render(h, params) {
                            let button_list = [];
                            switch (params.row.type) {
                                case 'html':
                                case 'css':
                                case 'js':
                                    button_list.push(h('Button', {
                                        props: {
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            type: 'primary'
                                        },
                                        on: {
                                            click: function () {
                                                _this.editTemplate(params.row);
                                            }
                                        }
                                    }, '修改'));
                                    break;
                                default:
                                    break;
                            }
                            button_list.push(h('Button', {
                                props: {
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                attrs: {
                                    type: 'primary'
                                },
                                on: {
                                    click: function () {
                                        _this.replyTemplate(params.row);
                                    }
                                }
                            }, '替换'));
                            return button_list;
                        }
                    }
                );
                return columns;
            }
        },
        mixins: [http]
    }

</script>

