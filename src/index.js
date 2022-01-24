const fs = require('fs');
const authDirective = require('./directives/authDirective');

const authDirectiveSchema = fs.readFileSync(
  `${__dirname}/schemas/authDirective.graphql`, 'utf8',
).toString();

module.exports = {
  directive: { auth: authDirective },
  schema: authDirectiveSchema,
};
