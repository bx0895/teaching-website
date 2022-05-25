export default {
  'admin': [{
      name: 'teacher',
      title: '教师管理',
      children: [{
          name: 'addTeacher',
          label: '添加教师',
          router: '/register/teacher'
        },
        {
          name: 'teacherInfo',
          label: '教师信息',
          router: '/teacher/info'
        },
      ]
    },
    {
      name: 'class',
      title: '班级管理',
      children: [{
          name: 'addClass',
          label: '添加班级',
          router: '/register/class'
        },
        {
          name: 'checkClass',
          label: '班级信息',
          router: '/class/info'
        },

      ]
    },
    {
      name: 'admin',
      title: '管理员管理',
      children: [{
          name: 'addAdmin',
          label: '添加管理员',
          router: '/register/admin'
        },
        {
          name: 'adminInfo',
          label: '管理员信息',
          router: '/admin/info'
        },
      ]
    }
  ],

  'teacherNotice': [
    {
      name: 'noticeInfo',
      label: '公告信息',
      router: '/notice/info'
    },    
    {
      name: 'createNotice',
      label: '发布公告',
      router: '/notice/create'
    },

  ],
  'teacherCourse': [{
      name: 'courseIntroduce',
      label: '课程介绍',
      router: '/courseIntroduce'
    },
    {
      name: 'teacherIntroduce',
      label: '教师介绍',
      router: '/teacherIntroduce'
    },
    {
      name: 'beforeCourse',
      label: '先导课程',
      router: '/beforeCourse'
    },
    {
      name: 'coursePlan',
      label: '课程计划',
      router: '/coursePlan'
    },
    {
      name: 'testMethod',
      label: '考试方式',
      router: '/testMethod'
    },
    {
      name: 'courseBook',
      label: '课程书目',
      router: '/courseBook'
    },
    {
      name: 'courseware',
      label: '课件上传',
      router: '/courseware'
    },
  ],
  'teacherStudent': [
    {
      name: 'StudentInfo',
      label: '学生信息',
      router: '/student/info'
    },    
    {
      name: 'RegisterStudent',
      label: '添加学生',
      router: '/student/register'
    },

    {
      name: 'StudentClassify',
      label: '我的班级',
      router: '/student/class'
    },
  ],
  'teacherHomework': [{
      name: 'addHomework',
    title: '添加题目',
    icon:'el-icon-folder-add',
      children: [{
          name: 'h-xuanzeti',
          label: '选择题',
          router: '/h_xuanzeti'
        },
        {
          name: 'h-tiankongti',
          label: '填空题',
          router: '/h_tiankongti'
        },
        {
          name: 'h-jiandati',
          label: '简答题',
          router: '/h_jiandati'
        },
        {
          name: 'h-bianchengti',
          label: '编程题',
          router: '/h_bianchengti'
        },
      ]
  },
  {
    name: 'topic',
    title: '题目',
    icon:'el-icon-document-remove',
    children: [
    {
      name: 'h-tiku',
      label: '题目概览',
      router: '/h_tiku'
      },
      {
        name: 'h_recycle',
        label: '回收站',
        router: '/h_recycle'
      },
    ]
  },
    {
      name: 'homework',
      title: '作业',
      icon:'el-icon-tickets',
      children: [
        {
          name: 'createHomework',
          label: '布置作业',
          router: '/create/homework'
        },
        {
          name: 'homeworkInfo',
          label: '作业信息',
          router: '/homework/info'
        },
      ]
    }
    ],
    'teacherTest': [{
        name: 'addTest',
      title: '添加题目',
      icon:'el-icon-folder-add',
        children: [{
            name: 't-xuanzeti',
            label: '选择题',
            router: '/t_xuanzeti'
          },
          {
            name: 't-tiankongti',
            label: '填空题',
            router: '/t_tiankongti'
          },
          {
            name: 't-jiandati',
            label: '简答题',
            router: 't_jiandati'
          },
          {
            name: 't-bianchengti',
            label: '编程题',
            router: '/t_bianchengti'
          },
        ],
    },
    {
      name: 'topic',
      title: '题目',
      icon:'el-icon-document-remove',
      children: [
      {
        name: 't-tiku',
        label: '题目概览',
        router: '/t_tiku'
        },
        {
          name: 't_recycle',
          label: '回收站',
          router: '/t_recycle'
        },
      ]
    },
      {
        name: 'test',
        title: '试卷',
        icon:'el-icon-tickets',
        children: [
          {
            name: 'createTest',
            label: '发布试卷',
            router: '/create/test'
          },
          {
            name: 'testInfo',
            label: '试卷信息',
            router: '/test/info'
          },
        ]
      }
    ],

    'teacherScore': [{
        label: '作业成绩汇总',
        router: '/score/homework'
      },
      {
        label: '考试成绩汇总',
        router: '/score/test'
      },
    ],
  'teacherReply': [
      {
        label: '论坛列表',
        router: '/forum/list'
      },
    {
        label: '创建论坛',
        router: '/add/forum'
      },

    ],

    'studentHomework': [{
        name: 'currentHomework',
        label: '当前作业',
        router: '/current/homework'
      },
      {
        name: 'historyHomework',
        label: '历史作业',
        router: '/history/homework'
      },
    ],
    'studentTest': [{
        name: 'currentTest',
        label: '当前考试',
        router: '/current/test'
      },
      {
        name: 'historyTest',
        label: '历史考试',
        router: '/history/test'
      },
    ],
    'studentQuestion': [{
        name: 'studentForum',
        label: '论坛',
        router: '/student/forum'
      },
      {
        name: 'historyQuestion',
        label: '我的问题',
        router: '/history/question'
      },
    ],
    'studentCourse': [{
        name: 'sCourseIntroduce',
        label: '课程介绍',
        router: '/course/introduce'
      },
      {
        name: 'sTeacherIntroduce',
        label: '教师介绍',
        router: '/teacher/introduce'
      },
      {
        name: 'sBeforeCourse',
        label: '先导课程',
        router: '/before/course'
      },
      {
        name: 'sCoursePlan',
        label: '课程计划',
        router: '/course/plan'
      },
      {
        name: 'sTestMethod',
        label: '考试方式',
        router: '/test/method'
      },
      {
        name: 'sCourseBook',
        label: '课程书目',
        router: '/course/book'
      },
      {
        name: 's_courseware',
        label: '课件下载',
        router: '/course/courseware'
      },
    ],

  }