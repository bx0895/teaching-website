<template>
  <div>
    <HomeworkItem :type="type" />
  </div>
</template>

<script>
import HomeworkItem from '@/components/student/homework/HomeworkItem'
export default {
  name: '',

  components: {
    HomeworkItem
  },

  data () {
    return {
      type:'history'
    };
  },

  watch: {},

 computed: {},

  methods: {}
}

</script>
<style lang='stylus'>
</style>