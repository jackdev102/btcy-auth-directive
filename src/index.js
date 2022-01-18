const fs = require('fs');
const authDirective = require('./authDirective');

const authDirectiveSchema = fs.readFileSync(
  `${__dirname}/authDirective.graphql`, 'utf8',
).toString();

module.exports = {
  directive: { auth: authDirective },
  schema: authDirectiveSchema,
};
