<template>
  <div id="app">
    <router-link to="/">Foo</router-link>
    <router-link to="/bar">Bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Bar from "./components/Bar";
import Foo from "./components/Foo";
export default {
  components: { Bar, Foo }
};
</script>