# Markdown Converter

I had 503 .doc and .docx files that I wanted to convert into .md so I could back them up on GitHub so thought I'd build a script to help me quickly convert whole folders to markdown.

This script will:

1. Take a folder path as an argument (TODO)
2. Iterate over the folder excluding non-doc/docx files
3. Convert .doc files to .docx (so many converter seem to ignore .doc files but I have so many :sob:)
4. Convert .docx files to markdown
5. Save converted files to a generated convertedFiles folder

## :sparkles: How to run :sparkles:

In the root folder of this project run:

`node convert.js`

Ensure any files you want to be converted are also in the project root.

*TODO*: Pass the path of the directory you want to convert as an argument:

`node convert.js -- "./your-directory"`

## :sparkles: Dependencies :sparkles:

Run to install dependencies:

`npm install`

This script uses `doc2docx` to convert the .doc to .docx. You can install this with pip (NB: ensure you have the latest version of Python):

`pip install doc2docx`
