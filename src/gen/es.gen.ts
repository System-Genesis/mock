import { akaUser, esUser } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils from '../utils/utils';

export function createEsUser(user: akaUser | undefined = undefined): esUser {
  const esUser: Partial<esUser> = {};

  esUser.mi = user
    ? utils.randomElement([utils.generateNumberAsString(), user.mi])
    : utils.generateNumberAsString();

  esUser.stype = user?.nstype || utils.randomElement([...dataTypes.SERVICE_TYPE]);
  esUser.lastName = user?.lastName || faker.name.lastName();
  esUser.firstName = user?.firstName || faker.name.firstName();
  esUser.tz = user?.tz || utils.generateID();
  esUser.entity = dataTypes.ENTITY_TYPE[1] || dataTypes.ENTITY_TYPE[0];
  esUser.rnk = utils.randomElement([...dataTypes.RANK]) || null;
  esUser.rld = user?.rld || null;

  !user ? null : (user.hr = utils.randomElement([...dataTypes.ES_UNIT]));

  esUser.sex = utils.randomElement(['ז', 'נ']);
  esUser.birthday = faker.date.between(faker.date.past(18), faker.date.past(40)).toISOString();
  esUser.vphone = faker.datatype.number({ min: 1000, max: 9999 }).toString();
  esUser.cphone = utils.generateNumberAsString(50, 59) + '-' + utils.generateNumberAsString();
  esUser.hr = faker.lorem.word() + '/' + faker.lorem.word() + '/' + faker.lorem.word();
  esUser.tf = faker.name.jobType();
  esUser.userName = faker.internet.userName(esUser.firstName, esUser.lastName);
  esUser.mail = esUser.userName + '@' + dataTypes.DOMAIN_MAP[2][0];
  esUser.location = faker.name.jobTitle();

  return esUser as esUser;
}
