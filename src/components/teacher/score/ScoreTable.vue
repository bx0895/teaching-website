<template>
  <div>
    <el-card>
    <el-form v-model="classID"
             placeholder="请选择班级" @change="getTableData" clearable>
      <el-form-item label="班级">
        <el-select v-model="classID">
            <el-option v-for="item in classInfo"
                       :key="item.cla_id"
                       :label="item.cla_name"
                       :value="item.cla_id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"
              height="500"
              border>
    <el-table-column type="expand">
       <template slot-scope="props">
        <table :data="props.row.data" >
          <el-table-column v-for="(item,id) in props.row.data" :key="id" label="item.describe" prop="total_point"></el-table-column>
        </table>
      </template> 
      </el-table-column>
             
      <el-table-column 
                     label="学号"
                     prop="stu_id">
      </el-table-column>
      <el-table-column 
                     label="姓名"
                     prop="name">
      </el-table-column>
      <el-table-column 
                     label="班级"
                     prop="cla_name">
      </el-table-column>
    </el-table>
    </el-card>
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
      classID:'',
      classInfo:[]
    };
  },

  async created() {
    await this.getClass()
    await this.getTableData()
  },

  watch: {},

  computed: {},

  methods: {
    changeClass() {

    },
    async getClass() {
      try {
        let data = await this.$api({ type: "classInfo", data:{q:{tea_id:store.get('uid')}} });
        this.classInfo = data.result
      } catch (err) {
        console.log(err);
      }
    },
    async getTableData() {
      try {
        let res = await this.$api({type:'studentInfo',data:{q:{cla_id:32}}})
        console.log(res)
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