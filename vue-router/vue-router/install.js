import Link from './components/link'
import View from './components/view'
export let _Vue;
export default function install(Vue, options) {
  _Vue = Vue

  Vue.mixin({
    beforeCreate() {
      if(this.$options.router){
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this,'_route',this._router.history.current)
      }else{
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
  Vue.component('router-link', Link)
  Vue.component('router-view', View)

  Object.defineProperty(Vue.prototype,'$route',{
    get(){
      return this._routerRoot._route
    }
  })
  
  Object.defineProperty(Vue.prototype,'$router',{
    get(){
      return this._routerRoot._router
    }
  })
}