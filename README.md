# Obsidian Tangle

This is a plugin for Obsidian that parses code blocks in notes and places them into the appropriate file to be run as a program. The plugin is based on Emacs' babel-tangle functionality.


# Usage

- Write your notes and contain your code in labeled code blocks (\`\`\`C++ ... \`\`\`)
- All code blocks in one note will be added to a single code file. So they must be a continuous program and all written in the same language.
- The plugin uses the first code block to determine the file extension. It currently parses the code type literally, so using a mermaid code block will create a '.mermaid' file.
- Open the command palette using CTRL + P and search for "tangle"
- Select "Tangle code blocks"
- Navigate to the folder that your note is contained in. This folder now contains your code file.
