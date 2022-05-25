<template>
  <div>
    <el-card>
      <p>试卷描述：{{test.describe}}</p>
      <p>试卷要求：{{test.require}}</p>
      <p>考试时长：{{test.duration}} </p>
      <p class="tw-test--time">{{msg}}</p>
      <el-divider></el-divider>
      <div class="typo">
        <div v-if="choice.length !== 0">
          <h3>选择题</h3>
          <ul>
            <li v-for="(item,id) in choice"
                :key="item.id">
              <div class="tw-topic--item">
                <p class="tw-topic--index">
                  <span class="tw-content--index"> {{id+1}}. [{{item.score}}分] </span>
                  <span v-html="handleReplace(item.content)"></span>
                </p>

                <el-input v-model="form[item.id]"
                          placeholder="输入答案"
                          class="tw-topic--input"></el-input>
              </div>

            </li>
          </ul>
        </div>

        <div v-if="filling.length !== 0">
          <h3>填空题</h3>
          <ul>
            <li v-for="(item,id) in filling"
                :key="item.id">
              <div class="tw-topic--item">
                <p class="tw-topic--index">
                  <span class="tw-content--index"> {{id+1}}. [{{item.score}}分] </span>
                  <span v-html="handleReplace(item.content)"></span>
                </p>
                <el-input v-model="form[item.id]"
                          placeholder="输入答案,多个答案用分号隔开"
                          class="tw-topic--input"></el-input>
              </div>

            </li>
          </ul>
        </div>
        <div v-if="shortQues.length !== 0">
          <h3>简答题</h3>
          <ul>
            <li v-for="(item,id) in shortQues"
                :key="item.id">
              <div class="tw-topic--item">
                <p class="tw-topic--content">
                  <span class="tw-content--index"> {{id+1}}. [{{item.score}}分] </span>
                  <span v-html="item.content"></span>
                </p>
                <el-input type="textarea"
                          id="editor"
                          v-model="form[item.id]"
                          placeholder="输入答案"
                          class="tw-topic--input"></el-input>
              </div>

            </li>
          </ul>
        </div>
        <div v-if="programme.length !== 0">
          <h3>编程题</h3>
          <ul>
            <li v-for="(item,id) in programme"
                :key="item.id">
              <div class="tw-topic--item">
                <p class="tw-topic--content">
                  <span class="tw-content--index"> {{id+1}}. [{{item.score}}分] </span>
                  <span v-html="item.content"></span>
                </p>
                <el-input type="textarea"
                          :rows="10"
                          v-model="form[item.id]"
                          placeholder="输入代码"
                          class="tw-topic--input"></el-input>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="tw-test--button">
        <el-button v-show="allow" type="primary"
                   style="width:300px"
                   @click="submit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import MIXIN from "@/core/mixin";
import store from "store";

let timer;
export default {
  name: "",
  mixins: [MIXIN],
  components: {},

  data() {
    return {
      test: [],
      choice: [],
      filling: [],
      shortQues: [],
      programme: [],
      form: {},
      topicArr: [],
      msg: "",
      maxtime: 600,
      uid: store.get('uid'),
      allow:true
    };
  },

  watch: {},

  computed: {},

 async created() {
    await this.getTest();
    await this.getTestTopic();
    this.allow = this.computeTime()
    await this.getStudentTest()
    if (this.allow) {
    this.maxtime = this.test.duration * 60
    timer = setInterval(() => {
     let minutes, seconds;
      if (this.maxtime >= 0) {
        minutes = Math.floor(this.maxtime / 60);
        seconds = Math.floor(this.maxtime % 60);
        this.msg =  minutes + "分" + seconds + "秒";
        if (this.maxtime == 5 * 60){
          alert("注意，还有5分钟!")
          }
        --this.maxtime;
      } else {
        clearInterval(timer);
        alert("考试时间到，已自动交卷");
        this.submit()
      }
    }, 1000);
    } 
    if (!this.allow) {
      this.msg = '考试已结束！'
    }
   
  },


  methods: {
    async submit() {

      this.formatTopicAnswer()
      try {
        await this.$api({
          type: "addStudentTest",
          data: {
            q: this.topicArr,
            condition: { test_id: this.test.id, stu_id: this.uid },
          },
        });
        setTimeout(()=> {
          this.$router.push({ path: "/success" });
        },1000)
        
      } catch (err) {
        console.log(err);
      }
    },

    //处理答案
    formatTopicAnswer() {
      let time = this.formatTime(new Date());
      this.topicArr = this.topicArr.map((item) => {
        item = {
          test_id: this.test.id,
          test_topic_id: item.id,
          stu_id: this.uid,
          submit_time: time,
          answer: "",
        };
        return item;
      });
      
      for (let key in this.form) {
        this.topicArr = this.topicArr.map((item) => {
          if (item.test_topic_id == key) {
            item.answer = this.form[key];
            return item;
          }
          return item;
        });
      }
    },

    //倒计时
    CountDown() {
      let minutes, seconds;
      if (this.maxtime >= 0) {
        minutes = Math.floor(this.maxtime / 60);
        seconds = Math.floor(this.maxtime % 60);
        this.msg = "距离考试结束还有：" + minutes + "分" + seconds + "秒";
        if (this.maxtime == 5 * 60){
          alert("注意，还有5分钟!")
          }
        --this.maxtime;
      } else {
        clearInterval(timer);
        alert("考试时间到，已自动交卷");
        this.submit()
      }
    },
    handleReplace(data) {
      if (data) {
        let res = data.match(/&lt;blankspace&gt;/g);
        let count = !res ? 0 : res.length;
        for (let i = 1; i <= count; i++) {
          data = data.replace(/&lt;blankspace&gt;/, "____");
        }
      }
      return data;
    },
    //获取考试信息
    async getTest() {
      try {
        let id = this.$route.query.id;
        let res = await this.$api({
          type: "testInfo",
          data: { q: { id: id } },
        });
        this.test = res.result[0];
      } catch (err) {
        console.log(err);
      }
    },
    //获取考试题目
    async getTestTopic() {
      try {
        let res = await this.$api({
          type: "testDetail",
          data: { q: { test_id: this.test.id }, table: "test" },
        });
        this.choice = res.result[0];
        this.filling = res.result[1];
        this.shortQues = res.result[2];
        this.programme = res.result[3];
        this.topicArr = res.result.flat();
      } catch (err) {
        console.log(err);
      }
    },
    //获取测试题目答案
    async getStudentTest() {
      try {
        let res = await this.$api({
          type: "getStudentTest",
          data: { q: { test_id: this.test.id, stu_id: this.uid } },
        });

        if (res.result.length !== 0) {
          this.allow = false
          res.result.map((item) => {
            this.$set(this.form,item.test_topic_id,item.answer)
          });
        }

      } catch (err) {
        console.log(err);
      }
    },

    //判断考试是否已结束
    computeTime() {
      let time = this.formatTime(new Date())
      let start_time = this.formatTime(this.test.start_time)
      let end_time = this.formatTime(this.test.end_time)
      return  (start_time < time && end_time > time)
    },
  },
};
</script>
<style lang='stylus' scoped>
// .tw-topic--item
//   display: flex

.tw-topic--answer
  height: 24px
  width: 120px
  text-align: center
  border: 0
  border-bottom: 1px solid #222
  
.tw-topic--answer input.el-input__inner {
    color: #369 !important
}

.tw-test--button
  text-align: center

.tw-topic--input
 margin-bottom: 20px

.tw-test--time
  color: red
</style>