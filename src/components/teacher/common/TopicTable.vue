<template>
  <div>
    <el-card>
      <div class="tw-search--wrap">
        <el-form :inline="true"
                 :model="form"
                 class="tw-search--form"
                 size="mini">
          <el-form-item label="教师分类">
            <el-select v-model="form.tea_id"
                       clearable>
              <el-option v-for="(item,id) in teacher"
                         :key="id"
                         :label="item.name"
                         :value="item.tea_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型分类">
            <el-select v-model="form.type"
                       clearable>
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
                  tooltip-effect="dark"
                  ref="table"
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
          <el-table-column label="标签"
                           prop="label"
                           width="100">
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
export default {
  name: "",

  components: {},

  props: {
    examType: {
      type: String,
    },
  },

  data() {
    return {
      tableData: [],
      tableDataAll: [],
      pagesize: 10,
      currentPage: 1,
      multipleSelection: [],
      multipleSelectionAll: [],
      form: {},
      teacher: [],
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
    //调整每页展示数据量
    setTableData() {
      this.tableData = this.tableDataAll.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    content(row) {
      return row.content?.match(/>([^<>]+)</)[1];
    },
    //改变每页数据数量
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.pagesize = val;
      this.setTableData();
      setTimeout(() => {
        this.setSelectRow();
      }, 100);
    },
    //改变页数
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.currentPage = val;
      this.setTableData();
      setTimeout(() => {
        this.setSelectRow();
      }, 100);
    },

    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      let selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push({ id: row.id, type: row.type });
      });
      this.$refs.table.clearSelection();
      for (var i = 0; i < this.tableData.length; i++) {
        let idx = selectAllIds.findIndex(
          (item) =>
            item.id === this.tableData[i]["id"] &&
            item.type === this.tableData[i]["type"]
        );
        if (idx >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true);
        }
      }
    },

    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      let selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push({ id: row.id, type: row.type });
      });
      let selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach((row) => {
        selectIds.push({ id: row.id, type: row.type });
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        let idx = selectAllIds.findIndex(
          (item) => item.id === row.id && item.type === row.type
        );
        if (idx < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.forEach((row) => {
        let idx = selectIds.findIndex(
          (item) => item.id === row.id && item.type === row.type
        );
        //未选中
        if (idx < 0) {
          noSelectIds.push({ id: row.id, type: row.type });
        }
      });
      noSelectIds.forEach((row) => {
        let idx = selectAllIds.findIndex(
          (item) => item.id === row.id && item.type === row.type
        );
        //选中
        if (idx >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (
              that.multipleSelectionAll[i]["id"] === row.id &&
              that.multipleSelectionAll[i]["type"] == row.type
            ) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },

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
        let res = await this.$api({
          type: "tiku",
          data: {
            q: this.form,
            table: this.examType,
          },
        });
        this.tableDataAll = res.result.flat();
        this.changePageCoreRecordData();
        this.setTableData();
        setTimeout(() => {
        this.setSelectRow();
      }, 100);
      } catch (err) {
        console.log(err);
      }
    },

    //获取全部题目信息
    async getTableData() {
      try {
        let res = await this.$api({
          type: "tiku",
          data: { table: this.examType },
        });
        this.tableDataAll = res.result.flat();
        this.changePageCoreRecordData();
        this.setTableData();
        setTimeout(() => {
        this.setSelectRow();
      }, 100);
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