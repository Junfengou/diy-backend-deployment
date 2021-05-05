import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from "@keystone-next/keystone/session";
import { createAuth } from "@keystone-next/auth";
import { User } from "./schemas/User";
import { Employee } from "./schemas/Employee";
import { Rental } from "./schemas/Rental";
import { RentalList } from "./schemas/RentalList";
import { StorageUnit } from "./schemas/StorageUnit";
import { StorageUnitType } from "./schemas/StorageUnitType";
import { Role } from "./schemas/Role";

import 'dotenv/config';
// import { extendGraphqlSchema } from './mutations';
import { insertSeedData } from './seed-data';
import { permissionsList } from './schemas/fields';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['email', 'password'],
  },
});

export default withAuth(

config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // These code here will just populate the product schema with bunch of pre-recorded products by running one command
    // so you don't have to manually add in all the products for testing purposes
    async onConnect(keystone) {
      console.log('Connected to the database!');
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    },
  },
  lists: createSchema({
    // Schema items go in here
    User, Employee, Rental, RentalList, StorageUnit, StorageUnitType, Role
  }),
    
  // extendGraphqlSchema,

  ui: {
    // TODO: change this for roles
    
    isAccessAllowed: ({ session }) => {
      // console.log("session: ", session);
      return !!session?.data;
    },
  },

  // Think of this as GraphQL Query
  // Query currently authenticated User. As long as there's space in between, the query will run
  session: withItemData(statelessSessions(sessionConfig), {
    User: `id role {${permissionsList.join(" ")}}`
  })
}));


/*
  Template:

  const datebaseURL = ...

  export default config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO: Add data seeding here
  },
  lists: createSchema({
    // Schema items go in here
     User, Employee, Rental, RentalList, StorageUnit, StorageUnitType
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: Add session values here
});

*/

/*
.env
FRONTEND_URL="http://localhost:7777"

COOKIE_SECRET="ilikethestonkstothemoooooooooooooooooooooooooooooon"

DATABASE_URL=mongodb+srv://junfengou:1likeChina!@diycluster.yosmn.mongodb.net/test


MAIL_HOST="smtp.ethereal.email"
MAIL_PORT=587
MAIL_USER="jude.deckow@ethereal.email"
MAIL_PASS="3v1c9d9ZYdK59SsVtY"

*/