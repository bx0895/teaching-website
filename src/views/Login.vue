<template>
  <div class="tw-login">
    <div class="tw-login--wrap">
      <h2 class="tw-login--title">登录</h2>
      <el-form :model="loginForm"
               ref="ruleForm"
               label-width="60px"
               class="demo-ruleForm"
               :hide-required-asterisk="true">
        <el-form-item label="账号:"
                      prop="userId"
                      :rules="validates['userId']">
          <el-input v-model="loginForm.userId"
                    type="text"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:"
                      prop="pwd"
                      :rules="validates['pwd']">
          <el-input type="password"
                    v-model="loginForm.pwd"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份:">
          <el-radio-group v-model="loginForm.loginType">
            <el-radio label="student">学生</el-radio>
            <el-radio label="teacher">教师</el-radio>
            <el-radio label="admin">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')"
                     class="tw-login--button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
const LOGIN_TYPE = "log_name";
import store from "store";

export default {
  name: "Login",

  components: {},

  data() {
    return {
      loginForm: {
        userId: "",
        pwd: "",
        loginType: "student",
      },
      validates: {
        pwd: [
          {
            pattern: /^\w{6,18}$/,
            message: "密码格式：6-18位数字、大小写字母、下划线 ",
            trigger: "blur",
          },
        ],
      },
    };
  },

  watch: {},

  computed: {},

  beforeCreate() {
    // 浏览器刷新之后回到登录页面
    if (this.$router.path !== "/") {
      this.$router.replace("/");
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            let loginType = this.loginForm.loginType;
            store.set(LOGIN_TYPE, loginType);
            //登录验证
            await this.$api({ type: "login", data: this.loginForm });
            if (loginType === "admin") {
              this.$router.push("/admin");
            }
            if (loginType === "teacher") {
              this.$router.push("/teacher");
            }
            if (loginType === "student") {
              this.$router.push("/student");
            }
            //获取用户信息
          } catch (err) {
            this.resetForm(formName);
            console.log(err);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang='stylus' scoped>

.tw-login
  width 100% 
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background transparent url(../assets/img/bg1.jpeg) repeat-y fixed 100% 0/cover

.tw-login--title
  margin-bottom: 20px
  text-align: center
  color: #222
  font-size 24px
  
.tw-login--wrap
  width 400px
  padding: 20px 20px
  box-shadow: 0 0 16px 	#6495ED
  background-color #fff
  border-radius: 12px

.tw-login--button
  width: 250px
</style>