<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="staticconfig" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="生成起始时间" prop="time">
              <el-time-select
                placeholder="起始时间"
                v-model="form.starttime"
                :picker-options="{
                  start: '08:00',
                  step: '00:30',
                  end: '23:00'
                  }">
              </el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="form.stoptime"
                :picker-options="{
                  start: '08:30',
                  step: '00:30',
                  end: '23:30',
                  minTime: form.starttime
                }">
              </el-time-select>
            </Form-item>
            <Form-item label="允许发布的数量" prop="staticcount">
              <Input v-model="form.staticcount" placeholder="请输入数量"></Input>
            </Form-item>
            <Form-item label="生成类型" prop="type">
              <Select v-model="form.type" style="text-align: left;width:200px;" @on-change="changeStat" label-in-value filterable clearable>
                <Option v-for="item in type" :value="item.value" :label="item.label":key="item">
                  {{ item.label }}
                </Option>
              </Select>
            </Form-item>
          </Form>

        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../libs/http';
  export default {
      data () {
          return {
              modal: false,
              modal_loading: false,
              form: {
                  starttime: '',
                  stoptime: '',
                  staticcount: '',
                  type: '',
                  type_name: ''
              },
              type: [
                  {
                      value: 'article',
                      label: '文章'
                  },
                  {
                      value: 'question',
                      label: '问答'
                  },
                  {
                      value: 'scatteredarticle',
                      label: '零散文章'
                  }
              ],
              AddRule: {

              }
          };
      },
      methods: {
          changeStat (value) {
              this.form.type_name = value.label;
              this.form.type = value.value;
          },
          add () {
              this.$refs.staticconfig.validate((valid) => {
                  if (valid) {
                      this.modal_loading = true;
                      let data = this.form;
                      // console.log(data)
                      this.apiPost('Staticconfig', data).then((res) => {
                          this.handleAjaxResponse(res, (data, msg) => {
                              this.modal = false;
                              this.$emit('getdata');
                              this.$Message.success(msg);
                              this.modal_loading = false;
                              this.$refs.staticconfig.resetFields();
                          }, (data, msg) => {
                              this.modal_loading = false;
                              this.$Message.error(msg);
                          });
                      }, (res) => {
                          // 处理错误信息
                          this.modal_loading = false;
                          this.$Message.error('网络异常，请稍后重试。');
                      });
                  }
              });
          }
      },
      mixins: [http]

  };
</script>
