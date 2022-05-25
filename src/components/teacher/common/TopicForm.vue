<template>
  <div>
    <el-card>
      <el-form :model="form"
               class="tw-search--form"
               label-width="100px">
        <el-form-item v-for="(item,idx) in formData"
                      :key="idx"
                      :label="item.label">
          <el-input v-model="form[item.query]"
                    :type="item.type"
                    :placeholder="item.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="选择班级">
          <el-select v-model="cla_id"
                     placeholder="请选择班级,可多选"
                     multiple
                     style="width:100%">
            <el-option v-for="item in classInfo"
                       :key="item.cla_id"
                       :label="item.cla_name"
                       :value="item.cla_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间"
                      prop="start_time">
          <el-date-picker v-model="form.start_time"
                          type="datetime"
                          placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间"
                      prop="end_time">
          <el-date-picker v-model="form.end_time"
                          type="datetime"
                          placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import FORM_MAP from "@/config/form.config";
import store from "store";
export default {
  name: "",

  components: {},

  props: {
    formType: {
      type: String,
    },
  },

  data() {
    return {
      form: {
        cla_id: "",
        describe: "",
        require: "",
        start_time: "",
        end_time: "",
      },
      classType: {
        q: { tea_id: store.get("uid") },
      },
      classInfo: [],
      cla_id: "",
    };
  },

  watch: {},

  async created() {
    try {
      let data = await this.$api({ type: "classInfo", data: this.classType });
      this.classInfo = data.result
    } catch (err) {
      console.log(err);
    }
  },

  computed: {
    formData() {
      return FORM_MAP[this.formType]?.formData || '';
    },
  },

  methods: {},
};
</script>
<style lang='stylus'>
</style>