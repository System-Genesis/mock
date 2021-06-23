import { akaUser } from '../types/types';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils from '../utils/utils';

export function createAkaUser(
  tz: string = utils.generateID(),
  mi: string = utils.generateNumberAsString()
): akaUser {
  const takenAt = faker.date.between(faker.date.past(10), faker.date.past(40)).toISOString();
  const createdAt = faker.date.between(faker.date.past(1), takenAt).toISOString();
  const updatedAt = faker.date.between(faker.date.past(1), createdAt).toISOString();

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    tz: tz,
    mi: mi,
    clearance: faker.datatype.number({ min: 0, max: 10 }).toString(),
    rnk: utils.randomElement([...dataTypes.RANK]),
    nstype: utils.randomElement([...dataTypes.SERVICE_TYPE]),
    rld: faker.date.between(faker.date.future(10), faker.date.past(10)).toISOString(),
    hr: utils.randomElement([...dataTypes.AKA_UNIT]),
    birthday: faker.date.between(faker.date.past(18), faker.date.past(40)).toISOString(),
    sex: utils.randomElement(['m', 'f']),
    phone: utils.generateNumberAsString(),
    areaCode: utils.generateNumberAsString(2, 8),
    mAreaCode: utils.generateNumberAsString(50, 59),
    mPhone: utils.generateNumberAsString(),
    metaData: {
      path: utils.generateNumberAsString(),
      format: utils.randomElement(['jpg']),
      takenAt: takenAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
  };
}
