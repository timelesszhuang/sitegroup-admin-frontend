const commondata = {
    state: {
        articleType: [],
        productType: [],
        questionType: [],
        questionTag: [],
        articleTag: [],
        productTag: [],
        Tag: [],
        TagType: []
    },
    mutations: {
        changeSite(state) {
            // 切换网站之后相关的 vuex 中的信息需要重置
            state.articleType = [];
            state.productType = [];
            state.questionType = [];
            state.questionTag = [];
            state.articleTag = [];
            state.productTag = [];
            state.Tag = [];
            state.TagType = [];
        }
    }
};

export default commondata;
