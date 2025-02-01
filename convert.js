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
            convertFileToMarkdown(file);
        });
    });
}


const convertFileToMarkdown = async(file) => {
    console.log(file);

    let fileExtension = path.extname(file);
    let src = file;
    let args = '';
    const fileName = path.basename(file, fileExtension);
    fileExtension = fileExtension.substring(1);

    if (fileExtension === 'doc') {
        const { stdout, stderr } = await exec(`doc2docx ${file}`);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);

        fileExtension = 'docx';
        // update file with new extension
        console.log('file path: ', file);
        src = `./${fileName}.docx`;
    }
    
    console.log('src: ', src);

    if (fileExtension === 'docx') {
        args = `-f ${fileExtension} -t markdown -o ./${fileName}.md`;
        console.log("args: ", args);
    } else {
        console.error('File is not a .docx or .doc file');
        return;
    }

    callback = (err, result) => {
        if (err) {
          console.error('Oh Nos: ',err);
        }
       
        // For output to files, the 'result' will be a boolean 'true'.
        // Otherwise, the converted value will be returned.
        console.log(result);
        return result;
    };

    // call pandoc
    console.log('attempting to convert file');
    nodePandoc(src, args, callback);
}

const main = () => {
    // optional argument to specify the folder path
    // default to current folder


    console.log(__dirname);    
    iterateOverFilesInAFolder(__dirname);
}

main();