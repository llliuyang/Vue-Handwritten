import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vdom/index";
import { initGlobalApi } from "./global-api/index";
import { stateMixin } from "./initState";
function Vue(options) {
  this._init(options);
}
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
stateMixin(Vue);

initGlobalApi(Vue);

export default Vue