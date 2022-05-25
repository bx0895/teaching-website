<template>
  <div id="editor">
  </div>
</template>

<script>
import Editor from "wangeditor";
import store from "store";
const URL = "http://127.0.0.1:3000/upload/images";
const tokenName = "ua_jok";

export default {
  name: "",

  components: {},

  data() {
    return {
      editor: "",
    };
  },


  watch: {},

  computed: {},

  methods: {},

  mounted() {
    this.editor = new Editor("#editor");
    this.editor.config.uploadImgServer = URL;
    this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024; // 5M
    this.editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
    this.editor.config.uploadImgMaxLength = 6;
    this.editor.config.uploadFileName = "file";
    this.editor.config.uploadImgHeaders = {
      Authorization: `Bearer ${store.get(tokenName)}`,
    };
    this.editor.create()
    this.editor.txt.html()
  },
};
</script>
<style lang='stylus'>

</style>