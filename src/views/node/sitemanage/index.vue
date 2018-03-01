<template>
    <div>
        <card>
        <Tabs value="site" @on-click="tabClick">
            <TabPane label="站点列表" name="site">
                <card>
                <site ref="site"/>
                </card>
            </TabPane>
            <TabPane label="站点分类" name="sitetype">
                <card>
                <sitetype ref="sitetype"/>
                </card>
            </TabPane>
            <TabPane label="模板管理" name="templatemanage">
                <card>
                <templatemanage ref="templatemanage"/>
                </card>
            </TabPane>
            <TabPane label="搜索引擎优化管理" name="seo">
                <card>
                <seo ref="seo"/>
                </card>
            </TabPane>
            <TabPane label="站点静态化配置" name="staticconfig">
                <card>
                <staticconfig ref="staticconfig"/>
                </card>
            </TabPane>
        </Tabs>
        </card>
    </div>
</template>

<script type="text/ecmascript-6">
    import site from '../site/site.vue';
    import sitetype from '../sitetype/sitetype.vue'
    import templatemanage from '../templatemanage/index.vue'
    import seo from '../tdk/index.vue'
    import staticconfig from '../staticconfig/index.vue'
    export default {
        data() {
            return {}
        },
        methods: {
            tabClick(name) {
                this.$refs[name].init();
            }
        },
        components: {
            site, sitetype,templatemanage,seo,staticconfig
        }
    }
</script>
