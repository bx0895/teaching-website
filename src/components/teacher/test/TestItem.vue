<template>
  <div>
    <el-card v-show="!isShow">
      <el-button type="text"
                 @click="goBack">返回上一页</el-button>
      <el-table :data="tableData"
                border
                :cell-style="{padding:'8px 0',textAlign:'center'}"
                :header-cell-style="{background:'#d6ecf0',color:'#000',textAlign:'center'}"
                style="width: 100%">
        <el-table-column type="index"
                         label="#"
                         width="50">
        </el-table-column>
        <el-table-column prop="stu_id"
                         label="学号"
                         width="120"></el-table-column>
        <el-table-column label="姓名"
                         prop="name"
                         width="120">
        </el-table-column>
        <el-table-column label="提交时间"
                         prop="submit_time">
        </el-table-column>

        <el-table-column label="评阅时间"
                         prop="correct_time">
        </el-table-column>
        <el-table-column label="分数"
                         prop="total_point"
                         width="100">
        </el-table-column>

        <el-table-column label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="handleCorrect(scope.row)">评阅</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <TestDetail v-if="isShow" :stu_id="stu_id"/>
  </div>
</template>

<script>
import MIXIN from '@/core/mixin'
import TestDetail from '@/components/teacher/test/TestDetail'
import { createNamespacedHelpers } from "vuex";
const { mapState,mapActions } = createNamespacedHelpers("modal");

export default {
  name: "",

  mixins:[MIXIN],

  provide() {
    return {
    test_id:this.test_id,
    }
  },

  components: {
    TestDetail
  },

  data() {
    return {
      tableData: [],
      test_id:this.$route.query.test_id,
      stu_id:null
    };
  },

  async created() {
    await this.getStudentTestList();
  },

  watch: {},

  computed: {
    ...mapState(['isShow'])
  },

  methods: {
    handleCorrect(row) {
      if (row.submit_time === null) {
        this.$message({
          showClose: true,
          message: '该学生还未提交试卷',
          type: 'warning'
        });
        return
      }
      this.stu_id = row.stu_id
      this.open()
    },
    goBack() {
      this.$router.go(-1);
    },
    async getStudentTestList() {
      try {
        let res = await this.$api({
          type: "studentTestList",
          data: { q: this.$route.query },
        });
        this.tableData = res.result.map(item => {
          if (item.submit_time) {
          item.submit_time = this.formatTime(item.submit_time)
          }
          if (item.correct_time) {
          item.correct_time = this.formatTime(item.correct_time)            
          }
          return item
        });
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions(["close", "open"])
  },
};
</script>
<style lang='stylus'>
</style>