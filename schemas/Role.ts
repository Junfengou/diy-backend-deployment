import { list } from '@keystone-next/keystone/schema';
import { relationship, text  } from '@keystone-next/fields';
import { permissionFields } from "./fields";
import { isSignedIn, permissions, rules } from "../access";

// Regular employee won't have access to this at all except Admin

/*
    Important side note: 
        Don't just hide the ui from employee, must explicitly state their access control
*/
export const Role = list({
    access: {
        create: permissions.canManageRoles,
        read: permissions.canManageRoles,
        update: permissions.canManageRoles,
        delete: permissions.canManageRoles,
    },
    ui: {
        hideCreate: args => !permissions.canManageRoles(args),
        hideDelete: args => !permissions.canManageRoles(args),
        isHidden: args => !permissions.canManageRoles(args),
    },
    fields: {
        name: text({isRequired: true}),
        ...permissionFields,
        assignedTo: relationship({ 
            ref: "User.role", 
            many: true, // many people can have this specific roles   
            ui: {
                itemView: {fieldMode: 'read'}
            } 
        }), 
    },
  });
