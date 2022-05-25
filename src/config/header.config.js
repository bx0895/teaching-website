export default {
  'teacher': [{
      name:'teacherIndex',
      label: '首页',
      router:'/index'
    },
    {
      name:'teacherNotice',
      label: '公告',
      router: '/teacher/notice'
    },
    {
      name:'teacherCourse',
      label: '课程信息',
      router: '/teacher/course'
    },
    {
      name:'teacherStudent',
      label: '学生',
      router: '/teacher/student'
    },
    {
      name:'teacherHomework',
      label: '作业',
      router: '/teacher/homework'
    },
    {
      name:'teacherTest',
      label: '考试',
      router: '/teacher/test'
    },
    {
      name:'teacherReply',
      label: '答疑',
      router: '/teacher/reply'
    },
    // {
    //   name:'teacherScore',
    //   label: '成绩汇总',
    //   router: '/teacher/score'
    // },
  ],
  'student': [{
    name:'studentNotice',
      label: '公告',
      router: '/notice'
    },
    {
      name:'studentCourse',
      label: '课程信息',
      router: '/studentCourse'
    },
    {
      name:'studentHomework',
      label: '在线作业',
      router: '/homework'
    },
    {
      name:'studentTest',
      label: '在线考试',
      router: '/test'
    },
    {
      name:'studentQuestion',
      label: '答疑',
      router: '/question'
    }
  ]

}