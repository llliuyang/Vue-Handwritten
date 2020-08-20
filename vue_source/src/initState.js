import { observe } from "./observer/index";
import { proxy } from "./utils/proxy";
import { nextTick } from "./utils/nextTick";
import Watcher from "./observer/watcher";
import Dep from "./observer/dep";

export function initState(vm) {
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethods(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps() { }
function initMethods() { }
function initData(vm) {
  let data = vm.$options.data;
  vm._data = data = typeof data === 'function' ? data.call(vm) : data;
  for (let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data);
}

function initComputed(vm) {
  let computed = vm.$options.computed;
  let watchers = vm._computedWatchers = {};
  for (let key in computed) {
    let userDef = computed[key];
    let getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter, () => { }, { lazy: true });
    defineComputed(vm, key, userDef);
  }
}
function defineComputed(target, key, userDef) {
  const sharePropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => { },
    set: () => { }
  };
  if (typeof userDef == 'function') {
    sharePropertyDefinition.get = createComputedGetter(key);
  } else {
    sharePropertyDefinition.get = createComputedGetter(key);
    sharePropertyDefinition.set = userDef.set;
  }
  Object.defineProperty(target, key, sharePropertyDefinition)
}
function createComputedGetter(key) {
  return function () {
    const watcher = this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if(Dep.target){
        watcher.depend();
      }
      return watcher.value;
    }
  }
}

function initWatch(vm) {
  let watch = vm.$options.watch;
  for (let key in watch) {
    const handler = watch[key];

    if (Array.isArray(handler)) {
      handler.forEach(handle => {
        createWatcher(vm, key, handle);
      })
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, exprOrFn, handler, options) {
  if (typeof handler === 'object') {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }

  return vm.$watch(exprOrFn, handler, options);
}

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function (cb) {
    nextTick(cb);
  };
  Vue.prototype.$watch = function (exprOrFn, cb, options) {
    let watcher = new Watcher(this, exprOrFn, cb, { ...options, user: true });
    if (options.immediate) {
      cb()
    }
  }
}