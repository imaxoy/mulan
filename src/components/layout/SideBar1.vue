<template>
  <div class="app-sidebar">
    <div class="logo" v-if="!isCollapse"><img src="../../assets/img/logo.png" alt=""/></div>
    <div style="margin-bottom:50px">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#192A5E"
          text-color="rgba(196,201,210,1)"
          active-text-color="#1890ff"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1">

          <i class="el-icon-location"></i>
          <span>事件管理</span>

        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">资产管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">权限管理</span>
        </el-menu-item>
      </el-menu>
    </div>

  </div>
</template>

<script>
  export default {
    name: "SideBar",
    props: {
      isCollapse: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.app-sidebar {
  background: #192a5e;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .logo {
    width: $sidebar-width;
    height: $header-height;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #fff;
    transition: all 0.5s ease-in-out;
    background-color: #122150;
    transition: all 0.3s linear;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;

    img {
      width: 110px;
      transition: all 0.3s linear;
    }
  }
}

</style>