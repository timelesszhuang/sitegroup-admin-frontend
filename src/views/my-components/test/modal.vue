<template>
    <div>

        <Modal
                v-model="modal1"
                title="编辑器"
                @on-ok="ok"
                @on-cancel="cancel">
         415432452452425424

        </Modal>



    </div>
</template>





<script>
  /* eslint-disable indent */

  // eslint-disable-next-line indent

  export default {
    data: function () {
      return {
        modal1: false,

      };
    },
    methods: {

// eslint-disable-next-line indent
      ok () {
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      }
    },
    mounted () {

    },
    destroyed () {

    }
  };
</script>

<style scoped>

</style>