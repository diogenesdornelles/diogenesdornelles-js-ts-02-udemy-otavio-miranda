const fs = require('node:fs/promises')

module.exports = async (path) => {
  const result = await fs.readFile(path, 'utf8');
  return result;
}