import { Plugin, App, FileSystemAdapter } from 'obsidian'
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
					let code: string = await parser.parseCodeBlocks(content);
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

	/**
	 * Gets the absolute path of the currently opened Obsidian vault.
	 * @param app - Obsidian App object
	 * @returns The path of the current Obsidian vault or NULL if the path can not be found.
	 */
	private getVaultAbsolutePath(app: App) {
		let adapter = app.vault.adapter;
		if (adapter instanceof FileSystemAdapter) {
			return adapter.getBasePath();
		}
		return null;
	}

	/**
	 * Writes code to a file at a specified path.
	 * @param path - The absolute path that the file will be written to.
	 * @param filename - The name of the file, without the extension, that is being exported.
	 * @param data - The information that is being written in the file.
	 * @param extension - The extension name that will be appended to the filename.
	 * @returns The file contents on a successful write or an error if something goes wrong.
	 */
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
}