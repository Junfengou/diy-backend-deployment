import { list } from "@keystone-next/keystone/schema";
import { text, password, integer, select, relationship } from "@keystone-next/fields";
import { isSignedIn, permissions, rules } from "../access";

export const Employee = list({
    access: {
      create: permissions.canManageUsers, // Only admin can edit, create, or delete 
      read: isSignedIn, // Anyone whose signed in can read it
      update: permissions.canManageUsers,
      delete: permissions.canManageUsers,
    },
    fields: {
        employeee: relationship({ref: "User"}),
        title: text({isRequired: true}),
        payStatus: select({
            options: [
              { label: 'SALARY', value: 'SALARY' },
              { label: 'HOURLY', value: 'HOURLY' },
            ],
            defaultValue: 'HOURLY',
          }),
    }
})


