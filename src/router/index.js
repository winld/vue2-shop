import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {//路劲部分大小写
      path: '/GoodsList',
      name: 'GoodsList',
      component: GoodsList
    },
    {//路劲部分大小写
      path: '/Cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
