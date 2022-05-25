<template>
  <div class="tw-test--warp">
      <div class="tw-no_test" v-if="tests.length === 0">
     <img src="../../../assets/img/no_test.png" alt="!" width="240px" height="240px"> 
      <p>暂无考试</p> 
    </div>
      <el-card v-for="item in tests" :key="item.id" class="tw-test--item">
        <div @click="entrytest(item)">
      <p class="tw-test--title">{{item.describe}} <span>{{item.duration}}分钟</span></p>
      <p class="tw-test--describe">{{item.require}}</p>
      <p class="tw-test--time">时间：{{formatTime(item.start_time)}} 至 {{formatTime(item.end_time)}} </p>
        </div>
    </el-card>
  </div>
</template>

<script>
import MIXIN from '@/core/mixin'
export default {
  name: '',
  mixins:[MIXIN],
  components: {},
  props:{
    type:{
      type:String
    }
  },

  data () {
    return {
      tests:[]
    };
  },

  created() {
    let userInfo = this.$store.getters.userInfo
    this.$api({type:'testInfo',data:{q:{'test.cla_id':userInfo.cla_id}}}).then(res => {
      let time = this.formatTime(new Date())
      if (this.type === 'current') {
        this.tests = res.result.filter(item => {
          let start_time = this.formatTime(item.start_time)
          let end_time = this.formatTime(item.end_time)
          return start_time < time && end_time > time
        })
      }
      if (this.type === 'history') {
        this.tests = res.result.filter(item => {
          return item.end_time < time
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  watch: {},

 computed: {},

  methods: {
    entrytest(item) {
       if(this.type === 'history') {
        this.$router.push({path:'/assignment',query:{id:item.id,type:"test"}})
      } else {
       this.$router.push({path:'/test/detail',query:{id:item.id}}) 
      }
      
    }
  }
}

</script>
<style lang='stylus'>
.tw-test--warp
  padding 10px 60px

.tw-test--item
  margin-bottom: 10px
  cursor pointer

.tw-test--title
  font-weight 700
  line-height 30px

.tw-no_test
  margin: 0 auto 
  width: 250px
  text-align: center
</style>