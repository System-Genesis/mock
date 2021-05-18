type esUser = {
  tz: string;
  vphone: string;
  cphone: string;
  hr: string;
  tf: string;
  userName: string;
  mail: string;
  location: string;
  stype: string;
  firstName: string;
  lastName: string;
  mi: string;
  entity: string;
  rnk: string | null;
  rld: Date | null;
};

type adUser = {
  KfirstName: string;
  KlastName: string;
  Kjob: string;
  userPrincipalName: string;
  hierarchy: string;
  sAMAccountName: string;
  mail: string;
  guName: string | null;
};

type picture = {
  personalNumber: string;
  path: string;
  format: any;
  takenAt: string;
  createdAt: string;
  updatedAt: string;
};

type miriUser = {
  domUser: string;
  telephone: string;
  clearance: number;
  firstName: string;
  lastName: string;
  mail: any;
  tz: any;
  personalNumber: any;
  rank: any;
  rld: any;
  job: string;
  profession: any;
  department: any;
  stype: string;
  hr: string;
  company: string[];
  isPortalUser: boolean;
  tags: string[];
  domains: any;
};

type sf = {
  firstName: string;
  lastName: string;
  userName: string;
  fullName: string;
  sex: "m" | "f";
  personalNumber: string;
  tz: string;
  stype: any;
  hierarchy: string[];
  mail: string;
  rank: any;
  status: any;
  address: string;
  telephone: string;
  entity: string;
  discharge: string;
  primaryDU: {
    uniqueID: string;
    adfsUID: string;
  };
};

type employee = {
  firstName: string;
  lastName: string;
  tz: string;
  mi: number;
  clearance: number;
  rnk: string;
  nstype: string;
  rld: Date;
  hr: string;
  birthday: Date;
  sex: "m" | "f";
};

type telephone = {
  mi: number;
  telephone: string;
  ktelephone: string;
  telephoneType: 1 | 2;
};
