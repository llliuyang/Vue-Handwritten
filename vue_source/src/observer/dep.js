let id = 0;
class Dep {
  constructor() {
    this.subs = [];
    this.id = id++
  }
  depend() {
    Dep.target.addDep(this)
    // this.subs.push(Dep.target)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }
}
Dep.target = null;
let stack = [];
export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher)
}

export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length-1];
}

export default Dep