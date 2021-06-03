import * as types from '../types/types';
import fs from 'fs';
import faker from 'faker';
import dataTypes from '../lists/dataOption';
import utils from '../utils/utils';
import { createSfUser } from './sf.gen';
import { createCityUser } from './city.gen';
import { createEsUser } from './es.gen';
import { createAdUser } from './ad.gen';
import { createAkaEmployee as createAkaUser } from './aka.gen';

const akaAmount = 400;
export const ADAmount = 250;
const ADEmployeesAmount = ADAmount - 100;
const ADUnEmployeesAmount = ADAmount - ADEmployeesAmount;
const esAmount = 50;
const cityAmount = 100;
const cityAkaStart = ADAmount + esAmount;
const MMAmount = 200;

const gen = async () => {
  const mis: string[] = [];
  const tzs: string[] = [];
  const employees: types.employee[] = [];
  const adUsers: types.adUser[] = [];
  const esUsers: types.esUser[] = [];
  const cityUsers: types.cityUser[] = [];
  const sfUsers: types.sf[] = [];

  // Generating mi and tz lists
  for (let i = 0; i < akaAmount; i++) {
    tzs.push(utils.generateID());
    mis.push(utils.generateNumberAsString());
  }

  // Generating aka employees and phone
  for (let i = 0; i < akaAmount; i++) {
    employees.push(createAkaUser(tzs[i], mis[i]));

    // Same tzs another mis create 6 users
    if (i < 6) {
      employees.push(createAkaUser(tzs[i], utils.generateNumberAsString()));
    }
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
    esUsers.push(createEsUser(tzs, i + ADAmount, employees, mis));
  }

  // Generating employee/unEmployee CityUsers
  for (let i = 0; i < cityAmount; i++) {
    cityUsers.push(createCityUser(mis[cityAkaStart + i]));
  }

  // Generating SF employee/unEmployee objects
  for (let i = 0; i < MMAmount; i++) {
    sfUsers.push(createSfUser(employees[i]));
  }

  if (!fs.existsSync('./mockFiles')) {
    fs.mkdirSync('./mockFiles');
  }

  fs.writeFileSync('./mockFiles/aka.json', JSON.stringify(employees));
  fs.writeFileSync('./mockFiles/ad.json', JSON.stringify(adUsers));
  fs.writeFileSync('./mockFiles/eightSocks.json', JSON.stringify(esUsers));
  fs.writeFileSync('./mockFiles/city.json', JSON.stringify(cityUsers));
  fs.writeFileSync('./mockFiles/sf.json', JSON.stringify(sfUsers));
};

export const checkForGenerate = async () => {
  if (!fs.existsSync('./mockFiles')) {
    await gen();
  }
};

export default gen;
