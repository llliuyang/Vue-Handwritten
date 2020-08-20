export function proxy(vm,attr,key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[attr][key]
    },
    set(newValue){
      vm[attr][key] = newValue
    }
  })
}