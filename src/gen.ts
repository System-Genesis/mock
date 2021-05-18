import {
  adUser,
  employee,
  esUser,
  miriUser,
  picture,
  sf,
  telephone,
} from "./types/types";
import fs from "fs";
import faker from "faker";
import dataTypes from "./lists/dataTypesList";
import miriTypes from "./lists/miriTypes";
import utils from "./utils";

const akaAmount = 400;
const ADAmount = 250;
const ADEmployeesAmount = ADAmount - 100;
const ADUnEmployeesAmount = ADAmount - ADEmployeesAmount;
const esAmount = 50;
const miriAmount = 100;
const miriAkaStart = ADAmount + esAmount;
const picturesAmount = 400;
const MMAmount = 200;

export default async () => {
  const mis: string[] = [];
  const tzs: string[] = [];
  const employees: employee[] = [];
  const telephones: telephone[] = [];
  const adUsers: adUser[] = [];
  const esUsers: esUser[] = [];
  const miriUsers: miriUser[] = [];
  const sfUsers: sf[] = [];
  const pictures: picture[] = [];

  // Generating mi and tz lists
  for (let i = 0; i < akaAmount; i++) {
    tzs.push(utils.generateID());
    mis.push(faker.datatype.number({ min: 100000, max: 999999999 }).toString());
  }

  for (let i = 0; i < akaAmount; i++) {
    employees.push(createAkaEmployee(tzs[i], mis[i]));
    telephones.push(createAkaPhone(mis[i]));
  }

  // Generating AD employees objects
  for (let i = 0; i < ADEmployeesAmount; i++) {
    const emp = employees[i];
    adUsers.push(createAdUser(emp.firstName, emp.lastName, emp.mi));

    // change the matched aka record's hr to ads unit type
    emp.hr = utils.randomElement(dataTypes.ADS_UNIT);
  }

  // Generating AD unEmployee objects
  for (let i = 0; i < ADUnEmployeesAmount; i++) {
    const KFirstName = faker.name.firstName();
    const KLastName = faker.name.lastName();

    adUsers.push(createAdUser(KFirstName, KLastName, utils.generateID()));
  }

  // Generating es employee/unEmployee objects
  for (let i = 0; i < esAmount; i++) {
    esUsers.push(createEsUser(tzs, i, employees, mis));
  }

  // Generating MiriUsers
  for (let i = 0; i < miriAmount; i++) {
    miriUsers.push(createMiriUser(mis[miriAkaStart + i]));
  }

  // Generating SF employee/unEmployee objects
  for (let i = 0; i < MMAmount; i++) {
    sfUsers.push(createSfUser(employees[i]));
  }

  // Generating pictures
  for (let i = 0; i < picturesAmount; i++) {
    pictures.push(createPicture(mis[i]));
  }

  fs.writeFileSync("./mockFiles/getAkaEmp.json", JSON.stringify(employees));
  fs.writeFileSync("./mockFiles/getAkaPhone.json", JSON.stringify(telephones));
  fs.writeFileSync("./mockFiles/AD.json", JSON.stringify(adUsers));
  fs.writeFileSync("./mockFiles/eightSocks.json", JSON.stringify(esUsers));
  fs.writeFileSync("./mockFiles/city.json", JSON.stringify(miriUsers));
  fs.writeFileSync("./mockFiles/sf.json", JSON.stringify(sfUsers));
  fs.writeFileSync("./mockFiles/pictures.json", JSON.stringify(pictures));
};

function createPicture(mis: string) {
  const takenAt = faker.date
    .between(faker.date.past(10), faker.date.past(40))
    .toISOString();
  const createdAt = faker.date
    .between(faker.date.past(1), takenAt)
    .toISOString();
  const updatedAt = faker.date
    .between(faker.date.past(1), createdAt)
    .toISOString();

  let picture: picture = {
    personalNumber: mis.toString(),
    path: utils.generateNumberBody(),
    format: utils.randomElement(["jpg"]),
    takenAt: takenAt,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };
  return picture;
}

function createSfUser(employee: employee) {
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
    stype: utils.randomElement(dataTypes.SERVICE_TYPE),
    hierarchy: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
    ],
    mail: unique_id + "@" + dataTypes.DOMAIN_MAP[7][0],
    rank: utils.randomElement(dataTypes.RANK),
    status: utils.randomElement(dataTypes.STATUS),
    address: faker.address.streetAddress(true),
    telephone: "0" + utils.generateNumberPrefix() + utils.generateNumberBody(),
    entity: "soldier",
    discharge: faker.date
      .between(faker.date.future(20), faker.date.future(10))
      .toISOString(),
    primaryDU: { uniqueID: unique_id, adfsUID: unique_id + "@ddd" },
  };
  return sf;
}

function createMiriUser(mis: string) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  let miriUser: miriUser = {
    domUser:
      utils.randomElement(miriTypes.idPrefixes) +
      faker.datatype.number({ min: 100000, max: 999999999 }) +
      "@" +
      utils.randomElement([
        dataTypes.DOMAIN_MAP[4][0],
        dataTypes.DOMAIN_MAP[4][0],
        dataTypes.DOMAIN_MAP[4][0],
        dataTypes.DOMAIN_MAP[5][0],
        dataTypes.DOMAIN_MAP[6][0],
      ]),
    telephone: "0" + utils.generateNumberPrefix() + utils.generateNumberBody(),
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
      faker.internet.email().split("@")[0] + "@" + miriTypes.miriMail,
    ]),
    tz: utils.randomElement([utils.generateID(), "", "לא ידוע", null]),
    personalNumber: utils.randomElement([mis, "", "לא ידוע", null]),
    rank: utils.randomElement(dataTypes.RANK),
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
    department: utils.randomElement(dataTypes.CITY_UNIT),
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
      ...miriTypes.rootHierarchy,
      "",
      null,
      "לא ידוע",
    ]),
    isPortalUser: utils.randomElement([true, false]),
    tags: [],
    domains: utils.randomArrFromArr(dataTypes.MIRI_DOMAINS),
  };

  // Add tags
  for (let i = 0; i < faker.datatype.number({ min: 0, max: 2 }); i++) {
    miriUser.tags.push(utils.randomElement(dataTypes.MIRI_TAGS));
  }

  return miriUser;
}

function createEsUser(
  tzs: string[],
  i: number,
  employees: employee[],
  mis: string[]
): esUser {
  const index = ADAmount + i;
  const user: Partial<esUser> = {};

  user.tz = utils.randomElement([utils.generateID(), tzs[index]]);

  // employee
  if (user.tz === tzs[index]) {
    user.stype = employees[index].nstype;
    user.firstName = employees[index].firstName;
    user.lastName = employees[index].lastName;
    user.mi = mis[index].toString();
    user.entity = dataTypes.ENTITY_TYPE[1];
    user.rnk = utils.randomElement(dataTypes.RANK);
    user.rld = employees[index].rld;

    // change the matched aka record's hr to es unit type
    employees[index].hr = utils.randomElement(dataTypes.ES_UNIT);

    // unEmployee
  } else {
    user.stype = utils.randomElement(dataTypes.SERVICE_TYPE);
    user.mi = user.tz;
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.entity = dataTypes.ENTITY_TYPE[0];
    user.rnk = null;
    user.rld = null;
  }

  user.vphone = faker.datatype.number({ min: 1000, max: 9999 }).toString();
  user.cphone = utils.generateNumberPrefix() + "-" + utils.generateNumberBody();
  user.hr =
    faker.lorem.word() + "/" + faker.lorem.word() + "/" + faker.lorem.word();
  user.tf = faker.name.jobType();
  user.userName = faker.internet.userName(user.firstName, user.lastName);
  user.mail = user.userName + "@" + dataTypes.DOMAIN_MAP[2][0];
  user.location = faker.name.jobTitle();

  return user as esUser;
}

function createAdUser(
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

function createAkaPhone(mis: string): telephone {
  return {
    mi: mis,
    telephone: utils.generateNumberBody(),
    ktelephone: utils.generateNumberPrefix(),
    telephoneType: faker.datatype.number({ min: 1, max: 2 }),
  };
}

function createAkaEmployee(tzs: string, mis: string): employee {
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
