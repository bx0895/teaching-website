<template>
  <div>
    <p class="tw-msg"><span class="tw-msg--title">课件上传：</span>点击按钮上传课次，最多同时上传5个文件</p>
    <!-- 文件上传 -->
    <el-upload class="tw-upload"
               :action="path"
               :data="data"
               :show-file-list="false"
               multiple
               :limit="5"
               :on-success="handleSuccess"
               :file-list="fileList"
               >
      <el-button size="small"
                 type="primary">点击上传</el-button>
      <div slot="tip"
           class="el-upload__tip">文件大小不超过15MB</div>
    </el-upload>
    <CourseTable ref="table" />
  </div>
</template>

<script>
import CourseTable from "@/components/teacher/course/CourseTable";
import store from "store";

const uid = store.get("uid");

export default {
  name: "",

  components: {
    CourseTable,
  },

  data() {
    return {
      fileList: [],
      path: `http://127.0.0.1:3000/upload/courseware`,
      data: {
        uid: uid,
      },
    };
  },

  computed: {},

  methods: {
    async handleSuccess() {
      this.$message({
        type: "success",
        message: "上传成功!",
      });
      await this.$refs.table.getCourseware();
    },
  },
};
</script>
<style lang='stylus'>
.tw-upload 
  margin-bottom: 20px
</style>