import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

const SEED_USERNAME = "test";
const SEED_PASSWORD = "test";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
