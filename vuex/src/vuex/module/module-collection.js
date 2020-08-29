import { forEachValue } from "../util"
import Module from "./module"

class ModuleCollection {
  constructor(options) {
    this.register([], options)
  };

  register(path, rootModule) {
    let newModule = new Module(rootModule)

    if (path.length == 0) { // 空路径表明是根模块
      this.root = newModule
    } else {// [a,c,d]=>[a,c]
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current)
      }, this.root)
      parent.addChild(path[path.length - 1],newModule)
    }

    if (rootModule.modules) { // 如果根模块有module属性，那就继续注册
      forEachValue(rootModule.modules, (module, moduleName) => {
        this.register(path.concat(moduleName), module)
      })
    }

  };
}

export default ModuleCollection