<template>
  <el-select v-model="cla_id"
             placeholder="请选择班级"
             style="width:100%"
             @change="change"
             clearable>
    <el-option-group v-for="group in classInfo"
                     :key="group.id"
                     :label="group.name">
      <el-option v-for="item in group.class"
                 :key="item.cla_id"
                 :label="item.cla_name"
                 :value="item.cla_id">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  name: "",

  components: {},

  props: {
    classType: {
      type: Object,
    },
    classID:{
      type:Number
    }
  },

  data() {
    return {
      classInfo: [],
      cla_id: "",
    };
  },

  async created() {
    try {
      this.cla_id = this.classID || ''
      let classData = await this.$api({ type: "classInfo" });
      let teacherData = await this.$api({ type: "teacherInfo" });
      this.getTreeData(teacherData.result, classData.result);
    } catch (err) {
      console.log(err);
    }
  },

  watch: {},

  computed: {},

  methods: {
    change() {
      this.$forceUpdate();
    },
    getTreeData(parent, child) {
      parent.map((item) => {
        item.class = [];
        const children = child.filter((data) => data.tea_id === item.tea_id);
        item.class = children;
      });
      this.classInfo = parent;
    },
  },
};
</script>
<style lang='stylus'>
</style>