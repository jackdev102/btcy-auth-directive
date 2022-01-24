const _ = require('lodash');
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const {
  defaultFieldResolver,
  GraphQLDirective,
  DirectiveLocation,
  GraphQLList,
} = require('graphql');

const { roles, groupRoles } = require('../config');

function convertGroupsToRoles(graphQLGroups = []) {
  return _.flatMap(graphQLGroups, x => groupRoles[x]);
}

function checkFieldPermission(userRole, graphqlRoles = [], graphqlGroups = []) {
  const graphqlRole = roles[userRole];
  const hasPermission = graphqlRoles.includes(graphqlRole) || convertGroupsToRoles(graphqlGroups).includes(userRole);
  return hasPermission;
}

class AuthDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'auth',
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        roles: {
          type: new GraphQLList(schema.getType('Role')),
        },
        groups: {
          type: new GraphQLList(schema.getType('AuthGroup')),
        },
      },
    });
  }

  visitFieldDefinition(field) {
    const requiredRoles = this.args.roles;
    const requiredGroups = this.args.groups;
    const bypassAuth = !requiredRoles && !requiredGroups;
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (...args) => {
      if (bypassAuth) {
        return resolve.apply(this, args);
      }

      const context = args[2];
      const { signature } = context;
      const { user } = signature;
      const { role } = user;
      const hasPermission = checkFieldPermission(role, requiredRoles, requiredGroups);

      if (!hasPermission) {
        throw new Error('You are not authorized for this field');
      }

      const results = await resolve.apply(this, args);
      return results;
    };
  }
}

module.exports = AuthDirective;
