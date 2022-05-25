<template>
  <div class="tw-select--wrap">
    <p class="tw-msg" v-if="type === 'homework'"><span class="tw-msg--title">布置作业/手动选题：</span>填写作业信息后选择题目</p>
        <p class="tw-msg" v-if="type === 'test'"><span class="tw-msg--title">发布考试/手动选题：</span>填写考试信息后选择题目</p>
    <div class="tw-steps">
      <el-steps align-center
                :active="active"
                finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="选择题目"></el-step>
        <el-step title="确认题目"></el-step>
      </el-steps>
    </div>
    <div v-show="active === 0"
         class="tw-form--wrap">
         <keep-alive>
            <TopicForm :formType="type" ref="topicForm"/>
         </keep-alive>
      <div class="tw-steps--button">
        <el-button type="primary"
                   @click="handleNext">下一步</el-button>
      </div>
    </div>
    <div v-show="active === 1"
         class="tw-form--wrap">
         <TopicTable :examType="type" ref="table"/> 
          
      <div class="tw-steps--button">
        <el-button type="primary"
                   @click="handleLast">上一步</el-button>
        <el-button type="primary"
                   @click="handleNext">下一步</el-button>
      </div>
    </div>
    <div v-if="active === 2"
         class="tw-form--wrap">
         <keep-alive>
          <SortTopic :topics="topics"/>
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
import TopicTable from "@/components/teacher/common/TopicTable";
import SortTopic from "@/components/teacher/common/SortTopic"
import MIXIN from "@/core/mixin"
export default {
  name: "",

  mixins:[MIXIN],

  components: {
    TopicTable,
    TopicForm,
    SortTopic
  },

  data() {
    return {
      active: 0,
      topics:[],
      topicData: [],
      classId:'',
      form:'',
      id:'',
      idName:this.$route.query.idName,
      type:this.$route.query.type
    };
  },

  watch: {},

  computed: {},

  methods: {
    //下一步
    handleNext() {
      this.active++; 
      if(this.active === 2) {
        this.$refs.table.changePageCoreRecordData()
        this.topics = this.$refs.table.multipleSelectionAll
      }
    },
    //上一步
    handleLast() {
      this.active--;
    },
    async handleSubmit() {
      try {
        this.formatForm()
        if(this.form.class_Id === "" || this.form.describe === ""){
          this.$message({
            message: '有必填项未填',
            type: 'error'
          });     
          return   
        }
        for(let i = 0; i < this.classId.length; i++) {
          this.form.cla_id = this.classId[i]
          let res = await this.$api({type:`${this.type}Add`,data:{q:this.form}})
          this.id = res.result[0].id
          this.formatTopic()
          if(this.topicData.length === 0){
            this.$message({
            message: '请选择题目',
            type: 'error'
          });     
          return   
          }
          await this.$api({type:`${this.type}Topic`,data:{q:this.topicData }})
        }
        
        this.$message({
          message: '发布成功',
          type: 'success'
        });
      } catch (err) {
        console.log(err)
      }
    },
    //补充表单的开始时间和结束时间
    formatForm() {
        this.classId = this.$refs.topicForm.cla_id
        this.form = this.$refs.topicForm.form
        this.form.start_time = this.formatTime(this.form.start_time)
        this.form.end_time = this.formatTime(this.form.end_time)
    },
    //格式化题目信息
    formatTopic() {
      this.topicData = this.topics.reduce((acc,item) => {
        let child = {}
        child[this.idName] = this.id
        child['topic_id'] = item.id
        child['topic_type'] = item.type
        child['score'] = item.score
        acc.push(child)
        return acc
      },[])
    }

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