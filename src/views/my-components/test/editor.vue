<template>
    <div>

        <Modal
                v-model="modal1"
                title="编辑器"
                @on-ok="ok"
                @on-cancel="cancel">
            <Button type="primary" @click="dakai">当前数据</Button>
            <Card shadow>
                <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
            </Card>
            <Spin fix v-if="spinShow">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载组件中...</div>
            </Spin>
        </Modal>
        <modaltest ref="modalt" ></modaltest>


    </div>
</template>




<script>
  /* eslint-disable indent */

  // eslint-disable-next-line indent
  import tinymce from 'tinymce';
  import modaltest from './modal';
  export default {
    components: {modaltest},
    data: function () {
      return {
        modal1: false,
        spinShow: true
      };
    },
    methods: {
      dakai(){
        this.$refs.modalt.modal1 = true;
      },
// eslint-disable-next-line indent
      init () {
        this.$nextTick(() => {
          let vm = this;
          let height = document.body.offsetHeight - 300;
          tinymce.init({
            selector: '#tinymceEditer',
            branding: false,
            elementpath: false,
            height: height,
            language: 'zh_CN.GB2312',
            menubar: 'edit insert view format table tools',
            plugins: [
              'wordcount',
              'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
              'searchreplace visualblocks visualchars code fullpage',
              'insertdatetime media nonbreaking save table contextmenu directionality',
              'emoticons paste textcolor colorpicker textpattern imagetools codesample'
            ],
            toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample | mybutton |',
            autosave_interval: '20s',
            image_advtab: true,
            table_default_styles: {
              width: '100%',
              borderCollapse: 'collapse'
            },
            setup: function (editor) {
              editor.on('init', function (e) {
                vm.spinShow = false;
                if (localStorage.editorContent) {
                  tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
                }
              });
              editor.on('keydown', function (e) {
                localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
              });
              editor.addButton('mybutton', {
                text: 'My button',
                icon: false,
                onclick: function () {
                  vm.dakai();
                }
              });
              editor.addMenuItem('myitem', {                text: 'My menu item',
                context: 'tools',
                onclick: function() {

                  //this.$refs.modalt
                  editor.insertContent('&nbsp;Here\'s some content!&nbsp;');
                }
              });
            }
          });
        });
      },
      ok () {
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      }
    },
    mounted () {
      this.init();
    },
    destroyed () {
      tinymce.get('tinymceEditer').destroy();
    }
  };
</script>

<style scoped>

</style>