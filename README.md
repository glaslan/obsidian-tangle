# Obsidian Tangle

(Under *slow* development, it is now in a working state though!)

This is a plugin for Obsidian that parses code blocks in notes and places them into the appropriate file to be run as a program. The plugin is based on Emac's babel-tangle functionality.

Current instructions:
- Write your notes and contain your code in labeled code blocks (\`\`\`C++ ... \`\`\`)
- All of the code blocks in one note will be added to a single code file. So they must be a continuous program and all written in the same language.
- The plugin uses the first code block to determine the file extension. It currently parses the code type in a literal fashion so using a mermaid code block will create a .mermaid file.
