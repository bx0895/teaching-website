<template>
  <div class="tw-notice--wrap">
    <div class="tw-no_notice" v-if="notices.length === 0">
     <img src="../../assets/img/no_notice.png" alt="!" width="240px" height="240px"> 
      <p>暂无公告信息</p> 
    </div>
    <div class="block" v-if="notices.length !== 0">
    <h3 class="demonstration">公 告</h3>
    <el-carousel height="300px" :interval="5000">
      <el-carousel-item v-for="item in notices" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p class="typo">{{ item.content }}</p>
      </el-carousel-item>
    </el-carousel>
  </div>
  </div>
</template>

<script>
// import store from 'store'
import MIXIN from '@/core/mixin'
// import { mapState } from 'vuex';
export default {
  name: '',
  mixins:[MIXIN],
  inject:['reload'],

  components: {},

  data () {
    return {
      notices:[],
      userInfo:''
    };
  },

  async created() {
    this.userInfo = this.$store.getters.userInfo
    await this.getNotice()
  },

  watch: {},

 computed: {

 },

  methods: {
    async getNotice() {
      try {
        let time = this.formatTime(new Date())
        let res = await this.$api({type:'noticeInfo'})
        this.notices = res.result.map(item=> {
          item.start_time = this.formatTime(item.start_time)
          item.end_time = this.formatTime(item.end_time)
          return item
         })
        .filter(item => {
          return item.start_time < time && item.end_time > time && (!item.cla_id || item.cla_id === this.userInfo.cla_id)
        })
        // this.reload()
      } catch(err) {
        console.log(err)
      }
    }
  }
}

</script>
<style lang='stylus'>
.tw-notice--wrap
  padding: 10px 20px 
  width: 100%
  
.tw-notice--title
  font-weight 700
  color #4169E1
  padding: 10px 0

.tw-no_notice
  width: 300px
  padding: 10px 0
  margin: 0 auto
  p 
    text-align: center

.block
  h3 
    font-size 20px
    font-weight 500
    margin-bottom 1em
    text-align: center

.el-carousel__item 
  padding 0 20px
  h3
    font-size: 20px;
    opacity: 0.75;
    line-height: 50px;
    margin: 0;
  p 
    text-indent: 2em
    line-height: 24px

.el-carousel__item:nth-child(2n)
    background-color: #B0C4DE;

.el-carousel__item:nth-child(2n+1) 
    background-color: #d3dce6;

</style>