<template>
  <div class="tw-question">
    <p class="tw-msg"><span class="tw-msg--title">问题列表：</span>点击回复按钮后对问题回复，回复完成后关闭输入框</p>
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
                <span class="tw-reply--delete"
                           type="text"
                           @click="handleDelete(list.id)">删除</span>
              </p>
            </li>
          </ul>
        </div>

        <div class="tw-question--edit">
          <el-button type="info"
                     icon="el-icon-chat-line-round"
                     size="mini"
                     @click="handleReply(item.id)">回复</el-button>
        </div>
      </el-card>
      <!-- 回复输入 -->
      <div class="tw-reply--input"
           v-if="isReply">
        <el-input type="textarea"
                  v-model="form.reply"
                  :rows="2"
                  placeholder="回复内容">
        </el-input>
        <el-button type="primary"
                   class="tw-reply--button"
                   @click="submitForm">发 布</el-button>
        <el-button type="primary"
                   class="tw-reply--button"
                   @click="handleClose">关 闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MIXIN from "@/core/mixin";

export default {
  name: "",
  mixins: [MIXIN],

  components: {},

  data() {
    return {
      questions: [],
      form: {
        ques_id: "",
        reply: "",
        reply_time: "",
      },
      isReply: false,
      reply: [],
    };
  },

  watch: {},
  async created() {
    await this.getQuestion();
  },

  computed: {},

  methods: {
    //获取问题
    async getQuestion() {
      try {
        let { id } = this.$route.query;
        let res = await this.$api({
          type: "questionInfo",
          data: { q: { forum_id: id } },
        });
        this.questions = res.result;
      } catch (err) {
        console.log(err);
      }
    },
    handleReply(id) {
      this.isReply = true;
      this.form.ques_id = id;
    },
    handleClose() {
      this.form.reply = ''
      this.isReply = false;
    },
    //对问题排序
    sortQuestion() {
      this.questions.reverse();
    },
    //发送回复
    async submitForm() {
      try {
        this.form.reply_time = this.formatTime(new Date());
        await this.$api({ type: "replyQuestion", data: { q: this.form } });
        await this.getQuestion()
        this.$message({
          message: "回复成功",
          type: "success",
        });
      } catch (err) {
        console.log(err);
      }
    },
    //删除回复
    async handleDelete(id) {
       this.$confirm("此操作将永久删除该回复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$api({type:'replyDelete',data: {id:id}});
            this.$message({
              type: "success",
              message: "删除成功!",
            })
            await this.getQuestion()
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },
};
</script>
<style lang='stylus'>
textarea.el-textarea__inner
  border: 1px solid #222

.tw-question
  margin-bottom: 40px

.tw-reply--input
  position fixed
  bottom: 10px
  display: flex
  width: 70%
  justify-content: center

.tw-reply--button
  margin-left: 20px

.tw-question--wrap
  padding 0 30px

.tw-question--item
  margin-bottom: 10px

.tw-user--name
  color: #4169E1

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

.tw-reply--delete
  margin-left: 10px
  color	#4169E1
  cursor pointer

</style>