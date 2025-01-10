# Obsidian Tangle

Obsidian Tangle is a plugin for the note taking app Obsidian that parses code blocks in markdown files and places them into the appropriate code file to be run as a program. The plugin is based on Emacs' babel-tangle functionality.


# Installation

1. Install the BRAT plugin from the Obsidian plugin repository.
2. Copy this repositories link.
3. Open Obsidian's command palette and run the command _BRAT: Add a beta plugin for testing_ (If you want the plugin version to be frozen, use the command BRAT: Add a beta plugin with frozen version based on a release tag.)
4. Using the link from step 2, copy that into the modal that opens up.
5. Click on Add Plugin.
6. After BRAT confirms the installation, open Obsidian's Settings and go to the community plugins tab.
7. Refresh the list of plugins.
8. Find the Obsidian Tangle plugin and enable it.

BRAT documentation can be found at [BRAT Quick Start Guide](https://tfthacker.com/brat-quick-guide)

# Usage

- Write your notes and contain your code in __labeled code blocks__ (\`\`\`C++ ... \`\`\`)
	- All code blocks in one note will be added to a single code file. So they must be a continuous program and all written in the same language.
	- The plugin uses the first code block to determine the file extension. It currently parses the code type literally, so using a _mermaid_ code block will create a '.mermaid' file.
- Open the command palette using CTRL + P and search for "tangle"
- Select "Tangle code blocks"
- Navigate to the folder that your note is contained in. This folder now contains your code file.

# Example

One code block with this:
```C
#include <stdio.h>

int main() {
	printf("Hello Tangle\n");
```
And another with this:
```C
	return 0;
}
```
Will create a _C_ file with this:
```C
#include <stdio.h>

int main() {
	printf("Hello Tangle\n");
	return 0;
}
```