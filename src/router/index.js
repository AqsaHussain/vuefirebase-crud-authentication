import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUp from '@/components/SignUp'
import Content from '@/components/Content'
import Meta from '@/components/Meta'
Vue.use(Router)

export default  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter:(to, from, next)=>{
        if(localStorage.getItem('token')){
          console.log('localstorage:'+localStorage.getItem('token'));
          next('/Content')
        }
        else{
         next()
        }
      }
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/Content',
      name: 'Content',
      component: Content,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          console.log('localstorage:'+localStorage.getItem('token'));
          next()
        }
        else{
          next('/')
        }

      }
    },{
      path: '/Meta',
      name: 'Meta',
      component: Meta,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')){
          console.log('localstorage:'+localStorage.getItem('token'));
          next()
        }
        else{
          next('/')
        }

      }
    }
  ]
})
