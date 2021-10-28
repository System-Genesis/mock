import { adUser, user } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils, { createHr, getRandomInt } from '../utils/utils';

const hrHead = faker.lorem.word() + '/' + faker.lorem.word() + '/' + faker.lorem.word();
const hrTail = [
  faker.lorem.word(),
  faker.lorem.word(),
  faker.lorem.word(),
  faker.lorem.word(),
  faker.lorem.word(),
  faker.lorem.word(),
];

export function createAdNnUser(user?: user) {
  const job = faker.name.jobTitle();
  const userPrincipalName = faker.internet.email().split('@')[0];
  const firstName = (user ? user.firstName : faker.name.firstName()) as string;
  const lastName = (user ? user.lastName : faker.name.lastName()) as string;
  const mi = user ? user.mi : utils.generateID();

  let ad: adUser = {
    KfirstName: firstName,
    guName: firstName,
    KlastName: lastName,
    sAMAccountName: user
      ? utils.randomElement(['stam' + mi, 'nn' + mi])
      : utils.randomElement(['stam' + utils.generateID(), 'BB' + utils.generateID()]),
    Kjob: job,
    hierarchy: createHr(hrHead, hrTail) + '/' + job + ' - ' + firstName + ' ' + lastName,
    userPrincipalName: getRandomInt(0, 1) === 0 ? 'nn' + userPrincipalName : userPrincipalName,
    mail: userPrincipalName + '@' + dataTypes.DOMAIN_MAP[0][0],
  };

  return ad;
}
