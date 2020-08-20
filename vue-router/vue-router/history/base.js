export function createRoute(record, location) {
  let res = []
  if (record) {
    while (record) {
      res.unshift(record)
      record = record.parent
    }
  }

  return {
    ...location,
    matched: res
  }
}

function runQueue(queue, iterator, cb) {
  function step(index) {
    if (index >= queue.length) return cb()
    let hook = queue[index]
    iterator(hook, () => step(index + 1))
  }
  step(0)
}

class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, { path: '/' })
  }
  transitionTo(location, onComplete) {
    let route = this.router.match(location)
    if (location == this.current.path && route.matched.length == this.current.matched.length) {
      return
    }

    let queue = [].concat(this.router.beforeHooks)
    const iterator = (hook, next) => {
      hook(this.current, route, () => {
        next()
      })
    }
    runQueue(queue, iterator, () => {
      this.updateRoute(route)
      onComplete && onComplete()
    })
  }

  updateRoute(route) {
    this.current = route
    this.cb && this.cb(route)
  }

  listen(cb) {
    this.cb = cb
  }
}
export { History }