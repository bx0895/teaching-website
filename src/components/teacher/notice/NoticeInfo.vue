<template>
  <div>
    <p class="tw-msg"><span class="tw-msg--title">公告信息：</span>在此页面查看全部公告，可进行修改和删除</p>
    <el-table :data="tableData"
              border
              fit
              :header-cell-style="{color:'#000'}"
              style="width: 100%">
      <el-table-column type="index"
                       label="#"></el-table-column>
      <el-table-column v-for="item in tableForm"
                       :key="item.query"
                       :prop="item.query"
                       :label="item.label"
                       :width="item.width">
      </el-table-column>
      <el-table-column label="编辑"
                       width="150px">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="handleEdit(scope.row)">编辑</el-button>
                               <el-button type="danger"
                     size="mini"
                     @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <NoticeModal />
  </div>
</template>

<script>
import store from 'store'
import searchForm from "@/config/search.config";
import MIXIN from "@/core/mixin";
import NoticeModal from "@/components/teacher/common/Modal";
export default {
  name: "",
  mixins: [MIXIN],

  components: {
    NoticeModal,
  },

  data() {
    return {
      tableData: [],
    };
  },

  async created() {
    try {
      await this.getNotice();
    } catch (err) {
      console.log(err);
    }
  },

  watch: {},

  computed: {
    tableForm() {
      return searchForm["notice"];
    },
  },

  methods: {
    //获取数据
    async getNotice() {
      try {
        let res = await this.$api({
          type: "noticeInfo",
          data:{q:{tea_id:store.get('uid')}}
        });
        res.result.map((item) => {
          item.start_time = this.formatTime(item.start_time);
          item.end_time = this.formatTime(item.end_time);
        });
        this.tableData = res.result;
      } catch (err) {
        console.log(err);
      }
    },
    //编辑
    handleEdit(row) {
      this.$store.commit("modal/CHANGE_TEXT_FORM", row);
      this.$store.commit("modal/CHANGE_TYPE", "notice");
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
              type: `noticeDelete`,
              data: { id: row.id },
            });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            await this.getNotice();
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