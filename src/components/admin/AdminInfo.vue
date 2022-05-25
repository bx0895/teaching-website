<template>
  <div>
<BaseTable :searchType="type" />
  </div>
</template>

<script>
import BaseTable from '@/components/base/BaseTable'
export default {
  name: '',

  components: {
    BaseTable
  },

  data () {
    return {
      type:'admin'
    };
  },

  watch: {},

 computed: {},

  methods: {}
}

</script>
<style lang='stylus'>
</style>