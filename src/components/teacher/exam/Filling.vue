<template>
  <div>
    <p class="tw-msg"><span class="tw-msg--title">填空题：</span>录入填空题到题库中</p>
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
      value:'<p>这里填入题目，答案处插入&lt;blankspace&gt;</p>'
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