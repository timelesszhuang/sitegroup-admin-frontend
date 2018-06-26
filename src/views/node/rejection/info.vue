<template>
    <Modal v-model="modal" width="460">
        <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
            <Icon type="flag"></Icon>
            <span>线索信息</span>
        </p>
        <Table :columns="columns1" :data="showdata" show-header="false"></Table>
        <div slot="footer">
        </div>
    </Modal>

</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                modal: false,
                columns1: [
                    {
                        title: '线索',
                        key: 'value'
                    }
                ]
            }
        },
        props: {
            showdata:{}
        }
    }

</script>
<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        padding-left: 50px;
    }

    .content .column {
        padding: 10px 0;
        box-sizing: border-box;
        margin: 0 auto;
    }

</style>
