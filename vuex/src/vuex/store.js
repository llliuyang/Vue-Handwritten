import applyMixin from "./mixin";
import { forEachValue } from "./util";

export let Vue;
export class Store {
  constructor(options) {
    // this.state = options.state //这样写数据不是响应式的，改变数据视图不会更新
    const state = options.state
    const computed = {}

    this.getters = {}
    forEachValue(options.getters, (fn, key) => {
      computed[key] = () => {
        return fn(this.state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })

    this._vm = new Vue({
      data: {
        $$state: state
      },
      computed
    });

    // Object.keys(options.getters).forEach(key => {
    //   Object.defineProperty(this.getters, key, {
    //     get: () => options.getters[key](this.state)
    //   })
    // })

    this.mutations = {}
    this.actions = {}
    forEachValue(options.mutations, (fn, key) => {
      this.mutations[key] = (payload) => fn(this.state, payload)
    })

    forEachValue(options.actions, (fn, key) => {
      this.actions[key] = (payload) => fn(this, payload)
    })

  };

  commit = (type, payload) => {
    this.mutations[type](payload)
  }

  dispatch = (type, payload) => {
    this.actions[type](payload)
  }
  
  get state() {
    return this._vm._data.$$state
  };
}
// Vue.use()原理
//  Vue.use = function(plugin) {
//    plugin.install(this)
// }
export const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(Vue)
}