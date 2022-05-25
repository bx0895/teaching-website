<template>
  <div>
   <el-dialog title="编辑题目"
               :visible.sync="isShow"
               width="60%"
               :before-close="handleClose">
      <ExamForm v-if="editForm.type === '选择题' || editForm.type === '填空题'" :editForm="editForm" :examType="routePath" :isUpdate="true" />
      <Programme v-if="editForm.type === '编程题'" :editForm="editForm" :examType="routePath" :isUpdate="true" />
      <ShortQues v-if="editForm.type === '简答题'" :editForm="editForm" :examType="routePath" :isUpdate="true" />
    </el-dialog>
  </div>
</template>

<script>
import ExamForm from '@/components/teacher/exam/ExamForm'
import Programme from '@/components/teacher/exam/Programme'
import ShortQues from '@/components/teacher/exam/ShortQues'
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("editModal");

const TOPIC_MAP = {
  'h_tiku':{
    '选择题':'h_xuanzeti',
    '填空题':'h_tiankongti',
    '简答题':'h_jiandati',
    '编程题':'h_bianchengti',
  },
    't_tiku':{
    '选择题':'t_xuanzeti',
    '填空题':'t_tiankongti',
    '简答题':'t_jiandati',
    '编程题':'t_bianchengti',
  },
}
export default {
  name: '',

  components: {
    ExamForm,
    Programme,
    ShortQues
  },

  data () {
    return {
    };
  },

  watch: {},

 computed: {
   ...mapState(["isShow", "editForm", "type"]),
   routePath() {
     return TOPIC_MAP[this.$route.name][this.editForm.type]
   }
 },

  methods: {
        //关闭
    handleClose() {
      this.close();
    },
    ...mapActions(["close", "open"]),
  }
}

</script>
<style lang='stylus'>
</style>