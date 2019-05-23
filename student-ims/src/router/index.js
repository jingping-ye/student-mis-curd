import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ClassManagement',
      component: () => import('../components/classManagement')
    },
    {
      path: '/stu',
      name: 'StuManagement',
      component: () => import('../components/stuManagement')
    }
  ]
})
