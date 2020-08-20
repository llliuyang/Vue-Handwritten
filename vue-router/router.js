import Vue from 'vue';
import Router from './vue-router';
import Home from './views/Home';
import About from './views/About';

Vue.use(Router);

let router =  new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: Home },
    {
      path: '/about',
      component: About,
      children: [{ path: 'a', component: { render: (h) => <h1>About A</h1> } }],
    },
  ],
});
router.matcher.addRoutes([{path:'/auth', component:{ render: (h) => h('auth')}}])

// router.beforeEach((from,to,next) => {
//   console.log('1');
//   setTimeout(() => {next()},1000)
// })
// router.beforeEach((from,to,next) => {
//   console.log('2');
//   setTimeout(() => {next()},1000)
// })
export default router


