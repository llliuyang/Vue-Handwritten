import { arrayMethods } from './array'
import { defineProperty } from '../utils/defineProperty';
import Dep from './dep';

class Observer {
  constructor(value) {
    this.dep = new Dep();
    defineProperty(value, '__ob__', this)

    if (Array.isArray(value)) {  // 当value是数组时
      value.__proto__ = arrayMethods; //重写数组原型方法
      this.observeArray(value);
    } else { // 当value是对象时
      this.walk(value);
    }
  }
  walk(data) {   // 数据是对象时的操作
    let keys = Object.keys(data);
    keys.forEach(key => {
      difineReactive(data, key, data[key]);
    })
  }
  observeArray(data) {  // 数据是数组时的操作
    data.forEach(item => {
      observe(item)
    })
  }
}

function difineReactive(data, key, value) {
  let childDep = observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.depend();
        if(childDep){
          childDep.dep.depend();
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue);
      value = newValue;

      dep.notify();
    }
  })
}

export function observe(data) {
  // 若data不是对象 或者data是null    typeof null === 'object'
  if (typeof data !== 'object' || data == null) {
    return;
  };
  if (data.__ob__) {
    return data;
  }
  return new Observer(data); //data是对象

}