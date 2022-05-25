<template>
  <div>
    <el-card>
      <p class="tw-msg">排序仅能调整该题型内题目顺序，作业或者试卷的整体题目顺序为：选择题、填空题、简答题、编程题</p>
      <div class="tw-table--wrap">
        <el-table :data="topics"
                  height="400px"
                  :cell-style="{padding:'8px 0'}"
                  :header-cell-style="{background:'#d6ecf0',color:'#000'}"
                  style="width: 100%">
          <el-table-column type="index"
                           label="#"></el-table-column>
          <el-table-column label="题型"
                           prop="type"
                           width="65">
          </el-table-column>
          <el-table-column label="内容"
                           prop="content"
                           width="300">
            <template slot-scope="scope">
              <div v-html="content(scope.row)"></div>
            </template>
          </el-table-column>

          <el-table-column label="难度"
                           prop="difficulty"
                           width="50">
          </el-table-column>
          <el-table-column label="知识点"
                           prop="knowledge">
          </el-table-column>
          <el-table-column label="分值"
                           prop="score">
            <template slot-scope="scope">
              <el-input v-model="scope.row.score" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="排序"
                           width="200">
            <template slot-scope="scope">
              <el-button type="primary"
                         class="el-icon-top"
                         size="mini"
                         @click="upTopic"></el-button>
              <el-button type="primary"
                         class="el-icon-bottom"
                         size="mini"
                         @click="downTopic"></el-button>
              <el-button type="danger"
                         class="el-icon-close"
                         size="mini"
                         @click="deleteTopic(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",

  components: {},

  props: {
    topics: {
      type: Array,
    },
  },

  data() {
    return {};
  },

  created() {},

  watch: {},

  computed: {},

  methods: {
    content(row) {
      return row.content.match(/>([^<>]+)</)[1];
    },
    //向上移动题目
    upTopic() {
      this.topics.push(this.topics.shift());
    },
    //向下移动题目
    downTopic() {
      this.topics.unshift(this.topics.pop());
    },
    //删除题目
    deleteTopic(row) {
      this.topics.splice(
        this.topics.indexOf(
          this.topics.find(function (element) {
            return element.id === row.id && element.type === row.type;
          })
        ),
        1
      );
    },
  },
};
</script>
<style lang='stylus'>
</style>