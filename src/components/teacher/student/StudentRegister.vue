<template>
  <div>
    <p class="tw-msg"><span class="tw-msg--title">录入学生：</span>在此页面只能录入依次录入单个学生</p>
    <Register :registerType="type"
              :showClass="true" />
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
      type: "student",
      form: [],
    };
  },

  watch: {},

  computed: {},

  methods: {},
};
</script>
<style lang='stylus'>
</style>