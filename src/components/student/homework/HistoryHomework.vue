<template>
  <div>
    <el-button type="text"
               @click="goBack">返回上一页</el-button>
               <p>获得分数：{{totalPoint}}</p>
    <el-table :data="tableData"
              :cell-style="{padding:'10px 0'}"
              :header-cell-style="{background:'#fff',color:'#000',fontWeight:'700'}"
              style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   class="tw-table-expand" label-width="80px">
            <el-form-item label="题目标题"
                          v-if="props.row.title !==''">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="题目内容">
              <span v-html="handleReplace(props.row.content)"></span>
            </el-form-item>
            <el-form-item label="我的答案">
              <span>{{ answer(props.row) }}</span>
              <el-button v-if="props.row.file" type="text" @click="handleDownload(props.row.file)"></el-button>
            </el-form-item>
            <el-form-item label="所得分数">
              <span>{{ score(props.row) }}</span>
            </el-form-item>
            <el-form-item label="题目评价">
              <span>{{ opinion(props.row) }}</span>
            </el-form-item>
            <el-form-item label="提交时间">
              <span>{{ submit_time(props.row) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"
                       label="#"
                       width="40"></el-table-column>
      <el-table-column label="题目"
                       prop="content"
                       >
        <template slot-scope="scope">
          <div v-html="content(scope.row)"></div>
        </template>
      </el-table-column>
      <el-table-column label="分值"
                       prop="score"
                       width="80">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from "store";
import MIXIN from "@/core/mixin"
export default {
  name: "",
  mixins:[MIXIN],

  components: {},

  data() {
    return {
      tableData: [],
      id: this.$route.query.id,
      type: this.$route.query.type,
      uid: store.get("uid"),
      totalPoint:0
    };
  },

  watch: {},

  computed: {},

  async created() {
    await this.getHomeworkDetail();
    await this.getTotalScore()
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    answer(row) {
      return row.student?.answer || "";
    },
    score(row) {
      return row.student?.score || "0";
    },
    opinion(row) {
      return row.student?.opinion || "";
    },
    submit_time(row) {
      let time = row.student?.submit_time
      if(time) {
        return this.formatTime(time)
      } else {
        return  "未提交作业";
      }
    },
    handleDownload(path) {
      if(!path || path === '') {
        return 
      }
      window.location.href = path
    },
    //获取作业或考试总成绩
    async getTotalScore() {
      try {
        let httpData
        if (this.type === 'homework') {
          httpData = {
          type: "homeworkScore",
          data: { q: { hw_id: this.id, stu_id: this.uid } },
        }}
          if (this.type === 'test') {
          httpData = {
          type: "testScore",
          data: { q: { test_id: this.id, stu_id: this.uid } },
        }}
        let res = await this.$api(httpData)
        this.totalPoint = res.result[0].total_point || 0
      } catch(err) {
        console.log(err)
      }
    },
    //获取作业或考试的题目信息
    async getHomeworkDetail() {
      try {
        let httpData
        if (this.type === 'homework') {
          httpData = {
          type: "homeworkDetail",
          data: { q: { hw_id: this.id }, table: "homework" },
        }}
          if (this.type === 'test') {
          httpData = {
          type: "testDetail",
          data: { q: { test_id: this.id }, table: "test" },
        }}

        let res = await this.$api(httpData);
        let studentTopic = await this.getStudentHomework();
        if (studentTopic.length === 0) {
          this.tableData = res.result.flat();
        } else {
          //将每道题的答题情况存进对应题目的student属性中
          this.tableData = res.result.flat().map((item) => {
            studentTopic.forEach((element) => {
              let topicId = element?.hw_topic_id || element?.test_topic_id
              if (item.id === topicId) item.student = element;
            });
            return item;
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    //获取学生的作业或考试答题情况
    async getStudentHomework() {
      try {
        let httpData
        if (this.type === 'homework') {
          httpData = {
          type: "getStudentHomework",
          data: { q: { hw_id: this.id, stu_id: this.uid } },
        }}
          if (this.type === 'test') {
          httpData = {
          type: "getStudentTest",
          data: { q: { test_id: this.id, stu_id: this.uid } },
        }}
        let res = await this.$api(httpData);
        return res.result;
      } catch (err) {
        console.log(err);
      }
    },
    //将需要填入答案处转换成横线
    handleReplace(data) {
      let res = data.match(/&lt;blankspace&gt;/g);
      let count = !res ? 0 : res.length;
      for (let i = 1; i <= count; i++) {
        data = data.replace(/&lt;blankspace&gt;/, `____`);
      }
      return data;
    },
    //显示题目的第一行内容
    content(row) {
      if (row) {
        let content = row.content.match(/>([^<>]+)</)[1];
        content = this.handleReplace(content);
        return content;
      }
      return row;
    },
  },
};
</script>
<style lang='stylus' >
.tw-table-expand 
  font-size: 0

.tw-table-expand .el-form-item__label 
  font-weight 700
  
.tw-table-expand .el-form-item 
  padding: 0px 20px
  margin-bottom: 0
  
</style>