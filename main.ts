import { Notice, Plugin, App, FileSystemAdapter } from 'obsidian'
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { Parser } from 'parser'


export default class TanglePlugin extends Plugin {


	onload() {
		const parser = new Parser();
		this.addCommand({
			id: "tangle-code-blocks",
			name: "Tangle code blocks",
			callback: async () => {
				let file = this.app.workspace.getActiveFile();
				console.log(file);
				if (file) {
					let tempFilePath = this.getVaultAbsolutePath(this.app) + "/" + file.path;
					let filePath = tempFilePath.replace(new RegExp(file.name, 'g'), '');
					console.log(filePath);
					let content = await this.app.vault.read(file);
					let code: string = await this.getCodeBlocks(content);
					let extension: string | undefined = parser.parseCodeExtension(content);
					if (filePath) {
						this.writeCodeToFile(filePath, file.basename, code, extension);
					}
				}
			},
		});
		console.log("tangle is loaded");

	}


	async onunload() {
		// Release resources here
		console.log('Unloading Tangle')
	}


	private getVaultAbsolutePath(app: App) {
		let adapter = app.vault.adapter;
		if (adapter instanceof FileSystemAdapter) {
			return adapter.getBasePath();
		}
		return null;
	}


	private async writeCodeToFile(path: string, filename: string, data: string, extension?: string) {
		let file: string = filename + "." + extension;
		let filePath = join(path, file);
		console.log("file is " + file);
		console.log("filePath is " + filePath);
		try {
			await fsPromises.writeFile(filePath, data, {
				flag: 'w',
			});

			const contents = await fsPromises.readFile(
				(path + filename + ".md")
			);
			console.log(contents);
			return contents;
		} catch (err) {
			console.log(err);
			return 'Something went wrong while writing code to file';
		}
	}


	private getCodeBlocks(fileContent?: string) {
		let code: string = "";
		const rExp: RegExp = /(?<=```\S+\s)([\s\S]*?)(?=```)/gm;
		code += fileContent?.match(rExp)?.join("");
		console.log(code);
		return code;
	}
}