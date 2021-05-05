import { list } from "@keystone-next/keystone/schema";
import { text, password, integer, select, relationship } from "@keystone-next/fields";
import { isSignedIn, permissions, rules } from "../access";

export const StorageUnitType = list({
    access: {
        create: permissions.canManageStorages, // only admin can create storage unit type
        read: isSignedIn, // everyone that's signed in can read it
        update: rules.canUpdateStorages, // employee can edit storage, based on if the storage is available or unavailable
        delete: permissions.canManageStorages, // only admin can delete storage unit type
      },
    ui: {
        labelField: "storageUnitType"
    },
    fields: {
        storageUnitType: text({isRequired: true}),
        // unitNum: integer({isRequired: true}),
        unitType: relationship({ref: "StorageUnit.unit"}),
    }
})


