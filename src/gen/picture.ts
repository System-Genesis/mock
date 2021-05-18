import { picture } from "../types/types";
import faker from "faker";
import utils from "../utils";

export function createPicture(mis: string) {
  const takenAt = faker.date
    .between(faker.date.past(10), faker.date.past(40))
    .toISOString();
  const createdAt = faker.date
    .between(faker.date.past(1), takenAt)
    .toISOString();
  const updatedAt = faker.date
    .between(faker.date.past(1), createdAt)
    .toISOString();

  let picture: picture = {
    personalNumber: mis.toString(),
    path: utils.generateNumberBody(),
    format: utils.randomElement(["jpg"]),
    takenAt: takenAt,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };
  return picture;
}
