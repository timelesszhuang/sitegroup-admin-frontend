<template>
    <div>
        <div>
            <Modal
                    v-model="modal"
                    width="900"
                    :styles="{top: '20px'}" :mask-closable="false"
            >
                <p slot="header">
                    <span>修改</span>
                </p>
                <div>
                    <Form ref="sitesave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                        <Form-item label="名称" prop="site_name">
                            <Input type="text" v-model="form.site_name" placeholder="请输入名称"/>
                        </Form-item>
                        <Form-item label="公司名" prop="com_name">
                            <Input type="text" v-model="form.com_name" placeholder="请输入公司名,关键词配置"/>
                        </Form-item>
                        <Form-item label="用户选择" prop="user_id">
                            <Select v-model="form.user_id" style="text-align: left;width:200px;"
                                    label-in-value 　@on-change="changeUser">
                                <Option v-for="item in this.$store.state.commondata.SiteUser" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                            <Button type="success" @click="SiteUser">添加</Button>
                        </Form-item>
                        <Form-item label="ICO选择" prop="siteico_id">
                            <Select v-model="form.siteico_id" style="text-align: left;width:400px;"
                                    label-in-value filterable　@on-change="changeIco">
                                <Option v-for="item in this.$store.state.commondata.Ico" :value="item.id" :label="item.name" :key="item.id">
                                    <img style="height:60px; " :src=item.oss_ico_path>
                                </Option>
                            </Select>
                            <Button type="success" @click="Ico">添加</Button>
                        </Form-item>
                        <Form-item label="LOGO选择" prop="sitelogo_id">
                            <Select v-model="form.sitelogo_id" style="text-align: left;width:400px;"
                                    label-in-value filterable　@on-change="changeLogo">
                                <Option v-for="item in this.$store.state.commondata.Logo" :value="item.id" :label="item.name" :key="item.id">
                                    <img style="height:60px; " :src=item.oss_logo_path>
                                </Option>
                            </Select>
                            <Button type="success" @click="Logo">添加</Button>
                        </Form-item>
                        <Form-item label="图片水印设置" prop="site_water_image_id">
                            <Select v-model="form.site_water_image_id" style="text-align: left;width:400px;"
                                    label-in-value filterable　@on-change="changeWater">
                                <Option v-for="item in this.$store.state.commondata.WaterImage" :value="item.id" :label="item.name" :key="item.id">
                                    <img style="height:60px; " :src=item.oss_water_image_path>
                                </Option>
                            </Select>
                            <Button type="success" @click="WaterImage">添加</Button>
                        </Form-item>
                        <Form-item label="网站应用" prop="is_mobile">
                            <Radio-group v-model="form.is_mobile">
                                <Radio label=10>
                                    <Icon type="social-windows"></Icon>
                                    <span>PC机</span>
                                </Radio>
                                <Radio label=20>
                                    <Icon type="android-phone-portrait"></Icon>
                                    <span>手机</span>
                                </Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="手机网站" prop="m_site_id">
                            <Select v-model="form.m_site_id" clearable style="text-align: left;width:200px;"
                                    label-in-value>
                                <Option v-for="item in mobileSite" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="关键词" prop="keyword_ids">
                            <Select v-model="form.keyword_ids" multiple filterable style="text-align: left;width:200px;"
                                    　@on-change="changekeyword">
                                <Option v-for="item in keyword" :value="item.id" :label="item.label" :key="item.id">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="栏目" prop="menu">
                            <Select filterable v-model="form.menu" multiple style="text-align: left;width:500px;">
                                <Option disabled :value="0"><span
                                        style="font-size: 15px;font-weight: bold">栏目名—栏目分类—栏目类型—所属文章分类—详情</span>
                                </Option>
                                <Option v-for="item in menutype" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text}}—{{item.tag_name}}—{{item.flag_name}}
                                    <span v-if="item.type_name ==''">{{item.type_name}}</span>
                                    <span v-else>{{item.typeName}}</span>—{{item.title}}
                                </Option>

                            </Select>
                        </Form-item>
                        <Form-item label="模板" prop="template_id">

                            <Select v-model="form.template_id" style="text-align: left;width:350px;"
                                    label-in-value 　@on-change="changeTemptype">
                                <Option disabled :value="0"><span
                                        style="font-size: 15px;font-weight: bold">模板名—模板分类—公私模板</span></Option>
                                <Option v-for="item in this.$store.state.commondata.Template" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                            <Button type="success" @click="Template">添加</Button>
                        </Form-item>
                        <Form-item label="联系方式" prop="support_hotline">
                            <Select v-model="form.support_hotline" style="text-align: left;width:200px;"
                                    label-in-value 　@on-change="changeHotline">
                                <Option v-for="item in this.$store.state.commondata.ContentWay" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                            <Button type="success" @click="ContentWay">添加</Button>
                        </Form-item>
                        <Form-item label="网站分类" prop="site_type">
                            <Select v-model="form.site_type" style="text-align: left;width:200px;"
                                    label-in-value 　@on-change="changeSitetype">
                                <Option v-for="item in this.$store.state.commondata.SiteType" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                            <Button type="success" @click="SiteType">添加</Button>
                        </Form-item>
                        <Form-item label="域名选择" prop="domain_id">
                            <Select v-model="form.domain_id" style="text-align: left;width:200px;"
                                    label-in-value 　@on-change="changeDomainlist">
                                <Option v-for="item in this.$store.state.commondata.Domain" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                            <Button type="success" @click="Domain">添加</Button>
                        </Form-item>
                        <Form-item label="友链选择" prop="link_id">
                            <Select v-model="form.link_id" multiple style="text-align: left;width:200px;">
                                <Option v-for="item in this.$store.state.commondata.FriendLink" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                            <Button type="success" @click="FriendLink">添加</Button>
                        </Form-item>
                        <Form-item label="url" prop="url">
                            <Input v-model="form.url" placeholder="请输入url"></Input>
                        </Form-item>
                        <Form-item label="公共代码" prop="public_code">
                            <Select v-model="form.public_code" multiple style="text-align: left;width:200px;">
                                <Option v-for="item in this.$store.state.commondata.PublicCode" :value="item.id" :label="item.text" :key="item.id">
                                    {{ item.text }}
                                </Option>
                            </Select>
                            <Button type="success" @click="PublicCode">添加</Button>
                        </Form-item>
                        <Form-item label="图片水印文字" prop="walterString">
                            <Input type="text" v-model="form.walterString" placeholder="请输入图片水印文字"></Input>
                        </Form-item>
                        <Form-item label="head前代码" prop="before_header_jscode">
                            <Input v-model="form.before_header_jscode" type="textarea" :rows="3"
                                   placeholder="请输入head前代码">
                            </Input>
                        </Form-item>
                        <Form-item label="head后代码" prop="other_jscode">
                            <Input v-model="form.other_jscode" type="textarea" :rows="3"
                                   placeholder="请输入head后代码">
                            </Input>
                        </Form-item>
                    </Form>
                </div>
                <div slot="footer">
                    <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
                </div>
            </Modal>
        </div>
        <SiteUser  ref="SiteUser" :gpd="0"></SiteUser>
        <SiteType  ref="SiteType" :gpd="0"></SiteType>
        <Ico  ref="Ico" :gpd="0"></Ico>
        <Logo  ref="Logo" :gpd="0"></Logo>
        <WaterImage  ref="WaterImage" :gpd="0"></WaterImage>
        <Template  ref="Template" :gpd="0"></Template>
        <ContentWay  ref="ContentWay" :gpd="0"></ContentWay>
        <Domain  ref="Domain" :gpd="0"></Domain>
        <FriendLink  ref="FriendLink" :gpd="0"></FriendLink>
        <PublicCode  ref="PublicCode" :gpd="0"></PublicCode>
    </div>

</template>

<script type="text/ecmascript-6">
    import http from '../../../libs/http';
    import common from '../../../libs/common';
    import SiteUser from '../user-management/add.vue';
    import SiteType from '../user-management/add.vue';
    import Ico from '../siteico/add.vue';
    import Logo from '../sitelogo/add.vue';
    import WaterImage from '../imgwatermark/add.vue';
    import Template from '../template/templateadd.vue';
    import ContentWay from '../contactway/add.vue';
    import Domain from '../domain/add.vue';
    import FriendLink from '../link/add.vue';
    import PublicCode from '../code/add.vue';


    export default {
        components: {SiteUser, SiteType, Ico, Logo, WaterImage, Template, ContentWay, Domain, FriendLink, PublicCode},
        data() {
            const checkmenutype = (rule, value, callback) => {
                if (value == "") {
                    callback(new Error('请选择栏目分类'));
                } else {
                    callback();
                }
            };
            const checkkeyword = (rule, value, callback) => {
                if (value == "") {
                    callback(new Error('请选择关键词'));
                } else if (value.length > 5) {
                    callback(new Error('关键词不能超过5个'));
                } else {
                    callback();
                }

            };
            const checktemptype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择模板分类'));
                } else {
                    callback();
                }
            };
            const checkhotlinetype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择联系方式'));
                } else {
                    callback();
                }
            };
            const checksitetype = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择网站分类'));
                } else {
                    callback();

                }

            };
            const checkdomain = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择域名'));
                } else {
                    callback();
                }
            }
            const checkuser = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择用户'));
                } else {
                    callback();
                }
            };

            return {
                modal: false,
                modal_loading: false,
                AddRule: {
                    site_name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    com_name: [
                        {required: true, message: '请输入公司名', trigger: 'blur'},
                    ],
                    menu: [
                        {required: true, validator: checkmenutype, trigger: 'blur'},
                    ],
                    keyword_ids: [
                        {required: true, validator: checkkeyword, trigger: 'blur'},
                    ],
                    template_id: [
                        {required: true, validator: checktemptype, trigger: 'blur'},
                    ],
                    site_type: [
                        {required: true, validator: checksitetype, trigger: 'blur'},
                    ],
                    domain_id: [
                        {required: true, validator: checkdomain, trigger: 'blur'},
                    ],
                    user_id: [
                        {required: true, validator: checkuser, trigger: 'blur'},
                    ],
                    url: [
                        {required: true, message: '请输入url', trigger: 'blue'}
                    ]

                }
            }
        },
        methods: {
            SiteUser(){
                this.$refs.SiteUser.modal = true
            },
            SiteType(){
                this.$refs.SiteType.modal = true
            },
            Ico(){
                this.$refs.Ico.modal = true
            },
            Logo(){
                this.$refs.Logo.modal = true
            },
            WaterImage(){
                this.$refs.WaterImage.modal = true
            },
            Template(){
                this.$refs.Template.modal = true
            },
            ContentWay(){
                this.$refs.ContentWay.modal = true
            },
            Domain(){
                this.$refs.Domain.modal = true
            },
            FriendLink(){
                this.$refs.FriendLink.modal = true
            },
            PublicCode(){
                this.$refs.PublicCode.modal = true
            },
            computed: {
                editor() {
                    return this.$refs.myTextEditor.quillEditor
                }
            },
            changeLink() {

            },
            changeLogo(value) {
                this.form.sitelogo_id = value.value
            },
            changeMenutype(value) {
                this.form.menu = value.label
            },
            changeHotline(value) {
                this.form.support_hotline = value.value
            },
            changeIco(value) {
                this.form.siteico_id = value.value
            },
            changeWater(value) {
                this.form.site_water_image_id = value.value
            },
            changeSitetype(value) {
                this.form.site_type = value.value
                this.form.site_type_name = value.label
            },
            changeUser(value) {
                this.form.user_name = value.label
                this.form.user_id = value.value
            },
            changekeyword() {

            },

            changeTemptype(value) {
                this.form.template_id = value.value
            },
            changeDomainlist(value) {
                this.form.domain = value.label
                this.form.domain_id = value.value
            },
            add() {
                this.$refs.sitesave.validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        if (!this.form.walterString) {
                            this.form.walterString = ''
                        }
                        let data = this.form;
                        let id = data.id;
                        this.apiPut('site/' + id, data).then((res) => {
                            this.handleAjaxResponse(res, (data, msg) => {
                                this.modal = false;
                                if (this.gpd) {this.$emit('getdata');}
                                this.$Message.success(msg);
                                this.modal_loading = false;
                            }, (data, msg) => {
                                this.modal_loading = false;
                                this.$Message.error(msg);
                            })
                        }, (res) => {
                            //处理错误信息
                            this.modal_loading = false;
                            this.$Message.error('网络异常，请稍后重试。');
                        })
                    }
                })
            }
        },
        props: {
            menutype: {
                default:
                    []
            }
            ,
            keyword: {
                default:
                    []
            },
            mobileSite: {},
            form: {
                default: {
                    site_name: "",
                    com_name: "",
                    menu: "",
                    link_id: "",
                    template_id: "",
                    support_hotline: "",
                    site_type: "",
                    domain_id: "",
                    before_header_jscode: "",
                    other_jscode: "",
                    keyword_ids: "",
                }
            }
        },
        mixins: [http,common]
    }
</script>
