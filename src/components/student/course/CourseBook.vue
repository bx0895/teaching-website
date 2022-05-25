<template>
  <div class="tw-course">
    <el-card class="tw-course--item" v-if="data !== ''">
      <div v-html="data"></div>
    </el-card>
  </div>
</template>

<script>
import COURSE from '@/core/course'
import MIXIN from "@/core/mixin";
export default {
  name: '',
  mixins:[COURSE,MIXIN],
  components: {
  },

  data () {
    return {
      data:''
    };
  },

  async created(){
    try {
      let result = await this.getStudentCourse()
      this.data = result[0]?.course_book ?? ''
    } catch (err) {
      console.log(err)
    }

  },

  watch: {},

 computed: {},

  methods: {
    
  }
}

</script>
<style lang='stylus'>
</style>