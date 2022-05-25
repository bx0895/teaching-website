<template>
<div class="tw-middle">
      <el-aside class="tw-aside"
                width="200px">
        <el-menu class="tw-aside--menu"
                 text-color="#222"
                 active-text-color="#222"
                 router
                 :default-active="$route.path">
          <AsideNav v-for="item in asideNav"
                    :key="item.name"
                    :info="item" />
        </el-menu>
      </el-aside>

      <el-main class="tw-main">
        <router-view></router-view>
      </el-main>
</div>
</template>

<script>
import ASIDE_NAV from "@/config/aside.config";
import AsideNav from "@/components/base/AsideNav";
export default {
  name: "BaseMain",

  components: {
    AsideNav,
  },

  data() {
    return {
      
    };
  },

  created() {},

  watch: {},

  computed: {
    asideNav() {
      return ASIDE_NAV[this.$store.getters.asideType];
    },
  },

  methods: {},
};
</script>
<style lang='stylus'>
.tw-middle 
  display: flex
  width: 100%
  
.tw-main
  height: 100%
  background-color #fff

.tw-aside
  height: 100%

.tw-aside--menu
  height: 100%

.el-main 
  padding 10px !important
  width calc(100% - 200px)
</style>