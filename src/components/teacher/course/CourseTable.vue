<template>
  <div>
    <el-table :data="tableData"
              height="400px"
              border
              fit
              :header-cell-style="{color:'#000',background:'#d6ecf0',textAlign:'center'}"
              :cell-style="{padding:'8px 0', textAlign:'center'}">
      <el-table-column type="index"
                       label="#"></el-table-column>
      <el-table-column prop="name"
                       label="课件名">
      </el-table-column>
      <el-table-column label="下载"
                       width="100px">
        <template slot-scope="scope">
          <i @click="handleDownload(scope.row)"
             class="el-icon-download"></i>
        </template>
      </el-table-column>
      <el-table-column label="删除"
                       width="100px">
        <template slot-scope="scope">
          <i @click="handleDelete(scope.row)"
             class="el-icon-delete"></i>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from "store";

const uid = store.get("uid");

export default {
  name: "",

  components: {},

  data() {
    return {
      tableData: [],
    };
  },

  async created() {
    try {
      await this.getCourseware();
    } catch (err) {
      console.log(err);
    }
  },

  watch: {},

  computed: {},

  methods: {
    async getCourseware() {
      try {
        let res = await this.$api({
          type: "coursewareInfo",
          data: {
            q: { tea_id: uid },
          },
        });
        this.tableData = res.result;
      } catch (err) {
        console.log(err);
      }
    },

    handleDownload(row) {
      window.location.href = row.path
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$api({
              type: `coursewareDelete`,
              data: { id: row.id },
            });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            await this.getCourseware();
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
  },
};
</script>
<style lang='stylus'>
</style>