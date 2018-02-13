<style lang="less">
    @import '../../../styles/loading.less';
</style>
<template>
    <div>
        <Button type="primary" @click="mode">当前数据</Button>
        <editor ref="edit"></editor>
    </div>
</template>
<script>
  /* eslint-disable indent */

  import editor from './editor';
  export default {
    components: {editor},
    data () {
      return {};
    },
    methods: {
      mode () {
        this.$refs.edit.modal1 = true;
      }
    },
    mounted () {

    },
    destroyed () {

    }
  };
</script>