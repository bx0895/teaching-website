<template>
  <div class="aw-class-add">
    <p class="tw-msg"><span class="tw-msg--title">添加班级：</span>在此页面添加班级，为班级分配教师</p>
    <el-card class="aw-class--wrap">
      <el-form ref="ruleForm"
               :model="form"
               label-width="80px"
               :rules="rules"
               class="aw-class-form">
        <el-form-item label="班级名" prop="cla_name">
          <el-input v-model="form.cla_name"></el-input>
        </el-form-item>
        <el-form-item label="任教教师" >
          <el-select v-model="form.tea_id"
                     placeholder="请选择任教教师"
                     style="width:100%">
            <el-option v-for="item in getTeacher"
                       :key="item.id"
                       :label="item.name"
                       :value="item.tea_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "",

  components: {},

  data() {
    return {
      form: {
        cla_name: "",
        tea_id: "",
      },
      rules:{
        cla_name:[{
          required:true,message:'必填',trigger:'blur'
        }]
      },
      teachers: [],
    };
  },

  async created() {
    try {
      await this.getTeachers()
    } catch(err){
      console.log(err)
    }
    
  },

  watch: {},

  computed: {
    getTeacher(){
      return this.teachers
    }
  },

  methods: {
    async getTeachers() {
      try {
        let data = await this.$api({ type: "teacherInfo",data:{table:'teacher'} });
        this.teachers = data.result
      } catch (err) {
        console.log(err);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$api({type:'addClass',data:{q:this.form}})
            this.$notify.success({
              title: '通知',
              message: '添加成功',
            });
          } catch(err){
            console.log(err)
          }
        } else {
          this.$notify.error({
          title: '通知',
          message: '表单验证失败，请重新输入',
        });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang='stylus'>
.aw-class--wrap
  width 400px
  margin: 0 auto
  padding 20px
</style>