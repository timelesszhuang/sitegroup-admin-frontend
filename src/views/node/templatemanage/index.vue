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
        <CheckboxGroup v-model="social">
            <ButtonGroup>
            <Checkbox label="twitter">
                <span>Twitter</span>
            </Checkbox>
            <Checkbox label="facebook">
                <span>Facebook</span>
            </Checkbox>
            <Checkbox label="github">
                <span>Github</span>
            </Checkbox>
            <Checkbox label="snapchat">
                <span>Snapchat</span>
            </Checkbox>
            </ButtonGroup>
        </CheckboxGroup>
        </Col>
        <div class="content" style="margin-top:10px;margin-left: 5px;margin-right: 5px">
            <Table ref="table" :context="self" :border="border" :stripe="stripe" :show-header="showheader"
                   :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
            </Table>
        </div>
        <Save ref="save" v-on:getdata="getInfo"/>
        <Add ref="add" v-on:getdata="getInfo"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import Save from './templatesave.vue';
    import Add from './templateadd.vue'

    export default {
        data() {
            return {
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
                site_id: 0,
                content: '',
                filename: ''
            }
        },
        components: {
            Save, Add
        },
        created() {
            this.getSiteType()
        },
        methods: {
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
                    this.$refs.save.init(name, this.site_id, this.file_type, this.file_type_name);
                } else {
                    this.$Message.error('请先选择站点->点击查询!');
                }
            },
            getInfo() {
                this.site_id = this.site_type_id;
                if (this.site_id > 0) {
                    this.apiGet('/templateList/' + this.site_id + '/' + this.file_type).then((res) => {
                        this.handleAjaxResponse(res, (data, msg) => {
                            this.datas = data
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
            site_type_id: function () {
                this.getInfo()
            },
            file_type: function () {
                this.getInfo()
            }
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
                    sortable: true
                });

                columns.push({
                    title: '大小',
                    key: 'size',
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
                        width: 100,
                        align: 'center',
                        fixed: 'right',
                        render(h, params) {
                            return h('div', [
                                h('Button', {
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
                                }, '修改')
                            ]);
                        }
                    }
                );
                return columns;
            }
        },
        mixins: [http]
    }

</script>

