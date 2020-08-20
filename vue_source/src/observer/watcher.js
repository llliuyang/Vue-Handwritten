import { pushTarget, popTarget } from "./dep";
import { nextTick } from "../utils/nextTick";

let id = 0;
class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    this.id = id++;
    this.deps = [];
    this.depsId = new Set();
    this.user = options.user;
    this.lazy = options.lazy;
    this.dirty = this.lazy;

    if (typeof exprOrFn == 'function') {
      this.getter = exprOrFn;
    } else {
      this.getter = function () {
        let path = exprOrFn.split('.');
        let obj = vm;
        for (let i = 0; i < path.length; i++) {
          obj = obj[path[i]];
        }
        return obj
      }
    }
    this.value = this.lazy ? void 0 : this.get();
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }

  }
  get() {
    pushTarget(this);
    let result = this.getter.call(this.vm);
    popTarget();
    return result;
  }
  update() {
    if (this.lazy) {
      this.dirty = true
    } else {
      queueWatcher(this)
    }
  }
  run() {
    let newValue = this.get();
    let oldValue = this.value;
    this.value = newValue;
    if (this.user) {
      this.cb.call(this.vm, newValue, oldValue)
    }
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  depend(){
    let i = this.deps.length;
    while(i--){
      this.deps[i].depend()
    }
  }
}

let queue = [];
let has = {};
let pending = false;
function queueWatcher(Watcher) {
  const id = Watcher.id;
  if (has[id] == null) {
    queue.push(Watcher);
    has[id] = true
    if (!pending) {
      nextTick(flushSchedulerQueue);
      pending = true;
    }
  }
}

function flushSchedulerQueue() {
  setTimeout(() => {
    queue.forEach(watcher => {
      watcher.run();
      if (!watcher.user) {
        watcher.cb()
      }
    });
    queue = [];
    has = {};
    pending = false;
  }, 0);
}
export default Watcher