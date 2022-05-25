<template>
  <div class="tw-page">
    <el-container class="tw-container-header">
      <el-header class="tw-header"
                 width="100%"
                 height="50px">
        <el-row class="tw-header--wrap"
                type="flex"
                justify="center"
                align="middle">
          <el-col :span="2"
                  :offset="1">
            <div class="tw-header--logo">
              <i class="el-icon-reading"></i>
            </div>
          </el-col>
          <el-col :span="18">
            <el-menu class="tw-header--menu"
                     mode="horizontal"
                     text-color="#fff"
                     background-color="rgb(29,79,102)"
                     active-text-color="rgb(251 205 75)"
                     @select="handleSelect"
                     :default-active="headerActive"
                     router
                     style="height:50px;line-height:50px;">
              <el-menu-item v-for="item in headerNav"
                            :key="item.name"
                            :v-if="item.router"
                            :index="item.router"
                            style="height:50px;line-height:50px;">{{item.label}}
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="2">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-user"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="message">个人信息</el-dropdown-item>
                <el-dropdown-item command="exit">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            
          </el-col>
        </el-row>
      </el-header>
    </el-container>

    <el-container class="tw-container-middle">
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>

import HEADER_NAV from "@/config/header.config";
import ASIDE_NAV from "@/config/aside.config";
import store from 'store'

export default {
  name: "Home",
  data() {
    return {
      type: 'student',
      asideType:null,
    };
  },
  components: {

  },

  created() {
    if(!sessionStorage.getItem('us')){
      this.$store.dispatch('getUserInfo')
    }
  },
  computed: {
    //顶部导航数据
    headerNav() {
      return HEADER_NAV[this.type];
    },
    //侧边栏导航数据
    asideNav() {
      return ASIDE_NAV[this.asideType];
    },
    //默认路由
    headerActive() {
      return  sessionStorage.getItem("header") || '/notice'
    }
  },
  methods: {
    //点击顶部导航获取相应的去向侧边栏的名称
    handleSelect(key) {
      let router = HEADER_NAV[this.type];
      let asideName = router.find((item) => {
        return item.router === key;
      }).name;
      this.asideType = asideName;
      sessionStorage.setItem("header",key)
      sessionStorage.setItem("aside",asideName)
      this.setAsideType();
    },

    //设置侧边栏导航类型
    setAsideType() {
      this.$store.commit("SET_ASIDE_TYPE", this.asideType);
    },
    //用户操作
     handleCommand(command){
      //退出登录
      if(command === 'exit'){
        store.clearAll()
        sessionStorage.clear()
        this.$router.push('/login')   
      }
      //获取个人信息、修改信息
      if(command === 'message'){
        this.$router.push('/student/message')
      }
    }
  },
};
</script>

<style lang="stylus">
.tw-header
  background-color rgb(29,79,102)
  width: 100%

.tw-header--wrap
  width: 100%
  height: 50px

.el-icon-user,
.el-icon-reading
  font-size 36px
  color: #fff

.tw-header--menu
  height: 100%

.tw-page
  width: 100%
  height: 100%

.tw-container-header
  overflow hidden
  width: 100%
  
.tw-container-middle
  height: calc(100% - 50px)

.el-menu.el-menu--horizontal.tw-header--menu
    border-bottom: none
</style>
