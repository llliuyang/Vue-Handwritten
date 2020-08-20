import { isReservedTag } from "../utils/isReservedTag";

export function renderMixin(Vue) {
  Vue.prototype._c = function () {
    return createElement(this, ...arguments);
  }
  Vue.prototype._s = function (val) {
    return val == null ? '' : (typeof val == 'object') ? JSON.stringify(val) : val;
  }
  Vue.prototype._v = function (text) {
    return createTextVnode(text);
  }
  Vue.prototype._render = function () {
    const vm = this;
    const render = vm.$options.render;
    let vnode = render.call(vm);
    return vnode;
  }
}

function createElement(vm, tag, data = {}, ...children) {
  if (isReservedTag(tag)) {
    return vnode(tag, data, data.key, children);
  } else {
    let Ctor = vm.$options.components[tag];
    return createComponent(vm, tag, data, data.key, children, Ctor);
  }

}

function createComponent(vm, tag, data, key, children, Ctor) {
  const baseCtor = vm.$options._base;
  if (typeof Ctor == 'object') {
    Ctor = baseCtor.extend(Ctor)
  }
  data.hook = {
    init(vnode) { 
      let child = vnode.componentInstance = new Ctor({});
      child.$mount();
    }
  };
  return vnode(`vue-component-${Ctor.cid}-${tag}`, data, data.key, undefined, undefined, { Ctor, children })
}

function createTextVnode(text) {
  return vnode(undefined, undefined, undefined, undefined, text)
}

function vnode(tag, data, key, children, text, componentOptions) {
  return {
    tag,
    data,
    key,
    children,
    text,
    componentOptions
  }
}


