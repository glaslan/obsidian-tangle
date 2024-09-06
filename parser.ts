export class Parser {

	/**
	 * Finds the extension of the first code block in the markdown file.
	 * @param fileContent - The text content of a markdown file.
	 * @returns The language extension of the first code block.
	 */
	public parseCodeExtension(fileContent: string) : string{
		const rExpFileExtension = /(?<=```)(\S+)/gm;
		if (fileContent){
			const match = rExpFileExtension.exec(fileContent);
			if (match)
				return match[1].toLowerCase();
			throw new Error('No file extensions were found by the parseCodeExtension function')
		}
		throw new Error('fileContent is undefined');
	}

	/**
	 * Gets the text inside all code blocks of a markdown file.
	 * @param fileContent - The text content of a markdown file.
	 * @returns The text from all of the code blocks as a single string.
	 */
    public parseCodeBlocks(fileContent: string) : string{
		let code = "";
		const rExp = /(?<=```\S+\s)([\s\S]*?)(?=```)/gm;
		code += fileContent.match(rExp)?.join("");
		return code;
	}

}
