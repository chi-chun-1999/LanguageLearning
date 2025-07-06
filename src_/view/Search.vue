<template>
	  <div>
		      Hello Vue Component!
			      <button @click="count++">Clicked {{ count }} times</button>
				    </div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const count = ref(0);
</script>

<style scoped>
button {
	  margin-top: 10px;
}
</style>
