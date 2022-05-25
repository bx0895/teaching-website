<template>
  <div>
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
          <div class="tw-question--edit">
            <el-button type="danger"
                     icon="el-icon-delete-solid"
                     size="mini"
                     @click="handleDelete(item.id)">删除</el-button>
          </div>
        </el-card>
  </div>
</template>

<script>
import store from 'store'
import MIXIN from "@/core/mixin";

export default {
  name: '',

  components: {},
  mixins: [MIXIN],
  data () {
    return {
      questions:[]
    };
  },

  watch: {},

 computed: {},
   async created() { 
    await this.getQuestion();
  },

  methods: {
    async getQuestion() {
      try {
        let res = await this.$api({
          type: "questionInfo",
          data: { 
            q: { stu_id: store.get('uid')} 
            },
        });
        this.questions = res.result;
      } catch (err) {
        console.log(err);
      }
    },
      //删除问题
    async handleDelete(id) {
      this.$confirm("此操作将永久删除该问题以及相关回复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$api({ type: "questionDelete", data: { id: id } });
            this.$message({
              type: "success",
              message: "删除成功!",
            })
            this.questions.splice(
              this.questions.indexOf(
                this.questions.find(function (element) {
                  return element.id === id;
                })
              ),
              1
            );
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
  }
}

</script>
<style lang='stylus'>
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