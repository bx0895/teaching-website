
export default {
  userId: [
    {
    required: true,
    message: '账号必填',
    trigger: 'blur'
  },
  {
    pattern: /^\w{6,18}$/,
    message: '账号格式：6-18位数字、大小写字母、符号 ',
    trigger: 'blur'
  }
],
  adm_id: [{
      required: true,
      message: '账号必填',
      trigger: 'blur'
    },
    {
      pattern: /^\w{6,18}$/,
      message: '账号格式：6-18位数字、大小写字母、符号 ',
      trigger: 'blur'
    }
  ],
  stu_id: [{
    required: true,
    message: '账号必填',
    trigger: 'blur'
  },
  {
    pattern: /^\w{6,18}$/,
    message: '账号格式：6-18位数字、大小写字母、符号',
    trigger: 'blur'
  }
],
  name: [{
    required: true,
    message: '姓名必填',
    trigger: 'blur'
  }],
  cla_name: [{
    required: true,
    message: '班级名必填',
    trigger: 'blur'
  }],
  email: [{
    type: 'email',
    message: '请输入正确的邮箱格式',
    trigger: 'blur'
  }],
  phone: [{
    pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
    message: '请输入正确的手机号码',
    trigger: 'blur'
  }],
  pwd: [
    {
      pattern: /^\w{6,18}$/,
      message: '密码格式：6-18位数字、大小写字母、符号',
      trigger: 'blur'
    }
  ],
  checkPwd: [
    {
      pattern: /^\w{6,18}$/,
      message: '密码格式：6-18位数字、大小写字母、符号',
      trigger: 'blur'
    },
  ],
  title: [{ required: true, message: "必填", trigger: "blur" }],
  content: [{ required: true, message: "必填", trigger: "blur" }],
  start_time: [{ required: true, message: "必填", trigger: "blur" }],
  end_time: [{ required: true, message: "必填", trigger: "blur" }],
  describe: [{ required: true, message: "必填", trigger: "blur" }],
}