import { employee } from "../types/types";
import faker from "faker";
import dataTypes from "../lists/dataTypesList";
import utils from "../utils";

export function createAkaEmployee(tzs: string, mis: string): employee {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    tz: tzs,
    mi: mis,
    clearance: faker.datatype.number({ min: 0, max: 10 }).toString(),
    rnk: utils.randomElement(dataTypes.RANK),
    nstype: utils.randomElement(dataTypes.SERVICE_TYPE),
    rld: faker.date
      .between(faker.date.future(10), faker.date.past(10))
      .toISOString(),
    hr: utils.randomElement(dataTypes.UNIT),
    birthday: faker.date
      .between(faker.date.past(18), faker.date.past(40))
      .toISOString(),
    sex: utils.randomElement(["m", "f"]),
  };
}
