<template>
  <div>
    <el-card>
      <div class="tw-search--wrap">
        <el-form :inline="true"
                 :model="form"
                 class="tw-search--form"
                 size="mini">
          <el-form-item label="教师分类">
            <el-select v-model="form.tea_id" clearable>
              <el-option v-for="(item,id) in teacher"
                         :key="id"
                         :label="item.name"
                         :value="item.tea_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型分类">
            <el-select v-model="form.type" clearable>
              <el-option value="选择题"
                         label="选择题"></el-option>
              <el-option value="填空题"
                         label="填空题"></el-option>
              <el-option value="简答题"
                         label="简答题"></el-option>
              <el-option value="编程题"
                         label="编程题"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">条件查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="getTableData">查询全部</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tw-table--wrap">
        <el-table :data="tableData"
                  border
                  :row-style="{height:'80px'}"
                  :cell-style="{padding:'0px'}"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#d6ecf0',color:'#000',fontWeight:'700'}"
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
              <el-button @click="handleEdit(scope.row)"
                         type="text"
                         size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)"
                         type="text"
                         size="small">删除</el-button>
                <el-button slot="reference"
                           type="text"
                           size="small"
                           @click="handleCopy(scope.row)">{{copyMsg}}</el-button>
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
    <EditModal />
  </div>
</template>

<script>
import EditModal from "@/components/teacher/exam/EditModal";
const HOMEWORK_MAP = {
  '选择题': "h_xuanzeti",
  '填空题': "h_tiankongti",
  '简答题': "h_jiandati",
  '编程题': "h_bianchengti",
};
const TEST_MAP = {
  '选择题': 't_xuanzeti',
  '填空题': 't_tiankongti',
  '简答题': 't_jiandati',
  '编程题': 't_bianchengti',
}
export default {
  name: "",

  components: {
    EditModal,
  },

  props: {
    examType: {
      type: String,
    },
  },

  data() {
    return {
      tableDataAll:[],
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      multipleSelection: [],
      form: {
        deleted: 0
      },
      teacher: [],
      copyMsg:
        this.examType === "homework" ? "复制到考试题库" : "复制到作业题库",
    };
  },

  watch: {},

  async created() {
    await this.getTeacher();
    await this.getTableData();
  },

  computed: {
    //获取分页总长度
    length() {
      return this.tableDataAll.length;
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
    //显示题目的第一行内容
    content(row) {
      if (row) {
        return row.content.match(/>([^<>]+)</)[1];
      }
      return row
    },
    //设置每页显示数据数量
    handleSizeChange(val) {
      this.pagesize = val;
      this.setTableData()
    },
    //设置页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.setTableData()
    },
   //获取教师信息
    async getTeacher() {
      try {
        let res = await this.$api({ type: "teacherInfo" });
        this.teacher = res.result;
      } catch (err) {
        console.log(err);
      }
    },

    //提交搜索表单内容
    async onSubmit() {
      try {
        if (this.form.type === '') {
          delete this.form.type
        }
        if (this.form.tea_id === '') {
          delete this.form.tea_id
        }        
        let res = await this.$api({
          type: "tiku",
          data: {
            q: this.form,
            table: this.examType,
          },
        });
        this.tableDataAll = res.result.flat()
        this.setTableData()
      } catch (err) {
        console.log(err);
      }
    },

    //获取全部题目信息
    async getTableData() {
      try {
        this.form = {deleted:0}
        let res = await this.$api({
          type: "tiku",
          data: { table: this.examType },
        });
        this.tableDataAll = res.result.flat()
        this.setTableData()
      } catch (err) {
        console.log(err);
      }
    },
    //编辑
    handleEdit(row) {
      if((row.type === '选择题' || row.type === '填空题') && typeof row.answer === 'string')
      row.answer = JSON.parse(row.answer)
      // this.$store.commit("editModal/CHANGE_TYPE", this.examType);
      this.$store.commit("editModal/CHANGE_TEXT_FORM", row);
      this.$store.dispatch("editModal/open");
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let table = this.examType === 'homework' ? HOMEWORK_MAP[row.type] : TEST_MAP[row.type]
            console.log(table)
            await this.$api({
              type: `topicUpdate`,
              data: { id: row.id, table: table, updateData: {'deleted':1}},
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
    //复制题目到考试或者作业题库
    async handleCopy(row) {
      try {
      let table = this.examType === "homework" ? TEST_MAP[row.type] : HOMEWORK_MAP[row.type]
      this.formatTopic(row)
      await this.$api({type: table, data: {q: row}})   
      this.$message({
              type: "success",
              message: `成功${this.copyMsg}`,
              showClose: true,
            });
      } catch(err) {
        console.log(err)
      }
    },
   // 获取选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    
    formatTopic(row) {
      delete row.name   
      delete row.id
    }
  },
};
</script>
<style lang='stylus'>
</style>