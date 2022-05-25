<template>
  <div class="aside-item">
    <el-submenu :index="info.title"
                v-if="isShow === true">
      <template slot="title">
        <i :class="info.icon"></i>
        <span>{{info.title}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="item in info.children"
                      :key="item.name"
                      :index="item.router"
                      style="borderBootom:1px solid #fff"
                      >{{item.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item v-if="info.router" :index="info.router" class="tw-aside--item">{{info.label}}</el-menu-item>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    info: {
      type: Object,
    },
  },

  components: {},

  data() {
    return {};
  },
  created() {
  },

  watch: {},

  computed: {
    isShow() {
      return this.info?.children ? true : false;
    },
  },

  methods: {

  },
};
</script>
<style lang='stylus'>
.el-menu-item.is-active {
  background-color: #222 
}

.el-menu-item:hover {
  background-color:	#B0E0E6 !important;
}

// .el-submenu
//   border-bottom:1px solid #ccc

</style>