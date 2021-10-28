import { createHr } from './../utils/utils';
import { adUser, user } from '../types/types';
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

export function createAdUser(user?: user) {
  const job = faker.name.jobTitle();
  const sAMAccountName = faker.internet.email().split('@')[0];
  const firstName = (user ? user.firstName : faker.name.firstName()) as string;
  const lastName = (user ? user.lastName : faker.name.lastName()) as string;
  const mi = user ? user.mi : utils.generateID();

  let ad: adUser = {
    KfirstName: firstName,
    guName: firstName,
    KlastName: lastName,
    userPrincipalName: user
      ? utils.randomElement(['M' + mi, 'D' + mi])
      : utils.randomElement(['M' + utils.generateID(), 'D' + utils.generateID(), 'BB' + utils.generateID()]),
    Kjob: job,
    hierarchy: createHr(hrHead, hrTail) + '/' + job + ' - ' + firstName + ' ' + lastName,
    sAMAccountName: sAMAccountName,
    mail: sAMAccountName + '@' + dataTypes.DOMAIN_MAP[0][0],
  };

  return ad;
}
