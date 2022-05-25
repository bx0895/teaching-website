<template>
  <div>
    <el-dialog title="批改作业"
               :visible.sync="isShow"
               width="70%"
               center
               :before-close="handleClose">
        <div v-if="choice.length !== 0">
          <h3 class="tw-topic--type">选择题</h3>
          <ul>
            <li v-for="(item,id) in choice"
                :key="item.id"
                class="tw-topic--wrap">
              <div class="tw-topic--item typo">
                <p class="tw-topic--index">
                  <span class="tw-content--index"> {{id+1}}. [{{item.score}}分] </span>
                  <span v-html="handleReplace(item.content)"></span>
                </p>

                <el-input v-model="form[item.id]"
                          class="tw-topic--input"></el-input>
              </div>
              <CorrectItem v-if="item"
                           :topic="item" :stu_id="stu_id"/>

            </li>
          </ul>
        </div>

        <div v-if="filling.length !== 0">
          <h3 class="tw-topic--type">填空题</h3>
          <ul>
            <li v-for="(item,id) in filling"
                :key="item.id"
                class="tw-topic--wrap">
              <div class="tw-topic--item typo">
                <p class="tw-topic--index">
                  <span class="tw-content--index"> {{id+1}}. [{{item.score}}分] </span>
                  <span v-html="handleReplace(item.content)"></span>
                </p>
                <el-input v-model="form[item.id]"
                          class="tw-topic--input"></el-input>
              </div>
              <CorrectItem v-if="item"
                           :topic="item" :stu_id="stu_id"/>

            </li>
          </ul>
        </div>
        <div v-if="shortQues.length !== 0">
          <h3 class="tw-topic--type">简答题</h3>
          <ul>
            <li v-for="(item,id) in shortQues"
                :key="item.id"
                class="tw-topic--wrap">
              <div class="tw-topic--item typo">
                <p class="tw-topic--content">
                  <span class="tw-content--index"> {{id+1}}. [{{item.score}}分] </span>
                  <span v-html="item.content"></span>
                </p>
                <el-input type="textarea"
                          id="editor"
                          v-model="form[item.id]"
                          class="tw-topic--input"></el-input>
              </div>
              <CorrectItem v-if="item"
                           :topic="item" :stu_id="stu_id"/>

            </li>
          </ul>
        </div>
        <div v-if="programme.length !== 0">
          <h3 class="tw-topic--type">编程题</h3>
          <ul>
            <li v-for="(item,id) in programme"
                :key="item.id"
                class="tw-topic--wrap">
              <div class="tw-topic--item typo">
                <p class="tw-topic--content">
                  <span class="tw-content--index"> {{id+1}}. [{{item.score}}分] </span>
                  <span v-html="item.content"></span>
                </p>
                <el-input v-if="!isFile(item)"
                          type="textarea"
                          :rows="10"
                          v-model="form[item.id]"
                          class="tw-topic--input"></el-input>
                  <el-button v-if="isFile(item)" type="text" @click="handleDownload(item)">{{item.student.answer}}</el-button>
              </div>
              <CorrectItem v-if="item"
                           :topic="item" :stu_id="stu_id"/>
            </li>
          </ul>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import CorrectItem from "@/components/teacher/homework/CorrectItem";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("modal");
export default {
  name: "",

  components: {
    CorrectItem,
  },
  

  inject: ["hw_id","reload"],

  props: {
    stu_id: {
      type: String,
    },
  },

  data() {
    return {
      homework: [],
      choice: [],
      filling: [],
      shortQues: [],
      programme: [],
      form: {},
      topicArr: [],
      studentTopic:[]
    };
  },

  watch: {},

  computed: {
    ...mapState(["isShow"]),
  },

  async created() {
    await this.getHomeworkDetail();
 
  },

  methods: {
    isFile(item) {
      return item?.student.file ? true : false
    },
    handleDownload(item) {
      let path = item.student.file
      if(!path || path === '') {
        return 
      }
      window.location = path
    },
    async getHomeworkDetail() {
      try {
        let res = await this.$api({
          type: "homeworkDetail",
          data: { q: { hw_id: this.hw_id }, table: "homework" },
        });
        await this.getStudentHomework();
        this.choice = res.result[0];
        this.filling = res.result[1];
        this.shortQues = res.result[2];
        this.programme = res.result[3].map((item) => {
            this.studentTopic.forEach((element) => {
              let topicId = element?.hw_topic_id || element?.test_topic_id
              if (item.id === topicId) item.student = element;
            });
            return item;
          });
        this.topicArr = res.result.flat();
      } catch (err) {
        console.log(err);
      }
    },
    async getStudentHomework() {
      try {
        let res = await this.$api({
          type: "getStudentHomework",
          data: {
            q: { hw_id: this.hw_id, stu_id: this.stu_id },
          },
        });
        this.studentTopic = res.result

        if (this.studentTopic.length !== 0) {
          this.studentTopic.map((item) => {
            if (!item.file)
            this.$set(this.form, item.hw_topic_id, item.answer);
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    handleReplace(data) {
      let res = data.match(/&lt;blankspace&gt;/g);
      let count = !res ? 0 : res.length;
      for (let i = 1; i <= count; i++) {
        data = data.replace(/&lt;blankspace&gt;/, `____`);
      }
      return data;
    },
    handleClose() {
      this.close()
      this.reload()
    },
    ...mapActions(["close"]),
  },
};
</script>
<style lang='stylus' scoped>

.tw-topic--wrap
  display: flex
  justify-content: space-between

.tw-topic--item
  width: 70%
  p  
    font-size 16px

.tw-topic--type
  margin-bottom: 1em
  font-weight 500
  font-size 24px


.tw-topic--index
  padding: 3px 4px 0 0

.tw-homework--button
  text-align: center

.tw-topic--input
  margin-bottom: 20px
</style>