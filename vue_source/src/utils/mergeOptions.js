export const LIFECYCLE_HOOKS = [
  'beforeCreated',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]
let strats = {};
// strats.data=function(parentValue,childValue){
//   return childValue
// };

strats.components = function(parentValue,childValue){
  const res = Object.create(parentValue);
  if(childValue){
    for(let key in childValue){
      res[key] = childValue[key];
    }
  }
  return res;
}
// strats.watch=function(){};
// strats.computed=function(){};

function mergeHook(parentValue,childValue){
  if(childValue){
    if(parentValue){
      return parentValue.concat(childValue)
    }else{
      return [childValue]
    }
  }else{
    return parentValue;
  }
}

LIFECYCLE_HOOKS.forEach(hook=>{
  strats[hook] = mergeHook
})

export function mergeOptions(parent,child){
  let options = {};
  for(let key in parent){
    mergeFiled(key)
  }

  for(let key in child){
    if(!parent.hasOwnProperty(key)){
      mergeFiled(key)
    }
  }

  function mergeFiled(key){
    if(strats[key]){
      options[key] = strats[key](parent[key],child[key])
    }else{
      if(typeof parent[key] == 'object' && typeof child[key] == 'object'){
        options[key] = {...parent[key],...child[key]}
      }else{
        if(child[key]){
          options[key] = child[key];
        }else{
          options[key] = parent[key];
        }
        
      } 
    }
  }
  return options;
}