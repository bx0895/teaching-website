import moment from 'moment'
export default {
  data () {
    return {

    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    formatTime(time){
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    success (msg) {
      this.$notify({
        title: "通知",
        message: msg,
        type: "success",
      });
    },
    error (msg) {
      this.$notify({
        title: "通知",
        message: msg,
        type: "error",
      });
    },
 
  },
}