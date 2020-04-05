<template>
  <div style="height:100vh;">
    <el-container>
      <el-aside class="aside" :width="sideBarWidth">
        <side-bar :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="left">
            <div class="operate">
              <i class="el-icon-s-unfold"/>
              <nav-bar></nav-bar>
            </div>
          </div>
        </el-header>
        <el-main>
          <app-main>
          </app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import SideBar from "@c/layout/SideBar";
  import AppMain from "@c/layout/AppMain";
  import NavBar from "@c/layout/NavBar";

  const sideBarWidth = '256px';

  export default {
    name: 'Home',
    data() {
      return {
        sideBarWidth,
        isCollapse: false
      }
    },
    components: {
      SideBar,
      NavBar,
      AppMain
    }
  }
</script>


<style lang="scss">

  .aside {
    background: rgb(25, 42, 94);
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }

  .header {
    padding: 0;
    background: $header-background;
    height: $header-height !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 2px 6px 0px rgba(190, 204, 216, 0.4);
    border-bottom: 1px solid rgba(190, 204, 216, 0.4);
    z-index: 1;

    .left {
      height: 100%;
      width: 100%;

      .operate {
        display: flex;
        align-items: center;
        background: $header-background;
        padding-left: 20px;
        height: 64px;

        .iconfont {
          font-size: 16px;
          font-weight: 500;
          color: $right-side-font-color;
          cursor: pointer;
          transform: rotate(0deg);
          transition: all 0.3s linear;
          margin-right: 10px;

          &:hover {
            color: #3963bc;
          }
        }

        .rotate {
          transform: rotate(180deg);
          transition: all 0.3s linear;
        }
      }
    }

    .right-info {
      display: flex;
      align-items: center;
    }
  }

  .el-main {
    overflow-y: auto;
    position: relative;
    padding: 0;
  }

  .sidenav-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
    display: none;
    cursor: pointer;

    &.show {
      display: block;
    }
  }
</style>
