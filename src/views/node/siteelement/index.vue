<template>
    <div>
      <card>
      <Tabs value="templates" @on-click="tabClick">
        <TabPane label="站点模板管理" name="templates">
          <card>
          <templates ref="templates"></templates>
          </card>
        </TabPane>
        <TabPane label="自定义表单" name="customer">
          <card>
          <customer ref="customer"></customer>
          </card>
        </TabPane>
        <TabPane label="友情链接管理" name="links">
          <card>
          <links ref="links"></links>
          </card>
        </TabPane>
        <TabPane label="域名管理" name="domain">
          <card>
          <domain ref="domain"></domain>
          </card>
        </TabPane>
        <TabPane label="公共代码管理" name="codes">
          <card>
          <codes ref="codes"></codes>
          </card>
        </TabPane>
        <TabPane label="联系方式管理" name="contactway">
          <card>
          <contactway ref="contactway"></contactway>
          </card>
        </TabPane>
        <TabPane label="站点LOGO管理" name="sitelogo">
          <card>
          <sitelogo ref="sitelogo"></sitelogo>
          </card>
        </TabPane>
        <TabPane label="站点ICO设置" name="siteico">
          <card>
          <siteico ref="siteico"></siteico>
          </card>
        </TabPane>
        <TabPane label="图片水印设置" name="imgwatermark">
          <card>
          <imgwatermark ref="imgwatermark"></imgwatermark>
          </card>
        </TabPane>
      </Tabs>
      </card>
    </div>
</template>

<script type="text/ecmascript-6">
  import links from '../link/index.vue';
  import domain from '../domain/index.vue';
  import codes from '../code/index.vue';
  import contactway from '../contactway/contactway.vue';
  import templates from '../template/template.vue';
  import customer from '../customeform/index.vue';
  import sitelogo from '../sitelogo/index.vue';
  import siteico from '../siteico/index.vue';
  import imgwatermark from '../imgwatermark/index.vue';
  export default {
      data () {
          return {

          };
      },
      components: {
          links, domain, codes, contactway, templates, customer, sitelogo, siteico, imgwatermark
      },
      methods: {
          tabClick (name) {
              this.$refs[name].init();
          }
      }
  };
</script>
