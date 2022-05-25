<template>
  <div>
    <p class="tw-msg"><span class="tw-msg--title">添加班级：</span>在此页面添加教师</p>
    <Register :registerType="type" />
  </div>

</template>

<script>
import Register from "@/views/Register";
export default {
  name: "",

  components: {
    Register,
  },

  data() {
    return {
      type: "teacher",
    };
  },

  watch: {},

  computed: {},

  methods: {},
};
</script>
<style lang='stylus'>
</style>