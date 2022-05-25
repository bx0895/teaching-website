<template>
  <div class="tw-notice">
    <p class="tw-msg"><span class="tw-msg--title">发布公告：</span>在此页面发布公告将会显示到指定班级或者全部班级</p>
    <el-card>
      <el-form size="middle"
               label-width="80px"
               ref="noticeForm"
               :model="noticeForm"
               :rules="validates"
               class="item">
        <el-form-item label="标题"
                      prop="title">
          <el-input type="text"
                    placeholder="请输入标题"
                    v-model="noticeForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content">
          <el-input type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="noticeForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="选择班级">
          <SelectClass ref="classId" />
          <p>选择班级后只在该班级显示公告，不选择则给全部班级显示公告</p>
        </el-form-item>
        <el-form-item label="开始时间"
                      prop="start_time">
          <el-date-picker v-model="noticeForm.start_time"
                          type="datetime"
                          placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间"
                      prop="end_time">
          <el-date-picker v-model="noticeForm.end_time"
                          type="datetime"
                          placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('noticeForm')">提交</el-button>
          <el-button @click="resetForm('noticeForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import SelectClass from "@/components/base/SelectClass";
import VALIDATE_DATA from "@/config/validates.config.js";
import MIXIN from "@/core/mixin";
import store from 'store'

export default {
  name: "",
  mixins: [MIXIN],

  components: {
    SelectClass,
  },

  data() {
    return {
      noticeForm: {
        title: "",
        content: "",
        cla_id:null,
        start_time: "",
        end_time: "",
        tea_id: store.get('uid')
      },
    };
  },

  watch: {},

  computed: {
    validates() {
      return VALIDATE_DATA;
    },
  },

  methods: {
    //将时间格式改成yy-mm-dd hh:mm:ss
    getTime(form) {
      form.start_time = this.formatTime(form.start_time);
      form.end_time = this.formatTime(form.end_time);
    },

    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.getTime(this.noticeForm);
          try {
            let cla_id = this.$refs.classId.cla_id;
            if(cla_id !== '')
            this.noticeForm["cla_id"] = cla_id
            await this.$api({
              type: "addNotice",
              data: {  q: this.noticeForm },
            });
            this.success("公告发布成功");
            this.$refs.classId.cla_id = "";
          } catch (err) {
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
      this.$refs.classId.cla_id = "";
    },
  },
};
</script>
<style lang='stylus'>
 
.item .el-form-item__label
  font-weight: 700
</style>