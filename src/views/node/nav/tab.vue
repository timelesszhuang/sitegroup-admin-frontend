<template>
    <card>
    <Tabs value="menu" @on-click="getdata">
        <Tab-pane label="栏目管理" name="menu">
            <card>
            <naviga ref="menu"></naviga>
            </card>
        </Tab-pane>
        <Tab-pane label="栏目分类管理" name="Menutype">
            <card>
            <Menutype ref="menutype"></Menutype>
            </card>
        </Tab-pane>
    </Tabs>
    </card>
</template>
<script>
    import http from '../../../libs/http';
    import Menutype from '../menutype/index.vue';
    import naviga from '../menu/index.vue';

    export default {
        components: {Menutype, naviga},
        methods: {
            getdata (name) {
                if (name === 'Menutype') {
                    this.$refs.menutype.getData();
                } else if (name === 'menu') {
                    this.$refs.menu.getmenutype();
                    this.$refs.menu.getData();
                }
            }
        },
        mixins: [http]
    };
</script>
