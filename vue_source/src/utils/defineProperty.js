export function defineProperty(target,key,value){
  Object.defineProperty(target,key,{
    enumerable:false,
    configurable:false,
    value
  })
}