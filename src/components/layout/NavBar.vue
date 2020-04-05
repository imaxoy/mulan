<template>
  <div class="app-nav-bar">
    <div class="nav-content">
      <!--      取消面包屑组件-->
      <div class="nav-title"></div>
      <div class="right-info">
        
        <user></user>
      </div>
    </div>
  </div>
</template>

<script>
  import User from "./User";

  export default {
    name: "NavBar",
    components: {
      User
    }
  }
</script>


<style lang="scss" scoped>
  .nav-title {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .app-nav-bar {
    width: 100%;
    height: $navbar-height;
    display: flex;
    align-items: center;

    .logo.js-min-logo {
      width: 64px;
      font-size: 16px;
      color: #fff;
    }

    .nav-content {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 10px;
      padding-right: $navbar-padding;

      .right-info {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
