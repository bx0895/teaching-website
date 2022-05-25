<template>
  <div>
    <p class="tw-msg"><span class="tw-msg--title">创建论坛：</span> 创建论坛后只有该老师负责的班级能看到并进入论坛发言 </p>
    <el-card>
        <el-form label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="开始时间"
                    prop="start_time">
        <el-date-picker v-model="form.start_time"
                        type="datetime"
                        placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间"
                    prop="end_time">
        <el-date-picker v-model="form.end_time"
                        type="datetime"
                        placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  
  </div>
</template>

<script>
import MIXIN from "@/core/mixin";
import store from "store";

export default {
  name: "",
  mixins: [MIXIN],

  components: {

  },

  data() {
    return {
      form: {
        title: "",
        tea_id: store.get('uid'),
        start_time: "",
        end_time: "",
      },
    };
  },

  watch: {},

  computed: {},

  methods: {
    async submitForm() {
      try {
        this.form.start_time = this.formatTime(this.form.start_time)
        this.form.end_time = this.formatTime(this.form.end_time)
        await this.$api({type:'addForum',data:{q:this.form}})
        this.$message({
          message: '创建成功',
          type: 'success'
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang='stylus'>
</style>