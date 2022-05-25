<template>
  <div>
    <el-table :data="tableData"
              height="400px"
              border
              fit
              :header-cell-style="{color:'#000',background:'#d6ecf0',textAlign:'center'}"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
      <el-table-column type="index"
                       label="#"></el-table-column>
      <el-table-column prop="name"
                       label="课件名">
      </el-table-column>
      <el-table-column label="下载"
                       width="200px">
        <template slot-scope="scope">
          <i @click="handleDownload(scope.row)"
             class="el-icon-download"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  name: "",

  components: {},

  data() {
    return {
      tableData: [],
      id:'',
      userInfo:''
    };
  },

  async created() {
    try {
      this.userInfo = this.$store.getters.userInfo
      this.getTecher()
      await this.getCourseware();
    } catch (err) {
      console.log(err);
    }
  },

  watch: {},

  computed: {
    // ...mapState(['userInfo'])
  },

  methods: {
    getTecher() {
        //this.$store.dispatch('getUserInfo')
        this.id = this.userInfo.tea_id
    },
    async getCourseware() {
      try {
        let res = await this.$api({
          type: "coursewareInfo",
          data: {
            q: { tea_id: this.id },
          },
        });
        this.tableData = res.result;
      } catch (err) {
        console.log(err);
      }
    },
    //下载
    handleDownload(row) {
      window.location.href = row.path
    },
  },
};
</script>
<style lang='stylus'>
</style>