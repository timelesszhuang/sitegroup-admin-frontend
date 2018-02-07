<template>
    <card>
        <Tabs value="product" @on-click="getdata">
            <Tab-pane label="产品" icon="cash" name="product">
                <product ref="chanpin"></product>
            </Tab-pane>
            <Tab-pane label="产品分类" icon="bookmark" name="producttype">
                <producttype ref="chanpintype"></producttype>
            </Tab-pane>
        </Tabs>
    </card>
</template>
<script>
    import http from '../../../libs/http';
    import product from '../../Common/product/index.vue';
    import producttype from '../producttype/index.vue';

    export default {
        components: {product, producttype},
        methods: {
            getdata (name) {
                if (name === 'product') {
                    this.$refs.chanpin.getData();
                } else if (name === 'producttype') {
                    this.$refs.chanpintype.getData();
                }
            }
        },
        mixins: [http]
    };
</script>
