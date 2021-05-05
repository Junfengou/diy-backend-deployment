import { list } from "@keystone-next/keystone/schema";
import { text, password, integer, select, relationship} from "@keystone-next/fields";
import { isSignedIn, permissions, rules } from "../access";

export const Rental = list({
    access: {
        create: isSignedIn, // Every user should be able to create a rental
        read: isSignedIn, 
        update: permissions.canManageRental,
        delete: permissions.canManageRental,
      },
    ui: {
        labelField: "name",
    },
    fields: {
        paymentAmount: integer(),
        rental: relationship({ ref: "StorageUnitType", many: true}), // Treat this file like a cartItem
        day: text(),
        month: text(),
        year: text(),
        name: text(),
        availability: select({
            options: [
              { label: 'IN PROGRESS', value: 'IN PROGRESS' },
              { label: 'APPROVED', value: 'APPROVED' },
            ],
            defaultValue: 'IN PROGRESS',
          }),
        user: relationship({ref: "User.rental"}),
    }
})


