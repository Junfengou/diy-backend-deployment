import { list } from "@keystone-next/keystone/schema";
import { text, password, integer, select, relationship } from "@keystone-next/fields";
import { isSignedIn, permissions, rules } from "../access";

export const User = list({
    access: {
        create: () => true, // Only admin can edit or delete 
        read: isSignedIn, // Anyone whose signed in can read it
        update: rules.canUpdateUsers, // Employee can only edit existing customers
        delete: permissions.canManageUsers,
      },
    fields: {
        username: text({isRequired: true, isUnique: true}),
        email: text({isRequired: true, isUnique: true}),
        password: password(),
        name: text({isRequired: true}),
        address: text({isRequired: true}),
        city: text({isRequired: true}),
        state: text({isRequired: true}),
        zipcode: integer({isRequired: true}),
        country: text({isRequired: true}),
        phone: text({isRequired: true}),
        // drlic: text({isRequired: true}),
        additionalInfo: text(), 
        rental: relationship({ref:"Rental.user"}),
        role: relationship({ref: "Role.assignedTo"}), // Also add access control
        // rentallist: relationship({ref: "RentalList"}),
    }
})


