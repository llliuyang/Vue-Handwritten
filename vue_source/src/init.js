import { initState } from "./initState";
import { compileToFunction } from "./compiler/index";
import { mountComponent, callHook } from "./lifecycle";
import { mergeOptions } from "./utils/mergeOptions";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = mergeOptions(vm.constructor.options, options);

    callHook(vm, 'beforeCreate');
    //初始化状态
    initState(vm);

    callHook(vm, 'created');

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }

      const render = compileToFunction(template);
      options.render = render;
    }

    mountComponent(vm, el);
  }
}

