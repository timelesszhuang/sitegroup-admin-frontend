<template>
    <Card>
        <Tabs value="newsarticle" @on-click="getdata">
            <Tab-pane label="163新闻" name="newsarticle">
                <Newsarticle></Newsarticle>
            </Tab-pane>
            <Tab-pane label="搜狐新闻" name="sohunew">
                <Sohu ref="sohunews"></Sohu>
            </Tab-pane>
            <Tab-pane label="腾讯新闻" name="qqarticle">
                <Qqarticle ref="qqwenzhang"></Qqarticle>
            </Tab-pane>
            <Tab-pane label="热点新闻" name="hotnews">
                <Hotnews ref="newswenzhang"></Hotnews>
            </Tab-pane>
        </Tabs>
    </Card>
</template>
<script>
  import http from '../../../libs/http';
  import common from '../../../libs/common';
  import Qqarticle from './qq';
  import Newsarticle from './163art';
  import Hotnews from './hotnews';
  import Sohu from './souhu';

  export default {
      // , , Hotnews,
      components: {Sohu, Newsarticle, Hotnews, Qqarticle},
      methods: {
          getdata (name) {
              if (name === 'qqarticle') {
                  this.$refs.qqwenzhang.getData();
              } else if (name === 'hotnews') {
                  this.$refs.newswenzhang.getData();
              } else if (name === 'sohunew') {
                  this.$refs.sohunews.getData();
              }
          }
      },
      mixins: [http, common]
  };
</script>

