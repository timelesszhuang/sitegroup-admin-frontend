<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="600" :mask-closable="false">
                <p slot="header">
                    <span>添加</span>
                </p>
                <div>
                    <Form ref="staticconfig" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="站点选择" prop="site_id">
                            <Select v-model="form.site_id" style="width: 400px;" 　@on-change="changeSite" label-in-value
                                    filterable clearable>
                                <Option v-for="item in site" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="生成起始时间" prop="time">
                            <TimePicker @on-change="starthandleChange" format="HH:mm" :steps="[1, 30 ,60]"
                                        placeholder="Select time" style="width: 112px"/>
                            <TimePicker @on-change="endhandleChange" format="HH:mm" :steps="[1, 30 ,60]"
                                        placeholder="Select time" style="width: 112px"/>
                        </Form-item>
                        <Form-item label="允许发布的数量" prop="staticcount">
                            <InputNumber :min="1" v-model="form.staticcount" placeholder="请输入数量"></InputNumber>
                        </Form-item>
                        <Form-item label="生成类型" prop="type">
                            <Select v-model="form.type" style="text-align: left;width:200px;" @on-change="changeStat"
                                    label-in-value filterable clearable>
                                <Option v-for="item in type" :value="item.value" :label="item.label" :key="item.id">
                                    {{ item.label }}
                                </Option>
                            </Select>
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

    export default {
        data() {
            return {
                modal: false,
                modal_loading: false,
                form: {
                    starttime: '',
                    stoptime: '',
                    staticcount: 0,
                    site_id: '',
                    site_name: '',
                    type: '',
                    type_name: ''
                },
                type: [
                    {
                        value: 'article',
                        label: '文章'
                    },
                    {
                        value: 'question',
                        label: '问答'
                    },
                    {
                        value: 'scatteredarticle',
                        label: '文章段落'
                    }
                ],
                AddRule: {}
            }
        },
        methods: {
            starthandleChange(time) {
                console.log(time);
                this.form.starttime = time
            },
            endhandleChange(time) {
                this.form.stoptime = time
            },
            changeSite(value) {
                this.form.site_name = value.label
                this.form.site_id = value.value
            },
            changeStat(value) {
                this.form.type_name = value.label
                this.form.type = value.value
            },
            add() {
                this.$refs.staticconfig.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
//            console.log(data)
                        this.apiPost('Staticconfig', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.staticconfig.resetFields();
                            }, (data, msg) => {
                                this.modal_loading = false;
                                this.$Message.error(msg);
                            })
                        }, (res) => {
                            //处理错误信息
                            this.modal_loading = false;
                            this.$Message.error('网络异常，请稍后重试。');
                        })
                    }
                })
            }
        },
        mixins: [http],
        props:
            {
                site: {
                    default:
                        []
                },
            }
    }
</script>
