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
                    params: {
                        module_type: 'article'
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
                    params: {
                        module_type: 'product'
                    }
                };
                this.apiGet('get_type_list', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.productType = data;
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
                    params: {
                        module_type: 'question'
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
        getProductTag (reset = false) {
            let productTag = this.$store.state.commondata.productTag;
            if (productTag.length === 0 || reset) {
                let data = {
                    params: {
                        type: 'product'
                    }
                };
                this.apiGet('get_tags', data).then((res) => {
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
                    params: {}
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
        },
        getIco (reset = false) {
            let Ico = this.$store.state.commondata.Ico;
            if (Ico.length === 0 || reset) {
                let data = {
                    params: {}
                };
                this.apiGet('getsiteicolist', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.Ico = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getLogo (reset = false) {
            let Logo = this.$store.state.commondata.Logo;
            if (Logo.length === 0 || reset) {
                let data = {
                    params: {}
                };
                this.apiGet('getsitelogolist', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.Logo = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getWaterImage (reset = false) {
            let WaterImage = this.$store.state.commondata.WaterImage;
            if (WaterImage.length === 0 || reset) {
                let data = {
                    params: {}
                };
                this.apiGet('getsitewaterimagelist', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.WaterImage = data;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        getCommontype (reset = false) {
            let SiteUser = this.$store.state.commondata.SiteUser;
            let Template = this.$store.state.commondata.Template;
            let ContentWay = this.$store.state.commondata.ContentWay;
            let Domain = this.$store.state.commondata.Domain;
            let FriendLink = this.$store.state.commondata.FriendLink;
            let PublicCode = this.$store.state.commondata.PublicCode;
            let SiteType = this.$store.state.commondata.SiteType;
            let menutype = this.$store.state.commondata.menutype;
            let keyword = this.$store.state.commondata.keyword;
            let mobileSite = this.$store.state.commondata.mobileSite;
            if (Template.length === 0 || SiteUser === 0 || ContentWay === 0 || Domain === 0 || FriendLink === 0 || PublicCode === 0 || SiteType === 0 || menutype === 0 || keyword === 0 || mobileSite === 0 || reset) {
                let data = {
                    params: {}
                };
                this.apiGet('commonType', data).then((res) => {
                    this.handleAjaxResponse(res, (data, msg) => {
                        this.$store.state.commondata.Template = data.temptype;
                        this.$store.state.commondata.ContentWay = data.hotline;
                        this.$store.state.commondata.Domain = data.domainlist;
                        this.$store.state.commondata.FriendLink = data.link;
                        this.$store.state.commondata.PublicCode = data.code;
                        this.$store.state.commondata.SiteUser = data.userlist;
                        this.$store.state.commondata.SiteType = data.sitetype;
                        this.$store.state.commondata.menutype = data.menutype;
                        this.$store.state.commondata.keyword = data.keyword;
                        this.$store.state.commondata.mobileSite = data.mobileSite;
                    }, (data, msg) => {
                        this.$Message.error(msg);
                    });
                }, (res) => {
                    // 处理错误信息
                    this.$Message.error('网络异常，请稍后重试。');
                });
            }
        },
        randomWord (randomFlag, min, max) {
            let str = '';
            let range = min;
            let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            // 随机产生
            if (randomFlag) {
                range = Math.round(Math.random() * (max - min)) + min;
            }
            let pos;
            for (var i = 0; i < range; i++) {
                pos = Math.round(Math.random() * (arr.length - 1));
                str += arr[pos];
            }
            return str;
        }
    }
};
export default common;
