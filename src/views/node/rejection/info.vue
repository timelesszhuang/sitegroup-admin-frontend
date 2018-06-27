<template>
    <Modal v-model="modal" width="460">
        <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
            <Icon type="flag"></Icon>
            <span>线索信息</span>
        </p>
        <div>

       <!--{{showdata}}}-->


           <!--<div v-for="(item,index) in this.showdata" :label="index"-->
               <!--:key="index">-->
             <!--{{item.value}}-->
           <!--</div>-->
            <Table :border="border" :stripe="stripe"
                   :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
            </Table>



        </div>


        <div slot="footer">
        </div>
    </Modal>

</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                page_show: true,
                border: true,
                stripe: true,
                size: 'small',
                modal: false,
                datas: []

            };
        },
        computed: {
            tableColumns () {
                let columns = [];
                columns.push({
                    title: '线索信息',
                    key: 'value',
                    sortable: true
                });
                return columns;
            }
        },

        methods: {
            infodatas (datas) {
            // console.log(datas)
                this.datas = datas;
            }
        },
        props: {
            showdata: {}
        }
    };
</script>

<!--<script>-->
  <!--export default {-->
      <!--data () {-->
          <!--return {-->
              <!--modal: false,-->
              <!--columns1: [-->
                  <!--{-->
                      <!--title: 'Name',-->
                      <!--key: 'name'-->
                  <!--},-->
                  <!--{-->
                      <!--title: 'Age',-->
                      <!--key: 'age'-->
                  <!--},-->
                  <!--{-->
                      <!--title: 'Address',-->
                      <!--key: 'address'-->
                  <!--}-->
              <!--],-->
              <!--data1: [-->
                  <!--{-->
                      <!--name: 'John Brown',-->
                      <!--age: 18,-->
                      <!--address: 'New York No. 1 Lake Park',-->
                      <!--date: '2016-10-03'-->
                  <!--},-->
                  <!--{-->
                      <!--name: 'Jim Green',-->
                      <!--age: 24,-->
                      <!--address: 'London No. 1 Lake Park',-->
                      <!--date: '2016-10-01'-->
                  <!--},-->
                  <!--{-->
                      <!--name: 'Joe Black',-->
                      <!--age: 30,-->
                      <!--address: 'Sydney No. 1 Lake Park',-->
                      <!--date: '2016-10-02'-->
                  <!--},-->
                  <!--{-->
                      <!--name: 'Jon Snow',-->
                      <!--age: 26,-->
                      <!--address: 'Ottawa No. 2 Lake Park',-->
                      <!--date: '2016-10-04'-->
                  <!--}-->
              <!--]-->

          <!--};-->
      <!--}-->
  <!--};-->
<!--</script>-->




<style scoped>
.content {
display: flex;
flex-direction: column;
padding-left: 50px;
}

.content .column {
padding: 10px 0;
box-sizing: border-box;
margin: 0 auto;
}

.rowClassName{
background: #e6e6e6;
}

</style>