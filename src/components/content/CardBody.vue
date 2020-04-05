<template>
  <div>
    <el-tabs v-model="activeName" :tab-position="tabPosition" stretch>
      <el-tab-pane :label="add" name="first">
        <slot name="add"></slot>
      </el-tab-pane>
      <el-tab-pane :label="cat" name="second">
        <slot name="cat"></slot>
      </el-tab-pane>
      <el-tab-pane :label="inbox" name="third">
        <slot name="inbox"></slot>
      </el-tab-pane>
      <el-tab-pane :label="doc" name="fourthly">
        <slot name="doc"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tabPosition: "left"
    };
  },
  // 组件传值
  props: ["add", "cat", "inbox", "doc"]
};
</script>

<style lang="scss" scoped></style>
