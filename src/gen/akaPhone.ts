import { telephone } from "../types/types";
import faker from "faker";
import utils from "../utils";

export function createAkaPhone(mis: string): telephone {
  return {
    mi: mis,
    telephone: utils.generateNumber(),
    ktelephone: utils.generateNumber(50, 59),
    telephoneType: faker.datatype.number({ min: 1, max: 2 }),
  };
}
