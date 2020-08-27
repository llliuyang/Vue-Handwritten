import applyMixin from "./mixin";

export let Vue;
export class Store {

}
// Vue.use()原理
//  Vue.use = function(plugin) {
//    plugin.install(this)
// }
export const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(Vue)
}