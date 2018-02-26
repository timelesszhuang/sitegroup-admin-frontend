<template>
    <div>
        <div>
            <Modal
                    v-model="modal" width="600">
                <p slot="header">
                    <span>添加标签名称</span>
                </p>
                <div>
                    <Form ref="articleadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="标签名称" prop="tag">
                            <Input type="text" v-model="form.tag" placeholder="请输入标签名称"></Input>
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
                    tag: ''
                },
                AddRule: {
                    tag: [
                        {required: true, message: '请输入标签名称', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            add() {
                this.$refs.articleadd.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let data = this.form;
                        this.apiPost('type_tag', data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {
                                    this.$emit('getdata');
                                }
                                this.$Message.success(msg);
                                this.modal_loading = false;
                                this.$refs.articleadd.resetFields();
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
        }, props: {
            gpd: {default: 1},
        },
        mixins: [http]

    };
</script>
