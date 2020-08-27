export default function applyMixin(Vue) {
  Vue.mixin({
    beforeCreate: vuexInit
  })
}
// vuex初始化只是将$store暴露出去
function vuexInit() {
  const options = this.$options
  if (options.store) {// 只有根组件才有store属性
    this.$store = options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}