<template>
  <div id="app">
    张三今年 {{ this.$store.state.age }} 岁啦！<br />
    李四今年 {{ this.$store.getters.myAge }} <br />

    a模块: {{ this.$store.state.a.age }}<br />
    b模块: {{ this.$store.state.b.age }} <br />

    <button @click="$store.commit('b/changeAge', 1)">同步更新+1</button>
    <button @click="$store.dispatch('changeAge', 1)">异步更新+1</button>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style scoped>
#app {
  font-size: 22px;
}
</style>