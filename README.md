# btcy-auth-directive

- BTCY apollo federation auth directive

## Roles

- ADMIN: `Admin`
- SUPPORT_STAFF: `Support Staff`
- CALL_CENTER_QA: `Call Center QA`
- CALL_CENTER_QA_LEADER: `Call Center QA Leader`
- CALL_CENTER_SUPERVISOR: `Call Center Supervisor`
- CALL_CENTER_TECHNICIAN: `Call Center Technician`
- FACILITY_ADMIN: `Facility Admin`
- CLINIC_TECHNICIAN: `Clinic Technician`
- CLINIC_PHYSICIAN: `Clinic Physician`
- BILLING_USER: `Billing User`
- CLINIC_EP: `Electrophysiologist`
- SALES_ADMIN: `Sales Admin`
- SALES_MANAGER: `Sales Manager`
- SALES_REPRESENTATIVE: `Sales Representative`
- LS_PATCH_GATEWAY: `LS Patch Gateway`

## GroupRoles

- ALL_CLINIC: [`Clinic Technician`, `Electrophysiologist`, `Clinic Physician`]
- CLINICIANS: [`Clinic Technician`, `Electrophysiologist`]
- ALL_CALL_CENTER: [`Call Center Technician`, `Call Center QA`, `Call Center QA Leader`, `Call Center Supervisor`]
- ALL_BTCY_CALL_CENTER: [`Call Center QA`, `Call Center QA Leader`, `Call Center Supervisor`]
- ALL_CALL_CENTER_QA: [`Call Center QA`, `Call Center QA Leader`]
- ALL_SALES: [`Sales Representative`, `Sales Manager`, `Sales Admin`]
