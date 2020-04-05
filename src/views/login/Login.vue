<template>
  <div class="login">
    <el-row>
      <el-col :span="8">
        <el-carousel height="100vh">
          <el-carousel-item v-for="item in imgsrc" :key="item.index">
            <el-image :src="item"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="16">
        <form class="login-form" autocomplete="off" @submit.prevent="throttleLogin()">
          <div class="form-item nickname">
            <span class="icon account-icon"></span>
            <input type="text" v-model="form.username" autocomplete="off" placeholder="请填写用户名"/>
          </div>
          <div class="form-item password">
            <span class="icon secret-icon"></span>
            <input type="password" v-model="form.password" autocomplete="off" placeholder="请填写用户登录密码"/>
          </div>
          <button class="submit-btn" type="submit">登录</button>
        </form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex'
  import User from '@/network/models/user'
  import Utils from '@/common/util'

  export default {
    name: 'login',
    data() {
      return {
        imgsrc: [
          require("@/assets/img/login/timg.jpg"),
          require("@/assets/img/login/light.jpg")
        ],
        loading: false, // 加载动画
        wait: 2000, // 2000ms之内不能重复发起请求
        throttleLogin: null, // 节流登录
        form: {
          username: '王亚运',
          password: 'abcd1234',
          confirm_password: '123456',
          email: '2285901508@qq.com',
        },
      }
    },
    methods: {
      async login() {
        const {username, password} = this.form
        try {
          this.loading = true
          await User.getToken(username, password)
          await this.getInformation()
          this.loading = false
          this.$router.push('/')
          this.$message.success('登录成功')
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      },
      async getInformation() {
        try {
          // 尝试获取当前用户信息
          const user = await User.getAuths()
          this.setUserAndState(user)
          this.setUserAuths(user.auths)
        } catch (e) {
          console.log(e)
        }
      },
      async register() {
        const obj = {
          data: {
            username: this.username,
            password: this.password,
            confirm_password: this.confirm_password,
            email: this.email,
          },
        }
        try {
          await User.register(obj)
          this.$message.success('注册成功！')
        } catch (e) {
          console.log(e)
        }
      },
      ...mapActions(['setUserAndState']),
      ...mapMutations({
        setUserAuths: 'SET_USER_AUTHS',
      }),
    },
    created() {
      // 节流登录
      this.throttleLogin = Utils.throttle(this.login, this.wait)
    },
    components: {},
  }
</script>

<style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background-size: auto;
  }
</style>
