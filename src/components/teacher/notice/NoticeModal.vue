<template>
  <div>
    <el-dialog title="修改信息"
               :visible.sync="isShow"
               width="50%"
               :before-close="handleClose">
      <el-form :model="editForm"
               class="tw-edit--form"
               size="mini"
               :rules="validates"
               ref="editForm">
        <el-form-item label="标题"
                      prop="title">
          <el-input type="text"
                    placeholder="请输入标题"
                    v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content">
          <el-input type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="editForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="选择班级">
          <SelectClass ref="classId" />
        </el-form-item>
        <el-form-item label="开始时间"
                      prop="start_time">
          <el-date-picker v-model="editForm.start_time"
                          type="datetime"
                          placeholder="选择开始时间"
                          @change="editTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间"
                      prop="end_time">
          <el-date-picker v-model="editForm.end_time"
                          type="datetime"
                          placeholder="选择开始时间"
                          @change="editTime">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectClass from "@/components/base/SelectClass";
import VALIDATE_DATA from "@/config/validates.config.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("modal");
import MIXIN from "@/core/mixin";

export default {
  name: "",
  mixins: [MIXIN],

  components: {
    SelectClass,
  },
  props: {
    type: {
      type: String,
    },
    classInfo: {
      type: Array,
    },
  },

  data() {
    return {};
  },

  watch: {},

  computed: {
    ...mapState(["isShow", "editForm", "selectForm"]),
    validates() {
      return VALIDATE_DATA;
    }
  },

  methods: {
    editTime(){
      return this.getTime(this.editForm)
    },
    //修改时间格式
    getTime(form) {
      form.start_time = this.formatTime(form.start_time);
      form.end_time = this.formatTime(form.end_time);
    },
    //提交
    handleSubmit() {
      this.$refs["editForm"].validate(async (valid) => {
        if (valid) {
          try {
            let cla_id = this.$refs.classId.cla_id;
            if (cla_id) {
              this.editForm["cla_id"] = cla_id;
            }
            await this.$api({
              type: `noticeUpdate`,
              data: {
                id: this.editForm.id,
                updateData: this.editForm,
              },
            });
            this.success("修改成功");
            this.close();
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //关闭
    handleClose() {
      this.close();
    },
    ...mapActions(["close", "open"]),
  },
};
</script>
<style lang='stylus'>
</style>