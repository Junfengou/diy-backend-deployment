import { list } from "@keystone-next/keystone/schema";
import { text, password, integer, select, relationship } from "@keystone-next/fields";
import { isSignedIn, permissions, rules } from "../access";


// permissions: Higher order access. AKA Admin access
// rules: Conditional based access. AKA Employee access


export const StorageUnit = list({
    access: {
      create: permissions.canManageStorages, // only admin can create storage
      read: isSignedIn,
      // update: rules.canManageStorages, 
      update: rules.canUpdateStorages, // employee can edit storage, based on if the storage is available or unavailable
      delete: permissions.canManageStorages,
    },
    ui: {
      labelField: "unitNum"
      },
    fields: {
        price: integer({isRequired: true}),
        description: text({isRequired: true}),
        availability: select({
            options: [
              { label: 'AVAILABLE', value: 'AVAILABLE' },
              { label: 'UNAVAILABLE', value: 'UNAVAILABLE' },
              { label: 'RESERVED', value: 'RESERVED' },
            ],
            defaultValue: 'AVAILABLE',
          }),
          unitNum: integer({isRequired: true}),
          unit: relationship({ref: "StorageUnitType.unitType"}),
    }
})


