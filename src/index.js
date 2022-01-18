const fs = require('fs');
const auth = require('./auth');

const AuthDirective = fs.readFileSync(`${__dirname}/authDirective.graphql`, 'utf8').toString();

module.exports = {
  auth,
  AuthDirective,
};
