const fs = require('fs');
const path = require('path');

module.exports.cats = fs.readFileSync(path.join(__dirname, 'cats.gql'), 'utf8');
module.exports.categories = fs.readFileSync(path.join(__dirname, 'categories.gql'), 'utf8');
