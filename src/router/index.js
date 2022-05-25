import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from 'store'
import base from '@/config/base.config'

import Login from '../views/Login.vue'
import BaseMain from '@/components/base/BaseMain.vue'
import Student from '@/views/Student'
import Teacher from '@/views/Teacher'
import Admin from '@/views/Admin'

const {
  TOKEN_NAME,
  LOGIN_TYPE
} = base
Vue.use(VueRouter)

const routes = [
  //登录
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 管理员
  /* admin start */
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [{
        path: '/admin/message',
        name: 'adminMessage',
        component: resolve => require(['@/components/base/UserInfo'], resolve)
      },
      {
        path: '/register/teacher',
        name: 'registerTeacher',
        component: resolve => require(['@/components/admin/TeacherRegister'], resolve)
      },
      {
        path: '/teacher/info',
        name: 'teacherInfo',
        component: resolve => require(['@/components/admin/TeacherInfo'], resolve)
      },
      {
        path: '/register/class',
        name: 'registerClass',
        component: resolve => require(['@/components/admin/AddClass'], resolve)
      },
      {
        path: '/class/info',
        name: 'classInfo',
        component: resolve => require(['@/components/admin/ClassInfo'], resolve)
      },
      {
        path: '/register/admin',
        name: 'registerAdmin',
        component: resolve => require(['@/components/admin/AdminRegister'], resolve)
      },
      {
        path: '/admin/info',
        name: 'adminInfo',
        component: resolve => require(['@/components/admin/AdminInfo'], resolve)
      },
    ]
  },
  /* admin end */

  /* teacher start */
  {
    path: '/teacher',
    name: 'teacher',
    component: Teacher,
    redirect: '/index',
    children: [{
        path: '/teacher/message',
        name: 'teacherMessage',
        component: resolve => require(['@/components/base/UserInfo'], resolve)
      },
      {
        path: '/index',
        name: 'index',
        component: resolve => require(['@/components/teacher/index'], resolve)
      },
      {
        path: '/teacher/notice',
        name: 'teacherNotice',
        redirect: '/notice/info',
        component: BaseMain,
        children: [{
            path: '/notice/create',
            name: 'createNotice',
            component: resolve => require(['@/components/teacher/notice/AddNotice'], resolve)
          },
          {
            path: '/notice/info',
            name: 'noticeInfo',
            component: resolve => require(['@/components/teacher/notice/NoticeInfo'], resolve)
          },
        ]
      },
      {
        path: '/teacher/course',
        name: 'teacherCourse',
        component: BaseMain,
        redirect:'/courseIntroduce',
        children: [{
            path: '/courseIntroduce',
            name: 'courseIntroduce',
            component: resolve => require(['@/components/teacher/course/CIntroduct'], resolve)
          },
          {
            path: '/teacherIntroduce',
            name: 'teacherIntroduce',
            component: resolve => require(['@/components/teacher/course/TIntroduct'], resolve)
          },
          {
            path: '/beforeCourse',
            name: 'beforeCourse',
            component: resolve => require(['@/components/teacher/course/BeforeCourse'], resolve)
          },
          {
            path: '/coursePlan',
            name: 'coursePlan',
            component: resolve => require(['@/components/teacher/course/CoursePlan'], resolve)
          },
          {
            path: '/testMethod',
            name: 'testMethod',
            component: resolve => require(['@/components/teacher/course/TestMethod'], resolve)
          },
          {
            path: '/courseBook',
            name: 'courseBook',
            component: resolve => require(['@/components/teacher/course/CourseBook'], resolve)
          },
          {
            path: '/courseware',
            name: 'courseware',
            component: resolve => require(['@/components/teacher/course/Courseware'], resolve)
          },
        ]
      },
      {
        path: '/teacher/student',
        name: 'teacherStudent',
        component: BaseMain,
        redirect: '/student/info',
        children: [{
            path: '/student/register',
            name: 'registerStudent',
            component: resolve => require(['@/components/teacher/student/StudentRegister'], resolve)
          },
          {
            path: '/student/info',
            name: 'studentInfo',
            component: resolve => require(['@/components/teacher/student/StudentInfo'], resolve)
          },
          {
            path: '/class/student',
            component: resolve => require(['@/components/teacher/student/StudentInfo'], resolve)
          },
          {
            path: '/student/class',
            name: 'studentClass',
            component: resolve => require(['@/components/teacher/student/MyClass'], resolve)
          }
        ]
      },
      {
        path: '/teacher/homework',
        name: 'teacherHomework',
        component: BaseMain,
        children: [{
            path: '/h_xuanzeti',
            name: 'h_xuanzeti',
            component: resolve => require(['@/components/teacher/exam/Choice'], resolve)
          },
          {
            path: '/h_tiankongti',
            name: 'h_tiankongti',
            component: resolve => require(['@/components/teacher/exam/Filling'], resolve)
          },
          {
            path: '/h_jiandati',
            name: 'h_jiandati',
            component: resolve => require(['@/components/teacher/exam/ShortQues'], resolve)
          },
          {
            path: '/h_bianchengti',
            name: 'h_bianchengti',
            component: resolve => require(['@/components/teacher/exam/Programme'], resolve)
          },
          {
            path: '/h_tiku',
            name: 'h_tiku',
            component: resolve => require(['@/components/teacher/exam/HomeworkExam'], resolve)
          },
          {
            path: '/h_recycle',
            name: 'h_recycle',
            component: resolve => require(['@/components/teacher/exam/Recycle'], resolve)
          },
          {
            path: '/create/homework',
            name: 'createHomework',
            component: resolve => require(['@/components/teacher/homework/AddHomework'], resolve)
          },
          {
            path: '/homework/info',
            name: 'homeworkInfo',
            component: resolve => require(['@/components/teacher/homework/HomeworkInfo'], resolve)
          },
          {
            path: '/select/topic',
            name: 'selectTopic',
            component: resolve => require(['@/components/teacher/common/SelectTopic'], resolve)
          },
          {
            path: '/random/topic',
            name: 'randomTopic',
            component: resolve => require(['@/components/teacher/common/RandomTopic'], resolve)
          },
          {
            path: '/correct/homework',
            component: resolve => require(['@/components/teacher/homework/HomeworkItem'], resolve)
          },
        ]
      },
      {
        path: '/teacher/test',
        name: 'teacherTest',
        component: BaseMain,
        children: [{
            path: '/t_xuanzeti',
            name: 't_xuanzeti',
            component: resolve => require(['@/components/teacher/exam/Choice'], resolve)
          },
          {
            path: '/t_tiankongti',
            name: 't_tiankongti',
            component: resolve => require(['@/components/teacher/exam/Filling'], resolve)
          },
          {
            path: '/t_jiandati',
            name: 't_jiandati',
            component: resolve => require(['@/components/teacher/exam/ShortQues'], resolve)
          },
          {
            path: '/t_bianchengti',
            name: 't_bianchengti',
            component: resolve => require(['@/components/teacher/exam/Programme'], resolve)
          },
          {
            path: '/t_tiku',
            name: 't_tiku',
            component: resolve => require(['@/components/teacher/exam/TestExam'], resolve)
          },
          {
            path: '/t_recycle',
            name: 't_recycle',
            component: resolve => require(['@/components/teacher/exam/Recycle'], resolve)
          },
          {
            path: '/create/test',
            name: 'createTest',
            component: resolve => require(['@/components/teacher/test/AddTest'], resolve)
          },
          {
            path: '/test/info',
            name: 'testInfo',
            component: resolve => require(['@/components/teacher/test/TestInfo'], resolve)
          },
          {
            path: '/correct/test',
            component: resolve => require(['@/components/teacher/test/TestItem'], resolve)
          },
        ]
      },
      {
        path: '/teacher/reply',
        name: 'teacherReply',
        component: BaseMain,
        redirect: '/forum/list',
        children: [
          {
            path: '/forum/list',
            component: resolve => require(['@/components/teacher/forum/ForumList'], resolve),
          },
          {
            path: '/add/forum',
            component: resolve => require(['@/components/teacher/forum/AddForum'], resolve),
          },
          {
            path: '/teacher/forum',
            component: resolve => require(['@/components/teacher/forum/Question'], resolve),
          },
        ]
      },
      {
        path: '/teacher/score',
        name: 'score',
        component: BaseMain,
        children: [{
            path: '/score/homework',
            component:  resolve => require(['@/components/teacher/score/ScoreTable'], resolve)
          },
          {
            path: '/score/test',
            component: resolve => require(['@/components/teacher/score/ScoreTable'], resolve)
          }
        ]
      },
    ]
  },
  /* teacher end */
  /* student start */
  {
    path: '/student',
    name: 'student',
    component: Student,
    redirect: '/notice',
    children: [{
        path: '/notice',
        name: 'notice',
        component: resolve => require(['@/components/student/Notice'], resolve)
      },
      {
        path: '/student/message',
        name: 'studentMessage',
        component: resolve => require(['@/components/base/UserInfo'], resolve)
      },
      {
        path: '/studentCourse',
        name: 'studentCourse',
        component: BaseMain,
        redirect: '/course/introduce',
        children: [{
            path: '/course/introduce',
            name: 'sCourseIntroduce',
            component: resolve => require(['@/components/student/course/CIntroduct'], resolve)
          },
          {
            path: '/teacher/introduce',
            name: 'sTeacherIntroduce',
            component: resolve => require(['@/components/student/course/TIntroduct'], resolve)
          },
          {
            path: '/before/course',
            name: 'sBeforeCourse',
            component: resolve => require(['@/components/student/course/BeforeCourse'], resolve)
          },
          {
            path: '/course/plan',
            name: 'sCoursePlan',
            component: resolve => require(['@/components/student/course/CoursePlan'], resolve)
          },
          {
            path: '/test/method',
            name: 'sTestMethod',
            component: resolve => require(['@/components/student/course/TestMethod'], resolve)
          },
          {
            path: '/course/book',
            name: 'sCourseBook',
            component: resolve => require(['@/components/student/course/CourseBook'], resolve)
          },
          {
            path: '/course/courseware',
            name: 'sCourseware',
            component: resolve => require(['@/components/student/course/CourseTable'], resolve)
          },
        ]
      },
      {
        path: '/homework',
        name: 'studentHomework',
        component: BaseMain,
        redirect: '/current/homework',
        children: [{
            path: '/current/homework',
            name: 'currentHomework',
            component: resolve => require(['@/components/student/homework/Current'], resolve)
          },
          {
            path: '/history/homework',
            name: 'historyHomework',
            component: resolve => require(['@/components/student/homework/History'], resolve)
          },
          {
            path: '/assignment',
            component: resolve => require(['@/components/student/homework/HistoryHomework'], resolve)
          },
          {
            path: '/homework/detail',
            name: 'homeworkDetail',
            component: resolve => require(['@/components/student/homework/HomeworkDetail'], resolve)
          },
          {
            path: '/success',
            name: 'success',
            component: resolve => require(['@/components/student/common/Success'], resolve)          
          }
        ]
      },
      {
        path: '/test',
        name: 'studentTest',
        component: BaseMain,
        redirect: '/current/test',
        children: [{
            path: '/current/test',
            name: 'currentTest',
            component: resolve => require(['@/components/student/test/Current'], resolve)
          },
          {
            path: '/history/test',
            name: 'historyTest',
            component: resolve => require(['@/components/student/test/History'], resolve)
          },
          {
            path: '/test/detail',
            name: 'testDetail',
            component: resolve => require(['@/components/student/test/TestDetail'], resolve)
          },
        ]
      },
      {
        path: '/question',
        name: 'question',
        component: BaseMain,
        redirect: '/student/forum',
        children: [
          {
            path: '/student/forum',
            name: 'studentForum',
            component: resolve => require(['@/components/student/question/ForumList'], resolve)
        },
        {
          path: '/add/question',
          name: 'addQuestion',
          component: resolve => require(['@/components/student/question/Question'], resolve)
        },
          {
            path: '/history/question',
            name: 'historyQuestion',
            component: resolve => require(['@/components/student/question/MyQuestion'], resolve)
          },
        ]
      },
    ]
  },
  /* student end */
]


const router = new VueRouter({
  routes
})




router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.name !== 'login' && !store.get(TOKEN_NAME)) {
    NProgress.done()
    next('/login')
  }
  if (store.get(LOGIN_TYPE) === 'admin' && store.get(TOKEN_NAME)) {

    if (to.path === '/admin') {
      next()
    }
    if (to.path === '/') {
      next({
        name: 'admin'
      })
    }
  }
  if (store.get(LOGIN_TYPE) === 'teacher' && store.get(TOKEN_NAME)) {

    if (to.path === '/teacher') {
      next()
    }
    if (to.path === '/') {
      next({
        name: 'teacher'
      })
    }
  }
  if (store.get(LOGIN_TYPE) === 'student' && store.get(TOKEN_NAME)) {

    if (to.path === '/student') {
      next()
    }
    if (to.path === '/') {
      next({
        name: 'student'
      })
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router