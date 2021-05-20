import * as types from "../types/types";
import fs from "fs";
import faker from "faker";
import dataTypes from "../lists/dataTypesList";
import utils from "../utils/utils";
import { createSfUser } from "./sf.gen";
import { createMiriUser } from "./miri.gen";
import { createEsUser } from "./es.gen";
import { createAdUser } from "./ad.gen";
import { createAkaEmployee } from "./aka.gen";

const akaAmount = 400;
export const ADAmount = 250;
const ADEmployeesAmount = ADAmount - 100;
const ADUnEmployeesAmount = ADAmount - ADEmployeesAmount;
const esAmount = 50;
const miriAmount = 100;
const miriAkaStart = ADAmount + esAmount;
const MMAmount = 200;

const gen = async () => {
  const mis: string[] = [];
  const tzs: string[] = [];
  const employees: types.employee[] = [];
  const adUsers: types.adUser[] = [];
  const esUsers: types.esUser[] = [];
  const miriUsers: types.miriUser[] = [];
  const sfUsers: types.sf[] = [];

  // Generating mi and tz lists
  for (let i = 0; i < akaAmount; i++) {
    tzs.push(utils.generateID());
    mis.push(faker.datatype.number({ min: 100000, max: 999999999 }).toString());
  }

  // Generating aka employees and phone
  for (let i = 0; i < akaAmount; i++) {
    employees.push(createAkaEmployee(tzs[i], mis[i]));
    // telephones.push(createAkaPhone(mis[i]));
  }

  // Generating AD employees objects
  for (let i = 0; i < ADEmployeesAmount; i++) {
    const emp = employees[i];

    adUsers.push(createAdUser(emp.firstName, emp.lastName, emp.mi));

    // change the matched aka record's hr to ads unit type
    emp.hr = utils.randomElement([...dataTypes.ADS_UNIT]);
  }

  // Generating AD unEmployee objects
  for (let i = 0; i < ADUnEmployeesAmount; i++) {
    const KFirstName = faker.name.firstName();
    const KLastName = faker.name.lastName();

    adUsers.push(createAdUser(KFirstName, KLastName, utils.generateID()));
  }

  // Generating es employee/unEmployee objects
  for (let i = 0; i < esAmount; i++) {
    esUsers.push(createEsUser(tzs, i, employees, mis));
  }

  // Generating MiriUsers
  for (let i = 0; i < miriAmount; i++) {
    miriUsers.push(createMiriUser(mis[miriAkaStart + i]));
  }

  // Generating SF employee/unEmployee objects
  for (let i = 0; i < MMAmount; i++) {
    sfUsers.push(createSfUser(employees[i]));
  }

  if (!fs.existsSync("./mockFiles")) {
    fs.mkdirSync("./mockFiles");
  }

  fs.writeFileSync("./mockFiles/akaEmp.json", JSON.stringify(employees));
  fs.writeFileSync("./mockFiles/AD.json", JSON.stringify(adUsers));
  fs.writeFileSync("./mockFiles/eightSocks.json", JSON.stringify(esUsers));
  fs.writeFileSync("./mockFiles/city.json", JSON.stringify(miriUsers));
  fs.writeFileSync("./mockFiles/sf.json", JSON.stringify(sfUsers));
};

export const checkForGenerate = async () => {
  if (!fs.existsSync("./mockFiles")) {
    await gen();
  }
};

export default gen;
