const fs = require('fs').promises
const path = require('path')

async function walk(files, rootDir) {
  for (let file of files) {
    const fileFullPath = path.resolve(rootDir, file)
    
    // bloco de exclusão
    if (/\.git/g.test(fileFullPath)) continue; // exclui .git
    if (/node_modules/g.test(fileFullPath)) continue; // exclui node_modules
    const stats = await fs.stat(fileFullPath)
    if (stats.isDirectory()) { // exclui diretórios
      readdir(fileFullPath)
      continue;
    }

    // bloco de inclusão 
    if (/.js$/g.test(fileFullPath)) { // inclui .js
      console.log(fileFullPath)
    };
  }
}

async function readdir(rootDir){
  rootDir = rootDir || __dirname
  const files = await fs.readdir(rootDir)
  walk(files, rootDir)
}

readdir(path.resolve(__dirname, '..'))
