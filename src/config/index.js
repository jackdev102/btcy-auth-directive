module.exports = {
  groupRoles: {
    ALL_CLINIC: ['Clinic Technician', 'Electrophysiologist', 'Clinic Physician'],
    CLINICIANS: ['Clinic Technician', 'Electrophysiologist'],

    ALL_CALL_CENTER: ['Call Center Technician', 'Call Center QA', 'Call Center QA Leader', 'Call Center Supervisor'],
    ALL_BTCY_CALL_CENTER: ['Call Center QA', 'Call Center QA Leader', 'Call Center Supervisor'],
    ALL_CALL_CENTER_QA: ['Call Center QA', 'Call Center QA Leader'],

    ALL_SALES: ['Sales Representative', 'Sales Manager', 'Sales Admin'],
  },
  roles: {
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
  },
};
