import { createHr } from './../utils/utils';
import { user, sfUser } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils from '../utils/utils';

const hrHead = faker.lorem.word() + '/' + faker.lorem.word() + '/' + faker.lorem.word();
const hrTail = [
  faker.lorem.word(),
  faker.lorem.word(),
  faker.lorem.word(),
  faker.lorem.word(),
  faker.lorem.word(),
  faker.lorem.word(),
];

export function createSfUser(user?: user) {
  const unique_id = faker.internet.email().split('@')[0];
  const firstName = (user ? user.firstName : faker.name.firstName()) as string;
  const lastName = (user ? user.lastName : faker.name.lastName()) as string;

  let sf: sfUser = {
    firstName: firstName,
    lastName: lastName,
    userName: faker.internet.userName(firstName, lastName),
    fullName: firstName.concat(' ', lastName),
    sex: utils.randomElement(['m', 'f']),
    personalNumber: (!user ? utils.generateID() : user.mi) as string,
    tz: (!user ? utils.generateNumberAsString() : user.tz) as string,
    stype: utils.randomElement([...dataTypes.SERVICE_TYPE]),
    hierarchy: createHr(hrHead, hrTail).split('/'),
    mail: unique_id + '@' + dataTypes.DOMAIN_MAP[7][0],
    rank: utils.randomElement([...dataTypes.RANK]),
    status: utils.randomElement([...dataTypes.STATUS]),
    address: faker.address.streetAddress(true),
    telephone: '0' + utils.generateNumberAsString(50, 59) + utils.generateNumberAsString(),
    entity: 'soldier',
    discharge: faker.date.between(faker.date.future(20), faker.date.future(10)).toISOString(),
    primaryDU: { uniqueID: unique_id, adfsUID: unique_id + '@ddd' },
  };
  return sf;
}
