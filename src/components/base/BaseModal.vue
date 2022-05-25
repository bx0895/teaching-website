<template>
  <div>
    <el-dialog title="修改信息"
               :visible.sync="isShow"
               width="60%"
               :before-close="handleClose">
      <el-form :model="editForm"
               class="tw-edit--form"
               size="middle"
               ref="editForm">
        <el-form-item v-for="(item,idx) in modelForm"
                      :key="idx"
                      :label="item.label"
                      :prop="item.query"
                      :rules="validates[item.query]">
          <el-input v-model="editForm[item.query]"
                    :type="item.type"
                    :disabled="item.disabled">
          </el-input>
        </el-form-item>
        <el-form-item label="选择班级"
                      v-if="type==='student'">
          <SelectClass ref="classId" :classID="editForm.cla_id" />
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
import FORM_MAP from "@/config/form.config";
import VALIDATE_DATA from "@/config/validates.config.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("modal");
import encrypt from '@/util/encrypt'
export default {
  name: "",
  inject: ['reload'],
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
    modelForm() {
      return FORM_MAP[this.type].formData;
    },
    validates() {
      return VALIDATE_DATA;
    },
  },

  methods: {
    //提交
    handleSubmit() {
      this.$refs["editForm"].validate(async (valid) => {
        if (valid) {
          try {
            if(this.type === 'student') {
              delete this.editForm.tea_id
              delete this.editForm.tea_name
              this.editForm.cla_id = this.$refs.classId?.cla_id
            }
            if(this.type === 'class') {
              delete this.editForm.name
              this.editForm.id = this.editForm.cla_id
              delete this.editForm.cla_id
            }
            if (this.editForm?.pwd) {
              this.editForm.pwd = await encrypt(this.editForm.pwd)
            }
            await this.$api({
              type: `${this.type}Update`,
              data: {
                id: this.editForm.id,
                updateData: this.editForm,
                table: this.type,
              },
            });
            this.$notify.success({
              title: "通知",
              message: "修改成功",
            });
            this.close();
            this.reload()
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