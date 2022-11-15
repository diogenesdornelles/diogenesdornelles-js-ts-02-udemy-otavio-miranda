const fs = require('fs').promises;

module.exports = (path, data) => {
  fs.writeFile(path, JSON.stringify(data, null, 2) + '\n', {
    flag: 'w',
    encoding: 'utf8',
  })
  console.log('DONE!')
}
