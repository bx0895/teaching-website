<template>
  <el-card>
    <!-- 根据表单输入相应的值搜索 -->
    <div class="tw-search--wrap" v-if="!showForm">
      <el-form :inline="true"
               :model="form"
               class="tw-search--form"
               size="mini"
               >
        <el-form-item v-for="(item,idx) in searchForm[searchType]"
                      :key="idx"
                      :label="item.label">
          <el-input v-model="form[item.query]"
                    :placeholder="item.label"
                    type="text"></el-input>
        </el-form-item>
        <el-form-item label="选择班级" v-if="searchType === 'student'">
          <SelectClass ref="classId"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">条件查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSearch">查询全部</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格展示信息 -->
    <div class="tw-table--wrap">
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                height="400px"
                border
                fit
                :header-cell-style="{background:'#d6ecf0',color:'#000'}"
                style="width: 100%">
        <el-table-column type="index"
                         label="#"></el-table-column>
        <el-table-column v-for="item in searchForm[searchType]"
                         :key="item.query"
                         :prop="item.query"
                         :label="item.label">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)"
                       type="primary"
                       size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)"
                       type="danger"
                       size="mini">删除</el-button>
          </template> -->
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
    <BaseModal :type="searchType" :classInfo="classInfo"/>
  </el-card>
</template>

<script>
import SEARCH_FORM from "@/config/search.config";
import BaseModal from "@/components/base/BaseModal";
import SelectClass from '@/components/base/SelectClass'
export default {
  name: "",

  props: {
    searchType: {
      type: String,
      default:'student'
    },
    classInfo:{
      type:Array
    }
  },
  components: {
    BaseModal,
    SelectClass
  },

  data() {
    return {
      form: {},
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      multipleSelection: [],
    };
  },
  async created() {
    try {
      await this.getTableData();
    } catch (err) {
      console.log(err);
    }
  },

  watch: {},

  computed: {
    //获取搜索表单模板内容
    searchForm() {
      return SEARCH_FORM;
    },
    //获取分页总长度
    length() {
      return this.tableData.length;
    },
    showForm() {
      return this.$route.query.id
    }
  },

  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //提交搜索表单内容
    async onSubmit() {
      try {
        let cla_id = this.$refs.classId?.cla_id || ''
        if(cla_id !== '') {
          this.form['cla_id'] = cla_id
        }
        let res = await this.$api({ type: `${this.searchType}Info`, data:{q:this.form} });
        this.tableData = res.result;
        this.form = {}
      } catch (err) {
        console.log(err);
      }
    },

    async onSearch(){
      try {
        this.form = {}
        if(this.$refs.classId)
        this.$refs.classId.cla_id = ''
        await this.getTableData()
      } catch(err) {
        console.log(err)
      }
    },

    //获取全部信息
    async getTableData() {
      try {
        let {id} = this.$route.query
        let res = await this.$api({ type: `${this.searchType}Info`,data:{q:id}});
        this.tableData = res.result;
      } catch (err) {
        console.log(err);
      }
    },
    //编辑
    handleEdit(row) {
      this.$store.commit("modal/CHANGE_TYPE", this.searchType);
      this.$store.commit("modal/CHANGE_TEXT_FORM", row);
      this.$store.dispatch("modal/open");
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$api({
              type: `${this.searchType}Delete`,
              data: { id: row.id,row:row },
            });
            this.$message({
              type: "success",
              message: "删除成功!",
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
          });
        });
    },
  //   handleSelectionChange(val) {
  //   this.multipleSelection = val;
  // },  
  },

};
</script>
<style lang='stylus'>
.tw-search--form
  padding 20px 0

.tw-pagination
  margin-top 20px

.tw-table--wrap
  text-align: center

</style>