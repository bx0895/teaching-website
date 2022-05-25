<template>
  <div>
    <el-card>
      <div class="tw-table--wrap">
        <el-table :data="tableData"
                  height="400px"
                  border
                  :row-style="{height:'80px'}"
                  :cell-style="{padding:'0px'}"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#d6ecf0',color:'#000'}"
                  style="width: 100%">
          <el-table-column type="selection"
                           width="40">
          </el-table-column>
          <el-table-column type="index"
                           label="#"></el-table-column>
          <el-table-column label="题型"
                           prop="type"
                           width="65">
          </el-table-column>
          <el-table-column label="内容"
                           prop="content"
                           width="250">
            <template slot-scope="scope">
              <div v-html="content(scope.row)"></div>
            </template>
          </el-table-column>

          <el-table-column label="难度"
                           prop="difficulty"
                           width="50">
          </el-table-column>
          <el-table-column label="知识点"
                           prop="knowledge">
          </el-table-column>
          <el-table-column label="章节"
                           prop="chapter">
          </el-table-column>
          <el-table-column label="教师"
                           prop="name"
                           width="65">
          </el-table-column>
          <el-table-column label="标签"
                           prop="label"
                           width="100">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleRecover(scope.row)"
                         type="text"
                         size="small">恢复</el-button>
              <el-button @click="handleDelete(scope.row)"
                         type="text"
                         size="small">清除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="length"
                       :page-sizes="[10, 20, 40, 60]"
                       :current-page="currentPage"
                       :page-size="pagesize"
                       class="tw-pagination">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
const HOMEWORK_MAP = {
  选择题: "h_xuanzeti",
  填空题: "h_tiankongti",
  简答题: "h_jiandati",
  编程题: "h_bianchengti",
};
const TEST_MAP = {
  选择题: "t_xuanzeti",
  填空题: "t_tiankongti",
  简答题: "t_jiandati",
  编程题: "t_bianchengti",
};
export default {
  name: "",

  components: {},

  props: {},

  data() {
    return {
      tableDataAll:[],
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      multipleSelection: [],
      form: {
        type: "",
        tea_id: "",
      },
      examType: this.$route.name === "h_recycle" ? "homework" : "test",
    };
  },

  watch: {},

  async created() {
    await this.getTableData();
  },

  computed: {
    //获取分页总长度
    length() {
      return this.tableData.length;
    },
  },

  methods: {
        //根据页数和每页显示数据获取当前页数据
    setTableData() {      
      this.tableData = this.tableDataAll.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    content(row) {
      return row.content.match(/>([^<>]+)</)[1];
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //获取全部信息
    async getTableData() {
      try {
        let res = await this.$api({
          type: "tiku",
          data: { table: this.examType, q: { 'deleted': 1 } },
        });
        this.tableDataAll = res.result.flat();
        this.setTableData()
      } catch (err) {
        console.log(err);
      }
    },

    //删除
    handleDelete(row) {
      this.$confirm(
        "此操作将彻底清除该题目,是否继续?","提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          try {
            let table =
              this.examType === "homework"
                ? HOMEWORK_MAP[row.type]
                : TEST_MAP[row.type];
            console.log(table);
            await this.$api({
              type: `topicDelete`,
              data: { id: row.id, table: table },
            });
            this.$message({
              type: "success",
              message: "删除成功!",
              showClose: true,
            });
            await this.getTableData();
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            showClose: true,
          });
        });
    },
    async handleRecover(row) {
      try {
        let table =
          this.examType === "homework" ? HOMEWORK_MAP[row.type] : TEST_MAP[row.type];
        await this.$api({
          type: "topicUpdate",
          data: { id: row.id, table: table, updateData: { 'deleted': 0 } },
        });
        this.$message({
          type: "success",
          message: `已成功恢复`,
          showClose: true,
        });
        await this.getTableData();
      } catch (err) {
        console.log(err);
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style lang='stylus'>
</style>