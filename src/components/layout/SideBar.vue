<template>
  <div class="app-sidebar">
    <div class="logo" v-if="!isCollapse"><img src="../../assets/img/logo.png" alt=""/></div>
    <div style="margin-bottom:50px">
      <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          text-color="#484f57"
          active-text-color="#426dd5"
          router
      >
        <template v-for="item in $router.options.routes">
          <el-submenu v-if="!item.hidden" :key="item.id" :index="item.path">
            <!-- 一级菜单 -->
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{ item.meta.name }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item-group>
              <el-menu-item
                  v-for="subitem in item.children"
                  :key="subitem.id"
                  :index="subitem.path"
              >{{ subitem.meta.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </div>

  </div>
</template>

<script>

  export default {

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
      },

    },
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

      ul {
        background: #192a5e;
      }
    }
  }

</style>