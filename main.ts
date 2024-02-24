import {Notice, Plugin} from 'obsidian'

export default class TanglePlugin extends Plugin{
	statusBarTextElement: HTMLSpanElement;

	onload() {
		// This code adds a icon to the left vertical ribbon that dispays a 
		// message when clicked
		this.addRibbonIcon('dice', 'Greet', async () => {
			const file = this.app.workspace.getActiveFile();
			if(file){
				const content = await this.app.vault.read(file);
				this.getCodeBlocks(content);
			}
			
		});
		console.log("tangle is loaded");
		this.statusBarTextElement = this.addStatusBarItem().createEl('span');
		this.statusBarTextElement.textContent = "Hello";

		this.app.workspace.on('active-leaf-change', async () => {
			const file = this.app.workspace.getActiveFile();
			if(file){
				const content = await this.app.vault.read(file);
				console.log(content);
			}
		});
	}

	async onunload() {
		// Release resources here
		console.log('Unloading Tangle')
	}

	private getCodeBlocks(fileContent?: string){
		let code : string = "";
		let codeExtension : string = "";
		const rExpFileExtension : RegExp = /(?<=^```)(\w)/gm;
		const rExp : RegExp = /(?<=^```\w\s)([^```]*)/gm;
		codeExtension += fileContent?.match(rExpFileExtension);
		code += fileContent?.match(rExp)?.join("");
		console.log(codeExtension);
		console.log(code);
	}
}