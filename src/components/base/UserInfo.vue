<template>
  <div class="tw-info">
    <el-card class="tw-info--top">
      <el-descriptions class="margin-top"
                       title="基本信息"
                       :column="2">
        <el-descriptions-item label="账号">{{userId}}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{userInfo.name}}</el-descriptions-item>
        <el-descriptions-item label="电话"
                              v-show="userInfo.phone">{{userInfo.phone}}</el-descriptions-item>
        <el-descriptions-item label="邮箱"
                              v-show="userInfo.email">{{userInfo.email}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- middle -->
    <el-card class="tw-info--middle"
             v-show="loginType !== 'admin'">
      <el-form :model="middleForm"
               ref="middleForm"
               size="small"
               label-width="100px"
               style="width:500px">
        <el-form-item label="电话："
                      prop="phone"
                      :rules="validates['phone']">
          <el-input v-model="middleForm.phone"
                    type="text">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱："
                      prop="email"
                      :rules="validates['email']">
          <el-input v-model="middleForm.email"
                    type="text">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('middleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- bottom -->
    <ChangePwd  />
  </div>
</template>

<script>
import VALIDATE_DATA from "@/config/validates.config.js";
import ChangePwd from "@/components/base/ChangePwd"
// import { mapState } from "vuex";
import store from 'store'

const USER_MAP = {
  admin: "adm_id",
  teacher: "tea_id",
  student: "stu_id",
};

export default {
  name: "",

  components: {
    ChangePwd
  },

  data() {

    return {
      middleForm: {
      },
      userInfo: {}, 
      userId: store.get('uid'),
    };
  },

  async created() {
    try{
      await this.getUserInfo()
    }catch(err){
      console.log(err)
    }
  },

  watch: {},

  computed: {
    validates() {
      return VALIDATE_DATA;
    },
    loginType() {
      return store.get('log_name')
    }
  },

  methods: {
    submitForm(formName) {
      if (!this.middleForm.phone && !this.middleForm.phone){
         this.$notify({
        message: '电话或邮箱不能为空',
        type: "error",
      });
      return 
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$api({type:`${this.loginType}Update`,
            data:{
              id:this.userInfo.id,
              updateData:this.middleForm,
              table:this.loginType
            }})
            this.$notify.success({
              title: "成功",
              message: "修改成功",
            });
            //重新获取信息
            this.resetForm(formName)
            await this.getUserInfo()
          } catch (err) {
            console.log(err);
          }
        } else {
          return false;
        }
      });
    },
   
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getUserInfo() {
      try {
        //获取用户信息
        let idName = USER_MAP[this.loginType];
        let res = await this.$api({
          type: `${this.loginType}Info`,
          data: {
            q: { [idName]: this.userId },
            table: this.loginType,
          },
        });
        this.userInfo = res.result[0]
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang='stylus'>
.tw-info
  padding 10px

.tw-info--top
  padding 0 50px
  margin-bottom: 10px

.tw-info--middle
  margin-bottom: 10px
</style>