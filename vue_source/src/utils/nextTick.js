const callbacks = [];
let pending = false;
function flushCallbacks() {
  while(callbacks.length){
    let cb = callbacks.pop();
    cb();
  }
  pending = false;
}

let timerFunc;
if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks);
  }
} else if (MutationObserver) {
  let observe = new MutationObserver(flushCallbacks);
  let textNode = document.createTextNode(1);
  observe.observe(textNode, { characterData: true });
  timerFunc = () => {
    textNode.textContent = 2;
  }
} else if (setImmdiate) {
  timerFunc = () => {
    setImmdiate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks);
  }
}

export function nextTick(cb) {
  callbacks.push(cb);
  if(!pending){
    timerFunc();
    pending = true;
  }
}