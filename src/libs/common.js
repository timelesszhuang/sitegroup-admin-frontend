/**
 * Created by timeless on 17-4-7.
 * @author 赵兴壮<834916321@qq.com>
 * 公共操作 获取基本操作的
 */

const common = {
    methods: {
        // 获取文章分类的 id => name 属性
        getArticleType(reset = false) {
            let articletype = this.$store.state.commondata.articleType;
            if (articletype.length === 0 || reset) {
                this.apiGet('articletype/gettype').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.articleType = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getProductType(reset = false) {
            // 获取产品分类
            let productType = this.$store.state.commondata.productType;
            if (productType.length === 0 || reset) {
                this.apiGet('admin/getProductType').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.prodyctType = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getQuestionType(reset = false) {
            let questionType = this.$store.state.commondata.questionType;
            if (questionType.length === 0 || reset) {
                this.apiGet('questionType/list').then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.questionType = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getProductTag(reset = false) {
            let productTag = this.$store.state.commondata.productTag;
            if (productTag.length === 0 || reset) {
                let data = {
                    type: 'product'
                };
                this.apiPost('admin/gettags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.productTag = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getArticleTag(reset = false) {
            let articleTag = this.$store.state.commondata.articleTag;
            if (articleTag.length === 0 || reset) {
                let data = {
                    type: 'product'
                };
                this.apiPost('admin/gettags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.articleTag = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getAllTag(reset = false) {
            let Tag = this.$store.state.commondata.Tag;
            if (Tag.length === 0 || reset) {
                let data = {};
                this.apiPost('admin/gettags', data).then((res) => {
                    this.handelResponse(res, (data, msg) => {
                        this.$store.state.commondata.Tag = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        }
    }
};
export default common;
