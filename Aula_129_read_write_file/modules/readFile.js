const fs = require('fs').promises;

module.exports = async (path) => {
  const result = await fs.readFile(path, 'utf8');
  return result;
};