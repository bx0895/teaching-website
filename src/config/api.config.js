export default {
  'register/teacher': {
    url: '/register/teacher',
    method: 'post',
    rsaKey: 'pwd'
  },
  'register/admin': {
    url: '/register/admin',
    method: 'post',
    rsaKey: 'pwd'
  },
  'register/student': {
    url: '/register/student',
    method: 'post',
    rsaKey: 'pwd'
  },
  'login': {
    url: '/login',
    method: 'post',
    setToken: true
  },
  'teacherInfo': {
    url: '/select/teacher',
    method: 'post',
  },
  'teacherDelete': {
    url: '/delete/teacher',
    method: 'post',
  },
  'teacherUpdate': {
    url: '/update/teacher',
    method: 'post',
  },
  'adminInfo': {
    url: '/select/admin',
    method: 'post',
  },
  'adminDelete': {
    url: '/delete/admin',
    method: 'post',
  },
  'adminUpdate': {
    url: '/update/admin',
    method: 'post',
  },

  'addClass': {
    url: '/insert/class',
    method: 'post',
  },
  'classInfo': {
    url: '/select/class',
    method: 'post',
  },
  'classDelete': {
    url: '/delete/class',
    method: 'post',
  },
  'classUpdate': {
    url: '/update/class',
    method: 'post',
  },
  'changePwd': {
    url: '/update/password',
    method: 'post',
    rsaKey: 'newPwd'
  },
  'pubKey': {
    url: '/keys',
    method: 'get',
  },
  'studentInfo': {
    url: '/select/student',
    method: 'post',
  },
  'studentDelete': {
    url: '/delete/student',
    method: 'post',
  },
  'studentUpdate': {
    url: '/update/student',
    method: 'post',
  },
    'noticeInfo': {
    url: '/select/notice',
    method: 'post',
  },
  'noticeDelete': {
    url: '/delete/notice',
    method: 'post',
  },
  'addNotice': {
    url: '/insert/notice',
    method: 'post', 
  },
  'noticeUpdate': {
    url: '/update/notice',
    method: 'post',
  },
  'courseUpdate': {
    url: '/update/course_info',
    method: 'post',
  },
  'courseInfo': {
    url: '/select/course_info',
    method: 'post',
  },
  'coursewareInfo': {
    url: '/select/courseware',
    method: 'post',
  },
  'coursewareDelete':{
    url: '/delete/courseware',
    method: 'post',
  },
  'chapterInsert':{
    url: '/insert/chapter',
    method: 'post',
  },
  'knowledgeInsert':{
    url: '/insert/knowledge',
    method: 'post',
  },
  'konwledgeInfo': {
    url: '/select/knowledge',
    method: 'post',
  },
  'chapterInfo': {
    url: '/select/chapter',
    method: 'post',
  },
  'h_xuanzeti': {
    url: '/insert/h_xuanzeti',
    method: 'post',
  },
  't_xuanzeti': {
    url: '/insert/t_xuanzeti',
    method: 'post',
  },
  'h_tiankongti': {
    url: '/insert/h_tiankongti',
    method: 'post',
  },
  't_tiankongti': {
    url: '/insert/t_tiankongti',
    method: 'post',
  },
  'h_jiandati': {
    url: '/insert/h_jiandati',
    method: 'post',
  },
  't_jiandati': {
    url: '/insert/t_jiandati',
    method: 'post',
  },
  'h_bianchengti': {
    url: '/insert/h_bianchengti',
    method: 'post',
  },
  't_bianchengti': {
    url: '/insert/t_bianchengti',
    method: 'post',
  },
  'tiku': {
    url: '/select/tiku',
    method: 'post',
  },
  'tikuUpdate': {
    url: '/update/tiku',
    method: 'post',  
  },
  'topicDelete': {
    url: '/delete/topic',
    method: 'post',
  },
  'topicUpdate': {
    url: '/update/topic',
    method: 'post',
  },
  'addQuestion': {
    url: '/insert/question',
    method: 'post',
  },
  'questionInfo': {
    url: '/select/question',
    method: 'post',
  },
  'questionDelete': {
    url: '/delete/question',
    method: 'post',
  },
  'replyQuestion': {
    url: '/insert/reply',
    method: 'post',
  },
  'addForum': {
    url: '/insert/forum',
    method: 'post',    
  },
  'forumInfo': {
    url: '/select/forum',
    method: 'post',   
  },
  'forumDelete': {
    url: '/delete/forum',
    method: 'post',   
  },
  'replyDelete': {
    url: '/delete/reply',
    method: 'post',   
  },
  'homeworkAdd': {
    url: '/insert/homework',
    method: 'post',   
  },
  'testAdd': {
    url: '/insert/test',
    method: 'post',   
  },
  'homeworkTopic': {
    url: '/insert/homework_topic',
    method: 'post',   
  },
  'testTopic': {
    url: '/insert/test_topic',
    method: 'post',   
  },
  'homeworkInfo': {
    url: '/select/homework',
    method: 'post',   
  },
  'homeworkDelete': {
    url: '/delete/homework',
    method: 'post',   
  },
  'testDelete': {
    url: '/delete/test',
    method: 'post',   
  },
  'testInfo': {
    url: '/select/test',
    method: 'post', 
  },
  'homeworkUpdate': {
    url: '/update/homework',
    method: 'post',   
  },
  'testUpdate': {
    url: '/update/test',
    method: 'post',   
  },
  'homeworkDetail': {
    url: '/select/topic_detail',
    method: 'post',   
  },
  'testDetail': {
    url: '/select/topic_detail',
    method: 'post',   
  },
  'addStudentTest': {
    url: '/insert/student_test',
    method: 'post',      
  },
  'addStudentHomework': {
    url: '/insert/student_homework',
    method: 'post',      
  },
  'getStudentTest': {
    url: '/select/student_test',
    method: 'post',      
  },
  'getStudentHomework': {
    url: '/select/student_homework',
    method: 'post',      
  },
  'studentHomeworkList': {
    url: '/select/group/homework',
    method: 'post', 
  },
  'correctHomework': {
    url: '/update/student_homework',
    method: 'post',   
  },
  'studentTestList': {
    url: '/select/group/test',
    method: 'post', 
  },
  'correctTest': {
    url: '/update/student_test',
    method: 'post',   
  },
  'forumUpdate': {
    url: '/update/forum',
    method: 'post',   
  },
  'homeworkScore': {
    url: '/select/stu_hw_count',
    method: 'post',      
  },
  'testScore': {
    url: '/select/stu_test_count',
    method: 'post',      
  },
}