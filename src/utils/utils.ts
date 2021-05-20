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
    const tz: number = parseInt(utils.generateNumber());
    return `${tz}${createCheckDigit(tz)}`;
  },

  generateNumber: (min: number = 1000000, max: number = 9999999): string => {
    return faker.datatype.number({ min, max }).toString();
  },

  filterData: (data: object[], query: object) => {
    const filteredData = data.filter((record) => {
      for (const key in query) {
        if (!record[key] || !record[key].toString().includes(query[key])) {
          return false;
        }
      }

      return true;
    });

    return filteredData;
  },

  findInData: (data: object[], query: object, exact: boolean = true) => {
    const filteredData = data.find((record) => {
      let equal = true;
      for (const key in query) {
        if (exact) {
          if (!record[key] || !(record[key].toString() === query[key])) {
            equal = false;
          }
        } else {
          if (!record[key] || !record[key].toString().includes(query[key])) {
            equal = false;
          }
        }
      }

      return equal;
    });

    return filteredData;
  },
};

export default utils;
