import { list } from "@keystone-next/keystone/schema";
import { text, password, integer, select, relationship } from "@keystone-next/fields";
import { isSignedIn, permissions, rules } from "../access";

export const RentalList = list({
    access: {
        create: rules.canCreateRentalList, // Employee can create or update rental list
        read: isSignedIn, 
        update: rules.canUpdateRentalList,
        delete: permissions.canDeleteRentalList, // only admin can delete it
      },
    fields: {
        rentby: relationship({ref: "Rental", ui: {labelField: "rented by"}}),
        employee: relationship({ref: "Employee"}),
        storageUnit: relationship({ref: "StorageUnit", many: true}),
        storageType: relationship({ref: "StorageUnitType", many: true})
    }
})


