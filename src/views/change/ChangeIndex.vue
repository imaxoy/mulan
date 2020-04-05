<template>
  <div>
    <el-tabs>
      <el-tab-pane label="新增变更">
        <change-add></change-add>
      </el-tab-pane>
      <el-tab-pane label="查看变更">
        <change-list></change-list>
      </el-tab-pane>
      <el-tab-pane label="变更统计">变更统计</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import ChangeAdd from "./ChangeAdd";
  import ChangeList from "./ChangeList";

  export default {
    data() {
      return {};
    },
    components: {
      ChangeAdd,
      ChangeList
    }
  };
</script>
