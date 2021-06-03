import { cityUser } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils, { getRandomFieldFromWeightedObj } from '../utils/utils';

export function createCityUser(mis: string) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  let cityUser: cityUser = {
    domUser:
      getRandomFieldFromWeightedObj([...dataTypes.ID_PREFIXES], dataTypes.ID_PREFIXES_WEIGHT) +
      faker.datatype.number({ min: 100000, max: 999999999 }) +
      '@' +
      getRandomFieldFromWeightedObj(
        [dataTypes.DOMAIN_MAP[4][0], dataTypes.DOMAIN_MAP[5][0], dataTypes.DOMAIN_MAP[6][0]],
        [3, 1, 1]
      ),
    telephone: '0' + utils.generateNumberAsString(50, 59) + utils.generateNumberAsString(),
    clearance: faker.datatype.number({ min: 1, max: 5 }),
    firstName: firstName,
    lastName: lastName,
    mail: getRandomFieldFromWeightedObj(
      ['לא ידוע', null, '', faker.internet.email().split('@')[0] + '@' + dataTypes.CITY_MAIL],
      [2, 2, 2, 1]
    ),
    tz: utils.randomElement([
      utils.generateID(),
      utils.generateID().slice(1, 8),
      '',
      'לא ידוע',
      null,
    ]),
    personalNumber: utils.randomElement([mis, '', 'לא ידוע', null, utils.generateNumberAsString()]),
    rank: utils.randomElement([...dataTypes.RANK]),
    rld: utils.randomElement([
      faker.date.between(faker.date.future(10), faker.date.past(10)).toISOString(),
      null,
      '',
      'לא ידוע',
    ]),
    job: faker.name.jobTitle(),
    profession: utils.randomElement([
      faker.name.jobType(),
      faker.name.jobType(),
      '',
      'לא ידוע',
      'null',
    ]),
    department: utils.randomElement([...dataTypes.CITY_UNIT]),
    stype: '',
    hr: utils.randomElement([
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
    ]),
    company: utils.randomElement([...dataTypes.ROOT_HIERARCHY, '', null, 'לא ידוע']),
    isPortalUser: utils.randomElement([true, false]),
    tags: [],
    domains:
      utils.generateNumberAsString(0, 3) === '0'
        ? []
        : (utils.randomArrFromArr(dataTypes.CITY_DOMAINS as unknown as any[]) as any),
  };

  // Add tags
  for (let i = 0; i < faker.datatype.number({ min: 0, max: 2 }); i++) {
    cityUser.tags.push(utils.randomElement(dataTypes.CITY_TAGS as unknown as any[]));
  }

  return cityUser;
}
