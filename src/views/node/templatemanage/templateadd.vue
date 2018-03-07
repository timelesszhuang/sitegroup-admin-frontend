<template>
    <Modal v-model="modal1" :title="model_name" width="700">
        <Form ref="formInline" :model="form" :rules="ruleInline">
            <Form-item prop="filename">
                <Row>
                    <Col span="3">
                    文件名:</Col>
                    <Col span="20">
                    <Input v-model="form.filename" placeholder="请输入..." style="width: 300px"/>
                    </Col>
                </Row>
            </Form-item>
            <Form-item prop="content">
                <Row>
                    <Col span="3">
                    内容:</Col>
                    <Col span="21">
                    <Input v-model="form.content" type="textarea" :rows="7"/>
                    </Col>
                </Row>
            </Form-item>
        </Form>
        <div slot="footer">
            <Button type="success" size="large" :loading="modal_loading" @click="ok">保存</Button>
        </div>
    </Modal>

</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';

    export default {
        data() {
            return {
                modal1: false,
                modal_loading: false,
                form: {
                    filename: '',
                    content: ''
                },
                model_name: '',
                ruleInline: {
                    filename: [
                        {required: true, message: '请填写文件名称', trigger: 'blur'},
                    ],
                    content: [
                        {required: true, message: '请填写内容', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            init(site_id, model_name) {
                this.site_id = site_id;
                this.model_name = "添加"+model_name+"文件";
                this.modal1 = true;
            },
            ok() {
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
                        this.apiPost('templateAdd/' + this.site_id + '/' + this.form.filename, {content: this.form.content}).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal1 = false;
                                this.$Message.success(msg);
                                this.$parent.getInfo();
                                this.$refs.formInline.resetFields();
                            }, (data, msg) => {
                                this.$Message.error(msg);
                            })
                        }, (res) => {
                            //处理错误信息
                            this.$Message.error('网络异常，请稍后重试。');
                        });
                    } else {

                    }
                })

            }
        },
        mixins: [http]
    }

</script>
