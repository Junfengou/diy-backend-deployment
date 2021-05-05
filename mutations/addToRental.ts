import { KeystoneContext } from "@keystone-next/types";
import { RentalCreateInput } from ".././.keystone/schema-types";
import { Session } from "../types";


interface Arguments {
    storageId: string,
    day: string,
    month: string,
    year: string,
    name: string,
}

async function addToRental(
    root: any,
    {storageId, day, month, year, name} : Arguments,
    context: KeystoneContext) : Promise<RentalCreateInput> {

        // check to see if there is a current user
        const sesh = context.session as Session;
        if(!sesh.itemId)
        {
            throw new Error("You must be logged in to do this")
        }

        
        // create a new cart item
        return await context.lists.Rental.createOne({
            data: {
                day: day,
                month: month,
                year: year,
                name: name,
                rental: { connect: {id: storageId } },
                user: { connect: {id: sesh.itemId }},
            }
        })
}

export default addToRental;