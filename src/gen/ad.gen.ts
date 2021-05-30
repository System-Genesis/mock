import { adUser } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils from '../utils/utils';

export function createAdUser(firstName: string, lastName: string, mi: string) {
  const job = faker.name.jobTitle();
  const sAMAccountName = faker.internet.email().split('@')[0];

  let ad: adUser = {
    KfirstName: firstName,
    guName: firstName,
    KlastName: lastName,
    userPrincipalName: utils.randomElement([
      'M' + mi,
      'D' + utils.generateID(),
      'BB' + utils.generateID(),
    ]),
    Kjob: job,
    hierarchy:
      faker.lorem.word() +
      '/' +
      faker.lorem.word() +
      '/' +
      faker.lorem.word() +
      '/' +
      job +
      ' - ' +
      firstName +
      ' ' +
      lastName,
    sAMAccountName: sAMAccountName,
    mail: sAMAccountName + '@' + dataTypes.DOMAIN_MAP[0][0],
  };

  return ad;
}
