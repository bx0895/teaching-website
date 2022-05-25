<template>
  <div>
    <el-card>
      <p><span>作业描述：{{homework.describe}}</span></p>
      <p><span>作业要求：{{homework.require}}</span></p>
      <p><span>截止时间：{{formatTime(homework.end_time)}}</span></p>
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
                          v-show="item.submit === 'text'"
                          class="tw-topic--input"></el-input>
                <el-upload class="tw-upload"
                           v-if="item.submit === 'file'"
                           ref="upload"
                           :action="path"
                           :data="uploadData(item)"
                           :before-remove="beforeRemove"
                           :on-preview="handlePreview"
                           :limit="1"
                           :show-file-list="true"
                           :file-list="fileList"
                           :auto-upload="false">
                  <el-button slot="trigger"
                             size="small"
                             type="primary">选取文件</el-button>
                  <div slot="tip"
                       class="el-upload__tip">文件大小不超过15MB，点击文件可下载</div>
                </el-upload>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="tw-homework--button">
        <el-button v-show="allow"
                   type="primary"
                   style="width:300px"
                   @click="submit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import MIXIN from "@/core/mixin";
import store from "store";

export default {
  name: "",
  mixins: [MIXIN],
  components: {},

  data() {
    return {
      homework: [],
      choice: [],
      filling: [],
      shortQues: [],
      programme: [],
      form: {},
      topicArr: [],
      allow: true,
      uid: store.get("uid"),
      path: `http://127.0.0.1:3000/upload/homework`,
      fileList: [],
      data: {},
    };
  },

  watch: {},

  computed: {},

  async created() {
    await this.getHomework();
    await this.getHomeworkDetail();
    await this.getStudentHomework();
    this.allow = this.computeTime();
  },

  methods: {
    uploadData(item) {
      return {
        hw_id: this.homework.id,
        stu_id: this.uid,
        hw_topic_id: item.id,
      };
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
     handlePreview(file) {
      this.$confirm("是否下载该文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            let a = document.createElement('a');
            let event = new MouseEvent('click');
            //下载文件
            a.download = file.name;
            a.href = file.url;
            a.dispatchEvent(event);          
            this.$message({
              type: "success",
              message: "下载成功!",
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下载",
          });
        });
    },
    //提交作业
    async submit() {
      this.formatTopicAnswer();
      try {
        await this.$api({
          type: "addStudentHomework",
          data: {
            q: this.topicArr,
            condition: { hw_id: this.homework.id, stu_id: this.uid },
          },
        });
        let length = this.$refs.upload?.length
        if (length) {
          for (let i=0; i<length; i++) {
            this.$refs.upload[i].submit();
          }          
        }
          this.$message({
          showClose: true,
          message: '作业提交成功',
          type: 'success'
        });
        setTimeout(() => {
         this.$router.push({path:'/current/homework'}) 
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    },
    //处理答案
    formatTopicAnswer() {
      let time = this.formatTime(new Date());
      this.topicArr = this.topicArr.map((item) => {
        item = {
          hw_id: this.homework.id,
          hw_topic_id: item.id,
          stu_id: this.uid,
          submit_time: time,
          answer: "",
        };
        return item;
      });

      for (let key in this.form) {
        this.topicArr = this.topicArr.map((item) => {
          if (item.hw_topic_id == key) {
            item.answer = this.form[key];
            return item;
          }
          return item;
        });
      }
    },
    //获取作业
    async getHomework() {
      try {
        let id = this.$route.query.id;
        let res = await this.$api({
          type: "homeworkInfo",
          data: { q: { id: id } },
        });
        this.homework = res.result[0];
      } catch (err) {
        console.log(err);
      }
    },
    //获取作业题目
    async getHomeworkDetail() {
      try {
        let res = await this.$api({
          type: "homeworkDetail",
          data: { q: { hw_id: this.homework.id }, table: "homework" },
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
    //获取学生作业情况
    async getStudentHomework() {
      try {
        let res = await this.$api({
          type: "getStudentHomework",
          data: { q: { hw_id: this.homework.id, stu_id: this.uid } },
        });

        if (res.result.length !== 0) {
          res.result.map((item) => {
            if(!item.file)
            this.$set(this.form, item.hw_topic_id, item.answer);
            if(item.file) {
              let data = {}
              data.name = item.answer
              data.url = item.file
              this.fileList.push(data)
            }

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

    getTopicClassify(father, item) {
      let child = {};
      child.hom_top_id = item.id;
      child.answer = "";
      item.children = child;
      father.push(item);
    },
    //判断作业是否已结束
    computeTime() {
      let time = this.formatTime(new Date());
      let start_time = this.formatTime(this.homework.start_time);
      let end_time = this.formatTime(this.homework.end_time);
      return start_time < time && end_time > time;
    },
  },
};
</script>
<style lang='stylus' scoped>

.tw-topic--index
  padding: 3px 4px 0 0
.tw-homework--button
  text-align: center

.tw-topic--input
  margin-bottom: 20px
</style>