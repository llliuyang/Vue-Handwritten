<template>
  <div @click="show">
    Bar
  </div>
</template>

<script>
export default {
  methods:{
    show(){
      alert('OK')
    }
  }
}
</script>