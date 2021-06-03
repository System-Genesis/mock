import { employee, esUser } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils from '../utils/utils';

export function createEsUser(
  tzs: string[],
  index: number,
  employees: employee[],
  mis: string[]
): esUser {
  const user: Partial<esUser> = {};

  user.tz = utils.randomElement([utils.generateID(), tzs[index]]);

  // employee
  if (user.tz === tzs[index]) {
    user.stype = employees[index].nstype;
    user.firstName = employees[index].firstName;
    user.lastName = employees[index].lastName;
    user.mi = mis[index].toString();
    user.entity = dataTypes.ENTITY_TYPE[1];
    user.rnk = utils.randomElement([...dataTypes.RANK]);
    user.rld = employees[index].rld;

    // change the matched aka record's hr to es unit type
    employees[index].hr = utils.randomElement([...dataTypes.ES_UNIT]);

    // unEmployee
  } else {
    user.stype = utils.randomElement([...dataTypes.SERVICE_TYPE]);
    user.mi = user.tz;
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.entity = dataTypes.ENTITY_TYPE[0];
    user.rnk = null;
    user.rld = null;
  }

  user.sex = utils.randomElement(['ז', 'נ']);
  user.birthday = faker.date.between(faker.date.past(18), faker.date.past(40)).toISOString();
  user.vphone = faker.datatype.number({ min: 1000, max: 9999 }).toString();
  user.cphone = utils.generateNumberAsString(50, 59) + '-' + utils.generateNumberAsString();
  user.hr = faker.lorem.word() + '/' + faker.lorem.word() + '/' + faker.lorem.word();
  user.tf = faker.name.jobType();
  user.userName = faker.internet.userName(user.firstName, user.lastName);
  user.mail = user.userName + '@' + dataTypes.DOMAIN_MAP[2][0];
  user.location = faker.name.jobTitle();

  return user as esUser;
}
