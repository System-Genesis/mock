import { miriUser } from "../types/types";
import faker from "faker";
import dataTypes from "../lists/dataOption";
import utils from "../utils/utils";

export function createMiriUser(mis: string) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  let miriUser: miriUser = {
    domUser:
      utils.randomElement([...dataTypes.ID_PREFIXES]) +
      faker.datatype.number({ min: 100000, max: 999999999 }) +
      "@" +
      utils.randomElement([
        dataTypes.DOMAIN_MAP[4][0],
        dataTypes.DOMAIN_MAP[4][0],
        dataTypes.DOMAIN_MAP[4][0],
        dataTypes.DOMAIN_MAP[5][0],
        dataTypes.DOMAIN_MAP[6][0],
      ]),
    telephone: "0" + utils.generateNumber(50, 59) + utils.generateNumber(),
    clearance: faker.datatype.number({ min: 1, max: 5 }),
    firstName: firstName,
    lastName: lastName,
    mail: utils.randomElement([
      "לא ידוע",
      "לא ידוע",
      null,
      null,
      "",
      "",
      faker.internet.email().split("@")[0] + "@" + dataTypes.MIRI_MAIL,
    ]),
    tz: utils.randomElement([utils.generateID(), "", "לא ידוע", null]),
    personalNumber: utils.randomElement([mis, "", "לא ידוע", null]),
    rank: utils.randomElement([...dataTypes.RANK]),
    rld: utils.randomElement([
      faker.date
        .between(faker.date.future(10), faker.date.past(10))
        .toISOString(),
      null,
      "",
      "לא ידוע",
    ]),
    job: faker.name.jobTitle(),
    profession: utils.randomElement([
      faker.name.jobType(),
      faker.name.jobType(),
      "",
      "לא ידוע",
      "null",
    ]),
    department: utils.randomElement([...dataTypes.CITY_UNIT]),
    stype: "",
    hr: utils.randomElement([
      faker.lorem.word() +
        "/" +
        faker.lorem.word() +
        "/" +
        faker.lorem.word() +
        "/" +
        faker.lorem.word(),
      `${firstName} ${lastName}`,
      null,
      "",
    ]),
    company: utils.randomElement([
      ...dataTypes.ROOT_HIERARCHY,
      "",
      null,
      "לא ידוע",
    ]),
    isPortalUser: utils.randomElement([true, false]),
    tags: [],
    domains: utils.randomArrFromArr(
      dataTypes.MIRI_DOMAINS as unknown as any[]
    ) as any,
  };

  // Add tags
  for (let i = 0; i < faker.datatype.number({ min: 0, max: 2 }); i++) {
    miriUser.tags.push(
      utils.randomElement(dataTypes.MIRI_TAGS as unknown as any[])
    );
  }

  return miriUser;
}
