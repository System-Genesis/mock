import { telephone } from "../types/types";
import faker from "faker";
import utils from "../utils";

export function createAkaPhone(mis: string): telephone {
  return {
    mi: mis,
    telephone: utils.generateNumberBody(),
    ktelephone: utils.generateNumberPrefix(),
    telephoneType: faker.datatype.number({ min: 1, max: 2 }),
  };
}
