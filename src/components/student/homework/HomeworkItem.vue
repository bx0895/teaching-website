<template>
  <div class="tw-homework--warp">
      <div class="tw-no_homework" v-if="homeworks.length === 0">
     <img src="../../../assets/img/no_homework.png" alt="!" width="240px" height="240px"> 
      <p>暂无作业</p> 
    </div>
      <el-card v-for="item in homeworks" :key="item.id" class="tw-homework--item">
        <div @click="entryHomework(item)" class="tw-homework--detail">
      <p class="tw-homework--title">{{item.describe}}</p>
      <p class="tw-homework--describe">分值：{{item.score}}</p>
      <p class="tw-homework--time">截止时间：{{formatTime(item.end_time)}}</p>
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
      homeworks:[]
    };
  },

  created() {
    let userInfo = this.$store.getters.userInfo
    //获取作业列表
    this.$api({type:'homeworkInfo',data:{q:{'homework.cla_id':userInfo.cla_id}}}).then(res => {
      let time = this.formatTime(new Date())
      if (this.type === 'current') {
        this.homeworks = res.result.filter(item => {
          let start_time = this.formatTime(item.start_time)
          let end_time = this.formatTime(item.end_time)
          return start_time < time && end_time > time
        })
      }
      if (this.type === 'history') {
        this.homeworks = res.result.filter(item => {
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
    entryHomework(item) {
      if(this.type === 'history') {
        this.$router.push({path:'/assignment',query:{id:item.id,type:"homework"}})
      } else {
       this.$router.push({path:'/homework/detail',query:{id:item.id}}) 
      }
      
    }
  }
}

</script>
<style lang='stylus'>
.tw-homework--warp
  padding 10px 60px

.tw-homework--item
  
  margin-bottom: 10px
  cursor pointer

.tw-homework--title
  font-weight 700
  line-height 30px

.tw-homework--detail
 display: flex
 justify-content: space-around
 p 
  line-height 30px
  
.tw-no_homework
  margin: 0 auto 
  width: 250px
  text-align: center
</style>