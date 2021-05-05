import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import addToRental from "./addToRental";

const gql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
    typeDefs: gql`
        type Mutation {
            addToRental(storageId: ID, day: String, month: String, year: String) : Rental
        }
    `,
    resolvers: {
        Mutation: {
            addToRental,
        }
    }
})

