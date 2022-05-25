<template>
  <div class="tw-course">
    <p class="tw-msg"><span class="tw-msg--title">先导课程：</span>发布先导课程</p>
    <Editor ref="text"/>
    <el-button type="primary" class="tw-course--button" @click="onSubmit">保存修改</el-button>
  </div>
</template>

<script>
import Editor from '@/components/base/Editor'
import COURSE from '@/core/course'
import MIXIN from "@/core/mixin";
export default {
  name: '',
  mixins:[COURSE,MIXIN],
  components: {
    Editor
  },

  data () {
    return {
      data:''
    };
  },

  async created(){
    try {
      let result = await this.getCourse()
      this.data = result[0]?.before_course ?? ''
      this.$refs.text.editor.txt.html(this.data)
    } catch (err) {
      console.log(err)
    }

  },

  watch: {},

 computed: {},

  methods: {
    async onSubmit(){
     try {
       this.data = this.$refs.text.editor.txt.html()
       await this.setCourse({'before_course':this.data})
       this.success('修改成功')
     } catch(err) {
       console.log(err)
     }
    }
  }
}

</script>
<style lang='stylus'>
</style>