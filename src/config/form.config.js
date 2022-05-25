export default {
    'admin': {
      title: '管理员',
      formType: 'register',
      formData: [
        {
          label: "账号",
          query: "adm_id",
          type: "text",
          placeholder: "账号: 6-18位 数字、小写字母、大写字母",
          disabled:true
        },
        {
          label: "姓名",
          query: "name",
          type: "text",
          placeholder: "姓名: 必填"
        },
        {
          label: "密码",
          query: "pwd",
          type: "password",
          placeholder: "密码: 6-18位 数字、小写字母、大写字母"
        },
      ]
    },
    'teacher': {
      title: '教师',
      formType: 'register',
      formData: [
        {
          label: "账号",
          query: "tea_id",
          type: "text",
          placeholder: "账号: 6-18位 数字、小写字母、大写字母",
          disabled:true
        },
        {
          label: "姓名",
          query: "name",
          type: "text",
          placeholder: "姓名: 必填"
        },
        {
          label: "电话号码",
          query: "phone",
          type: "text",
          placeholder: "电话: "
        },
        {
          label: "邮箱",
          query: "email",
          type: "text",
          placeholder: "邮箱: "
        },
        {
          label: "密码",
          query: "pwd",
          type: "password",
          placeholder: "密码: 6-18位 数字、小写字母、大写字母"
        },
      ]
    },
    'student': {
      title: '学生',
      formType: 'register',
      formData: [
        {
          label: "账号",
          query: "stu_id",
          type: "text",
          placeholder: "账号: 6-18位 数字、小写字母、大写字母",
          disabled:true
        },
        {
          label: "姓名",
          query: "name",
          type: "text",
          placeholder: "姓名: 必填"
        },
        {
          label: "电话号码",
          query: "phone",
          type: "text",
          placeholder: "电话: "
        },
        {
          label: "邮箱",
          query: "email",
          type: "text",
          placeholder: "邮箱: "
        },
        {
          label: "密码",
          query: "pwd",
          type: "password",
          placeholder: "密码: 6-18位 数字、小写字母、大写字母"
        },
      ]
  },
  'class': {
    title: '班级',
    formType: 'register',
    formData: [
      {
        label: "班级名称",
        query: "cla_name",
        type: "text",
      },
      {
        label: "班级教师",
        query: "name",
        type: "text",
        disabled:true
      },
      {
        label: "教师编号",
        query: "tea_id",
        type: "text",
      }

    ],
  },
  'notice': {
    title: '通知',
    formType: 'form',
    formData: [
      {
        label: "标题",
        placeholder: '请输入标题',
        query: "title",
        type: "text",
      },
      {
        label: "内容",
        placeholder: '请输入内容',
        query: "content",
        type: "textarea",
      }

    ]
  },
    'homework': {
      title: '作业',
      formType: 'form',
      formData: [
        {
          label: "作业描述",
          placeholder:'必填项',
          query: "describe",
          type: "text",
        },
        {
          label: "作业要求",
          placeholder:'选填',
          query: "require",
          type: "textarea",  
        },
        {
          label: "作业分值",
          placeholder:'填入作业分值',
          query: "score",
          type: "text",        
        },
  
      ]
  },
  'test': {
    title: '考试',
    formType: 'form',
    formData: [
      {
        label: "试卷描述",
        placeholder:'必填项',
        query: "describe",
        type: "text",
      },
      {
        label: "试卷要求",
        placeholder:'选填',
        query: "require",
        type: "textarea",        
      },
      {
        label: "试卷分值",
        placeholder:'填入试卷分值',
        query: "score",
        type: "text",        
      },
      {
        label: "考试时长",
        placeholder:'填入阿拉伯数字，单位为分钟',
        query: "duration",
        type: "text",        
      }
    ]
  },
  'forum': {
    formData: [
      {
        label: '标题',
        query: 'title',
        type: 'text'
      }
    ]
  }
}