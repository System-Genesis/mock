import { employee, sf } from "../types/types";
import faker from "faker";
import dataTypes from "../lists/dataTypesList";
import utils from "../utils/utils";

export function createSfUser(employee: employee) {
  const unique_id = faker.internet.email().split("@")[0];
  const firstName = employee.firstName;
  const lastName = employee.lastName;

  let sf: sf = {
    firstName: firstName,
    lastName: lastName,
    userName: faker.internet.userName(firstName, lastName),
    fullName: firstName.concat(" ", lastName),
    sex: utils.randomElement(["m", "f"]),
    personalNumber: employee.mi.toString(),
    tz: employee.tz,
    stype: utils.randomElement([...dataTypes.SERVICE_TYPE]),
    hierarchy: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
    ],
    mail: unique_id + "@" + dataTypes.DOMAIN_MAP[7][0],
    rank: utils.randomElement([...dataTypes.RANK]),
    status: utils.randomElement([...dataTypes.STATUS]),
    address: faker.address.streetAddress(true),
    telephone: "0" + utils.generateNumber(50, 59) + utils.generateNumber(),
    entity: "soldier",
    discharge: faker.date
      .between(faker.date.future(20), faker.date.future(10))
      .toISOString(),
    primaryDU: { uniqueID: unique_id, adfsUID: unique_id + "@ddd" },
  };
  return sf;
}
