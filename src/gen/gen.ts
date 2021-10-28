import { akaUser, adUser, esUser, cityUser, sfUser } from '../types/types';
import fs from 'fs';
import dataTypes from '../lists/dataOption';
import utils from '../utils/utils';
import { createSfUser } from './sf.gen';
import { createCityUser, createCityUserGU } from './city.gen';
import { createEsUser } from './es.gen';
import { createAdUser } from './ad.gen';
import { createAkaUser } from './aka.gen';
import { createAdNnUser } from './adNn.gen';

const akaAmount = 40000;
export const ADAmount = 25000;
const ADUserAmount = ADAmount - 10000;
const ADUnUsersAmount = ADAmount - ADUserAmount;
const esAmount = 5000;
const cityAmount = 10000;
const cityAkaStart = ADAmount + esAmount;
const sfAmount = 20000;

const mis: string[] = [];
const tzs: string[] = [];
const akaUsers: akaUser[] = [];
const adUsers: adUser[] = [];
const adUnUsers: adUser[] = [];
const adNnUsers: adUser[] = [];
const adNnUnUsers: adUser[] = [];
const esUsers: esUser[] = [];
const esUnUsers: esUser[] = [];
const cityUsers: cityUser[] = [];
const cityUnUsers: cityUser[] = [];
const sfUsers: sfUser[] = [];
const sfUnUsers: sfUser[] = [];

const gen = async () => {
  // Generating mi and tz lists
  for (let i = 0; i < akaAmount; i++) {
    tzs.push(utils.generateID());
    mis.push(utils.generateNumberAsString());
  }

  generateAka(akaUsers, tzs, mis);
  generateEs(akaUsers, esUsers, esUnUsers);
  generateCity(akaUsers, cityUsers, cityUnUsers);
  generateSfUser(sfUsers, akaUsers, sfUnUsers);
  generateAd(akaUsers, adUsers, adUnUsers);
  generateAdNn(akaUsers, adNnUsers, adNnUnUsers);
  combine();

  if (!fs.existsSync('./mockFiles')) {
    fs.mkdirSync('./mockFiles');
  }

  fs.writeFileSync('./mockFiles/aka.json', JSON.stringify(akaUsers));
  fs.writeFileSync('./mockFiles/ad.json', JSON.stringify([...adUsers, ...adUnUsers]));
  fs.writeFileSync('./mockFiles/adNn.json', JSON.stringify([...adNnUsers, ...adNnUnUsers]));
  fs.writeFileSync('./mockFiles/eightSocks.json', JSON.stringify([...esUsers, ...esUnUsers]));
  fs.writeFileSync('./mockFiles/city.json', JSON.stringify([...cityUsers, ...cityUnUsers]));
  fs.writeFileSync('./mockFiles/sf.json', JSON.stringify([...sfUsers, ...sfUnUsers]));
};

export const checkForGenerate = async () => {
  if (!fs.existsSync('./mockFiles')) {
    await gen();
  }
};

export default gen;

function generateSfUser(sfUsers: sfUser[], akaUsers: akaUser[], sfUnUsers: sfUser[]) {
  // sf
  for (let i = 0; i < sfAmount; i++) {
    sfUnUsers.push(createSfUser());
  }

  // sf & aka
  for (let i = 0; i < sfAmount; i++) {
    sfUsers.push(createSfUser(akaUsers[i]));
  }
}

function generateCity(akaUser: akaUser[], cityUsers: cityUser[], cityUnUsers: cityUser[]) {
  // city
  for (let i = 0; i < cityAmount; i++) {
    const user = createCityUser();
    cityUnUsers.push(user);
  }

  // goalUser
  for (let i = 0; i < cityAmount; i++) {
    const user = createCityUserGU() as cityUser;
    cityUnUsers.push(user);
  }
  // city & aka
  for (let i = 0; i < cityAmount; i++) {
    const user = createCityUser(akaUser[cityAkaStart + i]);
    cityUsers.push(user);
  }
}

function generateEs(akaUsers: akaUser[], esUsers: esUser[], esUnUsers: esUser[]) {
  // es
  for (let i = 0; i < esAmount; i++) {
    esUnUsers.push(createEsUser());
  }

  // es & aka
  for (let i = 0; i < esAmount; i++) {
    esUsers.push(createEsUser(akaUsers[i + ADAmount]));
  }
}

function generateAd(akaUsers: akaUser[], adUsers: adUser[], adUnUsers: adUser[]) {
  // ad
  for (let i = 0; i < ADUnUsersAmount; i++) {
    adUnUsers.push(createAdUser());
  }

  // ad & aka
  for (let i = 0; i < ADUserAmount; i++) {
    const user = akaUsers[i];

    adUsers.push(createAdUser(user));

    // change the matched aka record's hr to ads unit type
    user.hr = utils.randomElement([...dataTypes.ADS_UNIT]);
  }
}

function generateAdNn(akaUsers: akaUser[], adNnUsers: adUser[], adNnUnUsers: adUser[]) {
  // adNn
  for (let i = 0; i < ADUnUsersAmount; i++) {
    adNnUnUsers.push(createAdNnUser());
  }

  // adNn & aka
  for (let i = 0; i < ADUserAmount; i++) {
    const user = akaUsers[i];

    adNnUsers.push(createAdNnUser(user));

    // change the matched aka record's hr to ads unit type
    user.hr = utils.randomElement([...dataTypes.ADS_UNIT]);
  }
}

function generateAka(akaUsers: akaUser[], tzs: string[], mis: string[]) {
  for (let i = 0; i < akaAmount; i++) {
    akaUsers.push(createAkaUser(tzs[i], mis[i]));

    // Same tzs another mis create 6 users
    if (i < 6) {
      akaUsers.push(createAkaUser(tzs[i], utils.generateNumberAsString()));
    }
  }
}

function combine() {
  // city & sf
  for (let i = 0; i < cityAmount; i++) {
    const user = createCityUser(sfUnUsers[cityAkaStart + i]);

    cityUsers.push(user);
  }

  // es & city
  for (let i = 0; i < 10; i++) {
    esUnUsers.push(createEsUser(generateCity[i + ADAmount]));
  }

  // es & sf
  for (let i = 0; i < 10; i++) {
    sfUnUsers.push(createSfUser(esUnUsers[i + ADAmount]));
  }

  // ad & es
  for (let i = 0; i < 1; i++) {
    const user = esUnUsers[i];

    adUsers.push(createAdUser(user));

    // change the matched aka record's hr to ads unit type
    user.hr = utils.randomElement([...dataTypes.ADS_UNIT]);
  }

  // ad & city
  for (let i = 0; i < 10; i++) {
    const user = cityUnUsers[i];

    const adUser = createAdUser(user);

    // change the matched aka record's hr to ads unit type
    user.hr = adUser.hierarchy;

    adUsers.push(adUser);
  }

  // ad & sf
  for (let i = 0; i < 10; i++) {
    const user = sfUnUsers[i];

    adUsers.push(createAdUser(user));
  }
}
