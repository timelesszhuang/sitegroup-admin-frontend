<template>
    <div @click="showMessage" class="message-con">
        <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
            <Badge :count="value" dot>
                <Icon type="ios-bell" :size="22"></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>

<script>
    import util from '@/libs/util.js';
    import http from '../../libs/http';

    export default {
        mixins: [http],
        name: 'messageTip',
        data () {
            return {
                value: 0
            };
        },
        created: function () {
            // `this` 指向 vm 实例
            this.init();
        },
        methods: {
            init: function () {
                /* TODO 修改接口 */
                this.apiGet('system_notice/').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        /* TODO 修改接口调用成功后的处理事件 */
                        this.value = 10;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            },
            showMessage () {
                util.openNewPage(this, 'message_index');
                this.$router.push({
                    name: 'message_index'
                });
            }
        }
    };
</script>
