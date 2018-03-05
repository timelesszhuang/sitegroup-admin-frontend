<template>
    <div>
        <card>
        <Tabs value="pv" @on-click="tabClick">
            <TabPane label="浏览量统计" name="pv">
                <pv ref="pv"></pv>
            </TabPane>
            <TabPane label="浏览量展示" name="show">
                <show ref="show"></show>
            </TabPane>
            <TabPane label="爬虫统计" name="crawler">
                <crawler ref="crawler"></crawler>
            </TabPane>
            <TabPane label="搜索引擎关键词统计" name="countkeyword">
                <countkeyword ref="countkeyword"></countkeyword>
            </TabPane>
            <!--<TabPane label="其他统计" name="other">-->
                <!--<other ref="other"></other>-->
            <!--</TabPane>-->

        </Tabs> </card>
    </div>
</template>

<script type="text/ecmascript-6">
    import pv from '../../Common/pv/pv.vue';
    import show from '../../Common/show/index.vue';
    import crawler from '../../Common/crawler/crawler.vue';
    import countkeyword from '../../Common/countkeyword/index.vue'
    // import other from '../../Common/other/index.vue'

    export default {
        data () {
            return {};
        },
        methods: {
            tabClick (name) {
                if (name !== 'pv') {
                    this.$refs[name].init();
                }
            }
        },
        components: {
            pv, show, crawler, countkeyword
            //  , other
        }
    };
</script>
