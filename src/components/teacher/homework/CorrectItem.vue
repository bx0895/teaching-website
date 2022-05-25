<template>

  <div class="tw-currect--wrap">
    <el-form label-width="50px"
             size="small">
      <el-form-item label="分数">
        <el-input v-model="form.score"
                  type="text"
                  placeholder="0.0"></el-input>
      </el-form-item>
      <el-form-item label="评价">
        <el-input v-model="form.opinion"
                  type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import MIXIN from "@/core/mixin"
export default {
  name: "",

  components: {},

  mixins:[MIXIN],

  inject: ["hw_id"],

  props: {
    topic: {
      type: Object,
    },
    stu_id: {
      type: String,
    },
  },

  data() {
    return {
      form: {},
      q: {
        hw_id: this.hw_id,
        stu_id: this.stu_id,
        hw_topic_id: this.topic.id,
      },
    };
  },

  async created() {
    await this.getScore();
  },

  watch: {},

  computed: {},

  methods: {
    async handleSubmit() {
      try {
        let time = this.formatTime(new Date())
        await this.$api({
          type: "correctHomework",
          data: {
            q: this.q,
            time:time,
            updateData: this.form,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    async getScore() {
      try {
        let res = await this.$api({
          type: "getStudentHomework",
          data: { q: this.q },
        });
        let result = res.result[0];

        if (result?.score) {
          this.$set(this.form, "score", result.score);
        }
        if (result?.opinion) {
          this.$set(this.form, "opinion", result.opinion);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang='stylus'>

.tw-currect--wrap
  padding 10px 10px
  width: 230px
  height: 180px
  border: 1px solid #ccc

</style>
