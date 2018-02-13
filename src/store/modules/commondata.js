const commondata = {
    state: {
        articleType: [],
        productType: [],
        questionType: [],
        questionTag: [],
        articleTag: [],
        productTag: [],
        Tag: [],
        TagType: [],
        backgroundcolor: [
            'background-image:url(static/sitebackimg/flower.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, rgb(252, 54, 253) 0%, rgb(93, 63, 218) 100%)',
            'background-image:url(static/sitebackimg/blue.jpg);background-size: 100% 100%',
            'background-image:url(static/sitebackimg/arrow.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, #FFFF00 0%, #DAA520 100%)',
            'background-image:url(static/sitebackimg/sky.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, #DCDCDC 0%, #696969 100%)',
            'background-image:url(static/sitebackimg/hand.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, rgb(248, 240, 35) 0%, rgb(5, 174, 53) 100%)',
            'background-image:linear-gradient(45deg, #B0E0E6 0%, #40E0D0 100%)',
            'background-image:url(static/sitebackimg/cute.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, rgb(255, 0, 71) 0%, rgb(44, 52, 199) 100%)',
            'background-image:linear-gradient(45deg, rgb(102, 244, 133) 0%, rgb(23, 172, 255) 100%)',
            'background-image:url(static/sitebackimg/red.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, #98F898 0%, #7FFF00 100%)'
        ],
        // 相关统计报表的color
        color: [
            '#511CFC',
            '#6EF28F',
            '#2d8cf0',
            '#e14f60',
            '#FC3685',
            '#10A6FF',
            '#ffd58f',
            '#0C17A6',
            '#4608A6',
            '#F2AF0B',
            '#398DBF',
            '#9bd598',
            '#abd5f2',
            '#ab8df2',
            '#C936F2',
            '#0EFCD6',
            '#99ff00',
            '#312520',
            '#801dae',
            '#25f8cb',
            '#CC3333',
            '#808080',
            '#a29b7c',
            '#bce672',
            '#44cef6',
            '#c2ccd0',
            '#8d4bbb',
            '#2e4e7e',
            '#50616d',
            '#845a33',
            '#622a1d',
            '#ff6666',
            '#e4c6d0',
            '#8c4356',
            '#a29b7c',
            '#30dff3',
            '#fffbf0',
            '#edd1d8',
            '#801dae',
            '#b0a4e3',
            '#0099ff',
            '#003371',
            '#60281e',
            '#8c4356',
            '#4c221b',
            '#ff99ff',
            '#ffff99',
            '#0aa344',
            '#99ffff',
            '#c0ebd7',
            '#1bd1a5',
            '#c32136',
            '#ff3333',
            '#009999',
            '#fff143',
            '#f9906f',
            '#be002f',
            '#8d4bbb',
            '#815476',
            '#CD0000',
            '#B0E2FF'
        ]
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
            state.backgroundcolor = [];
        }
    }
};

export default commondata;
