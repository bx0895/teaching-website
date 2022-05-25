<template>
  <div>
    <p v-if="showMsg" class="tw-msg"><span class="tw-msg--title">简答题：</span>录入简答题到题库中</p>
    <el-form size="middle"
             label-width="80px"
             ref="editForm"
             :model="editForm">
      <el-form-item label="题目标题">
        <el-input type="text"
                  placeholder="请输入标题（可选）"
                  v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="题目内容">
        <p class="tw-message">在需要填入答案处插入&lt;blankspace&gt;</p>
        <div ref="content"
             class="content"></div>
      </el-form-item>
      <p class="tw-exam--title">题目属性</p>
      <el-form-item label="难度">
        <el-select v-model="editForm.difficulty"
                   placeholder="可选择难度（1-5），数字越大难度越大">
          <el-option label="1"
                     value=1></el-option>
          <el-option label="2"
                     value=2></el-option>
          <el-option label="3"
                     value=3></el-option>
          <el-option label="4"
                     value=4></el-option>
          <el-option label="5"
                     value=5></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="知识点">
        <el-select v-model="editForm.knowledge"
                   multiple
                   placeholder="选择知识点，可多选">
          <el-option v-for="item in knowledges"
                     :key="item.id"
                     :value="item.content"
                     :label="item.content"></el-option>
        </el-select>
        <el-button type="primary"
                   @click="addContent('knowledge')">添加知识点</el-button>
      </el-form-item>
      <el-form-item label="章节">
        <el-select v-model="editForm.chapter"
                   multiple
                   placeholder="选择章节，可多选">
          <el-option v-for="item in chapters"
                     :key="item.id"
                     :value="item.content"
                     :label="item.content"></el-option>
        </el-select>
        <el-button type="primary"
                   @click="addContent('chapter')">添加章节</el-button>
      </el-form-item>
      <el-form-item label="标签">
        <el-input type="text" v-model="editForm.label" style="width:70%"></el-input>
      </el-form-item>
      <p class="tw-exam--title">答案解析</p>

      <el-form-item label="参考答案">
        <el-input v-model="editForm.answer" placeholder="输入参考答案" type="text"></el-input>
      </el-form-item>

      <el-form-item label="解析">
        <el-checkbox v-model="checked">录入解析</el-checkbox>
        <div ref="analysis"
             v-show="isChecked"
             class="analysis"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
    <ExamModal :showModal="show" />
  </div>
</template>

<script>
import ExamModal from "@/components/teacher/exam/ExamModal";
import Editor from "wangeditor";
import store from "store";
const URL = "http://127.0.0.1:3000/upload/images";
const tokenName = "ua_jok";

const uid = store.get("uid");
export default {
  name: "",

  components: {
    ExamModal,
  },
  props: {
    showMsg:{
      type:Boolean,
      default:true
    },
    examType:{
      type:String
    },
    isUpdate:{
      type:Boolean,
      default:false
    },
    editForm:{
      type:Object,
      default:function(){
        return   {
      title: "",
      content: "<p>这里填入题目</p>",
      difficulty: null,
      answer: "",
      analysis: "",
      label: "",
      tea_id: uid,
    }
      }
    }
  },

  data() {

    return {
      show: false,
      checked: false,
      knowledges: [],
      chapters: [],
      chapter:"",
      knowledge:"",
      editor1: "",
      editor2: "",
    };
  },

  watch: {},

  computed: {
    isChecked() {
      return this.checked;
    },
  },
  async created() {
    await this.getData();
  },

  methods: {
    //获取章节和知识点
    async getData() {
      try {
        let know = await this.$api({ type: "konwledgeInfo" });
        let chap = await this.$api({ type: "chapterInfo" });
        this.knowledges = know.result;
        this.chapters = chap.result;
      } catch (err) {
        console.log(err);
      }
    },
    //添加章节或知识点
    addContent(type) {
      this.$store.dispatch("modal/open");
      this.$store.commit("modal/CHANGE_TYPE", type);
    },
    //提交表单
    async submitForm() {
      try {
        this.editForm.content = this.editor1.txt.html();
        this.editForm.analysis = this.editor2.txt.html();
        this.editForm.chapter = this.editForm.chapter.toString()
        this.editForm.knowledge = this.editForm.knowledge.toString()
        if (this.isUpdate) {
        await this.$api({
          type: `tikuUpdate`,
          data: { id:this.editForm.id,table:this.examType,updateData: this.editForm },
        });
        } else {
        await this.$api({
          type: `${this.$route.name}`,
          data: { q: this.editForm },
        });          
        }
        this.editForm.chapter = ''
        this.editForm.knowledge = ''
        this.$notify.success({
          title: "通知",
          message: "提交成功",
        });
      } catch (err) {
        console.log(err);
      }
    },
    //初始化wangeditor
    seteditor(editor, value) {
      editor.config.uploadImgServer = URL;
      editor.config.uploadImgMaxSize = 5 * 1024 * 1024; // 5M
      editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
      editor.config.uploadImgMaxLength = 6;
      editor.config.uploadFileName = "file";
      editor.config.uploadImgHeaders = {
        Authorization: `Bearer ${store.get(tokenName)}`,
      };
      editor.create();
      editor.txt.html(value);
    },
  },

  mounted() {
    this.editor1 = new Editor(this.$refs.content);
    this.editor2 = new Editor(this.$refs.analysis);
    this.seteditor(this.editor1, this.editForm.content);
    this.seteditor(this.editor2, this.editForm.analysis);
  },
};
</script>
<style lang='stylus'>
.el-select
  width: 70%
</style>