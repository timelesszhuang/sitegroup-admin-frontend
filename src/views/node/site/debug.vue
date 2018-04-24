<template>
    <Modal v-model="modal" :mask-closable="false" title="Debug信息">
        <Form ref="debug" :label-width="90" class="node-add-form">
            <Form-item label="Debug信息" prop="debug_place">
                <RadioGroup v-model="debug_info">
                    <Radio label="dev" >开发中</Radio>
                    <Radio label="product">上线</Radio>
                </RadioGroup>
            </Form-item>
        </Form>
        <div slot="footer">
            <Button type="success" size="large" :loading="modal_loading" @click="submitFtp">保存</Button>
        </div>
    </Modal>

</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';

    export default {
        data() {
            return {
                modal: false,
                modal_loading: false,
                site_id:0,
                debug_info:''
            }
        },
        methods: {
            changeDebug(site_id,debug_info){
                this.site_id=site_id;
                this.apiGet('site/'+this.site_id).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.debug_info=data['app_debug'];
                        this.modal=true;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                }, (res) => {
                    //处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                })
            },
            submitFtp() {
                let data = {};
                data.id=this.site_id;
                data.app_debug=this.debug_info;
                this.apiPut('saveDebug/', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.modal_loading = false;
                        this.modal = false;
                        if (this.gpd) {
                            this.$emit('getdata');
                        }
                        this.$Message.success(msg);
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    })
                }, (res) => {
                    //处理错误信息
                    this.modal_loading = false;
                    this.modal = false
                    this.$Message.error('网络异常，请稍后重试。');
                })
            }
        },
        mixins: [http]
    }
</script>
<style>


</style>
