<template>
  <div class="aw-page">
    <el-container class="aw-container-header">
      <el-header class="aw-header"
                 width="100%"
                 height="50px">
        <el-row class="aw-header--wrap"
                type="flex"
                justify="center"
                align="middle">
          <el-col :span="2"
                  :offset="1">
            <div class="aw-header--logo">
              <i class="el-icon-reading"></i>
            </div>
          </el-col>
          <el-col :span="18">
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
 
    <el-container class="aw-container-middle">
         <el-aside class="aw-aside"
                width="200px">
        <el-menu class="aw-aside--menu"
                 background-color="#254552"
                 text-color="#fff"
                 active-text-color="rgb(251 205 75)"
                 router>
          <AsideNav v-for="item in asideNavs"
                    :key="item.name"
                    :info="item" />
        </el-menu>
      </el-aside>

      <el-main class="aw-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src


import ASIDE_NAV from "@/config/aside.config";
import AsideNav from "@/components/base/AsideNav";
import store from 'store'

export default {
  name: "Admin",
  components:{
    AsideNav
  },

  data() {
    return {
      asideNavs:[]
    };
  },

  created() {
    
    this.asideNavs = ASIDE_NAV['admin']
  },
  computed: {

  },
  methods: {
    handleCommand(command){
      if(command === 'exit'){
        store.clearAll()
        sessionStorage.clear()
        this.$router.push('/login') 
      }
      if(command === 'message'){
        this.$router.push('/admin/message')
      }

    }
  },
};
</script>

<style lang="stylus">
.aw-container-header
  border-bottom: 2px solid #008080
.aw-header
  background-color #254552
  width: 100%

.aw-header--wrap
  width: 100%
  height: 45px

.el-icon-user,
.el-icon-reading
  font-size 36px
  color: #fff

.aw-header--menu
  height: 100%

.aw-page
  width: 100%
  height: 100%

.aw-container-header
  overflow hidden
  width: 100%
  
.aw-container-middle
  height: calc(100% - 52px)

.el-menu.el-menu--horizontal.tw-header--menu
  border-bottom: none

.aw-aside
  height: 100%

.aw-aside--menu
  height: 100%
</style>
