import { user, cityUser } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils, { getRandomFieldFromWeightedObj } from '../utils/utils';
import fn from '../config/fieldNames';

export function createCityUser(user?: user) {
  const firstName = (user ? user.firstName : faker.name.firstName()) as string;
  const lastName = (user ? user.lastName : faker.name.lastName()) as string;
  const domains =
    utils.generateNumberAsString(0, 3) === '0'
      ? []
      : (utils.randomArrFromArr(dataTypes.CITY_DOMAINS as unknown as any[]) as any);

  const domUser =
    getRandomFieldFromWeightedObj([...dataTypes.ID_PREFIXES], dataTypes.ID_PREFIXES_WEIGHT) +
    faker.datatype.number({ min: 100000, max: 999999999 }) +
    '@' +
    getRandomFieldFromWeightedObj(
      [dataTypes.DOMAIN_MAP[4][0], dataTypes.DOMAIN_MAP[5][0], dataTypes.DOMAIN_MAP[6][0]],
      [3, 1, 1]
    );

  const hr =
    domains.includes(fn[fn.dataSources.city].domainNames.internal) ||
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

  let cityUser: cityUser = {
    domUser: domUser,
    telephone: '0' + utils.generateNumberAsString(50, 59) + utils.generateNumberAsString(),
    clearance: faker.datatype.number({ min: 1, max: 5 }),
    firstName: firstName,
    lastName: lastName,
    mail: getRandomFieldFromWeightedObj(
      ['unknown', null, '', faker.internet.email().split('@')[0] + '@' + dataTypes.CITY_MAIL],
      [2, 2, 2, 1]
    ),
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
    job: faker.name.jobTitle(),
    profession: utils.randomElement([
      faker.name.jobType(),
      faker.name.jobType(),
      '',
      'unknown',
      'null',
    ]),
    department: utils.randomElement([...dataTypes.CITY_UNIT]),
    stype: '',
    hr: hr,
    company: utils.randomElement([...dataTypes.ROOT_HIERARCHY, '', null, 'unknown']),
    isPortalUser: utils.randomElement([true, false]),
    tags: [],
    domains: domains,
  };

  // Add tags
  for (let i = 0; i < faker.datatype.number({ min: 0, max: 2 }); i++) {
    cityUser.tags.push(utils.randomElement(dataTypes.CITY_TAGS as unknown as any[]));
  }

  return cityUser;
}

export function createCityUserGU() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const domains =
    utils.generateNumberAsString(0, 3) === '0'
      ? []
      : ([utils.randomElement(dataTypes.CITY_DOMAINS as unknown as any[])] as any);

  const domUser =
    getRandomFieldFromWeightedObj([...dataTypes.ID_PREFIXES_GU], dataTypes.ID_PREFIXES_GU_WEIGHT) +
    faker.datatype.number({ min: 100000, max: 999999999 }) +
    '@' +
    getRandomFieldFromWeightedObj(
      [dataTypes.DOMAIN_MAP[4][0], dataTypes.DOMAIN_MAP[5][0], dataTypes.DOMAIN_MAP[6][0]],
      [3, 1, 1]
    );

  const hr =
    domains.includes(fn[fn.dataSources.city].domainNames.internal) ||
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

  let cityUser: Partial<cityUser> = {
    domUser: domUser,
    telephone: '0' + utils.generateNumberAsString(50, 59) + utils.generateNumberAsString(),
    firstName: firstName,
    lastName: lastName,
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
    stype: '',
    hr: hr,
    company: utils.randomElement([...dataTypes.ROOT_HIERARCHY, '', null, 'unknown']),
    isPortalUser: utils.randomElement([true, false]),
    tags: [],
    domains: domains,
  };

  // Add tags
  for (let i = 0; i < faker.datatype.number({ min: 0, max: 2 }); i++) {
    cityUser.tags!.push(utils.randomElement(dataTypes.CITY_TAGS as unknown as any[]));
  }

  return cityUser;
}
