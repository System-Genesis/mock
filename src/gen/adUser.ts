import { adUser } from "../types/types";
import faker from "faker";
import dataTypes from "../lists/dataTypesList";

export function createAdUser(
  firstName: string,
  lastName: string,
  userPrincipalName: string
) {
  const job = faker.name.jobTitle();
  const sAMAccountName = faker.internet.email().split("@")[0];

  let ad: adUser = {
    KfirstName: firstName,
    guName: firstName,
    KlastName: lastName,
    userPrincipalName: "M" + userPrincipalName,
    Kjob: job,
    hierarchy:
      faker.lorem.word() +
      "/" +
      faker.lorem.word() +
      "/" +
      faker.lorem.word() +
      "/" +
      job +
      " - " +
      firstName +
      " " +
      lastName,
    sAMAccountName: sAMAccountName,
    mail: sAMAccountName + "@" + dataTypes.DOMAIN_MAP[0][0],
  };

  return ad;
}
