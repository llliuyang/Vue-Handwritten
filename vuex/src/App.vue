<template>
  <div id="app">
    张三今年 {{ age }} 岁啦！<br />
    李四今年 {{ myAge }} <br />

    <!-- a模块: {{ this.$store.state.a.age }} <br />
    b模块: {{ this.$store.state.b.age }} <br /> -->

    <button @click="$store.commit('changeAge', 1)">同步更新+1</button>
    <button @click="$store.dispatch('changeAge', 1)">异步更新+1</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "@/vuex";
export default {
  name: "app",
  computed: {
    ...mapState(["age"]),
    ...mapGetters(["myAge"]),
    // age(){
    //   return this.$store.state.age
    // }
  },
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