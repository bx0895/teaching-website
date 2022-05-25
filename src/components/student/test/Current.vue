<template>
  <div>
    <TestItem :type="type" />
  </div>
</template>

<script>
import TestItem from '@/components/student/test/TestItem'
export default {
  name: '',

  components: {
    TestItem
  },

  data () {
    return {
      type:'current'
    };
  },

  watch: {},

 computed: {},

  methods: {}
}

</script>
<style lang='stylus'>
</style>