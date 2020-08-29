import applyMixin from "./mixin";
import ModuleCollection from "./module/module-collection";
import { forEachValue } from "./util";

export let Vue;
// 获取最新状态，保证数据更新
function getState(store,path) {
  return path.reduce((newState,current)=>{
    return newState[current]
  },store.state)

}
/**
 * 
 * @param {*} store 容器
 * @param {*} rootState 根模块
 * @param {*} path 所有路径
 * @param {*} module 格式化后的结果
 */
const installModule = (store, rootState, path, module) => {

  let namespace = store._modules.getNamespaced(path)

  if (path.length > 0) {
    let parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current]
    }, rootState)
    Vue.set(parent, path[path.length - 1], module.state)
  }

  module.forEachMutation((mutation, key) => {
    key = namespace + key
    store._mutations[key] = (store._mutations[key] || [])
    store._mutations[key].push((payload) => {
      mutation.call(store, getState(store,path), payload)
      store._subscribes.forEach(fn => {
        fn(mutation, store.state)
      })
    })
  });

  module.forEachAction((action, key) => {
    key = namespace + key
    store._actions[key] = (store._actions[key] || [])
    store._actions[key].push((payload) => {
      action.call(store, store, payload)
    })
  });

  module.forEachGetter((getter, key) => {
    key = namespace + key
    store._wrappedGetters[key] = function () {
      return getter(getState(store,path))
    }
  });

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child)
  })

}

function resetStateVM(store, state) {
  const computed = {}
  store.getters = {}

  forEachValue(store._wrappedGetters, (fn, key) => {
    computed[key] = () => {
      return fn()
    }
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key]
    })
  })

  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })

}

export class Store {
  constructor(options) {
    const state = options.state
    this._mutations = {}
    this._actions = {}
    this._wrappedGetters = {}
    this._subscribes = []
    // 格式化数据
    this._modules = new ModuleCollection(options)
    // 安装模块
    installModule(this, state, [], this._modules.root)
    // 将getters state 定义到vm实例上
    resetStateVM(this, state)
    // 插件执行
    options.plugins.forEach(plugin => plugin(this))
  };

  subscribe(fn) {
    this._subscribes.push(fn)
  }

  replaceState(state) {
    this._vm._data.$$state = state
  }

  commit = (type, payload) => {
    this._mutations[type].forEach(mutation => mutation.call(this, payload))
  }

  dispatch = (type, payload) => {
    this._actions[type].forEach(action => action.call(this, payload))
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