<template>
  <el-card class="tw-info--bottom">
    <el-form :model="bottomForm"
             ref="bottomForm"
             :rules="ruleForm"
             size="small"
             label-width="100px"
             style="width:500px">
      <el-form-item label="原密码："
                    prop="pwd">
        <el-input v-model="bottomForm.pwd"
                  type="password">
        </el-input>
      </el-form-item>
      <el-form-item label="新密码："
                    prop="newPwd">
        <el-input v-model="bottomForm.newPwd"
                  type="password">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码："
                    prop="checkPwd">
        <el-input v-model="bottomForm.checkPwd"
                  type="password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('bottomForm')">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",

  components: {},

  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.bottomForm.checkPwd !== "") {
          this.$refs.bottomForm.validateField("checkPwd");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.bottomForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      bottomForm: {
        pwd: "",
        newPwd: "",
        checkPwd: "",
      },
      ruleForm: {
        pwd: [
          {
            pattern: /^\w{6,18}$/,
            message: "密码格式：6-18位数字、大小写字母、下划线 ",
            trigger: "blur",
          },
        ],
        newPwd: [
          {
            pattern: /^\w{6,18}$/,
            message: "密码格式：6-18位数字、大小写字母、下划线 ",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPwd: [
          {
            pattern: /^\w{6,18}$/,
            message: "密码格式：6-18位数字、大小写字母、下划线 ",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "change" },
        ],
      },
    };
  },

  watch: {},

  computed: {
    ...mapState(["userId", "loginType"]),
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$api({
              type: "changePwd",
              data: {
                id: this.userId,
                q: this.bottomForm,
                table: this.loginType,
              },
            });
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
          } catch (err) {
            this.$refs[formName].resetFields();
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
<style lang='stylus'>
</style>