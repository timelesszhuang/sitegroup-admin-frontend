/**
 * Created by timeless on 17-4-7.
 * @author 赵兴壮<834916321@qq.com>
 * 公共操作 获取基本操作的
 */

const common = {
    methods: {
        // 获取文章分类的 id => name 属性
        getArticleType (reset = false) {
            let articletype = this.$store.state.commondata.articleType;
            if (articletype.length === 0 || reset) {
                let data = {
                    params: {module_type: 'article'
                    }
                };
                this.apiGet('get_type_list', data).then((res) => {
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
        getProductType (reset = false) {
            // 获取产品分类
            let productType = this.$store.state.commondata.productType;
            if (productType.length === 0 || reset) {
                let data = {
                    params: {module_type: 'product'
                    }
                };
                this.apiGet('get_type_list', data).then((res) => {
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
        getQuestionType (reset = false) {
            let questionType = this.$store.state.commondata.questionType;
            if (questionType.length === 0 || reset) {
                let data = {
                    params: {module_type: 'question'
                    }
                };
                this.apiGet('get_type_list', data).then((res) => {
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
        getProductTag (reset = false) {
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
        getArticleTag (reset = false) {
            let articleTag = this.$store.state.commondata.articleTag;
            if (articleTag.length === 0 || reset) {
                let data = {
                    params: {
                        type: 'article'
                    }
                };
                this.apiGet('get_tags', data).then((res) => {
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
        getQuestionTag (reset = false) {
            let questionTag = this.$store.state.commondata.questionTag;
            if (questionTag.length === 0 || reset) {
                let data = {
                    params: {
                        type: 'question'
                    }
                };
                this.apiGet('get_tags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.questionTag = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getAllTag (reset = false) {
            let Tag = this.$store.state.commondata.Tag;
            if (Tag.length === 0 || reset) {
                let data = {
                    params: {
                    }
                };
                this.apiGet('get_tags', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.Tag = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getTagType (reset = false) {
            let TagType = this.$store.state.commondata.TagType;
            if (TagType.length === 0 || reset) {
                let data = {
                    params: {}
                };
                this.apiGet('type_tag?all=1', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.TagType = data;
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
