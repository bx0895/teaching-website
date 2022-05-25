<template>
  <div>
    <ExamTable :examType="type" />
  </div>
</template>

<script>
import ExamTable from '@/components/teacher/exam/ExamTable'
export default {
  name: '',

  components: {
    ExamTable
  },

  data () {
    return {
      type:'test'
    };
  },

  watch: {},

 computed: {},

  methods: {}
}

</script>
<style lang='stylus'>
</style>