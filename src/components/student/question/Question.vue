<template>
  <div>
    <el-card class="tw-quzi--wrap">
      <!-- 发布问题 -->
      <div class="tw-quzi--input">
        <el-input type="textarea"
                  v-model="form.question"
                  :rows="2"
                  style="width:70%"
                  placeholder="输入问题">
        </el-input>
        <el-button type="primary"
                   class="tw-quzi--button"
                   @click="submitForm">发 布</el-button>
      </div>
      <div class="tw-quzi--radio">
        <el-radio v-model="form.visible"
                  label="1">仅老师可见</el-radio>
        <el-radio v-model="form.visible"
                  label="2">全部人可见</el-radio>
      </div>
      <el-divider></el-divider>
      <!-- 问题列表 -->
      <div class="tw-question--wrap">
        <div class="tw-question--desc">
          <span>问题列表</span>
          <div>
            <el-button type="text"
                       @click="sortQuestion">正序</el-button>
            <el-button type="text"
                       @click="sortQuestion">倒序</el-button>
          </div>
        </div>
        <div class="tw-no_question"
             v-if="questions.length === 0">
          <img src="../../../assets/img/no_question.png"
               alt="!">
          <p>还没有问题哦，快去提问吧！</p>
        </div>
        <el-card v-for="(item,id) in questions"
                 :key="id"
                 class="tw-question--item">
          <p class="tw-user--name"><i class="el-icon-s-custom"></i> {{item.name}} <span class="tw-question--time">{{formatTime(item.time)}}</span></p>
          <p>{{item.question}}</p>
         <!-- 回复内容  -->
        <div class="tw-reply">
          <p class="tw-reply--title">回复内容：</p>
          <ul class="tw-reply--wrap">
            <li v-for="list in item.reply"
                :key="list.id"
                class="tw-reply--item">
              <p>{{list.reply}}</p>
              <p class="tw-reply--msg"><span>{{ formatTime(list.reply_time) }}</span>
              </p>
            </li>
          </ul>
        </div>
        </el-card>
        </div>
    </el-card>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import MIXIN from "@/core/mixin";
import store from 'store'
export default {
  name: "",
  mixins: [MIXIN],

  components: {},

  data() {
    return {
      form: {
        stu_id: "",
        name: "",
        question: "",
        visible: "1",
        time: "",
        forum_id: "",
      },
      questions: [],
      userInfo:'',
      
    };
  },

  watch: {},

  computed: {

  },

  async created() { 
    this.userInfo = this.$store.getters.userInfo
    let { id } = this.$route.query;
    this.form.forum_id = id;
    await this.getQuestion();
  },

  methods: {
    async submitForm() {
      this.form.stu_id = this.userInfo.stu_id;
      this.form.name = this.userInfo.name;
      this.form.time = this.formatTime(new Date());
      try {
        await this.$api({ type: "addQuestion", data: { q: this.form } });
        this.$message({
          type: "success",
          message: "发布成功!",
        });
        this.questions.push(this.form);
      } catch (err) {
        console.log(err);
      }
    },
    async getQuestion() {
      try {
        let res = await this.$api({
          type: "questionInfo",
          data: { 
            q: { forum_id: this.form.forum_id} 
            },
        });
        let uid = store.get('uid')
        this.questions = res.result.filter(item => {
          return item.visible === '2' || item.stu_id === uid
        });
      } catch (err) {
        console.log(err);
      }
    },
    //对问题排序
    sortQuestion() {
      this.questions.reverse();
    },
  },
};
</script>
<style lang='stylus'>
textarea.el-textarea__inner
  border: 1px solid #222

.tw-quzi--wrap
  margin: 0 auto

.tw-quzi--form
  width: 70%

.tw-quzi--input
  display: flex
  justify-content: center

.tw-quzi--button
  margin-left: 20px

.tw-quzi--radio
  padding 20px 0
  text-align: center

.tw-question--wrap
  padding 0 30px
  

.tw-question--item
  margin-top: 10px
  p 
    line-height 24px

.tw-user--name
  color: blue

.tw-question--desc
  display: flex
  justify-content: space-between

.tw-question--time
  padding-left: 10px 
  line-height: 24px
  color: #333
  font-size 14px

.tw-question--edit
  text-align: right 
  margin-top: 8px 

.tw-no_question
  margin: 0 auto
  width: 250px
  text-align: center

.tw-reply
  margin-top: 10px
  padding 10px 10px
  border-top: 1px solid #ccc

.tw-reply--item
  padding 10px 0

.tw-reply--msg
  font-size 14px
  color: #333

.tw-reply--title
  color: #4169E1
</style>