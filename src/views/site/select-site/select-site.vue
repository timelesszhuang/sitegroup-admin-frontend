<template>
    <div>
        <Button @click="modal = true">Disable upper right corner (including Esc key)</Button>
        <Modal
                title="选择您要管理的网站"
                v-model="modal"
                :closable="false"
                :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-list"></Icon>
                <span>选择要管理的网站</span>
            </p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <div slot="footer">
                <Button @click="modal =!modal ">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'select-site',
        data() {
            return {
                modal: false
            };
        }
    };
</script>