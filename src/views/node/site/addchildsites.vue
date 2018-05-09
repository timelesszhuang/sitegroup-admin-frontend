<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="600" :mask-closable="false">
                <p slot="header">
                    <span>批量添加子站</span>
                </p>
                <div>
                    <Form ref="childsites" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="子站地区" prop="district" style="text-align: left;width:500px;">
                        <Cascader :data="districtdata" change-on-select  :load-data="loadData" @on-change="ChangeSite"></Cascader>
                        </Form-item>
                        <Form-item label="子站等级" prop="level"  style="text-align: left;width:500px;">
                        <RadioGroup v-model="form.level">
                        <Radio v-show="this.level<=1" label="1" >省/直辖市</Radio>
                        <Radio  v-show="this.level<=2" label="2">市</Radio>
                        <Radio v-show="this.level<=3"  label="3">区/县</Radio>
                        </RadioGroup>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer">
                    <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
                </div>
            </Modal>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    export default {
        data () {
            return {
                bkdata: [],
                districtdata: [],
                editorOption: {},
                modal: false,
                level: '1',
                modal_loading: false,
                form: {

                },
                AddRule: {
                    name: [
                        {required: true, message: '请填写公共代码名称', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请填写代码', trigger: 'blur'}
                    ]

                }
            };
        },
        methods: {
            ChangeSite (value, selectedData) {
                this.bkdata = selectedData[selectedData.length - 1];
                this.level = this.bkdata.level;
                this.form.district_id = this.bkdata.id;
            },
            loadData (item, callback) {
                item.loading = true;
                if (item.id) {
                    let data = {};
                    if (item.id !== 0) {
                        data = {
                            params: {
                                id: item.id
                            }
                        };
                    }
                    this.apiGet('district', data).then((res) => {
                        this.handleAjaxResponse(res, (data, msg) => {
                            setTimeout(() => {
                                item.children = data;
                                item.loading = false;
                                callback();
                            }, 100);
                        }, (data, msg) => {
                            this.$Message.error(msg);
                        });
                    }, (res) => {
                        // 处理错误信息
                        this.$Message.error('网络异常，请稍后重试。');
                    });
                }
            },
            getSiteId (site_id) {
                this.form.site_id = site_id;
            },
            distridata (id) {
                let data = {};
                if (id !== 0) {
                    data = {
                        params: {
                            id: id
                        }
                    };
                }
                this.apiGet('district', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.districtdata = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            add () {
                this.$refs.childsites.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        this.apiPost('bulkaddchildsitelist', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                this.$emit('getchilddata');
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.childsites.resetFields();
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
        mixins: [http, common]
    };
</script>
