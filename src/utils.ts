import faker from "faker";
import fs from "fs";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * Math.floor(max - min + 1) + min);
}

export const createCheckDigit = (param: number): number => {
  const rawCheckDigit: number = param
    .toString()
    .split("")
    .reduce((accumulator, currChar, currIndex) => {
      let digitWeight = Number(currChar) * ((currIndex % 2) + 1);

      return (accumulator += digitWeight > 9 ? digitWeight - 9 : digitWeight);
    }, 0);

  return rawCheckDigit % 10 ? 10 - (rawCheckDigit % 10) : 0;
};

const utils = {
  readJson: (fileName: string): object[] => {
    return JSON.parse(fs.readFileSync(fileName, "utf8"));
  },

  randomElement: (array: any[]): any => {
    return array[Math.floor(Math.random() * array.length)];
  },

  randomArrFromArr: (array: any[][]): any => {
    const n = getRandomInt(1, array.length);
    return array.sort(() => Math.random() - Math.random()).slice(0, n);
  },

  generateID: (): string => {
    const tz: number = faker.datatype.number({ min: 10000000, max: 99999999 });
    return `${tz}${createCheckDigit(tz)}`;
  },

  generateNumberBody: (): string => {
    return faker.datatype.number({ min: 1000000, max: 9999999 }).toString();
  },

  generateNumberPrefix: (): string => {
    return faker.datatype.number({ min: 50, max: 59 }).toString();
  },
};

export default utils;
