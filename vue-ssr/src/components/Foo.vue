<template>
  <div id="foo">
    Foo
    {{ this.$store.state.name }}
  </div>
</template>

<script>
export default {
  asyncData(store) {
    return store.dispatch("changeName", "ly");
  },
  // mounted() {
  //   this.$store.dispatch("changeName", "ly");
  // },
};
</script>


<style scoped>
#foo {
  color: red;
}
</style>