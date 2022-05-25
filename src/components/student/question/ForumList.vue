<template>
  <div class="tw-forum--wrap">
    <div class="tw-no_forum"
         v-if="forums.length === 0">
      <img src="../../../assets/img/no_forum.png"
           alt="!">
      <p>老师还未创建论坛！</p>
    </div>
    <el-card v-for="item in forums"
             :key="item.id"
             class="tw-forum--item">
      <p class="tw-forum--title">{{item.title}}</p>
      <p class="tw-forum--time">时间：{{ formatTime(item.start_time) }} 至 {{ formatTime(item.end_time) }}</p>
      <div class="tw-question--edit">
        <el-button type="info"
                   icon="el-icon-chat-line-round"
                   size="mini"
                   @click="handleEnter(item.id)">进入论坛</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import MIXIN from "@/core/mixin";

export default {
  name: "",
  mixins: [MIXIN],

  components: {},

  data() {
    return {
      forums: [],
    };
  },

  watch: {},

  async created() {
    await this.getForum();
  },

  computed: {},

  methods: {
    //获取论坛信息
    async getForum() {
      try {
        let userInfo = this.$store.getters.userInfo;
        let res = await this.$api({
          type: "forumInfo",
          data: { q: { tea_id: userInfo.tea_id } },
        });
        this.forums = res.result;
      } catch (err) {
        console.log(err);
      }
    },
    //跳转进入论坛
    handleEnter(id) {
      this.$router.push({ path: "/add/question", query: { id: id } });
    },
  },
};
</script>
<style lang='stylus'>
.tw-forum--wrap
  padding 10px 60px

.tw-forum--item
  margin-bottom: 10px

.tw-forum--title
  line-height 30px

.tw-forum--time
  color: #333
  font-size 14px

.tw-no_forum
  margin: 0 auto 
  width: 250px
  text-align: center
</style>