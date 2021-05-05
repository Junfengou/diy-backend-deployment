import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canManageStorages: checkbox({
    defaultValue: false,
    label: 'Admin can CRUD Storage units',
  }),

  canUpdateStorages: checkbox({
    defaultValue: false,
    label: 'Employee can update any storage',
  }),

  // -----------------------------------------

  canManageUsers: checkbox({
    defaultValue: false,
    label: 'Admin can CRUD customers or employees',
  }),

  canUpdateUsers: checkbox({
    defaultValue: false,
    label: 'Employee can edit customer information',
  }),

  // ---------------------------------


  canManageRoles: checkbox({
    defaultValue: false,
    label: 'Only admin access can manage role',
  }),

  // ---------------------------------------------------

  canManageRental: checkbox({
    defaultValue: false,
    label: 'Admin can see and manage rental',
  }),


  //----------------------------------------------------
  canDeleteRentalList: checkbox({
    defaultValue: false,
    label: 'Admin can delete rental list',
  }),

  canCreateRentalList: checkbox({
    defaultValue: false,
    label: 'Employee can create rental list',
  }),

  canUpdateRentalList: checkbox({
    defaultValue: false,
    label: 'Employee can update rental list',
  }),

  //----------------------------------------------------

  canAccessAdminFunctionClient: checkbox({
    defaultValue: false,
    label: 'Admin and employee can access client side admin accesses'
  })

  
};

export type Permission = keyof typeof permissionFields;


/*
    permissionFields is an object
    What's going on here is we take the object and turn it into an array so we
    can spread it into the Role DB

    object key: canManageRental, canManageRoles, canManageUsers...

    After here, we need to query spread it into Role and set the session in Keystone.ts
    Then create a [access.ts] file
*/
export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];