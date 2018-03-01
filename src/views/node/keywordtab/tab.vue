<template>
    <card>
    <Tabs value="recommendationkeyword" @on-click="getdata">
        <Tab-pane label="关键词推荐" name="recommendationkeyword">
            <card>
            <recommendationkeyword ref="recommend"></recommendationkeyword>
            </card>
        </Tab-pane>
        <Tab-pane label="追踪关键词" name="trackkeyword">
            <card>
            <trackkeyword ref="keywordtrack"></trackkeyword>
            </card>
        </Tab-pane>
    </Tabs>
    </card>
</template>
<script>
    import http from '../../../libs/http';
    import recommendationkeyword from '../recommendationkeyword/index.vue';
    import trackkeyword from '../trackkeyword/index.vue';

    export default {
        components: {recommendationkeyword, trackkeyword},
        methods: {
            getdata (name) {
                if (name === 'recommendationkeyword') {
                    this.$refs.recommend.getData();
                    this.$refs.recommend.mainKeywordList();
                } else if (name === 'trackkeyword') {
                    this.$refs.keywordtrack.getData();
                }
            }
        },
        mixins: [http]
    };
</script>
