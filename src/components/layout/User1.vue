<template>
  <div class="user">
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="nav-avatar"><img :src=" defaultAvatar" alt="头像"/></div>
      </span>
      <el-dropdown-menu slot="dropdown" class="user-box">
        <div class="user-info">
          <div class="avatar" title="点击修改头像">
            <img :src=" defaultAvatar" alt="头像"/>
            <label class="mask">
              <i class="iconfont icon-icon-test" style="font-size: 20px;"></i>
              <!--              <input ref="avatarInput" type="file" accept="image/*" @change="fileChange"/>-->
            </label>
          </div>
          <div class="text">
            <div class="username" @click="changeNickname" v-if="!nicknameChanged">{{ nickname }}</div>
            <el-input
                placeholder="请输入内容"
                size="small"
                v-else
                v-model="nickname"
                ref="input"
                @blur="blur"
            ></el-input>
          </div>
          <img src="../../assets/img/user/corner.png" class="corner"/>
          <div class="info">
            <div class="username">{{ username }}</div>
            <div class="mid">|</div>
            <div class="desc">{{ groupName }}</div>
          </div>
        </div>
        <ul class="dropdown-box">
          <li class="password" @click="changePassword">
            <i class="iconfont icon-weibaoxitongshangchuanlogo-"></i> <span>修改登录密码</span>
          </li>
          <li class="account" @click="outLogin"><i class="iconfont icon-tuichu"></i> <span>退出账户</span></li>
        </ul>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
        title="裁剪"
        :visible.sync="cropVisible"
        width="300px"
        :append-to-body="true"
        :close-on-click-modal="false"
        custom-class="croppa-dialog"
        center
    >
      <div style="text-align: center;">
        <div class="avatar-croppa-container">
          <croppa
              ref="croppa"
              :width="cropRule.width"
              :height="cropRule.height"
              :placeholder="'loading'"
              :zoom-speed="30"
              :disable-drag-and-drop="false"
              :show-remove-button="false"
              :prevent-white-space="true"
              :disable-click-to-choose="false"
              :disable-scroll-to-zoom="false"
              :show-loading="true"
              :quality="quality"
              :initial-image="cropImg"
          >
          </croppa>
        </div>
        <div style="margin-top: 1em;">通过鼠标滚轮调节头像大小</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cropVisible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="修改密码"
        :append-to-body="true"
        :visible.sync="dialogFormVisible"
        class="user-dialog"
    >
      <el-form
          :model="form"
          status-icon
          :rules="rules"
          label-position="left"
          ref="form"
          label-width="90px"
          @submit.native.prevent
      >
        <el-form-item label="原始密码" prop="old_password">
          <el-input type="password" v-model="form.old_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" v-model="form.new_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password" label-position="top">
          <el-input type="password" v-model="form.confirm_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import defaultAvatar from '@/assets/img/user/user.png'

  const width = 150
  const height = 150

  export default {
    name: "User",
    data() {
      const oldPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原始密码不能为空'))
        }
        callback()
      }
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码长度不能少于6位数'))
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.form.validateField('confirm_password')
          }
          callback()
        }
      }
      const validatePassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.new_password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        username: null,
        dialogFormVisible: false,
        nicknameChanged: false,
        nickname: null,
        groupName: null,
        form: {
          old_password: '',
          new_password: '',
          confirm_password: '',
        },
        rules: {
          old_password: [{validator: oldPassword, trigger: 'blur', required: true}],
          new_password: [{validator: validatePassword, trigger: 'blur', required: true}],
          confirm_password: [{validator: validatePassword2, trigger: 'blur', required: true}],
        },
        cropRule: {
          width,
          height,
        },
        imgRule: {
          minWidth: width,
          minHeight: height,
        },
        cropVisible: false,
        cropImg: '',
        croppa: {},
        imgInfo: null,
        quality: 1,
        defaultAvatar,

      }
    },
    created() {
      this.init()
    }
    ,
    methods: {

      init() {
        // const {user} = this.$store.state
        this.username = '未登录'
        this.groupName = '超级管理员'
        this.nickname = '佚名'
      },
      // 修改用户名
      changeNickname() {
        this.nicknameChanged = true
        setTimeout(() => {
          this.$refs.input.focus()
        }, 200)
      },
      // 修改密码方法
      changePassword() {
        this.dialogFormVisible = true
      },
      // 退出登陆方法
      outLogin() {
        this.loginOut()
        window.location.reload(true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-dialog /deep/ .el-dialog .el-dialog__header {
    border-bottom: 1px solid #dae1ed;
    padding-bottom: 20px;
  }

  .user-dialog /deep/ .el-dialog .el-dialog__body {
    padding-bottom: 00px;
  }

  .user {
    height: 40px;

    .el-dropdown-link {
      cursor: pointer;

      .nav-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
      }
    }
  }

  .user-box {
    width: 326px;
    /*background-color: none;*/
    background: transparent;
    margin-bottom: 0;
    padding-bottom: 0;
    border: none;

    .user-info {
      background-image: url('../../assets/img/user/user-bg.png');
      background-size: 100% 100%;
      transform: translateY(-10px);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      display: flex;
      flex-direction: row;
      padding: 35px 20px 25px 30px;
      z-index: 100;
      position: relative;

      .corner {
        position: absolute;
        right: 18px;
        top: -9px;
        width: 27px;
        height: 10px;
      }

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        position: relative;

        .mask {
          opacity: 0;
          transition: all 0.2s;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: white;

          input {
            display: none;
          }
        }

        &:hover {
          .mask {
            opacity: 1;
          }
        }
      }

      .text {
        margin-left: 20px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .username {
          margin-bottom: 10px;
          font-size: 16px;
          cursor: pointer;
        }

        .desc {
          font-size: 14px;
          color: rgba(222, 226, 230, 1);
        }
      }

      .info {
        position: absolute;
        bottom: 10px;
        right: 10px;
        display: flex;
        color: #fff;
        font-size: 14px;
        height: 20px;
        line-height: 20px;

        .mid {
          padding: 0 5px;
        }
      }
    }

    .dropdown-box {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 35px;
      height: 122px;
      color: #596c8e;
      font-size: 14px;
      background: white;
      margin-top: -10px;

      li {
        cursor: pointer;

        &:nth-child(1) {
          margin-top: 20px;
        }

        &:nth-child(2) {
          margin-bottom: 20px;
        }

        i {
          margin-right: 10px;
        }

        &:hover {
          color: $theme !important;

          i {
            color: $theme !important;
          }
        }
      }
    }
  }

  .popper__arrow {
    display: none !important;
  }

  .avatar-croppa-container {
    display: inline-block;
    border-color: #3862bc;
    border-style: dashed;
    font-size: 0;
    border-width: 2px;
  }
</style>
