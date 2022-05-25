import service from './common'
import store from 'store'
import API_LIST from '@/config/api.config'
import base from '@/config/base.config'
import encrypt from '@/util/encrypt'

const { TOKEN_NAME,USER } = base

export default async function Http ({ type, data }) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  let { url, method, setToken = false, rsaKey = false } = API_LIST[type]
  try {
    if (data) {
      //如果存在需要加密的 data 键
      if (rsaKey && data[rsaKey]) {
        //加密处理
        data[rsaKey] = await encrypt(data[rsaKey])
      }
      if (rsaKey && data.q[rsaKey]) {
        //加密处理
        data.q[rsaKey] = await encrypt(data.q[rsaKey])
      }
    }
    
    let result = await service[method](url, data)
    if (setToken) {
      //本地存储用户登录的token和uid
      let token = result.token
      let uid = result.userId
      store.set(USER, uid)
      store.set(TOKEN_NAME, token)
      this.$store.dispatch('login');
      this.$notify({
        title: "通知",
        message: "登录成功",
        type: "success",
      });
    }
    return result

  } catch (error) {
    if (error.response) {
      let message = error.response.data.message
        this.$notify.error({
          title: '失败',
          message: message,
        });
    }
    return Promise.reject(error);
  }
}
