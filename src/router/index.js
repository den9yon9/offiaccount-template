import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import qs from 'qs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // 处理地址中的hotel_id参数
  let hotel_id = localStorage.getItem('hotel_id')
  if (!hotel_id) {
    let search = window.location.search.split('?')[0]
    let hotel_id = qs.parse(search).hotel_id
    if (!hotel_id) alert('未设置hotel_id')
    else localStorage.setItem('hotel_id', hotel_id)
  }

  // 处理地址中的code参数
  let openid = localStorage.getItem('openid')
  if (!openid) {
    let search = window.location.search.split('?')[0]
    let code = qs.parse(search).code
    if (code) {
      let openid = await Vue.prototype.$http.getOpenidByCode(code)
      localStorage.setItem('openid', openid)
      next()
    } else {
      window.location.replace(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx56c01c125d7280ef&redirect_uri=${encodeURIComponent('http://xface.mindcar.cn/offiaccount/#/login')}&response_type=code&scope=snsapi_base&state=test&connect_redirect=1#wechat_redirect`
      )
    }
  } else {
    next()
  }

})

export default router
