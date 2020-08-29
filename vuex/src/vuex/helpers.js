export function mapState(stateArr) {
  let obj = {}
  stateArr.forEach(stateName => {
    obj[stateName] = function () {
      return this.$store.state[stateName]
    }
  })
  return obj
}

export function mapGetters(getterArr) {
  let obj = {}
  getterArr.forEach(getterName => {
    obj[getterName] = function () {
      return this.$store.getters[getterName]
    }
  })
  return obj
}