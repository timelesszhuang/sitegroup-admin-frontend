<template>
    <card>
        <Tabs @on-click="getdata">
            <Tab-pane label="栏目优化管理" name="tdk">
                <tdk ref="tdk"></tdk>
            </Tab-pane>
            <Tab-pane label="文章优化管理" name="articletdk">
                <articletdk ref="articletdk"></articletdk>
            </Tab-pane>
            <Tab-pane label="问答优化管理" name="questiontdk">
                <questiontdk ref="questiontdk"></questiontdk>
            </Tab-pane>
            <Tab-pane label="产品优化管理" name="producttdk">
                <producttdk ref="producttdk"></producttdk>
            </Tab-pane>
        </Tabs>
    </card>
</template>
<script>
    import http from '../../../libs/http';
    import tdk from '../tdk/index.vue';
    import articletdk from '../articletdk/index.vue';
    import questiontdk from '../questiontdk/index.vue';
    import producttdk from '../producttdk/index.vue';

    export default {
        components: {tdk, articletdk, questiontdk, producttdk},
        methods: {
            getdata (name) {
                if (name == 'tdk') {
                    this.$refs.tdk.getData();
                } else if (name == 'articletdk') {
                    this.$refs.articletdk.getData();
                } else if (name == 'questiontdk') {
                    this.$refs.questiontdk.getData();
                } else if (name == 'producttdk') {
                    this.$refs.producttdk.getData();
                }
            }
        },
        mixins: [http]
    };
</script>
