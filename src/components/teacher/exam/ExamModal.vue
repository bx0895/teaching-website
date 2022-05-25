<template>
  <div class="tw-exam-modal">
    <el-dialog :title="title"
               :visible.sync="isShow"
               width="50%"
               :before-close="handleClose">
      <el-form class="tw-edit--form"
               size="mini"
               ref="editForm"
               label-width="60px">
        <el-form-item label="内容"
                      prop="content">
          <el-input v-model="form.content"
                    type="text">
          </el-input>
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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("modal");
export default {
  name: "",

  components: {},
  props: {},

  data() {
    return {
      form: {
        content: null,
      },
    };
  },

  watch: {},

  computed: {
    ...mapState(["isShow", "type"]),
    title() {
      return this.type === "knowledge" ? "添加知识点" : "添加章节";
    },
  },

  methods: {
    //提交
    async handleSubmit() {
      try {
        if (this.form.content) {
          await this.$api({
            type: `${this.type}Insert`,
            data: { q: this.form },
          });
          this.form.content = ''
          this.$notify.success({
            title: "通知",
            message: "添加成功",
          });
          this.close();
        }
      } catch (err) {
        console.log(err);
      }
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