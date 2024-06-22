export class Parser {

	constructor() {
	}

	public parseCodeExtension(fileContent: string){
		const rExpFileExtension : RegExp = /(?<=```)(\S+)/gm;
		if (fileContent){
			const match = rExpFileExtension.exec(fileContent);
			if (match)
				return match[1].toLowerCase();
			throw new Error('No file extensions were found by the parseCodeExtension function')
		}
		throw new Error('fileContent is undefined');
	}

    public parseCodeBlocks(fileContent: string){
		let code : string = "";
		const rExp : RegExp = /(?<=```\S+\s)([\s\S]*?)(?=```)/gm;
		code += fileContent.match(rExp)?.join("");
		console.log(code);
		return code;
	}
}