import { user, cityUser } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils, { getRandomFieldFromWeightedObj } from '../utils/utils';
import fn from '../config/fieldNames';

export function createCityUser(user?: user) {
  let cityUser: cityUser = {
    ...userGenericFields(user),
    clearance: faker.datatype.number({ min: 1, max: 5 }),
    tz: utils.randomElement([
      utils.generateID(),
      utils.generateID().slice(1, 8),
      '',
      'unknown',
      null,
    ]),
    personalNumber: user ? user.mi : utils.randomElement(['', 'unknown', null, utils.generateID()]),
    rank: utils.randomElement([...dataTypes.RANK]),
    rld: utils.randomElement([
      faker.date.between(faker.date.future(10), faker.date.past(10)).toISOString(),
      null,
      '',
      'unknown',
    ]),
    department: utils.randomElement([...dataTypes.CITY_UNIT]),
  };

  return cityUser;
}

export function createCityUserGU() {
  let cityUser: Partial<cityUser> = {
    ...userGenericFields(),
  };

  return cityUser;
}

function userGenericFields(user?: user) {
  const firstName = (user ? user.firstName : faker.name.firstName()) as string;
  const lastName = (user ? user.lastName : faker.name.lastName()) as string;
  const domains = getDomains() as any;

  const domUser = getDomUser(dataTypes.ID_PREFIXES, dataTypes.ID_PREFIXES_WEIGHT);

  const hr = getHr(domains, domUser, firstName, lastName);

  const userG = {
    domUser: domUser,
    firstName: firstName,
    lastName: lastName,
    hr: hr,
    domains: domains,
    mail: getRandomFieldFromWeightedObj(
      ['unknown', null, '', faker.internet.email().split('@')[0] + '@' + dataTypes.CITY_MAIL],
      [2, 2, 2, 1]
    ),
    job: faker.name.jobTitle(),
    profession: utils.randomElement([
      faker.name.jobType(),
      faker.name.jobType(),
      '',
      'unknown',
      'null',
    ]),
    telephone: '0' + utils.generateNumberAsString(50, 59) + utils.generateNumberAsString(),
    stype: '',
    company: utils.randomElement([...dataTypes.ROOT_HIERARCHY, '', null, 'unknown']),
    isPortalUser: utils.randomElement([true, false]),
    tags: [] as any,
  };
  // Add tags
  for (let i = 0; i < faker.datatype.number({ min: 0, max: 2 }); i++) {
    userG.tags.push(utils.randomElement([...dataTypes.CITY_TAGS]));
  }

  return userG;
}

function getHr(domains: any, domUser: string, firstName: string, lastName: string) {
  return domains.includes(fn[fn.dataSources.city].domainNames.internal) ||
    domUser.startsWith('mads') ||
    domUser.startsWith('madNN')
    ? getRandomFieldFromWeightedObj(
        [
          '',
          `${fn.rootHierarchy.ourCompany}` + '/' + faker.lorem.word() + '/' + faker.lorem.word(),
        ],
        [1, 3]
      )
    : utils.randomElement([
        faker.lorem.word() +
          '/' +
          faker.lorem.word() +
          '/' +
          faker.lorem.word() +
          '/' +
          faker.lorem.word(),
        `${firstName} ${lastName}`,
        null,
        '',
      ]);
}

function getDomUser(ID_PREFIXES, ID_PREFIXES_WEIGHT) {
  return (
    getRandomFieldFromWeightedObj([...ID_PREFIXES], ID_PREFIXES_WEIGHT) +
    faker.datatype.number({ min: 100000, max: 999999999 }) +
    '@' +
    getRandomFieldFromWeightedObj(
      [dataTypes.DOMAIN_MAP[4][0], dataTypes.DOMAIN_MAP[5][0], dataTypes.DOMAIN_MAP[6][0]],
      [3, 1, 1]
    )
  );
}

function getDomains() {
  return utils.generateNumberAsString(0, 3) === '0'
    ? []
    : (utils.randomArrFromArr(dataTypes.CITY_DOMAINS as unknown as any[]) as any);
}
