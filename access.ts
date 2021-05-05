import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

// This function always have access to context. Check for currently logged in user
export function isSignedIn({ session }: ListAccessArgs) {
    return !!session; // This will return false if the session is [undefined]
}

/*
    Object.fromEntries([['name', 'OG'], ['age', 69]]);
    -> Object {name: 'OG', age: 69}
*/

const generatedPermissions = Object.fromEntries(permissionsList.map((permission) => [
    permission, //key
    function({ session }: ListAccessArgs) {
        return !!session?.data.role?.[permission];
    }
]));

// Permission check if someone meets a criteria
export const permissions = {
    ...generatedPermissions,

}

// Rule based function
export const rules = {
    canUpdateStorages({session}: ListAccessArgs) {
        // check if the user have the permission
        if(permissions.canUpdateStorages({ session })) {
            return true;
        }

        // check storage unit is created by that user. 
        // For example: If the admin created the storage, only the admin can edit that storage
        // Probably not gonna use it unless needed in the future.
        // return { user: { id: session.itemId }}
    },

    canManageUsers({session}: ListAccessArgs) {
        // check if the user have the permission
        if(permissions.canManageUsers({ session })) {
            return true;
        }
    },

    canCreateRentalList({session} : ListAccessArgs) {
        if(permissions.canCreateRentalList({ session })) {
            return true;
        }
    },

    canUpdateRentalList({session} : ListAccessArgs) {
        if(permissions.canUpdateRentalList({ session })) {
            return true;
        }
    },

    canUpdateUsers({session} : ListAccessArgs) {
        if(permissions.canUpdateUsers({ session })) {
            return true;
        }
    },


}