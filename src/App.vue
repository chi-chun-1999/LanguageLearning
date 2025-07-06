<template>
    <h2>Hello,Developer!</h2>
    <Hi :hi="hi"></Hi>
    <Hello></Hello>
    <HiHi>-----------</HiHi>
</template>

<script setup lang="tsx">
import Hello from "./Hello";
import Hi from "./Hi.vue";
import { ref } from "vue";
let hi = ref("");
let HiHi = () => (<h1><Hello>ssssssss</Hello></h1>)

</script>


<style scoped>
h2 {
    color: lightcoral;
}
</style>
