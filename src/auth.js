const _ = require('lodash');
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver,
  GraphQLDirective,
  DirectiveLocation,
  GraphQLList } = require('graphql');

const roleMap = {
  Admin: 'ADMIN',
  'Support Staff': 'SUPPORT_STAFF',

  'Call Center QA': 'CALL_CENTER_QA',
  'Call Center QA Leader': 'CALL_CENTER_QA_LEADER',
  'Call Center Supervisor': 'CALL_CENTER_SUPERVISOR',
  'Call Center Technician': 'CALL_CENTER_TECHNICIAN',

  'Facility Admin': 'FACILITY_ADMIN',
  'Clinic Technician': 'CLINIC_TECHNICIAN',
  'Clinic Physician': 'CLINIC_PHYSICIAN',
  'Billing User': 'BILLING_USER',
  Electrophysiologist: 'CLINIC_EP',

  'Sales Admin': 'SALES_ADMIN',
  'Sales Manager': 'SALES_MANAGER',
  'Sales Representative': 'SALES_REPRESENTATIVE',

  'LS Patch Gateway': 'LS_PATCH_GATEWAY',
};

const groupRoles = {
  ALL_CLINIC: ['Clinic Technician', 'Electrophysiologist', 'Clinic Physician'],
  CLINICIANS: ['Clinic Technician', 'Electrophysiologist'],

  ALL_CALL_CENTER: ['Call Center Technician', 'Call Center QA', 'Call Center QA Leader', 'Call Center Supervisor'],
  ALL_BTCY_CALL_CENTER: ['Call Center QA', 'Call Center QA Leader', 'Call Center Supervisor'],
  ALL_CALL_CENTER_QA: ['Call Center QA', 'Call Center QA Leader'],

  ALL_SALES: ['Sales Representative', 'Sales Manager', 'Sales Admin'],
};

function convertGroupsToRoles(graphQLGroups = []) {
  const roles = _.flatMap(graphQLGroups, x => groupRoles[x]);
  return roles;
}

function checkFieldPermission(userRole, graphqlRoles = [], graphqlGroups = []) {
  const graphqlRole = roleMap[userRole];
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
