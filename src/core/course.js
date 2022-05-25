import store from 'store'
// import { mapState } from "vuex";
export default {
  data () {
    return {
      userInfo:''
    }
  },
  computed: {
    // ...mapState(["userInfo"]),
  },

  created() {
    this.userInfo = this.$store.getters.userInfo
  },

  methods: {
    async getCourse () {
      try {
        let res = await this.$api({
          type: 'courseInfo',
          data: {
            q: { tea_id: store.get('uid') },
          }
        })
        return res.result
      } catch (err) {
        console.log(err)
      }
    },
    async getStudentCourse () {
      try {
        let res = await this.$api({
          type: 'courseInfo',
          data: {
            q: { tea_id: this.userInfo.tea_id },
          }
        })
        return res.result
      } catch (err) {
        console.log(err)
      }
    },
     async setCourse (courseData) {
    try {
       await this.$api({
        type: 'courseUpdate',
        data: {
          id: store.get('uid'),
          updateData:courseData,
        }
      })
    } catch (err) {
      console.log(err)
    }
 }
  },
 
}