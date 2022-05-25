import store from 'store'
const USER_MAP = {
  'teacher': 'tea_id',
  'admin': 'adm_id',
  'student':'stu_id'
}
export default {
  data () {
    return {
      userInfo: '',
    }
  },
  methods: {
    async getUserInfo () {
      let loginType = store.get('log_name')
      let idName = USER_MAP[loginType]
      let res = await this.$api(
        {
          type: `${loginType}Info`,
          data: { q: { [idName]: store.get('uid')} }
        },
      )
      this.userInfo = res.result
    }
  },
}