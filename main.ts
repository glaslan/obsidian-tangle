import {Notice, Plugin} from 'obsidian'
import { promises as fsPromises } from 'fs';
import { join } from 'path';

export default class TanglePlugin extends Plugin{

	onload() {
		// This code adds a icon to the left vertical ribbon that dispays a 
		// message when clicked
		this.addRibbonIcon('dice', 'Greet', async () => {
			const file = this.app.workspace.getActiveFile();
			if(file){
				const content = await this.app.vault.read(file);
				let code : string = this.getCodeBlocks(content);
				let extension : string = this.getCodeExtension(content);
				this.writeCodeToFile("", file.basename, extension, code);
			}
			
		});
		console.log("tangle is loaded");

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

	private async writeCodeToFile(path: string, filename: string, extension: string, data: string) {
		let file: string = filename + "." + extension;
		try {
			await fsPromises.writeFile(join(path, file), data, {
			  flag: 'w',
			});
		
			const contents = await fsPromises.readFile(
			  join(path, file),
			  'utf-8',
			);
			console.log(contents);
		
			return contents;
		  } catch (err) {
			console.log(err);
			return 'Something went wrong while writing code to file';
		  }
	}

	private getCodeExtension(fileContent?: string){
		let codeExtension : string = "";
		const rExpFileExtension : RegExp = /(?<=^```)(\w)/gm;
		codeExtension += fileContent?.match(rExpFileExtension);
		console.log(codeExtension);
		return codeExtension[0].toLowerCase();
	}

	private getCodeBlocks(fileContent?: string){
		let code : string = "";
		const rExp : RegExp = /(?<=^```\w\s)([^```]*)/gm;
		code += fileContent?.match(rExp)?.join("");
		console.log(code);
		return code;
	}
}