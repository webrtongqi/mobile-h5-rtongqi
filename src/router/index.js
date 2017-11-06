import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Common/Home'

Vue.use(Router)

export default new Router({
  routes: [
  	 {
        path: '/',
        redirect: '/Main'
    },
    {
      path: '/',
      component: Home,
      children:[
      	{
      		path: '/Main',
      		component: resolve => require(['@/components/Main/Main'], resolve)
      	},
      	{
      		path: '/Classify',
      		component: resolve => require(['@/components/Classify/Classify'], resolve)
      	},
      	{
      		path: '/Find',
      		component: resolve => require(['@/components/Find/Find'], resolve)
      	},
      	{
      		path: '/Mine',
      		component: resolve => require(['@/components/Mine/Mine'], resolve)
      	}
      ]
    }
  ]
})
