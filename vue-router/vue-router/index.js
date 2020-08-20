import install from "./install"
import createMatcher from "./create-matcher"
import HashHistory from "./history/hash"
import BrowserHistory from "./history/history"

class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes || [])
    options.mode = options.mode || 'hash'
    switch (options.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break;
      case 'history':
        this.history = new BrowserHistory(this)
        break;
    }
    this.beforeHooks = []
  }
  push(to) {
    this.history.push(to)
  }
  match(location) {
    return this.matcher.match(location)
  }
  init(app) {
    const history = this.history
    const setupHashListener = () => { history.setupListener() }
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener
    )

    history.listen((route) => {
      app._route = route
    })
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn)
  }
}
VueRouter.install = install
export default VueRouter