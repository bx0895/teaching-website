<template>
  <div class="tw-register">
    <el-card class="tw-register--wrap">
      <el-form :model="form"
               ref="ruleForm"
               label-width="80px">
          <el-form-item label="选择班级"
                      v-if="registerType==='student'">
          <SelectClass ref="classId" />
        </el-form-item>
        <el-form-item v-for="item in formData"
                      :label="item.label"
                      :key="item['query']"
                      :prop="item['query']"
                      :rules="validates[item['query']]">
          <el-input v-model="form[item['query']]"
                    :name="item['query']"
                    :type="item.type"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>

</template>

<script>
import FORM_DATA from "@/config/form.config.js";
import VALIDATE_DATA from "@/config/validates.config.js";
import SelectClass from '@/components/base/SelectClass'
export default {
  name: "",

  components: {
    SelectClass
  },
  props: {
    registerType: {
      type: String,
    },
    showClass: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {},
    };
  },

  created() {},

  computed: {
    formData() {
      return FORM_DATA[this.registerType]?.formData;
    },
    validates() {
      return VALIDATE_DATA;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            if(this.registerType === 'student') {
              this.form.cla_id = this.$refs.classId.cla_id
            }
            await this.$api({
              type: `register/${this.registerType}`,
              data: {q:this.form},
            });
            // this.clearValidates(formName);
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
          } catch (err) {
            this.clearValidates(formName);
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
    clearValidates(formName) {
      this.form.pwd = "";
      this.$refs[formName].clearValidate();
    },
  },

  watch: {},
};
</script>
<style lang='stylus'>
.tw-main-container
  height: 100%
  
.tw-register
  width 500px
  margin: 0 auto
.tw-register--wrap
  padding 20px
</style>