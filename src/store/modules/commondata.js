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
        SiteUser: [],
        SiteType: [],
        Ico: [],
        Logo: [],
        WaterImage: [],
        Template: [],
        ContentWay: [],
        Domain: [],
        FriendLink: [],
        PublicCode: [],
        backgroundcolor: [
            'background-image:url(dist/sitebackimg/flower.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, rgb(252, 54, 253) 0%, rgb(93, 63, 218) 100%)',
            'background-image:url(dist/sitebackimg/blue.jpg);background-size: 100% 100%',
            'background-image:url(dist/sitebackimg/arrow.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, #FFFF00 0%, #DAA520 100%)',
            'background-image:url(dist/sitebackimg/sky.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, #DCDCDC 0%, #696969 100%)',
            'background-image:url(dist/sitebackimg/hand.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, rgb(248, 240, 35) 0%, rgb(5, 174, 53) 100%)',
            'background-image:linear-gradient(45deg, #B0E0E6 0%, #40E0D0 100%)',
            'background-image:url(dist/sitebackimg/cute.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, rgb(255, 0, 71) 0%, rgb(44, 52, 199) 100%)',
            'background-image:linear-gradient(45deg, rgb(102, 244, 133) 0%, rgb(23, 172, 255) 100%)',
            'background-image:url(dist/sitebackimg/red.jpg);background-size: 100% 100%',
            'background-image:linear-gradient(45deg, #98F898 0%, #7FFF00 100%)'
        ],
        FlagList: [
            {'h':"头条"},
            {'c':"推荐"},
            {'b':"加粗"},
            {'a':"特荐"},
            {'f':"幻灯"},
        ],
        // 相关统计报表的color
        color: [
            '#511CFC',
            '#6EF28F',
            '#10A6FF',
            '#ffd58f',
            '#0C17A6',
            '#F2AF0B',
            '#ff99ff',
            '#398DBF',
            '#FC3685',
            '#9bd598',
            '#2d8cf0',
            '#ab8df2',
            '#99ff00',
            '#801dae',
            '#25f8cb',
            '#CC3333',
            '#bce672',
            '#44cef6',
            '#8d4bbb',
            '#8c4356',
            '#a29b7c',
            '#30dff3',
            '#be002f',
            '#C936F2',
            '#edd1d8',
            '#0099ff',
            '#ff6666',
            '#ffff99',
            '#ff3333',
            '#0aa344',
            '#801dae',
            '#c0ebd7',
            '#1bd1a5',
            '#c32136',
            '#fff143',
            '#009999',
            '#99ffff',
            '#f9906f',
            '#8d4bbb',
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
            state.SiteUser = [];
            state.SiteType = [];
            state.Ico = [];
            state.Logo = [];
            state.WaterImage = [];
            state.Template = [];
            state.ContentWay = [];
            state.Domain = [];
            state.FriendLink = [];
            state.PublicCode = [];
        }
    }
};

export default commondata;
