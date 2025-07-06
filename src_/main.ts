import { Plugin, WorkspaceLeaf, Notice, Menu } from 'obsidian';
import { ExampleView, VIEW_TYPE_EXAMPLE } from './view/SearchView';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerView(
      VIEW_TYPE_EXAMPLE,
      (leaf) => new ExampleView(leaf)
    );

    this.addRibbonIcon('dice', 'Activate view', () => {
      // this.activateView();

    });

  }

  async onunload() {
  }

  async activateView() {
	  console.log('activateView called');
	   const { workspace } = this.app;

	   let leaf: WorkspaceLeaf | null = null;
	   const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

	   if (leaves.length > 0) {
	     // A leaf with our view already exists, use that
	     leaf = leaves[0];
	   } else {
	     // Our view could not be found in the workspace, create a new leaf
	     // in the right sidebar for it
	     leaf = workspace.getLeftLeaf(false);
	     await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
	  console.log(leaves);
	   }

	   // "Reveal" the leaf in case it is in a collapsed sidebar
	   workspace.revealLeaf(leaf);
  }
}

