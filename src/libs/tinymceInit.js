import tinymce from 'tinymce';

const tinymceInit = {
    methods: {
        // content 表示所偶略图的tag 相关添加素材库的时候添加到的地方。
        tinymceInit (vm, height, id, content = 'content') {
            tinymce.init({
                selector: '#' + id,
                branding: false,
                fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
                elementpath: false,
                height: height,
                language: 'zh_CN.GB2312',
                menubar: 'edit insert view format table tools',
                plugins: [
                    'fullscreen',
                    'wordcount',
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                    'searchreplace visualblocks visualchars code fullpage',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                ],
                toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor fontsizeselect backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample | mybutton | fullscreen |',
                autosave_interval: '5s',
                image_advtab: true,
                automatic_uploads: true,
                images_reuse_filename: true,
                images_upload_url: window.ImgUploadPath,
                images_upload_handler: function (blobInfo, success, failure) {
                    let xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;
                    xhr.open('POST', window.ImgUploadPath);
                    xhr.onload = function () {
                        var json;
                        if (xhr.status !== 200) {
                            failure('HTTP Error: ' + xhr.status);
                            return;
                        }
                        json = JSON.parse(xhr.responseText);
                        if (!json || typeof json.data.url !== 'string') {
                            failure('Invalid JSON: ' + xhr.responseText);
                            return;
                        }
                        success(json.data.url);
                    };
                    formData = new FormData();
                    formData.append('file', blobInfo.blob(), blobInfo.filename());
                    xhr.send(formData);
                },
                table_default_styles: {
                    width: '100%',
                    borderCollapse: 'collapse'
                },
                setup: function (editor) {
                    editor.on('init', function (e) {
                        vm.spinShow = false;
                        // tinymce.get('tinymceEditer').setContent(vm.imgcontent)
                    });
                    editor.on('keydown', function (e) {
                        // editor.insertContent(vm.form.content)
                        // localStorage.editorContent = tinymce.get('tinymceEditer').getContent()
                        // tinymce.get('tinymceEditer').setContent(vm.form.content)
                    });
                    editor.addButton('mybutton', {
                        text: '素材库图片',
                        icon: false,
                        onclick: function () {
                            vm.img = content;
                            vm.$refs.addmaterial.getData();
                            vm.$refs.addmaterial.modal = true;
                        }
                    });
                    // editor.addMenuItem('myitem', {
                    //   text: 'My menu item',
                    //   context: 'tools',
                    //   onclick: function () {
                    //     editor.insertContent('&nbsp;Here\'s some content!&nbsp;')
                    //   }
                    // })
                }
            });
        }
    }
};

export default tinymceInit;
