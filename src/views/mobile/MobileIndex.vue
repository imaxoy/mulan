<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <card-body :add="add" :cat="cat" :inbox="inbox">
            <template slot="add">
              <mobile-add></mobile-add>
            </template>
            <template slot="cat">
              <!--            <mobile-list></mobile-list>-->
            </template>
            <template slot="inbox">
              <!--            <mobile-report></mobile-report>-->
            </template>
          </card-body>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import CardBody from "../../components/content/CardBody";
  import MobileAdd from "./MobileAdd";
  // import MobileList from "./MobileList";
  // import MobileReport from "./MobileReport";

  export default {
    data() {
      return {
        activeName: "first",
        add: "新增事件",
        cat: "查看事件",
        inbox: "终端报告",
      };
    },
    components: {
      CardBody,
      MobileAdd,
      // MobileList,
      // MobileReport,
    }
  };
</script>
<style lang="scss" scoped>
  .bg-purple {
    background: #fff;
  }
</style>
