<template>
  <div id="login">
    <el-row>
      <el-col :span="8">
        <el-carousel height="100vh">
          <el-carousel-item v-for="item in src" :key="item.index">
            <el-image :src="item"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="16">
        <div class="login-form">
          <span style="font-size:16px">信息资源管理系统</span>
          <el-form
            :model="ruleForm"
            :rules="rules"
            label-position="top"
            status-icon
            ref="ruleForm"
          >
            <el-divider></el-divider>
            <el-row :gutter="40">
              <el-col :span="12">
                <el-form-item prop="email" class="item-form" label="邮箱">
                  <el-input
                    type="text"
                    v-model="ruleForm.email"
                    size="small"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="password" class="item-form" label="密码">
                  <el-input
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    minlength="6"
                    maxlength="20"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-divider></el-divider>

            <el-button
              type="primary"
              size="small"
              class="block"
              :disabled="loginStatus"
              @click="submitForm('ruleForm')"
            >登录</el-button
            >
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { validatePass } from "@/utils/validate.js";
  import User from "../../network/models/user";
  import { mapMutations } from "vuex";

  export default {
    name: "login",
    data() {
      // 验证用户名
      var validateUsername = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入邮箱"));
        } else {
          callback();
        }
      };

      // 验证密码
      var validatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (validatePass(value)) {
          callback(new Error("密码格式有误"));
        } else {
          callback();
        }
      };

      return {
        src: [
          require("@/assets/img/login/timg.jpg"),
          require("@/assets/img/login/light.jpg")
        ],
        menuTab: [
          {
            tex: "登录",
            current: true,
            type: "login"
          },
          {
            tex: "注册",
            current: false,
            type: "register"
          }
        ],
        model: "login",
        isActive: true,
        loginStatus: false,
        ruleForm: {
          email: "",
          password: "",
          passwords: "",
          code: ""
        },
        rules: {
          email: [
            {
              validator: validateUsername,
              trigger: "blur"
            }
          ],
          password: [
            {
              validator: validatePassword,
              trigger: "blur"
            }
          ]
        }
      };
    },
    // 挂载完成后执行的生命周期
    mounted() {},
    methods: {
      ...mapMutations(["changeLogin"]),

      toggleMenu(data) {
        // ES6写法
        this.menuTab.forEach(elem => (elem.current = false));
        // 高光
        data.current = true;
        this.model = data.type;
      },

      submitForm(formName) {
        // 假设登陆成功，则跳转到 index 组件
        // this.$router.replace("/index");
        this.$refs[formName].validate(valid => {
          if (valid) {
            let requestData = {
              account: this.ruleForm.email,
              secret: this.ruleForm.password,
              type: 100
            };
            Login(requestData).then(response => {
              if (parseInt(response.status) === 404) {
                // 登录失败
                this.email = "";
                this.password = "";
                console.log(response);
              } else if (parseInt(response.status) === 201) {
                // 存token
                sessionStorage.setItem("token", response.data.token);
                // 登录成功,跳转到index

                this.$router.push("index");
                // $router.push("index");
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  #login {
    height: 100%;
    margin: 0 auto;
    padding: 0;
    background-color: #ffffff;
  }

  .login-form {
    margin-top: 30%;
    padding: 0 150px;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  .block {
    width: 10%;
    display: block;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100vh;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
