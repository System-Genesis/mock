import dataEnum from '../lists/dataOption';

export type esUser = {
  tz: string;
  vphone: string;
  cphone: string;
  hr: string;
  tf: string;
  userName: string;
  mail: string;
  location: string;
  stype: typeof dataEnum.SERVICE_TYPE;
  firstName: string;
  lastName: string;
  mi: string;
  sex: string;
  entity: string;
  birthday: string;
  rnk: typeof dataEnum.RANK | null;
  rld: string | null;
};

export type adUser = {
  KfirstName: string;
  KlastName: string;
  Kjob: string;
  userPrincipalName: string;
  hierarchy: string;
  sAMAccountName: string;
  mail: string;
  guName: string | null;
};

export type cityUser = {
  domUser: string;
  telephone: string;
  clearance: number;
  firstName: string;
  lastName: string;
  mail: string;
  tz: string;
  personalNumber: string;
  rank: typeof dataEnum.RANK;
  rld: string | null;
  job: string;
  profession: string | null;
  department: typeof dataEnum.CITY_UNIT;
  stype: string;
  hr: string;
  company: string | null;
  isPortalUser: boolean;
  tags: typeof dataEnum.CITY_TAGS[];
  domains: typeof dataEnum.CITY_DOMAINS;
};

export type sf = {
  firstName: string;
  lastName: string;
  userName: string;
  fullName: string;
  sex: 'm' | 'f';
  personalNumber: string;
  tz: string;
  stype: typeof dataEnum.SERVICE_TYPE;
  hierarchy: string[];
  mail: string;
  rank: typeof dataEnum.RANK;
  status: typeof dataEnum.STATUS;
  address: string;
  telephone: string;
  entity: string;
  discharge: string;
  primaryDU: {
    uniqueID: string;
    adfsUID: string;
  };
};

export type employee = {
  firstName: string;
  lastName: string;
  tz: string;
  mi: string;
  clearance: string;
  rnk: typeof dataEnum.RANK;
  nstype: typeof dataEnum.SERVICE_TYPE;
  rld: string;
  hr: typeof dataEnum.ADS_UNIT | typeof dataEnum.UNIT;
  birthday: string;
  sex: 'm' | 'f';
  phone: {
    telephone: string;
    ktelephone: string;
    telephoneType: number;
  };
  metaData: {
    path: string;
    format: string;
    takenAt: string;
    createdAt: string;
    updatedAt: string;
  };
};
