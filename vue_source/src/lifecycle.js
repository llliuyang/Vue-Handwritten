import { patch } from "./vdom/patch";
import Watcher from "./observer/watcher";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    const prevVnode = vm._vnode;
    if (!prevVnode) {
      vm.$el = patch(vm.$el, vnode);
    } else {
      vm.$el = patch(prevVnode, vnode);
    }
    vm._vnode = vnode;
  }
}

export function mountComponent(vm, el) {
  vm.$el = el;
  callHook(vm, 'beforeMount');
  let updateComponent = () => {
    vm._update(vm._render(el));
  }
  new Watcher(vm, updateComponent, () => {
    callHook(vm, 'updated')
  }, true);
  callHook(vm, 'mounted');
}

export function callHook(vm, hook) {
  const handler = vm.$options[hook];
  if (handler) {
    for (let i = 0; i < handler.length; i++) {
      handler[i].call(vm);
    }
  }
}