import utils from "../utils/utils";

export default {
  all: (query: object) => {
    let data = utils.readJson("./mockFiles/AD.json");
    if (query) data = utils.filterData(data, query);
    return data;
  },
  byPersonalNumber: (personalNumber: string) => {
    const data = utils.readJson("./mockFiles/AD.json");
    return utils.findInData(data, { userPrincipalName: personalNumber }, false);
  },
  byDomainUser: (domainUser: string) => {
    const data = utils.readJson("./mockFiles/AD.json");
    return utils.findInData(data, { sAMAccountName: domainUser });
  },
  byIdentityCard: (identityCard: string) => {
    const data = utils.readJson("./mockFiles/AD.json");
    return utils.findInData(data, { userPrincipalName: identityCard }, false);
  },
};
