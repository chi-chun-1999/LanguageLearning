import { ItemView, WorkspaceLeaf } from 'obsidian';
import { createApp } from 'vue';
import Search from './Search.vue';



export const VIEW_TYPE= 'example-view';

export class ExampleView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE;
  }

  getDisplayText() {
    return 'Example view';
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl('h4', { text: 'SoR Dictionary' });
	const searchInput = container.createEl('input', { type: 'text', placeholder: 'Search...' });
	searchInput.addEventListener('input', (event) => {
	  const query = (event.target as HTMLInputElement).value.toLowerCase();
	});
	searchInput.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			const query = (event.target as HTMLInputElement).value.toLowerCase();
		
			const query_withou_blank = query.replace(/\s+/g, '');
			console.log(`Searching for: ${query_withou_blank}`);
			// add voice for http://mi-andygo.s3.ap-northeast-1.amazonaws.com/voices/${query}.mp3
			this.playAudio(query_withou_blank);
			this.showPic(query_withou_blank);
	  }
	});
	const searchButton = container.createEl('button', { text: 'Search' });
	searchButton.addEventListener('click', () => {
		const query = searchInput.value.toLowerCase();
		  //delete blank spaces
		const query_withou_blank = query.replace(/\s+/g, '');
		console.log(`Searching for: ${query_withou_blank}`);
		// add voice for http://mi-andygo.s3.ap-northeast-1.amazonaws.com/voices/${query}.mp3
		this.playAudio(query_withou_blank);
		this.showPic(query_withou_blank);
	});
	// Create a Vue app and mount it to the container
	const app = createApp(Search);
	app.mount(container);
	
  }
  async onClose() {
    // Nothing to clean up.
  }
  async playAudio(query: string) {
	const audio = new Audio(`http://mi-andygo.s3.ap-northeast-1.amazonaws.com/voices/${query}.mp3`);
	try {
	  await audio.play();
	} catch (error) {
	  console.error('Error playing audio:', error);
	}
  }
  async showPic(query: string) {
	const container = this.containerEl.children[1];
	if (container.children.length > 3) {
		container.children[3].remove(); // Remove the previous image if it exists
	}
	const picDiv = container.createEl('div', { cls: 'pic-container' });
	// Clear the container before adding a new Image
	picDiv.empty();

	const url = `http://mi-andygo.s3.ap-northeast-1.amazonaws.com/cards/mi-${query}_1.png`;

	const imageExists = await this.checkImageExists(url);
	if (imageExists) {
	picDiv.createEl('h4', { text: `${query}` });
	  const img = picDiv.createEl('img', { attr: { src: url } });
	  img.style.maxWidth = '100%';
	  img.style.maxHeight = '400px';
	  // img.alt = `Image for ${query}`;
	  // picDiv.createEl('p', { text: `Image for ${query}` });
	}
  	else {
		picDiv.createEl('h4', { text: `No image found for ${query}` });
	  await this.showDefaultImage(picDiv, query);
	}
}




  async showDefaultImage(container: HTMLElement, query: string) {
	const defaultUrl = 'http://mi-andygo.s3.ap-northeast-1.amazonaws.com/cards/mi-error_1.png';
	const img = container.createEl('img', { attr: { src: defaultUrl } });
	img.style.maxWidth = '100%';
	img.style.maxHeight = '400px';
	// img.alt = `No image found for ${query}`;
	// container.createEl('p', { text: `No image found for ${query}` });
  }

  async checkImageExists(url: string): Promise<boolean> {
	  	return new Promise((resolve) => {
	  const img = new Image();
	  img.onload = () => resolve(true);
	  img.onerror = () => resolve(false);
	  img.src = url;
	});
  }
  
}

