<template>
  <div>
    <el-table :data="tableData"
              height="400px"
              border
              fit
              :header-cell-style="{color:'#000'}"
              style="width: 100%">
      <el-table-column type="index"
                       label="#"></el-table-column>
      <el-table-column prop="cla_name"
                       label="班名">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     @click="handleCheck(scope.row)" size="small">查看学生</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from 'store'
export default {
  name: "",

  components: {

  },

  data() {
    return {
      tableData: [],
    };
  },

  async created() {
    await this.getClass()
  },

  watch: {},

  computed: {},

  methods: {
    async handleCheck(row) {
      this.$router.push({path:'/class/student',query:{id:{cla_id:row.cla_id}}})
    },
    handleEnter(row) {
      console.log(row)
    },
    async getClass() {
      try {
        let res = await this.$api({type:'classInfo',data:{q:{tea_id:store.get('uid')}}})
        this.tableData = res.result
      } catch(err) {
        console.log(err)
      }
    }
  },
};
</script>
<style lang='stylus'>
</style>