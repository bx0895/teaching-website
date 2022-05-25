<template>
  <div>
    <p class="tw-msg"><span class="tw-msg--title">添加管理员：</span>在此页面添加管理员</p>
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
      type: "admin",
    };
  },

  watch: {},

  computed: {},

  methods: {},
};
</script>
<style lang='stylus'>
</style>