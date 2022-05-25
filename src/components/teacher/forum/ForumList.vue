<template>
  <div class="tw-forum--wrap">
    <el-card v-for="item in forums"
             :key="item.id"
             class="tw-forum--item">
      <p class="tw-forum--title">{{item.title}}</p>
      <p class="tw-forum--time">时间：{{ formatTime(item.start_time) }} - {{ formatTime(item.end_time) }}</p>
      <div class="tw-question--edit">
                <el-button type="primary"
                   icon="el-icon-edit"
                   size="mini"
                   @click="handleEdit(item)">修改论坛</el-button>
        <el-button type="info"
                   icon="el-icon-chat-line-round"
                   size="mini"
                   @click="handleEnter(item.id)">进入论坛</el-button>
        <el-button type="danger"
                   icon="el-icon-delete-solid"
                   size="mini"
                   @click="handleDelete(item.id)">删除论坛</el-button>
      </div>
    </el-card>
    <ForumModal />
  </div>
</template>

<script>
import MIXIN from "@/core/mixin";
import store from "store";
import ForumModal from "@/components/teacher/common/Modal"
export default {
  name: "",
  mixins: [MIXIN],

  components: {
    ForumModal
  },

  data() {
    return {
      forums: null,
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
        let res = await this.$api({
          type: "forumInfo",
          data: { q: { tea_id: store.get("uid") } },
        });
        this.forums = res.result
      } catch (err) {
        console.log(err);
      }
    },
    //跳转进入论坛
    handleEnter(id) {
      this.$router.push({ path: "/teacher/forum", query: {id:id } });
    },
    handleEdit(item){
      this.$store.commit("modal/CHANGE_TEXT_FORM", item);
      this.$store.commit("modal/CHANGE_TYPE", "forum");
      this.$store.dispatch("modal/open");
    },
    //删除
    async handleDelete(id) {
      this.$confirm("此操作将永久删除该论坛, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$api({
              type: `forumDelete`,
              data: { id: id },
            });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.forums.splice(
              this.forums.indexOf(
                this.forums.find(function (element) {
                  return element.id === id;
                })
              ),1);
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang='stylus'>
.tw-forum--wrap
  padding: 10px 60px

.tw-forum--item
  margin-bottom: 10px

.tw-forum--title
  line-height 30px

.tw-forum--time
  color: #333
  font-size 14px

.tw-forum--title
  color: #0000CD
</style>