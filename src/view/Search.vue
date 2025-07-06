<template>
	<h4> SoR Dictionary</h4>
	<div>
		<input type="text" @keydown="GetEnterInput" @input="GetInput" placeholder="Search..." />
		<button text="Search" @click="GetSearchButtonText">Search</button>

		<h4 v-if="text">{{search_value}}</h4>
		<!-- img-->
		<img v-if="img_src" :src="img_src" alt="Search Result" />


	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const count = ref(0);
	// function countClick() {
	// 	count.value++;
	// 	console.log("Button clicked", count.value);
	// }
	const text = ref("");
	let search_value: string = ref("");

	function GetInput(event: Event) {
		const input = event.target as HTMLInputElement;
		text.value = input.value;
	}

	const img_src = ref("");

	function GetSearchButtonText() {
		//get the text from the input field
		SearchWord(text.value);
	}
	
	async function SearchWord(search_text: string = text.value) {
		// console.log("Search value");
		search_text = search_text.toLowerCase();
		search_text = search_text.replace(/\s+/g, ''); // Replace spaces with hyphens
		playAudio(search_text);

		const url = `http://mi-andygo.s3.ap-northeast-1.amazonaws.com/cards/mi-${search_text}_1.png`
		const imageExists = await CheckImageExists(url);
		console.log(imageExists);

		if(imageExists){
			img_src.value = url;
			search_value.value = search_text;
			console.log("Image exists:", img_src.value);
		} else {
			img_src.value = "https://mi-andygo.s3.ap-northeast-1.amazonaws.com/cards/mi-error_1.png";
			search_value.value = "Image not found, using default image";
			console.log("Image does not exist, using default image");
		}

	}
	function GetEnterInput(event: KeyboardEvent) {
		if (event.key === "Enter") {
			const input = event.target as HTMLInputElement;
			text.value = input.value;
			// console.log("Enter key pressed");
			SearchWord();
		}
	}
	function CheckImageExists(url: string): Promise<boolean> {
	  	return new Promise((resolve) => {
	    const img = new Image();
	    img.onload = () => resolve(true);
	    img.onerror = () => resolve(false);
	    img.src = url;
	});
	}

	async function playAudio(query: string) {
		const audio = new Audio(`http://mi-andygo.s3.ap-northeast-1.amazonaws.com/voices/${query}.mp3`);
		try {
		  await audio.play();
		} catch (error) {
		  console.error('Error playing audio:', error);
		}
	}

</script>

<style scoped>
button {
	  margin-top: 10px;
}
img{
	  margin-top: 10px;
	  border-radius: 10px;
	  width: 100%; 
	  height: 400px;
}
</style>
