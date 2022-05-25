<template>
  <div>
    <p class="tw-msg"><span class="tw-msg--title">选择题：</span>录入选择题到题库中</p>
    <ExamForm :value="value"/>
  </div>
</template>

<script>
import ExamForm from '@/components/teacher/exam/ExamForm'

export default {
  name: '',

  components: {
    ExamForm
  },

  data () {
    return {
      value:'<p>这里填入题目，答案处插入&lt;blankspace&gt;</p><p>A:</p><p>B:</p><p>C:</p><p>D:</p>',
    };
  },

  created() {

  },

  watch: {},

 computed: {},

  methods: {},
   
}

</script>
<style lang='stylus'>
</style>