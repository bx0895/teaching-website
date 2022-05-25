<template>
  <div>
    <el-card>
      <div class="tw-table--wrap">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  height="500px"
                  border
                  :row-style="{height:'80px'}"
                  :cell-style="{padding:'0px'}"
                  :header-cell-style="{background:'#d6ecf0',color:'#000'}"
                  style="width: 100%">
          <el-table-column prop="id"
                           label="作业编号"
                           width="80"></el-table-column>
          <el-table-column label="作业描述"
                           prop="describe"
                           width="200">
          </el-table-column>
          <el-table-column label="班级"
                           prop="cla_name">
          </el-table-column>

          <el-table-column label="开始时间"
                           prop="start_time">
          </el-table-column>
          <el-table-column label="结束时间"
                           prop="end_time">
          </el-table-column>

          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="primary"
                         size="mini"
                         @click="handleCorrect(scope.row)">评阅</el-button>
              <el-button type="primary"
                         size="mini"
                         @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger"
                         size="mini"
                         @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
              <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="length"
                     :page-sizes="[10, 20, 40]"
                     :current-page="currentPage"
                     :page-size="pagesize"
                     class="tw-pagination">
      </el-pagination>
      </div>
    </el-card>
    <HomeworkModal />
  </div>
</template>

<script>
import MIXIN from "@/core/mixin";
import store from 'store'
import HomeworkModal from "@/components/teacher/common/Modal";

export default {
  name: "",

  mixins: [MIXIN],

  components: {
    HomeworkModal
  },

  data() {
    return {
      tableData:[],
      pagesize: 10,
      currentPage: 1,
    };
  },

  watch: {},

  async created() {
    await this.getTableInfo()
  },

  computed: {
    //获取分页总长度
    length() {
      return this.tableData.length;
    },
  },

  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //评阅
    handleCorrect(row) {
      this.$router.push({path:'/correct/homework',query:{cla_id:row.cla_id,hw_id:row.id}})
    },
    handleEdit(row) {
      delete row.cla_name
      delete row.tea_id
      delete row.name
      this.$store.commit("modal/CHANGE_TEXT_FORM", row);
      this.$store.commit("modal/CHANGE_TYPE", "homework");
      this.$store.dispatch("modal/open");
    },
    handleDelete(row) {
       this.$confirm("此操作将永久删除该作业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$api({
              type: `homeworkDelete`,
              data: { id: row.id},
            });
            this.tableData.splice(
              this.tableData.indexOf(
                this.tableData.find(function (element) {
                  return element.id === row.id;
                })
              ),1);
            this.$message({
              type: "success",
              message: "删除成功!",
            });

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
    },
    async getTableInfo() {
      try {
        let res = await this.$api({type:'homeworkInfo',data:{q:{tea_id:store.get('uid')}}})
         res.result.map(item => {
        item.start_time = this.formatTime(item.start_time);
        item.end_time = this.formatTime(item.end_time);
      });
      this.tableData = res.result
      } catch(err) {
        console.log(err)
      }
    }
  },
};
</script>
<style lang='stylus'>
.tw-pagination
  margin-top 20px

.tw-table--wrap
  text-align: center
</style>