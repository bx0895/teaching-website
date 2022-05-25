<template>
  <div class="tw-select--wrap">
    <p class="tw-msg"
       v-if="type === 'homework'"><span class="tw-msg--title">布置作业/自动选题：</span>填写作业信息后选择题目</p>
    <p class="tw-msg"
       v-if="type === 'test'"><span class="tw-msg--title">发布考试/自动选题：</span>填写考试信息后选择题目</p>
    <div class="tw-steps">
      <el-steps align-center
                :active="active"
                finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="随机题目"></el-step>
        <el-step title="确认题目"></el-step>
      </el-steps>
    </div>
    <div v-show="active === 0"
         class="tw-form--wrap">
      <keep-alive>
        <TopicForm :formType="type"
                   ref="topicForm" />
      </keep-alive>
      <div class="tw-steps--button">
        <el-button type="primary"
                   @click="handleNext">下一步</el-button>
      </div>
    </div>
    <div v-show="active === 1"
         class="tw-form--wrap">
      <el-card>
        <p class="tw-msg">输入各类题型题数</p>
        <el-form label-width="100px">
          <el-form-item label="选择题">
            <el-input v-model="typeForm.xuanze"></el-input>
          </el-form-item>
          <el-form-item label="填空题">
            <el-input v-model="typeForm.tiankong"></el-input>
          </el-form-item>
          <el-form-item label="简答题">
            <el-input v-model="typeForm.jianda"></el-input>
          </el-form-item>
          <el-form-item label="编程题">
            <el-input v-model="typeForm.biancheng"></el-input>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="tw-steps--button">
        <el-button type="primary"
                   @click="handleLast">上一步</el-button>
        <el-button type="primary"
                   @click="handleRandom">下一步</el-button>
      </div>
    </div>
    <div v-if="active === 2"
         class="tw-form--wrap">
      <keep-alive>
        <SortTopic :topics="topics" />
      </keep-alive>

      <div class="tw-steps--button">
        <el-button type="primary"
                   @click="handleLast">上一步</el-button>
        <el-button type="primary"
                   @click="handleSubmit">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import TopicForm from "@/components/teacher/common/TopicForm";
import SortTopic from "@/components/teacher/common/SortTopic";
import MIXIN from "@/core/mixin";
export default {
  name: "",

  mixins: [MIXIN],

  components: {
    TopicForm,
    SortTopic,
  },

  data() {
    return {
      active: 0,
      topics: [],
      topicData: [],
      classId: "",
      form: "",
      typeForm: {
        xuanze: null,
        tiankong: null,
        jianda: null,
        biancheng: null,
      },
      id: "",
      idName: this.$route.query.idName,
      type: this.$route.query.type,
      choice: [],
      filling: [],
      shortQues: [],
      programme: []
    };
  },

  watch: {},

  created() {
    this.$api({ type: "tiku", data: { table: this.type } })
      .then((res) => {
        this.choice = res.result[0]
        this.filling = res.result[1]
        this.shortQues = res.result[2]
        this.programme = res.result[3]
      })
      .catch((err) => {
        console.log(err);
      });
  },

  computed: {},

  methods: {
    handleNext() {
      this.active++;
    },
    handleLast() {
      this.active--;
    },
    handleRandom() {
      let choiceArr = this.getRandomArrayElements(this.choice, this.typeForm.xuanze);
      let fillingArr = this.getRandomArrayElements(
        this.filling,
        this.typeForm.tiankong
      );
      let shortArr = this.getRandomArrayElements(this.shortQues, this.typeForm.jianda);
      let programArr = this.getRandomArrayElements(
        this.programme,
        this.typeForm.biancheng
      );
      this.topics = choiceArr.concat(fillingArr, shortArr, programArr);
      this.active++
    },
    async handleSubmit() {
      try {
        this.formatForm();
        for (let i = 0; i < this.classId.length; i++) {
          this.form.cla_id = this.classId[i];
          let res = await this.$api({
            type: `${this.type}Add`,
            data: { q: this.form },
          });
          this.id = res.result[0].id;
          this.formatTopic();
          await this.$api({
            type: `${this.type}Topic`,
            data: { q: this.topicData },
          });
        }

        this.$message({
          message: "发布成功",
          type: "success",
        });
      } catch (err) {
        console.log(err);
      }
    },
    formatForm() {
      this.classId = this.$refs.topicForm.cla_id;
      this.form = this.$refs.topicForm.form;
      this.form.start_time = this.formatTime(this.form.start_time);
      this.form.end_time = this.formatTime(this.form.end_time);
    },
    formatTopic() {
      this.topicData = this.topics.reduce((acc, item) => {
        let child = {};
        child[this.idName] = this.id;
        child["topic_id"] = item.id;
        child["topic_type"] = item.type;
        child["score"] = item.score;
        acc.push(child);
        return acc;
      }, []);
    },
    //从数组中随机获取元素
    getRandomArrayElements(arr, count) {
      let shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
  },
};
</script>
<style lang='stylus'>
.tw-select--wrap
  padding: 0 30px

.tw-steps
  padding: 10px 0

.tw-steps--button
  margin: 10px auto
  width: 240px

</style>