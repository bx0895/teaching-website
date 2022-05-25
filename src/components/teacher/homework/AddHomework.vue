<template>
  <div>
    <div class="tw-select" @click="handleSelect">
      手动选题
      </div> 

     <div class="tw-select" @click="handleRandom">自动选题</div>     

  </div>
</template>

<script>
export default {
  name: '',

  components: {},

  data () {
    return {
    };
  },

  watch: {},

 computed: {},

  methods: {
    handleSelect() {
      this.$router.push({path:'/select/topic',query:{type:'homework',idName:'hw_id'}})
    },
    handleRandom() {
      this.$router.push({path:'/random/topic',query:{type:'homework',idName:'hw_id'}})
    }
  }
}

</script>
<style lang='stylus'>
.tw-select
  width: 300px
  padding: 40px 0
  background-color rgba(135,206,250,.5)
  margin: 30px auto
  border-radius: 8px
  text-align: center
  font-size 16px
  box-shadow: 0 0 4px #fafafa
  cursor pointer
</style>