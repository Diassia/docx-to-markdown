const path = require('path');
const fs = require('fs');
const nodePandoc = require('node-pandoc');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const iterateOverFilesInAFolder = (folderPath) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            const fileExtension = path.extname(file);
            // check if file is a .doc or .docx file
            if (fileExtension === '.doc' || fileExtension === '.docx') {
                convertFileToMarkdown(file, fileExtension);
            }
        });
    });
}


const convertFileToMarkdown = async(file, fileExtension) => {
    if (fileExtension === '.docx') {
        console.log(`attempting to convert ${file} to markdown`);
    } else {
        console.log(`attempting to convert ${file} to docx`);
    }

    let src = file;
    let args = '';
    const fileName = path.basename(file, fileExtension);
    fileExt = fileExtension.substring(1);

    if (fileExt === 'doc') {
        const { stdout, stderr } = await exec(`doc2docx ${file}`);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);

        // update file with new extension
        fileExt = 'docx';
        src = `./${fileName}.docx`;
    }

    callback = (err, result) => {
        if (err) {
          console.error('Oh Nos: ',err);
        }
       
        // For output to files, the 'result' will be a boolean 'true'.
        // Otherwise, the converted value will be returned.
        return result;
    };

    // add converted file to convertedFiles folder (and generate if the folder does not exist)
    if (!fs.existsSync('./convertedFiles')) {
        fs.mkdirSync('./convertedFiles');
    }
    // add converted file to new convertedFiles folder
    args = `-f ${fileExt} -t markdown -o ./convertedFiles/${fileName}.md`;
    nodePandoc(src, args, callback);
    console.log(`${fileName}.md created`);
}

const main = () => {
    iterateOverFilesInAFolder(__dirname);
}

main();