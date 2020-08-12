const fs = require('fs');
const path = require('path');

module.exports.createCat = fs.readFileSync(path.join(__dirname, 'createCat.gql'), 'utf8');
module.exports.createCategory = fs.readFileSync(path.join(__dirname, 'createCategory.gql'), 'utf8');
