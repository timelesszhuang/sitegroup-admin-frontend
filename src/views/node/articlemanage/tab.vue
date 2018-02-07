<template>
    <Card>
        <Tabs value="article" @on-click="getdata">
            <Tab-pane label="文章" icon="ios-bookmarks" name="article">
                <artic ref="articl"></artic>
            </Tab-pane>
            <Tab-pane label="文章分类" icon="bookmark" name="articletype">
                <articletype ref="articlet"></articletype>
            </Tab-pane>
            <Tab-pane label="标签管理" icon="pricetag" name="tag">
                <tag ref="tagname"></tag>
            </Tab-pane>
        </Tabs>
    </Card>
</template>

<script>
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import artic from '../../Common/article/index';
    import articletype from '../articletype/index';
    import tag from '../tag/index.vue';

    export default {
        components: {artic, articletype, tag},
        methods: {
            getdata(name) {
                if (name === 'article') {
                    this.$refs.articl.getData();
                } else if (name === 'articletype') {
                    this.$refs.articlet.getData();
                } else if (name === 'tag') {
                    this.$refs.tagname.getData();
                }
            }
        },
        mixins: [http, common]
    };
</script>
